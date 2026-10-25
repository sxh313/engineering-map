import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import process from 'node:process'

const args = process.argv.slice(2)
const sourceArgIndex = args.indexOf('--source')
const source = resolve(
  sourceArgIndex >= 0 && args[sourceArgIndex + 1]
    ? args[sourceArgIndex + 1]
    : process.env.FULLSTACK_NOTES || 'D:/desktop/AI/study/fullstack',
)
const workspace = resolve(process.cwd())
const target = resolve(workspace, 'docs/fullstack')
const expectedCourses = ['gin', 'gorm', 'mysql', 'redis', 'rpc']
const interviewFiles = {
  gin: '32-面试宝典与总复习.md',
  gorm: '42-面试宝典与总复习.md',
  mysql: '38-总复习与面试宝典.md',
  redis: '38-面试宝典与总复习.md',
  rpc: '25-面试宝典与总复习.md',
}
const courseLabels = { gin: 'Gin', gorm: 'GORM', mysql: 'MySQL', redis: 'Redis', rpc: 'gRPC' }

function escapeVueDelimiters(markdown) {
  let inFence = false
  let fenceMarker = ''

  return markdown
    .split(/(\r?\n)/)
    .map((part) => {
      if (part === '\n' || part === '\r\n') return part

      const fence = part.match(/^\s*(`{3,}|~{3,})/)
      if (fence) {
        if (!inFence) {
          inFence = true
          fenceMarker = fence[1][0]
        } else if (fence[1][0] === fenceMarker) {
          inFence = false
          fenceMarker = ''
        }
        return part
      }

      if (inFence) return part
      return part.replaceAll('{{', '&#123;&#123;').replaceAll('}}', '&#125;&#125;')
    })
    .join('')
}

function cleanInlineMarkdown(value) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim()
}

function compactAnswer(lines) {
  let inFence = false
  const cleaned = []

  for (const raw of lines) {
    const line = raw.trim()
    if (line.startsWith('```') || line.startsWith('~~~')) {
      inFence = !inFence
      continue
    }
    if (inFence || !line || /^\|?\s*:?-{3,}/.test(line) || /^---+$/.test(line)) continue
    if (/^#{1,6}\s/.test(line)) break

    const normalized = cleanInlineMarkdown(
      line
        .replace(/^>\s*(?:A[：:]\s*)?/, '')
        .replace(/^[-*]\s+/, '• ')
        .replace(/^\|(.+)\|$/, '$1')
        .replace(/\s*\|\s*/g, ' ｜ '),
    )

    if (normalized) cleaned.push(normalized)
    if (cleaned.join('\n').length > 720) break
  }

  return cleaned.join('\n').slice(0, 760)
}

function parseInterviewQuestions(markdown, course) {
  const lines = markdown.split(/\r?\n/)
  const questions = []
  let section = '高频题'

  for (let index = 0; index < lines.length; index += 1) {
    const heading = lines[index].match(/^###\s+(.+)/)
    if (heading) section = cleanInlineMarkdown(heading[1])

    const match = lines[index].match(/^\*\*(?:Q|题\s*)?(\d+)[：:]\s*(.+?)\*\*$/)
    if (!match) continue

    const answerLines = []
    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (/^\*\*(?:Q|题\s*)?\d+[：:]/.test(lines[cursor])) break
      if (/^##\s+/.test(lines[cursor])) break
      answerLines.push(lines[cursor])
    }

    const answer = compactAnswer(answerLines)
    if (!answer) continue

    questions.push({
      id: `${course}-${match[1]}`,
      course,
      courseLabel: courseLabels[course],
      section,
      question: cleanInlineMarkdown(match[2]),
      answer,
      source: `/fullstack/${course}/${interviewFiles[course].replace(/\.md$/, '')}`,
    })
  }

  return questions
}

if (!existsSync(source)) {
  throw new Error(`找不到笔记目录：${source}`)
}

if (!target.startsWith(`${workspace}\\`) && !target.startsWith(`${workspace}/`)) {
  throw new Error(`拒绝清理工作区外目录：${target}`)
}

await rm(target, { recursive: true, force: true })
await mkdir(target, { recursive: true })

let total = 0
const summary = []

for (const course of expectedCourses) {
  const sourceDir = join(source, course)
  const targetDir = join(target, course)
  if (!existsSync(sourceDir)) continue

  await mkdir(targetDir, { recursive: true })
  const files = (await readdir(sourceDir)).filter((file) => file.endsWith('.md'))

  for (const file of files) {
    const outputName = file === '00-目录.md' ? 'index.md' : file
    const markdown = await readFile(join(sourceDir, file), 'utf8')
    await writeFile(join(targetDir, outputName), escapeVueDelimiters(markdown), 'utf8')
  }

  total += files.length
  summary.push({ course, count: files.length })
}

const courseLinks = summary
  .map(({ course, count }) => `- [${course === 'rpc' ? 'gRPC' : course.toUpperCase()}](/fullstack/${course}/)：${count} 篇`)
  .join('\n')

await writeFile(
  join(target, 'index.md'),
  `---\ntitle: 后端工程路线\ndescription: 从 Web 框架、数据访问到存储与微服务的完整学习路径。\n---\n\n# 后端工程路线\n\n这条路线把框架使用、数据存储和微服务通信串成一个可以循序推进的知识体系。建议按照 Gin → GORM → MySQL → Redis → gRPC 的顺序学习，也可以直接进入各课程的面试总复习。\n\n${courseLinks}\n\n> 当前共收录 ${total} 篇 Markdown 学习资料。正文来自本地学习目录，由同步脚本生成。\n`,
  'utf8',
)

const questionBank = []
for (const [course, file] of Object.entries(interviewFiles)) {
  const markdown = await readFile(join(source, course, file), 'utf8')
  questionBank.push(...parseInterviewQuestions(markdown, course))
}

const dataDirectory = join(workspace, 'docs/.vitepress/data')
await mkdir(dataDirectory, { recursive: true })
await writeFile(join(dataDirectory, 'interview-questions.json'), `${JSON.stringify(questionBank, null, 2)}\n`, 'utf8')

console.log(
  `已同步 ${total} 篇 Markdown：${summary.map(({ course, count }) => `${course} ${count}`).join('，')}；生成 ${questionBank.length} 道复习题`,
)

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const root = join(process.cwd(), 'docs', 'ai', 'library')
const generatedIndexes = new Set([
  join(root, 'zero2agent', 'index.md'),
  join(root, 'ai-agent-book', 'index.md'),
])

async function collectMarkdown(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectMarkdown(path))
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(path)
  }
  return files
}

function replaceExternalLinks(line) {
  const noMarkdownTargets = line.replace(/(?<!!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)/g,
    (_match, label, url) => `${label}（来源地址：\`${url}\`）`)
  return noMarkdownTargets.replace(/https?:\/\/[^\s)<>`]+/g, (url, offset, wholeLine) => {
    const beforeUrl = wholeLine.slice(0, offset)
    const openInlineCode = (beforeUrl.match(/`/g) ?? []).length % 2 === 1
    return openInlineCode ? url : `\`${url}\``
  })
}

function localizeFootnoteSyntax(line) {
  const definition = line.match(/^(\s*)\[\^([^\]]+)\]:\s*(.*)$/)
  if (definition) {
    const [, indentation, id, text] = definition
    return `${indentation}> **注 ${id}：** ${replaceExternalLinks(text)}`
  }
  return replaceExternalLinks(line).replace(/\[\^([^\]]+)\]/g, '（注：$1）')
}

for (const path of await collectMarkdown(root)) {
  if (generatedIndexes.has(path)) continue

  const isZero2Agent = path.includes(`${sep}zero2agent${sep}`)
  const isInterview = path.includes(`${sep}learn-agent-interview${sep}`)
  const source = await readFile(path, 'utf8')
  let content = source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .replace(/^\s*\{%\s*(?:end)?raw\s*%\}\s*\r?\n/gm, '')

  let inFence = false
  let fenceMarker = ''
  content = content.split(/(?<=\n)/).map((line) => {
    const fence = line.match(/^\s*(```+|~~~+)/)
    if (fence) {
      const marker = fence[1][0]
      if (!inFence) {
        inFence = true
        fenceMarker = marker
      } else if (marker === fenceMarker) {
        inFence = false
      }
      return line
    }
    return inFence ? line : localizeFootnoteSyntax(line)
  }).join('')

  const attribution = isZero2Agent
    ? isInterview
      ? '> 来源与许可：zero2Agent `79f7f91`，ranxi2001；本面试专题适用 CC BY-NC-SA 4.0，署名、非商业使用并按相同许可共享。\n'
      : '> 来源与许可：zero2Agent `79f7f91`，ranxi2001；MIT License。\n'
    : '> 来源与许可：Bojie Li，AI Agent Book `dbc046e`；Apache License 2.0。\n'

  if (!content.includes('> 来源与许可：')) {
    content = content.replace(/^(# .+\r?\n)/, `$1\n${attribution}`)
  }
  await writeFile(path, content, 'utf8')
  console.log(relative(root, path))
}

import { defineConfig } from 'vitepress'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const base = process.env.DOCS_BASE || '/'

const courseMeta = {
  gin: { label: 'Gin', description: 'HTTP、路由、中间件与生产部署' },
  gorm: { label: 'GORM', description: '数据建模、关联、事务与性能优化' },
  mysql: { label: 'MySQL', description: 'SQL、索引、事务、锁与查询优化' },
  redis: { label: 'Redis', description: '数据结构、缓存、高可用与集群' },
  rpc: { label: 'gRPC', description: 'Protobuf、流式通信与微服务工程' },
} as const

type CourseKey = keyof typeof courseMeta

function titleFromMarkdown(file: string, fallback: string) {
  try {
    const source = readFileSync(file, 'utf8')
    const match = source.match(/^#\s+(.+)$/m)
    return match?.[1]?.replace(/[*_`]/g, '').trim() || fallback
  } catch {
    return fallback
  }
}

function createCourseItems(course: CourseKey) {
  const directory = join(process.cwd(), 'docs', 'fullstack', course)
  if (!existsSync(directory)) return []

  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => {
      if (a === 'index.md') return -1
      if (b === 'index.md') return 1
      return a.localeCompare(b, 'zh-CN', { numeric: true })
    })
    .map((file) => {
      const fallback = file.replace(/\.md$/, '').replaceAll('-', ' ')
      return {
        text: file === 'index.md' ? '课程导览' : titleFromMarkdown(join(directory, file), fallback),
        link: `/fullstack/${course}/${file === 'index.md' ? '' : file.replace(/\.md$/, '')}`,
      }
    })
}

function createSidebar(course: CourseKey) {
  const meta = courseMeta[course]
  return [
    {
      text: `${meta.label} · 学习地图`,
      collapsed: false,
      items: createCourseItems(course),
    },
    {
      text: '跨课程入口',
      collapsed: false,
      items: [
        { text: '完整后端路线', link: '/fullstack/' },
        { text: '面试复习', link: '/interview/' },
        { text: 'AI Agent 路线', link: '/ai/' },
      ],
    },
  ]
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'sxh · Engineering Map',
  description: '从 Go 后端到 AI Agent 的系统学习地图',
  base,
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#17324d' }],
    ['link', { rel: 'icon', href: `${base}logo.svg`, type: 'image/svg+xml' }],
  ],
  markdown: {
    lineNumbers: true,
    theme: { light: 'github-light', dark: 'github-dark' },
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'sxh / engineering-map',
    nav: [
      { text: '学习首页', link: '/' },
      {
        text: 'Go Web',
        items: [
          { text: 'Gin', link: '/fullstack/gin/' },
          { text: 'GORM', link: '/fullstack/gorm/' },
        ],
      },
      {
        text: '数据存储',
        items: [
          { text: 'MySQL', link: '/fullstack/mysql/' },
          { text: 'Redis', link: '/fullstack/redis/' },
        ],
      },
      { text: '微服务', link: '/fullstack/rpc/' },
      { text: '面试复习', link: '/interview/' },
      { text: 'AI Agent', link: '/ai/' },
    ],
    sidebar: {
      '/fullstack/gin/': createSidebar('gin'),
      '/fullstack/gorm/': createSidebar('gorm'),
      '/fullstack/mysql/': createSidebar('mysql'),
      '/fullstack/redis/': createSidebar('redis'),
      '/fullstack/rpc/': createSidebar('rpc'),
      '/fullstack/': [
        {
          text: '后端工程路线',
          items: Object.entries(courseMeta).map(([key, meta]) => ({
            text: `${meta.label} · ${meta.description}`,
            link: `/fullstack/${key}/`,
          })),
        },
      ],
      '/interview/': [
        {
          text: '面试复习',
          items: [
            { text: '总览', link: '/interview/' },
            { text: 'Gin 高频题', link: '/fullstack/gin/32-面试宝典与总复习' },
            { text: 'GORM 高频题', link: '/fullstack/gorm/42-面试宝典与总复习' },
            { text: 'MySQL 高频题', link: '/fullstack/mysql/38-总复习与面试宝典' },
            { text: 'Redis 高频题', link: '/fullstack/redis/38-面试宝典与总复习' },
            { text: 'gRPC 高频题', link: '/fullstack/rpc/25-面试宝典与总复习' },
          ],
        },
      ],
      '/ai/': [
        {
          text: 'AI Agent 综合路线',
          items: [
            { text: '路线首页', link: '/ai/' },
            { text: '完整学习契约', link: '/ai/roadmap' },
            { text: '来源与许可证', link: '/ai/sources' },
          ],
        },
      ],
    },
    outline: { level: [2, 3], label: '本页目录' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索知识库', buttonAriaLabel: '搜索知识库' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新' },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '学习地图',
    darkModeSwitchLabel: '切换主题',
    socialLinks: [{ icon: 'github', link: 'https://github.com/sxh313' }],
    footer: {
      message: '把零散知识，整理成可以反复走的路。',
      copyright: '© sxh313 · Engineering Map',
    },
  },
})

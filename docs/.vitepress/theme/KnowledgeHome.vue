<script setup lang="ts">
import { withBase } from 'vitepress'

const agentTrace = [
  { key: '01', name: 'Goal', detail: '定义目标' },
  { key: '02', name: 'Context', detail: '装配信息' },
  { key: '03', name: 'Model', detail: '推理决策' },
  { key: '04', name: 'Tools', detail: '执行动作' },
  { key: '05', name: 'Evidence', detail: '验证结果' },
]

const agentPhases = [
  {
    key: '01—02',
    name: '理解',
    title: 'Agent Loop 与上下文',
    description: '先理解控制权、消息轨迹和上下文预算。',
  },
  {
    key: '03—04',
    name: '连接',
    title: 'Memory、RAG 与工具',
    description: '让系统找到信息，并安全地作用于外部世界。',
  },
  {
    key: '05—07',
    name: '运行',
    title: 'Runtime、交互与评估',
    description: '把 Demo 变成可恢复、可观察、可比较的系统。',
  },
  {
    key: '08—10',
    name: '进化',
    title: '训练、反馈与多 Agent',
    description: '从失败轨迹产生受控改进，最终完成生产项目。',
  },
]

const courses = [
  {
    key: 'B1',
    name: 'Gin',
    path: '/fullstack/gin/',
    count: 36,
    description: 'HTTP 请求、路由、中间件与生产部署',
    topics: ['路由', '中间件', 'JWT', '部署'],
  },
  {
    key: 'B2',
    name: 'GORM',
    path: '/fullstack/gorm/',
    count: 46,
    description: '业务模型、关联、事务与数据访问',
    topics: ['CRUD', '关联', '事务', '调优'],
  },
  {
    key: 'B3',
    name: 'MySQL',
    path: '/fullstack/mysql/',
    count: 42,
    description: '索引、事务、锁、日志与查询优化',
    topics: ['索引', '事务', '锁', '执行计划'],
  },
  {
    key: 'B4',
    name: 'Redis',
    path: '/fullstack/redis/',
    count: 42,
    description: '数据结构、缓存、高可用与集群',
    topics: ['缓存', '持久化', '哨兵', '集群'],
  },
  {
    key: 'B5',
    name: 'gRPC',
    path: '/fullstack/rpc/',
    count: 30,
    description: 'Protobuf、流式通信与服务治理',
    topics: ['Proto3', '流式 RPC', '网关', '服务发现'],
  },
]
</script>

<template>
  <main class="knowledge-home">
    <section class="home-hero ai-first-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="overline"><span>AI FULL-STACK</span> / ENGINEERING MAP</p>
        <h1 id="home-title">
          先构建 Agent，<br />
          <span>再补齐系统底座。</span>
        </h1>
        <p class="hero-lead">
          从 Agent Loop、上下文、工具与评估开始，用真实交付物证明掌握程度；需要深入工程边界时，再回到 Go、数据库、缓存与微服务。
        </p>
        <div class="hero-actions">
          <a class="action action-primary" :href="withBase('/ai/')">
            进入 AI Agent 路线
            <span aria-hidden="true">↗</span>
          </a>
          <a class="action action-secondary" :href="withBase('/interview/')">开始面试复习</a>
        </div>
        <div class="hero-proof" aria-label="站点内容摘要">
          <span><strong>10</strong> Agent 阶段</span>
          <span><strong>3</strong> 学习模式</span>
          <span><strong>196</strong> 后端资料</span>
        </div>
      </div>

      <div class="map-console agent-console" aria-label="Agent 系统闭环摘要">
        <div class="console-topline">
          <span class="console-path">agent.system.trace</span>
          <span class="console-status"><i /> evidence first</span>
        </div>
        <div class="console-body">
          <p><span class="prompt">$</span> run agent --from goal --to evidence</p>
          <ol>
            <li v-for="step in agentTrace" :key="step.key">
              <span class="route-index">{{ step.key }}</span>
              <strong>{{ step.name }}</strong>
              <span>{{ step.detail }}</span>
            </li>
          </ol>
          <p class="console-result">✓ 每个阶段都要留下可检查证据</p>
        </div>
        <div class="console-foundation">
          <span>ENGINEERING FOUNDATION</span>
          <strong>Go · MySQL · Redis · gRPC</strong>
        </div>
      </div>
    </section>

    <section class="agent-priority" aria-labelledby="agent-route-title">
      <div class="agent-priority-copy">
        <p class="overline"><span>PRIMARY ROUTE</span> / 01—10</p>
        <h2 id="agent-route-title">AI Agent 放在第一条路线。</h2>
        <p>
          不从名词表开始，而从一个可以运行的最小闭环开始。每一段都包含核心问题、动手任务、失败条件与验收证据。
        </p>
        <a :href="withBase('/ai/roadmap')">查看完整学习契约 <span aria-hidden="true">→</span></a>
      </div>

      <div class="phase-list" aria-label="AI Agent 四段学习路线">
        <a
          v-for="phase in agentPhases"
          :key="phase.key"
          :href="withBase(`/ai/roadmap#stage-${phase.key.slice(0, 2)}`)"
          class="phase-row"
        >
          <span class="phase-key">{{ phase.key }}</span>
          <span class="phase-name">{{ phase.name }}</span>
          <span class="phase-main">
            <strong>{{ phase.title }}</strong>
            <small>{{ phase.description }}</small>
          </span>
          <span class="phase-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="learning-rail foundation-rail" aria-labelledby="rail-title">
      <div class="section-heading">
        <div>
          <p class="overline">ENGINEERING FOUNDATION</p>
          <h2 id="rail-title">Agent 向下依赖真实系统能力</h2>
        </div>
        <p>模型负责判断，后端负责让判断可靠地落地。请求、数据、缓存和服务通信共同构成 Agent 的工程底座。</p>
      </div>

      <div class="rail-track" role="list" aria-label="后端底座学习顺序">
        <div class="rail-origin" role="listitem">
          <span>AI</span>
          <strong>Agent</strong>
        </div>
        <a v-for="course in courses" :key="course.key" :href="withBase(course.path)" role="listitem">
          <span>{{ course.key }}</span>
          <strong>{{ course.name }}</strong>
        </a>
      </div>
    </section>

    <section class="course-index" aria-labelledby="course-title">
      <div class="index-label">
        <p class="overline">FOUNDATION INDEX</p>
        <p class="index-count"><strong>196</strong><span>篇工程资料</span></p>
      </div>

      <div class="course-list">
        <h2 id="course-title" class="sr-only">后端工程课程索引</h2>
        <a v-for="course in courses" :key="course.name" :href="withBase(course.path)" class="course-row">
          <span class="course-number">{{ course.key }}</span>
          <span class="course-main">
            <strong>{{ course.name }}</strong>
            <small>{{ course.description }}</small>
          </span>
          <span class="course-topics">
            <i v-for="topic in course.topics" :key="topic">{{ topic }}</i>
          </span>
          <span class="course-total">{{ course.count }} 篇</span>
          <span class="course-arrow" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <section class="interview-bridge" aria-labelledby="interview-title">
      <div class="bridge-mark" aria-hidden="true">Q<span>/</span>A</div>
      <div class="bridge-copy">
        <p class="overline">INTERVIEW MODE</p>
        <h2 id="interview-title">学完不是终点，能独立回答才算掌握。</h2>
        <p>随机抽取后端高频题，默认隐藏答案。根据“没掌握、模糊、已掌握”留下本地复习记录，逐步收敛薄弱项。</p>
      </div>
      <a :href="withBase('/interview/')" class="bridge-link">开始随机复习 <span aria-hidden="true">→</span></a>
    </section>

    <section class="next-route source-note" aria-labelledby="source-title">
      <p class="overline">OPEN LEARNING</p>
      <h2 id="source-title">原创路线，开放深读。</h2>
      <p>AI Agent 路线融合公开资料的知识关系，但不复制上游整章、原图或完整题库；所有深读入口都回到原作者仓库。</p>
      <a :href="withBase('/ai/sources')">查看来源与许可证 →</a>
    </section>
  </main>
</template>

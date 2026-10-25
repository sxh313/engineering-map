<script setup lang="ts">
import { withBase } from 'vitepress'

const courses = [
  {
    key: '01',
    name: 'Gin',
    path: '/fullstack/gin/',
    count: 36,
    description: '从 HTTP 请求进入生产级 Web 服务',
    topics: ['路由', '中间件', 'JWT', '部署'],
  },
  {
    key: '02',
    name: 'GORM',
    path: '/fullstack/gorm/',
    count: 46,
    description: '把业务模型可靠地映射到数据层',
    topics: ['CRUD', '关联', '事务', '调优'],
  },
  {
    key: '03',
    name: 'MySQL',
    path: '/fullstack/mysql/',
    count: 42,
    description: '理解 SQL 之后，继续理解数据库为何这样工作',
    topics: ['索引', '事务', '锁', '执行计划'],
  },
  {
    key: '04',
    name: 'Redis',
    path: '/fullstack/redis/',
    count: 42,
    description: '从数据结构走向缓存与高可用系统',
    topics: ['缓存', '持久化', '哨兵', '集群'],
  },
  {
    key: '05',
    name: 'gRPC',
    path: '/fullstack/rpc/',
    count: 30,
    description: '跨越进程边界，构建可演进的微服务通信',
    topics: ['Proto3', '流式 RPC', '网关', '服务发现'],
  },
]
</script>

<template>
  <main class="knowledge-home">
    <section class="home-hero" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="overline"><span>sxh313</span> / engineering map</p>
        <h1 id="home-title">
          从一次请求开始，<br />
          <span>走到系统的边界。</span>
        </h1>
        <p class="hero-lead">
          一份持续生长的 AI 全栈工程学习地图。沿着真实技术依赖组织知识，既可以从后端基础开始，也可以进入 Agent 系统设计与项目实践。
        </p>
        <div class="hero-actions">
          <a class="action action-primary" :href="withBase('/fullstack/gin/')">
            从 Gin 开始
            <span aria-hidden="true">↗</span>
          </a>
          <a class="action action-secondary" :href="withBase('/interview/')">开始面试复习</a>
        </div>
      </div>

      <div class="map-console" aria-label="学习地图摘要">
        <div class="console-topline">
          <span class="console-path">learning.map</span>
          <span class="console-status"><i /> maintained</span>
        </div>
        <div class="console-body">
          <p><span class="prompt">$</span> trace backend --to agent</p>
          <ol>
            <li v-for="course in courses" :key="course.name">
              <span class="route-index">{{ course.key }}</span>
              <strong>{{ course.name }}</strong>
              <span>{{ course.count }} docs</span>
            </li>
          </ol>
          <p class="console-result">✓ 196 篇内容已建立索引</p>
        </div>
      </div>
    </section>

    <section class="learning-rail" aria-labelledby="rail-title">
      <div class="section-heading">
        <div>
          <p class="overline">Learning route</p>
          <h2 id="rail-title">一条有依赖关系的学习路径</h2>
        </div>
        <p>框架不是孤岛。请求处理、数据访问、存储系统和服务通信最终会在一个真实项目里汇合。</p>
      </div>

      <div class="rail-track" role="list" aria-label="后端学习顺序">
        <a v-for="course in courses" :key="course.key" :href="withBase(course.path)" role="listitem">
          <span>{{ course.key }}</span>
          <strong>{{ course.name }}</strong>
        </a>
        <div class="rail-destination" role="listitem">
          <span>→</span>
          <strong>AI Agent</strong>
        </div>
      </div>
    </section>

    <section class="course-index" aria-labelledby="course-title">
      <div class="index-label">
        <p class="overline">Course index</p>
        <p class="index-count"><strong>196</strong><span>篇学习资料</span></p>
      </div>

      <div class="course-list">
        <h2 id="course-title" class="sr-only">课程索引</h2>
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
        <p class="overline">Interview mode</p>
        <h2 id="interview-title">先自己回答，再判断是不是真的掌握。</h2>
        <p>从五门课程抽取真实题目，隐藏答案进行自测。每次选择“没掌握、模糊、已掌握”，复习进度只保存在当前浏览器。</p>
      </div>
      <a :href="withBase('/interview/')" class="bridge-link">开始随机复习 <span aria-hidden="true">→</span></a>
    </section>

    <section class="next-route" aria-labelledby="next-title">
      <p class="overline">Next route / available</p>
      <h2 id="next-title">后端是底座，Agent 是系统能力的延伸。</h2>
      <p>AI Agent 综合路线已经开放：从最小循环、上下文与工具，走到 Runtime、评估、持续进化和生产项目。</p>
      <a :href="withBase('/ai/')">进入 AI Agent 综合路线 →</a>
    </section>
  </main>
</template>

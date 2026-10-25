<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'

type PathKey = 'system' | 'project' | 'interview'

const paths = [
  {
    key: 'system' as PathKey,
    label: '系统学习',
    description: '从 01 到 10 建立完整认知，适合第一次系统学习 Agent。',
    stages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'project' as PathKey,
    label: '项目实战',
    description: '优先形成可运行作品，再用评估证据迭代系统。',
    stages: [1, 4, 5, 7, 10],
  },
  {
    key: 'interview' as PathKey,
    label: '面试冲刺',
    description: '聚焦架构、取舍、可靠性和项目追问，训练工程表达。',
    stages: [1, 2, 4, 5, 7, 10],
  },
]

const stages = [
  {
    id: 1,
    title: 'Agent 最小闭环',
    question: '模型如何从一次回答变成可以行动的系统？',
    output: '一个可运行、可观察的 Model–Tool–Observation 循环',
    tags: ['Loop', 'Messages', 'Tool Calling'],
  },
  {
    id: 2,
    title: '上下文工程',
    question: '有限上下文里，什么信息应该在什么时候进入模型？',
    output: '一组可复现的上下文消融实验与结果记录',
    tags: ['Context', 'Cache', 'Compaction'],
  },
  {
    id: 3,
    title: 'Memory 与 RAG',
    question: '如何让系统记得住、找得到，并能说明答案依据？',
    output: '带引用的检索回答、命中证据和失败样例',
    tags: ['Memory', 'Retrieval', 'Rerank'],
  },
  {
    id: 4,
    title: 'Tool、MCP 与 Skills',
    question: '怎样把模型意图变成受约束、可审计的真实动作？',
    output: '带 Schema、超时、错误分类和权限确认的工具',
    tags: ['Tools', 'MCP', 'Permission'],
  },
  {
    id: 5,
    title: 'Agent Runtime',
    question: '任务中断、失败或超长时，系统如何恢复并继续？',
    output: '可持久化状态、检查点、重试和恢复流程',
    tags: ['Runtime', 'Session', 'Recovery'],
  },
  {
    id: 6,
    title: 'Coding Agent 与交互',
    question: 'Agent 如何安全地读写环境，并与长时间任务协作？',
    output: '一个带变更预览与人工确认的文件或浏览器任务',
    tags: ['Coding', 'Computer Use', 'HITL'],
  },
  {
    id: 7,
    title: '评估与可观测性',
    question: '怎样证明一次改动真的让 Agent 变好了？',
    output: '小型评估集、Trace、指标与失败分类报告',
    tags: ['Eval', 'Trace', 'Metrics'],
  },
  {
    id: 8,
    title: '训练与行为优化',
    question: '什么时候应该改提示、改系统，什么时候才需要训练模型？',
    output: '一份 SFT / RL / 不训练的选型说明或最小实验',
    tags: ['SFT', 'RL', 'Data'],
  },
  {
    id: 9,
    title: '持续进化',
    question: '如何从真实失败轨迹中产生安全、可验证的改进？',
    output: '失败回流、候选改进、离线验证和发布门禁流程',
    tags: ['Feedback', 'Reflection', 'Release Gate'],
  },
  {
    id: 10,
    title: '多 Agent 与生产项目',
    question: '什么时候值得拆成多个 Agent，如何控制协作成本？',
    output: '一个有角色边界、共享协议和验收证据的完整项目',
    tags: ['Multi-Agent', 'Delivery', 'Reliability'],
  },
]

const activePath = ref<PathKey>('system')
const currentPath = computed(() => paths.find((path) => path.key === activePath.value) ?? paths[0])
const visibleStages = computed(() => stages.filter((stage) => currentPath.value.stages.includes(stage.id)))
</script>

<template>
  <main class="agent-hub">
    <nav class="mobile-study-dock" aria-label="AI Agent 手机学习导航">
      <a href="#agent-overview">概览</a>
      <a :href="withBase('/ai/atlas')">全部内容</a>
      <a href="#learning-stages">阶段</a>
      <a :href="withBase('/ai/handbook')">完整手册</a>
    </nav>

    <section id="agent-overview" class="agent-hero" aria-labelledby="agent-title">
      <div class="agent-hero-copy">
        <p class="agent-overline"><span>AI AGENT</span> / ORIGINAL STUDY MAP</p>
        <h1 id="agent-title">从“会调用模型”，<br><em>走到“能交付系统”。</em></h1>
        <p class="agent-lead">
          先用融合路线建立全局认知，再进入两套资料的完整原理讲解与工程实践。所有章节、配图和表格都可以在本站继续阅读。
        </p>
        <div class="agent-actions">
          <a :href="withBase('/ai/handbook')" class="agent-primary">打开站内完整手册 <span>↗</span></a>
          <a :href="withBase('/ai/atlas')" class="agent-secondary">查看全部内容目录</a>
        </div>
        <div class="agent-census" aria-label="融合知识库规模">
          <span><strong>10</strong> 原理章节</span>
          <span><strong>133</strong> 工程文章</span>
          <span><strong>13</strong> 融合模块</span>
        </div>
      </div>

      <div class="loop-panel" aria-label="Agent 执行闭环">
        <div class="loop-head"><span>agent.loop.trace</span><span class="loop-live"><i /> observable</span></div>
        <ol class="loop-track">
          <li><b>01</b><span>Input</span><small>目标进入</small></li>
          <li><b>02</b><span>Context</span><small>信息装配</small></li>
          <li><b>03</b><span>Model</span><small>推理决策</small></li>
          <li><b>04</b><span>Action</span><small>调用工具</small></li>
          <li><b>05</b><span>Observe</span><small>读取结果</small></li>
          <li><b>06</b><span>Evaluate</span><small>验证反馈</small></li>
        </ol>
        <div class="loop-return"><span>↳</span> 评估结果进入下一轮上下文</div>
      </div>
    </section>

    <section class="source-library" aria-labelledby="source-library-title">
      <div class="source-library-heading">
        <p class="agent-overline">FULL READING LIBRARY</p>
        <h2 id="source-library-title">两套资料，站内完整阅读</h2>
        <p>原理、工程拆解、图表和项目实践都放在你的站点里，点开后继续在本站阅读。</p>
      </div>
      <div class="source-library-grid">
        <a class="source-library-card" :href="withBase('/ai/library/ai-agent-book/')">
          <span class="source-library-index">BOOK / 10 CHAPTERS</span>
          <strong>AI Agent 原理与工程实践</strong>
          <span>从 Agent 入门到上下文、记忆、工具、Coding Agent、多模态、评估、训练与多 Agent。</span>
          <b>站内阅读全书 <i>↗</i></b>
        </a>
        <a class="source-library-card" :href="withBase('/ai/library/zero2agent/')">
          <span class="source-library-index">ENGINEERING / 133 ARTICLES</span>
          <strong>zero2Agent 工程课程</strong>
          <span>Agent 基础、框架与 SDK、Harness、Claude Code、Codex、训练、实战和 OfferPilot 项目。</span>
          <b>站内阅读全部课程 <i>↗</i></b>
        </a>
      </div>
    </section>

    <section id="route-picker" class="path-selector" aria-labelledby="path-title">
      <div class="path-intro">
        <p class="agent-overline">CHOOSE A ROUTE</p>
        <h2 id="path-title">同一套知识，三种走法</h2>
      </div>
      <div class="path-tabs" role="tablist" aria-label="学习路径">
        <button
          v-for="path in paths"
          :key="path.key"
          type="button"
          role="tab"
          :aria-selected="activePath === path.key"
          :class="{ active: activePath === path.key }"
          @click="activePath = path.key"
        >
          <strong>{{ path.label }}</strong>
          <span>{{ path.stages.length }} 个阶段</span>
        </button>
      </div>
      <div class="path-summary">
        <p>{{ currentPath.description }}</p>
        <span>当前顺序：{{ currentPath.stages.map((id) => String(id).padStart(2, '0')).join(' → ') }}</span>
      </div>
    </section>

    <section id="learning-stages" class="stage-section" aria-labelledby="stage-title">
      <div class="stage-heading">
        <div>
          <p class="agent-overline">LEARNING CONTRACT</p>
          <h2 id="stage-title">不是章节目录，是交付清单</h2>
        </div>
        <p>每个阶段都从一个工程问题开始，以一份可检查的学习产物结束。原始资料用于深读，路线与验收由本站原创设计。</p>
      </div>

      <div class="stage-list">
        <article v-for="stage in visibleStages" :key="stage.id" class="stage-row">
          <div class="stage-number">{{ String(stage.id).padStart(2, '0') }}</div>
          <div class="stage-main">
            <h3>{{ stage.title }}</h3>
            <p>{{ stage.question }}</p>
            <div class="stage-tags"><span v-for="tag in stage.tags" :key="tag">{{ tag }}</span></div>
          </div>
          <div class="stage-proof">
            <small>本阶段产物</small>
            <strong>{{ stage.output }}</strong>
          </div>
          <div class="stage-links">
            <a :href="withBase(`/ai/handbook#stage-${String(stage.id).padStart(2, '0')}`)">站内讲解 →</a>
            <a :href="withBase(`/ai/roadmap#stage-${String(stage.id).padStart(2, '0')}`)">动手实践 →</a>
            <a :href="withBase('/ai/sources')">来源说明 →</a>
          </div>
        </article>
      </div>
    </section>

    <section class="source-boundary" aria-labelledby="boundary-title">
      <p class="boundary-mark" aria-hidden="true">≠</p>
      <div>
        <p class="agent-overline">SOURCE BOUNDARY</p>
        <h2 id="boundary-title">融合路线与原课程并行。</h2>
        <p>融合路线整理学习顺序、练习与验收标准；原理讲解、工程实践、配图和表格也按许可收录。所有课程入口都在本站，来源与许可统一说明。</p>
      </div>
      <a :href="withBase('/ai/sources')">查看来源与许可证 <span>→</span></a>
    </section>
  </main>
</template>

<style scoped>
.agent-hub {
  --agent-ink: var(--sxh-ink);
  --agent-navy: #17324d;
  --agent-blue: #285878;
  --agent-orange: #ef7b45;
  overflow-x: clip;
  color: var(--agent-ink);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--sxh-line) 40%, transparent) 1px, transparent 1px) center / 96px 100%,
    var(--sxh-white);
}

.agent-hub a { text-decoration: none; }
.mobile-study-dock { display: none; }
.agent-hero, .path-selector, .stage-section, .source-boundary { width: min(1240px, calc(100% - 48px)); margin-inline: auto; }
.agent-hero { display: grid; grid-template-columns: minmax(0, 1.08fr) minmax(390px, .92fr); gap: clamp(46px, 7vw, 96px); align-items: center; min-height: 690px; padding-block: 88px 100px; }
.agent-overline { margin: 0 0 20px; color: var(--sxh-muted); font-family: var(--sxh-mono); font-size: 10px; font-weight: 700; letter-spacing: .16em; }
.agent-overline span { color: var(--agent-orange); }
.agent-hero h1 { margin: 0; font-size: clamp(44px, 5.5vw, 76px); font-weight: 800; letter-spacing: -.065em; line-height: 1.1; }
.agent-hero h1 em { color: var(--agent-blue); font-style: normal; }
.agent-lead { max-width: 680px; margin: 28px 0 0; color: var(--sxh-muted); font-size: 17px; line-height: 1.85; }
.agent-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 36px; }
.agent-actions a { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 0 20px; border: 1px solid var(--agent-navy); font-size: 13px; font-weight: 700; }
.agent-primary { gap: 32px; color: #fff; background: var(--agent-navy); }
.agent-primary:hover { color: #fff; background: #224a69; }
.agent-secondary { color: var(--sxh-navy); background: var(--sxh-white); }
.agent-secondary:hover { color: var(--sxh-white); background: var(--sxh-navy); }
.agent-census { display: flex; flex-wrap: wrap; gap: 12px 24px; margin-top: 24px; color: var(--sxh-muted); font-family: var(--sxh-mono); font-size: 10px; }
.agent-census span { display: inline-flex; align-items: baseline; gap: 6px; }
.agent-census strong { color: var(--agent-orange); font-size: 15px; }

.source-library { width: min(1240px, calc(100% - 48px)); margin: 0 auto; padding: 0 0 92px; }
.source-library-heading { display: grid; grid-template-columns: .8fr 1.2fr; gap: 8px 56px; align-items: end; padding-bottom: 24px; border-bottom: 1px solid var(--sxh-line); }
.source-library-heading .agent-overline { grid-column: 1 / -1; margin-bottom: 4px; }
.source-library-heading h2 { margin: 0; font-size: clamp(28px, 3.6vw, 42px); letter-spacing: -.045em; line-height: 1.2; }
.source-library-heading > p:last-child { margin: 0; color: var(--sxh-muted); font-size: 14px; line-height: 1.75; }
.source-library-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
.source-library-card { display: grid; gap: 13px; min-width: 0; min-height: 210px; padding: 24px; border: 1px solid var(--sxh-line); color: var(--agent-ink); background: color-mix(in srgb, var(--sxh-paper) 65%, white); transition: border-color .18s ease, transform .18s ease; }
.source-library-card:hover { transform: translateY(-3px); border-color: var(--agent-orange); }
.source-library-index { color: var(--agent-orange); font-family: var(--sxh-mono); font-size: 10px; font-weight: 700; letter-spacing: .1em; }
.source-library-card strong { font-size: 22px; letter-spacing: -.03em; }
.source-library-card > span:nth-of-type(2) { color: var(--sxh-muted); font-size: 13px; line-height: 1.75; }
.source-library-card b { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--sxh-line); color: var(--agent-blue); font-size: 12px; }
.source-library-card i { font-size: 16px; font-style: normal; }

.loop-panel { position: relative; border: 1px solid var(--sxh-line); background: color-mix(in srgb, var(--sxh-paper) 92%, transparent); box-shadow: 18px 18px 0 color-mix(in srgb, var(--agent-navy) 7%, transparent); }
.loop-panel::before { position: absolute; top: -1px; left: -1px; width: 92px; height: 5px; content: ''; background: var(--agent-orange); }
.loop-head { display: flex; justify-content: space-between; align-items: center; min-height: 46px; padding: 0 18px; border-bottom: 1px solid var(--sxh-line); color: var(--sxh-muted); font-family: var(--sxh-mono); font-size: 10px; }
.loop-live { display: flex; align-items: center; gap: 8px; }
.loop-live i { width: 7px; height: 7px; border-radius: 50%; background: #2da66f; box-shadow: 0 0 0 4px color-mix(in srgb, #2da66f 15%, transparent); }
.loop-track { margin: 0; padding: 20px 24px; list-style: none; }
.loop-track li { position: relative; display: grid; grid-template-columns: 30px 1fr auto; gap: 13px; align-items: center; min-height: 54px; border-bottom: 1px solid var(--sxh-line); }
.loop-track li:last-child { border-bottom: 0; }
.loop-track b { color: var(--agent-orange); font-family: var(--sxh-mono); font-size: 10px; }
.loop-track span { font-size: 15px; font-weight: 750; }
.loop-track small { color: var(--sxh-muted); font-size: 11px; }
.loop-return { display: flex; gap: 10px; align-items: center; padding: 15px 24px; border-top: 1px solid var(--sxh-line); color: #fff; background: var(--agent-navy); font-family: var(--sxh-mono); font-size: 10px; }
.loop-return span { color: var(--agent-orange); font-size: 17px; }

.path-selector { display: grid; grid-template-columns: .6fr 1.4fr; gap: 46px 64px; padding-block: 92px; border-top: 1px solid var(--sxh-line); }
.path-intro h2, .stage-heading h2, .source-boundary h2 { margin: 0; font-size: clamp(31px, 4vw, 50px); letter-spacing: -.045em; line-height: 1.15; }
.path-tabs { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--sxh-line); }
.path-tabs button { min-height: 96px; padding: 18px; border: 0; border-right: 1px solid var(--sxh-line); color: var(--sxh-muted); background: var(--sxh-white); cursor: pointer; text-align: left; }
.path-tabs button:last-child { border-right: 0; }
.path-tabs button strong, .path-tabs button span { display: block; }
.path-tabs button strong { color: var(--agent-ink); font-size: 16px; }
.path-tabs button span { margin-top: 8px; font-family: var(--sxh-mono); font-size: 10px; }
.path-tabs button.active { color: #d4e0e8; background: var(--agent-navy); box-shadow: inset 0 -5px var(--agent-orange); }
.path-tabs button.active strong { color: #fff; }
.path-summary { grid-column: 2; display: flex; justify-content: space-between; gap: 24px; padding-top: 22px; border-top: 1px solid var(--sxh-line); }
.path-summary p { margin: 0; color: var(--sxh-muted); font-size: 14px; }
.path-summary span { color: var(--agent-blue); font-family: var(--sxh-mono); font-size: 10px; white-space: nowrap; }

.stage-section { padding-block: 98px 112px; border-top: 1px solid var(--sxh-line); }
.stage-heading { display: grid; grid-template-columns: 1fr minmax(340px, .56fr); gap: 64px; align-items: end; }
.stage-heading > p { margin: 0 0 4px; color: var(--sxh-muted); font-size: 14px; line-height: 1.8; }
.stage-list { margin-top: 58px; border-top: 1px solid var(--agent-ink); }
.stage-row { display: grid; grid-template-columns: 48px minmax(260px, 1fr) minmax(250px, .75fr) 112px; gap: 22px; align-items: center; min-height: 158px; border-bottom: 1px solid var(--sxh-line); }
.stage-number { color: var(--agent-orange); font-family: var(--sxh-mono); font-size: 11px; }
.stage-main h3 { margin: 0; font-size: 25px; letter-spacing: -.035em; }
.stage-main p { margin: 8px 0 0; color: var(--sxh-muted); font-size: 13px; line-height: 1.6; }
.stage-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.stage-tags span { padding: 4px 7px; border: 1px solid var(--sxh-line); color: var(--sxh-muted); font-family: var(--sxh-mono); font-size: 9px; }
.stage-proof { display: flex; flex-direction: column; gap: 8px; padding-left: 20px; border-left: 1px solid var(--sxh-line); }
.stage-proof small { color: var(--agent-orange); font-family: var(--sxh-mono); font-size: 9px; letter-spacing: .1em; }
.stage-proof strong { font-size: 13px; line-height: 1.65; }
.stage-links { display: flex; flex-direction: column; gap: 9px; align-items: flex-start; }
.stage-links a { color: var(--agent-blue); font-size: 11px; border-bottom: 1px solid color-mix(in srgb, var(--agent-blue) 25%, transparent); }

.source-boundary { display: grid; grid-template-columns: 110px 1fr auto; gap: 44px; align-items: center; margin-bottom: 118px; padding: 58px 64px; color: #fff; background: var(--agent-navy); }
.boundary-mark { margin: 0; color: var(--agent-orange); font-family: var(--sxh-mono); font-size: 68px; font-weight: 700; }
.source-boundary .agent-overline { color: #90a8b9; }
.source-boundary h2 { color: #fff; }
.source-boundary div > p:last-child { max-width: 720px; margin: 17px 0 0; color: #b9c8d3; font-size: 13px; line-height: 1.8; }
.source-boundary > a { display: flex; gap: 22px; padding-bottom: 7px; border-bottom: 1px solid #71899b; color: #fff; font-size: 12px; white-space: nowrap; }
.source-boundary > a:hover { color: #fff; border-bottom-color: var(--agent-orange); }

.agent-hub a:focus-visible, .path-tabs button:focus-visible { outline: 3px solid color-mix(in srgb, var(--agent-orange) 55%, transparent); outline-offset: 4px; }

@media (max-width: 960px) {
  .agent-hero { grid-template-columns: 1fr; min-height: auto; }
  .loop-panel { max-width: 660px; }
  .path-selector { grid-template-columns: 1fr; }
  .path-summary { grid-column: 1; }
  .stage-heading { grid-template-columns: 1fr; gap: 24px; }
  .stage-row { grid-template-columns: 40px 1fr 120px; }
  .stage-proof { grid-column: 2; padding: 0; border: 0; }
  .stage-links { grid-column: 3; grid-row: 1 / span 2; }
  .source-library-heading { grid-template-columns: 1fr; gap: 12px; }
  .source-boundary { grid-template-columns: 72px 1fr; }
  .source-boundary > a { grid-column: 2; width: fit-content; }
}

@media (max-width: 640px) {
  .agent-hub {
    background:
      linear-gradient(90deg, color-mix(in srgb, var(--sxh-line) 34%, transparent) 1px, transparent 1px) center / 72px 100%,
      var(--sxh-white);
  }

  .mobile-study-dock {
    position: sticky;
    z-index: 20;
    top: var(--vp-nav-height);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 5px;
    width: 100%;
    padding: 8px max(16px, env(safe-area-inset-left));
    border-block: 1px solid color-mix(in srgb, var(--sxh-line) 86%, transparent);
    background: color-mix(in srgb, var(--sxh-white) 92%, transparent);
    box-shadow: 0 8px 24px color-mix(in srgb, var(--agent-navy) 7%, transparent);
    backdrop-filter: blur(14px);
  }

  .mobile-study-dock a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 0 6px;
    border: 1px solid var(--sxh-line);
    color: var(--agent-navy);
    background: var(--sxh-white);
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
  }

  .mobile-study-dock a:last-child {
    border-color: var(--agent-navy);
    color: #fff;
    background: var(--agent-navy);
  }

  #agent-overview,
  #route-picker,
  #learning-stages {
    scroll-margin-top: calc(var(--vp-nav-height) + 64px);
  }

  .agent-hero, .path-selector, .stage-section, .source-boundary { width: min(100% - 32px, 1240px); }
  .source-library { width: min(100% - 32px, 1240px); padding-bottom: 68px; }
  .source-library-grid { grid-template-columns: 1fr; gap: 12px; margin-top: 18px; }
  .source-library-card { min-height: 0; gap: 10px; padding: 18px; }
  .source-library-card strong { font-size: 19px; }
  .source-library-card > span:nth-of-type(2) { font-size: 13px; }
  .source-library-heading h2 { font-size: clamp(26px, 7.2vw, 32px); }
  .source-library-heading > p:last-child { font-size: 13px; }
  .agent-hero { padding-block: 48px 68px; gap: 44px; }
  .agent-overline { margin-bottom: 16px; font-size: 9px; line-height: 1.6; }
  .agent-hero h1 { font-size: clamp(34px, 9.6vw, 42px); letter-spacing: -.055em; line-height: 1.12; }
  .agent-lead { margin-top: 20px; font-size: 15px; line-height: 1.76; }
  .agent-actions, .agent-actions a { width: 100%; }
  .agent-actions { gap: 10px; margin-top: 28px; }
  .agent-actions a { min-height: 50px; }
  .agent-primary { justify-content: space-between !important; }
  .agent-census { justify-content: space-between; gap: 10px; margin-top: 20px; }
  .agent-census span { flex-direction: column; gap: 2px; }
  .agent-census strong { font-size: 18px; }
  .loop-panel { box-shadow: 9px 9px 0 color-mix(in srgb, var(--agent-navy) 7%, transparent); }
  .loop-track { padding: 14px 20px; }
  .loop-track li { min-height: 51px; }
  .loop-return { padding-inline: 20px; line-height: 1.6; }
  .path-selector, .stage-section { padding-block: 68px; }
  .path-intro h2, .stage-heading h2, .source-boundary h2 { font-size: clamp(27px, 7.8vw, 34px); line-height: 1.2; }
  .path-tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    border: 0;
  }
  .path-tabs button {
    min-width: 0;
    min-height: 82px;
    border: 1px solid var(--sxh-line);
    padding-inline: 6px;
  }
  .path-tabs button:last-child { border: 1px solid var(--sxh-line); }
  .path-summary { flex-direction: column; }
  .path-summary p { font-size: 14px; line-height: 1.72; }
  .path-summary span {
    padding-bottom: 5px;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1.7;
  }
  .stage-heading { gap: 18px; }
  .stage-heading > p { font-size: 14px; line-height: 1.75; }
  .stage-list { display: grid; gap: 14px; margin-top: 38px; border-top: 0; }
  .stage-row {
    grid-template-columns: 32px 1fr;
    gap: 14px;
    min-height: auto;
    padding: 22px 18px 20px;
    border: 1px solid var(--sxh-line);
    background: color-mix(in srgb, var(--sxh-white) 93%, var(--sxh-paper));
    box-shadow: 0 8px 22px color-mix(in srgb, var(--agent-navy) 4%, transparent);
  }
  .stage-number { padding-top: 5px; font-size: 10px; }
  .stage-main h3 { font-size: 20px; line-height: 1.25; }
  .stage-main p { font-size: 14px; line-height: 1.68; }
  .stage-tags { margin-top: 12px; }
  .stage-tags span { padding: 5px 7px; font-size: 9px; }
  .stage-proof, .stage-links { grid-column: 2; grid-row: auto; }
  .stage-proof {
    gap: 6px;
    margin-top: 2px;
    padding: 13px 14px;
    border-left: 3px solid var(--agent-orange);
    background: color-mix(in srgb, var(--agent-orange) 6%, transparent);
  }
  .stage-proof strong { font-size: 13px; line-height: 1.62; }
  .stage-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 7px;
    width: 100%;
    margin-top: 2px;
  }
  .stage-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 43px;
    padding: 5px 3px;
    border: 1px solid var(--sxh-line);
    font-size: 10px;
    line-height: 1.3;
    text-align: center;
  }
  .source-boundary { grid-template-columns: 1fr; gap: 22px; margin-bottom: 82px; padding: 36px 28px; }
  .boundary-mark { font-size: 46px; }
  .source-boundary div > p:last-child { font-size: 14px; line-height: 1.75; }
  .source-boundary > a { min-height: 44px; align-items: center; }
  .source-boundary > a { grid-column: 1; }
}
</style>

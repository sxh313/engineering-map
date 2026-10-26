<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

const storageKey = 'sxh-ai-study-progress-v1'
const stages = [
  'Agent 最小闭环',
  '上下文工程',
  'Memory 与 RAG',
  'Tool、MCP 与 Skills',
  'Agent Runtime',
  'Coding Agent 与交互',
  '评估与可观测性',
  '训练与行为优化',
  '持续进化',
  '多 Agent 与生产项目',
]

const completed = ref<boolean[]>(stages.map(() => false))
const ready = ref(false)
const completedCount = computed(() => completed.value.filter(Boolean).length)
const nextIndex = computed(() => completed.value.findIndex((done) => !done))
const nextStage = computed(() => nextIndex.value < 0 ? 0 : nextIndex.value)

function toggleStage(index: number) {
  completed.value[index] = !completed.value[index]
}

function continueLearning() {
  window.location.hash = `stage-${String(nextStage.value + 1).padStart(2, '0')}`
}

onMounted(() => {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
    if (Array.isArray(saved)) {
      completed.value = stages.map((_, index) => saved[index] === true)
    }
  } catch {
    completed.value = stages.map(() => false)
  }
  ready.value = true
})

watch(completed, (value) => {
  if (ready.value) localStorage.setItem(storageKey, JSON.stringify(value))
}, { deep: true })
</script>

<template>
  <section class="study-progress" aria-labelledby="study-progress-title">
    <div class="study-progress-head">
      <div>
        <p class="study-progress-kicker">YOUR STUDY PATH</p>
        <h2 id="study-progress-title">读一节，练一次，再回忆</h2>
        <p>勾选你已经完成的阶段。进度保存在当前浏览器里，不需要登录。</p>
      </div>
      <div class="study-progress-count"><strong>{{ completedCount }}</strong><span>/ 10 已完成</span></div>
    </div>

    <div class="study-progress-track" role="progressbar" :aria-valuenow="completedCount" aria-valuemin="0" aria-valuemax="10" :aria-label="`已完成 ${completedCount} 个学习阶段`">
      <span :style="{ width: `${completedCount * 10}%` }" />
    </div>

    <ol class="study-progress-list">
      <li v-for="(stage, index) in stages" :key="stage" :class="{ complete: completed[index] }">
        <button
          class="study-check"
          type="button"
          :aria-label="`${completed[index] ? '取消完成' : '标记完成'}：${stage}`"
          :aria-pressed="completed[index]"
          @click="toggleStage(index)"
        >{{ completed[index] ? '✓' : String(index + 1).padStart(2, '0') }}</button>
        <a :href="`#stage-${String(index + 1).padStart(2, '0')}`">{{ stage }}</a>
      </li>
    </ol>

    <div class="study-progress-footer">
      <span>每节建议：读讲解 → 看完整章节 → 做实践 → 合上页面口述自测</span>
      <button type="button" @click="continueLearning">{{ nextIndex < 0 ? '从头复习' : `继续第 ${String(nextStage + 1).padStart(2, '0')} 阶段` }} <i>→</i></button>
    </div>
  </section>
</template>

<style scoped>
.study-progress {
  --study-accent: #ef7b45;
  margin: 30px 0 48px;
  padding: 26px 28px 22px;
  border: 1px solid var(--sxh-line);
  background: color-mix(in srgb, var(--sxh-paper) 62%, var(--sxh-white));
}

.study-progress-head { display: flex; justify-content: space-between; gap: 24px; align-items: flex-start; }
.study-progress-kicker { margin: 0 0 8px; color: var(--study-accent); font-family: var(--sxh-mono); font-size: 9px; font-weight: 700; letter-spacing: .14em; }
.study-progress-head h2 { margin: 0; border: 0; font-size: clamp(21px, 3vw, 28px); letter-spacing: -.035em; }
.study-progress-head p:last-child { margin: 8px 0 0; color: var(--sxh-muted); font-size: 12px; }
.study-progress-count { display: flex; align-items: baseline; gap: 5px; flex: 0 0 auto; color: var(--sxh-muted); font-size: 11px; }
.study-progress-count strong { color: var(--sxh-navy); font-family: var(--sxh-mono); font-size: 28px; font-weight: 500; }
.study-progress-track { height: 5px; margin-top: 20px; overflow: hidden; background: var(--sxh-line); }
.study-progress-track span { display: block; height: 100%; background: linear-gradient(90deg, var(--sxh-blue), var(--study-accent)); transition: width .25s ease; }
.study-progress-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 22px; margin: 14px 0 0 !important; padding: 0 !important; list-style: none !important; }
.study-progress-list li { display: flex; min-width: 0; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--sxh-line); }
.study-check { display: grid; width: 26px; height: 26px; flex: 0 0 26px; place-items: center; padding: 0; border: 1px solid var(--sxh-line); border-radius: 50%; color: var(--sxh-muted); background: var(--sxh-white); font-family: var(--sxh-mono); font-size: 8px; cursor: pointer; }
.study-progress-list li.complete .study-check { border-color: var(--sxh-blue); color: #fff; background: var(--sxh-blue); font-size: 12px; }
.study-progress-list a { overflow: hidden; color: var(--sxh-ink); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.study-progress-list li.complete a { color: var(--sxh-muted); text-decoration: line-through; text-decoration-color: color-mix(in srgb, var(--sxh-muted) 45%, transparent); }
.study-progress-footer { display: flex; justify-content: space-between; gap: 16px; align-items: center; padding-top: 18px; color: var(--sxh-muted); font-size: 11px; }
.study-progress-footer button { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 18px; min-height: 38px; padding: 0 13px; border: 0; color: #fff; background: #17324d; font-size: 11px; font-weight: 700; cursor: pointer; }
.study-progress-footer button:hover { background: #285878; }
.study-progress-footer i { color: var(--study-accent); font-size: 16px; font-style: normal; }
.study-progress button:focus-visible, .study-progress a:focus-visible { outline: 3px solid color-mix(in srgb, var(--study-accent) 65%, transparent); outline-offset: 3px; }

@media (max-width: 640px) {
  .study-progress { margin: 22px 0 34px; padding: 19px 16px 16px; }
  .study-progress-head { gap: 12px; }
  .study-progress-head p:last-child { max-width: 250px; line-height: 1.6; }
  .study-progress-count { flex-direction: column; gap: 0; align-items: flex-end; }
  .study-progress-count strong { font-size: 24px; }
  .study-progress-list { grid-template-columns: 1fr; }
  .study-progress-footer { align-items: flex-start; flex-direction: column; line-height: 1.6; }
  .study-progress-footer button { width: 100%; justify-content: space-between; }
}

@media (prefers-reduced-motion: reduce) {
  .study-progress-track span { transition: none; }
}
</style>

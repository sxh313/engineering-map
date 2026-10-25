<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import questions from '../data/interview-questions.json'

type ReviewState = 'weak' | 'fuzzy' | 'mastered'
type Question = (typeof questions)[number]

const STORAGE_KEY = 'sxh-engineering-map:interview-progress:v1'
const courses = [
  { value: 'all', label: '全部题库' },
  { value: 'gin', label: 'Gin' },
  { value: 'gorm', label: 'GORM' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'redis', label: 'Redis' },
  { value: 'rpc', label: 'gRPC' },
]

const selectedCourse = ref('all')
const weakOnly = ref(false)
const answerVisible = ref(false)
const currentId = ref(questions[0]?.id ?? '')
const progress = ref<Record<string, ReviewState>>({})
const ready = ref(false)

const pool = computed(() => questions.filter((question) => {
  const inCourse = selectedCourse.value === 'all' || question.course === selectedCourse.value
  const isWeak = !weakOnly.value || ['weak', 'fuzzy'].includes(progress.value[question.id] ?? '')
  return inCourse && isWeak
}))

const current = computed<Question | undefined>(() => (
  pool.value.find((question) => question.id === currentId.value) ?? pool.value[0]
))

const scopedQuestions = computed(() => questions.filter((question) => (
  selectedCourse.value === 'all' || question.course === selectedCourse.value
)))

const stats = computed(() => {
  const ids = scopedQuestions.value.map((question) => question.id)
  return {
    total: ids.length,
    reviewed: ids.filter((id) => progress.value[id]).length,
    mastered: ids.filter((id) => progress.value[id] === 'mastered').length,
    weak: ids.filter((id) => ['weak', 'fuzzy'].includes(progress.value[id] ?? '')).length,
  }
})

function nextQuestion() {
  if (!pool.value.length) return
  const alternatives = pool.value.filter((question) => question.id !== current.value?.id)
  const source = alternatives.length ? alternatives : pool.value
  currentId.value = source[Math.floor(Math.random() * source.length)].id
  answerVisible.value = false
}

function rate(state: ReviewState) {
  if (!current.value) return
  progress.value = { ...progress.value, [current.value.id]: state }
  nextQuestion()
}

function resetProgress() {
  if (!window.confirm('确定清除全部复习记录吗？此操作无法撤销。')) return
  progress.value = {}
  localStorage.removeItem(STORAGE_KEY)
  weakOnly.value = false
  nextQuestion()
}

onMounted(() => {
  try {
    progress.value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    progress.value = {}
  }
  ready.value = true
  nextQuestion()
})

watch(progress, (value) => {
  if (ready.value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}, { deep: true })

watch([selectedCourse, weakOnly], () => {
  answerVisible.value = false
  if (!pool.value.some((question) => question.id === currentId.value)) {
    currentId.value = pool.value[0]?.id ?? ''
  }
})
</script>

<template>
  <section class="review-trainer" aria-labelledby="review-title">
    <header class="review-head">
      <div>
        <p class="review-kicker">RECALL / 115 QUESTIONS</p>
        <h2 id="review-title">先回答，再看答案</h2>
        <p>不需要 AI 或 API Key。复习记录只保存在当前浏览器中。</p>
      </div>
      <button class="reset-button" type="button" @click="resetProgress">清除进度</button>
    </header>

    <div class="review-stats" aria-label="复习进度">
      <div><strong>{{ stats.reviewed }}</strong><span>已复习 / {{ stats.total }}</span></div>
      <div><strong>{{ stats.mastered }}</strong><span>已掌握</span></div>
      <div><strong>{{ stats.weak }}</strong><span>待加强</span></div>
    </div>

    <div class="review-controls">
      <label>
        <span>题库</span>
        <select v-model="selectedCourse">
          <option v-for="course in courses" :key="course.value" :value="course.value">
            {{ course.label }}
          </option>
        </select>
      </label>
      <label class="weak-toggle">
        <input v-model="weakOnly" type="checkbox">
        <span>只看薄弱题</span>
      </label>
      <button class="next-button" type="button" :disabled="!pool.length" @click="nextQuestion">
        随机换一题 ↗
      </button>
    </div>

    <article v-if="current" class="question-card">
      <div class="question-meta">
        <span>{{ current.courseLabel }}</span>
        <span>{{ current.section }}</span>
        <span>{{ pool.findIndex((item) => item.id === current?.id) + 1 }} / {{ pool.length }}</span>
      </div>

      <h3>{{ current.question }}</h3>

      <button
        v-if="!answerVisible"
        class="reveal-button"
        type="button"
        @click="answerVisible = true"
      >
        我已经想过了，显示答案
      </button>

      <div v-else class="answer-panel">
        <p class="answer-label">参考答案</p>
        <p>{{ current.answer }}</p>
        <a :href="current.source">阅读原文 →</a>

        <div class="rating" aria-label="本题掌握程度">
          <p>这道题现在掌握得怎么样？</p>
          <div>
            <button type="button" class="rate-weak" @click="rate('weak')">没掌握</button>
            <button type="button" class="rate-fuzzy" @click="rate('fuzzy')">有点模糊</button>
            <button type="button" class="rate-mastered" @click="rate('mastered')">已掌握</button>
          </div>
        </div>
      </div>
    </article>

    <div v-else class="empty-state">
      <strong>这个范围内暂时没有薄弱题。</strong>
      <span>切换题库，或关闭“只看薄弱题”继续复习。</span>
    </div>
  </section>
</template>

<style scoped>
.review-trainer {
  --review-blue: #17324d;
  --review-orange: #ef7b45;
  margin: 36px 0 58px;
  border: 1px solid var(--sxh-line);
  background: var(--sxh-white);
  box-shadow: 14px 14px 0 color-mix(in srgb, var(--sxh-navy) 7%, transparent);
}

.review-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 28px;
  padding: 32px;
  border-top: 5px solid var(--review-orange);
  border-bottom: 1px solid var(--sxh-line);
}

.review-kicker,
.answer-label {
  margin: 0 0 10px;
  color: var(--review-orange);
  font-family: var(--sxh-mono);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .14em;
}

.review-head h2 {
  margin: 0;
  border: 0;
  color: var(--sxh-ink);
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -.045em;
}

.review-head p:last-child {
  margin: 12px 0 0;
  color: var(--sxh-muted);
  font-size: 14px;
}

button,
select {
  font: inherit;
}

button {
  cursor: pointer;
}

button:focus-visible,
select:focus-visible,
input:focus-visible + span {
  outline: 3px solid color-mix(in srgb, var(--review-orange) 45%, transparent);
  outline-offset: 3px;
}

.reset-button {
  padding: 8px 0;
  border: 0;
  border-bottom: 1px solid var(--sxh-line);
  color: var(--sxh-muted);
  background: transparent;
  font-size: 12px;
  white-space: nowrap;
}

.review-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-bottom: 1px solid var(--sxh-line);
}

.review-stats > div {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 18px 24px;
  border-right: 1px solid var(--sxh-line);
}

.review-stats > div:last-child {
  border-right: 0;
}

.review-stats strong {
  color: var(--sxh-navy);
  font-family: var(--sxh-mono);
  font-size: 28px;
}

.review-stats span {
  color: var(--sxh-muted);
  font-size: 11px;
}

.review-controls {
  display: grid;
  grid-template-columns: minmax(170px, 1fr) auto auto;
  gap: 14px;
  align-items: end;
  padding: 22px 24px;
  background: var(--sxh-paper);
}

.review-controls label:first-child {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.review-controls label:first-child > span {
  color: var(--sxh-muted);
  font-size: 11px;
}

select {
  height: 42px;
  padding: 0 38px 0 12px;
  border: 1px solid var(--sxh-line);
  border-radius: 0;
  color: var(--sxh-ink);
  background: var(--sxh-white);
}

.weak-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding-inline: 14px;
  border: 1px solid var(--sxh-line);
  color: var(--sxh-ink);
  background: var(--sxh-white);
  font-size: 13px;
}

.weak-toggle input {
  accent-color: var(--review-orange);
}

.next-button,
.reveal-button {
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid var(--review-blue);
  color: #fff;
  background: var(--review-blue);
  font-weight: 700;
}

.next-button:disabled {
  cursor: not-allowed;
  opacity: .45;
}

.question-card {
  padding: clamp(28px, 5vw, 54px);
}

.question-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.question-meta span {
  padding: 5px 8px;
  border: 1px solid var(--sxh-line);
  color: var(--sxh-muted);
  font-family: var(--sxh-mono);
  font-size: 10px;
}

.question-card h3 {
  max-width: 760px;
  margin: 34px 0 38px;
  color: var(--sxh-ink);
  font-size: clamp(24px, 3.6vw, 38px);
  letter-spacing: -.035em;
  line-height: 1.4;
}

.reveal-button {
  min-height: 50px;
}

.answer-panel {
  padding: 26px 28px;
  border-left: 4px solid var(--review-orange);
  background: var(--sxh-paper);
}

.answer-panel > p:not(.answer-label) {
  margin: 0;
  color: var(--sxh-ink);
  font-size: 16px;
  line-height: 1.85;
}

.answer-panel > a {
  display: inline-block;
  margin-top: 14px;
  color: var(--sxh-blue);
  font-size: 13px;
}

.rating {
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px solid var(--sxh-line);
}

.rating p {
  margin: 0 0 12px;
  color: var(--sxh-muted);
  font-size: 12px;
}

.rating > div {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.rating button {
  min-height: 40px;
  padding: 0 15px;
  border: 1px solid var(--sxh-line);
  color: var(--sxh-ink);
  background: var(--sxh-white);
  font-weight: 650;
}

.rating .rate-weak:hover { border-color: #c94f4f; color: #c94f4f; }
.rating .rate-fuzzy:hover { border-color: var(--review-orange); color: var(--review-orange); }
.rating .rate-mastered:hover { border-color: #27855d; color: #27855d; }

.empty-state {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 56px 32px;
  text-align: center;
}

.empty-state span {
  color: var(--sxh-muted);
  font-size: 13px;
}

@media (max-width: 640px) {
  .review-trainer { box-shadow: 7px 7px 0 color-mix(in srgb, var(--sxh-navy) 7%, transparent); }
  .review-head { padding: 24px 20px; }
  .review-head { flex-direction: column; gap: 12px; }
  .review-stats > div { flex-direction: column; gap: 2px; padding: 14px 10px; }
  .review-stats strong { font-size: 23px; }
  .review-controls { grid-template-columns: 1fr; padding: 18px; }
  .next-button, .weak-toggle { width: 100%; }
  .question-card { padding: 30px 20px; }
  .question-card h3 { margin-block: 26px 30px; }
  .reveal-button { width: 100%; }
  .answer-panel { padding: 22px 18px; }
  .rating > div { display: grid; grid-template-columns: 1fr; }
}
</style>

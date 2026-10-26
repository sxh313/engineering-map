import DefaultTheme from 'vitepress/theme'
import KnowledgeHome from './KnowledgeHome.vue'
import ReviewTrainer from './ReviewTrainer.vue'
import AgentLearningHub from './AgentLearningHub.vue'
import StudyProgress from './StudyProgress.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('KnowledgeHome', KnowledgeHome)
    app.component('ReviewTrainer', ReviewTrainer)
    app.component('AgentLearningHub', AgentLearningHub)
    app.component('StudyProgress', StudyProgress)
  },
}

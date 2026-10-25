import DefaultTheme from 'vitepress/theme'
import KnowledgeHome from './KnowledgeHome.vue'
import ReviewTrainer from './ReviewTrainer.vue'
import './styles.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('KnowledgeHome', KnowledgeHome)
    app.component('ReviewTrainer', ReviewTrainer)
  },
}

import { createApp } from 'vue'
import App from './App.vue'
import './assets/scss/main.scss'
import router from './routes/index.js'

createApp(App).use(router).mount('#app')

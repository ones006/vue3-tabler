import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

declare global {
  interface Window {
    bootstrap: any
  }
}

// Import Tabler
import '@tabler/core/dist/css/tabler.min.css'
import '@tabler/core/dist/css/tabler-themes.min.css'
// We import the JS and expose bootstrap logic through Tabler's own exports
import { bootstrap } from '@tabler/core'

window.bootstrap = bootstrap

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')

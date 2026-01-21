import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import installElementPlus from './plugins/element'
import './styles/index.scss'
import installIcons from './icons'
import i18n, { setupI18n } from './i18n'
import './permission'
const app = createApp(App)
const pinia = createPinia()
installElementPlus(app)
installIcons(app)
app.use(pinia)
app.use(router)
app.use(i18n)
setupI18n()
app.mount('#app')

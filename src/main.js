import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import installElementPlus from './plugins/element'
import './styles/index.scss'
import installIcons from './icons'
import i18n from './i18n'
import './permission'
const app = createApp(App)
const pinia = createPinia()
installElementPlus(app)
installIcons(app)
app.use(pinia).use(router).use(i18n).mount('#app')

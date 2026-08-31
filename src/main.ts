import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
// if you just want to import css
import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('SvgIcon', Icon)
app.use(createPinia())
app.use(router)

app.mount('#app')

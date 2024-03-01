import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap'
import './assets/scss/style.scss';

import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

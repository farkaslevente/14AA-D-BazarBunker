import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

import 'bootstrap'
import './assets/scss/style.scss';

import 'primevue/resources/themes/aura-light-green/theme.css';

//primevue imports
import InputText from 'primevue/inputtext';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.component['InputText', InputText];

app.mount('#app')

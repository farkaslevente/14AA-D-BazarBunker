import { createRouter, createWebHistory } from 'vue-router' 
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView }
    { path: '/bejelentkezes', component: LoginView }
    { path: '/registration', component: RegistrationView }
  ]
})

export default router

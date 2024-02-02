import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegistrationView from '../views/user/RegistrationView.vue'
import LoginView from '../views/user/LoginView.vue'
import AdsView from '../views/ad/AdsView.vue'
import NewAdView from '../views/ad/NewAdView.vue'
import { useUserStore } from '../stores/userstore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView},
    { path: '/regisztracio', component: RegistrationView},
    { path: '/bejelentkezes', component: LoginView},
    { path: '/hirdetesek', component: AdsView},
    { path: '/ujhirdetes', component: NewAdView},
    
   
  ]
})

router.beforeEach((to,from,next) =>{
  const {status} = storeToRefs(useUserStore());
  const publicPages = ['/','/bejelentkezes','/regisztracio','/hirdetesek'];
  const autRequired = !publicPages.includes(to.path);
  if (autRequired && !status.value.loggedIn){
    return next('/bejelentkezes')
  }
  next(); // tovább a to-ra
});

export default router

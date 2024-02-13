<script setup>
import AppHeader from './components/AppHeader.vue';
import AppNav from './components/AppNav.vue'
import AppFooter from './components/AppFooter.vue';

import { useUserStore } from './stores/userstore';

let { user,status } = useUserStore();

if (sessionStorage.getItem('user') != null ){
   const u = JSON.parse(sessionStorage.getItem('user'));
   user.name = u.name;
   user.token = u.token;
   user.id = u.id;
   user.role = u.role;
   if (user.token) {
      status.loggedIn = true;
   }
}
</script>

<template>
   <AppHeader/>
   <AppNav/>   
   <RouterView />
   <AppFooter/>
</template>

<style scoped>

</style>

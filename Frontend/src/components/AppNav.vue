<template>
  <nav class="navbar navbar-expand-lg bg-success-subtle">
    <div class="container">
      <span class="navbar-brand">BAZARBUNKER</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <div v-for="menu in menuItems">
            <li class="nav-item" v-if="menu.isLoggedIn">
              <router-link class="nav-link" :to="menu.to">{{ menu.title }}</router-link>
            </li>
          </div>
          <li class="nav-item" v-if="status.loggedIn">
            <a class="nav-link" href="#" @click="onLogout">Kijelentkezés</a>
          </li>

        </ul>
        <div v-if="status.loggedIn">
          {{ user.name }}
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/userstore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const { status, user } = storeToRefs(useUserStore());
const { logout } = useUserStore();
const router = useRouter();

const menuItems = computed(() => {
  return [
    {
      title: 'Nyitó oldal',
      to: '/',
      isLoggedIn: true
    },
    {
      title: 'Blogok',
      to: '/blogok',
      isLoggedIn: true
    },
    {
      title: 'Új blog',
      to: '/ujblog',
      isLoggedIn: status.value.loggedIn
    },
    {
      title: 'Bejelentkezés',
      to: '/bejelentkezes',
      isLoggedIn: !status.value.loggedIn
    },
    {
      title: 'Regisztráció',
      to: '/regisztracio',
      isLoggedIn: !status.value.loggedIn
    },
  ]
});

function onLogout(){
  logout().then(()=>{ router.push('/')  })
}


</script>

<style lang="scss" scoped></style>
<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="display-4 text-center my-5">Bejelentkezés</h1>
      </div>
      <div class="col-12 col-md-4 mx-auto">
        <form @submit.prevent="onLogin">
          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control" 
              id="email" 
              placeholder="E-mail" 
              v-model="loginForm.email">
            <label for="name">Név</label>
          </div>
          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              id="password" 
              placeholder="Jelszó" 
              v-model="loginForm.password">
            <label for="password">Jelszó</label>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary w-100 py-3 mt-3">Bejelentkezés</button>
          </div>
      </form>

      <div class="alert alert-danger" v-if="status.message">
        {{ status.message }}
      </div>

    </div>
  </div>
</div></template>

<script setup>
import { ref } from 'vue';
import {storeToRefs} from 'pinia'
import {useUserStore} from '../../stores/userstore';
import { useRouter } from 'vue-router'

const { login } = useUserStore();
const { status } = storeToRefs(useUserStore());

const router = useRouter();


const loginForm = ref({});

function onLogin(){
  login(loginForm.value)
    .then(()=>{ router.push('/'); })
    ;
}
</script>

<style lang="scss" scoped></style>
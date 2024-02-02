<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="display-4 text-center my-5">Regisztráció</h1>
      </div>
    </div>
    <div class="row" v-if="!regSuccess">
      <div class="col-12 col-md-4 mx-auto">
        <form @submit.prevent="onRegiter">
          <div class="form-floating mb-3">
            <input 
              type="text" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.name}"
              id="name" 
              placeholder="Név" 
              v-model="regForm.name">
            <label for="name">Név</label>
            <div v-if="errorMessages.name">
              <span v-for="m in errorMessages.name" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="email" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.email}"
              id="email" 
              placeholder="E-mail"
              v-model="regForm.email">
            <label for="email">E-mail</label>
            <div v-if="errorMessages.email">
              <span v-for="m in errorMessages.email" class="error-message">{{ m }} <br/></span>
            </div>
          </div>
          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.password}"
              id="password" 
              placeholder="Jelszó"
              v-model="regForm.password">
            <label for="password">Jelszó</label>
            <div v-if="errorMessages.password">
              <span v-for="m in errorMessages.password" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="form-floating mb-3">
            <input 
              type="password" 
              class="form-control" 
              :class="{'is-invalid' : errorMessages.confirm_password}"
              id="password_confirmation" 
              placeholder="Jelszó újra"
              v-model="regForm.confirm_password">
            <label for="password_confirmation">Jelszó újra</label>
            <div v-if="errorMessages.confirm_password">
              <span v-for="m in errorMessages.confirm_password" class="error-message">{{ m }} <br/></span>
            </div>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary w-100 py-3 mt-3">Regisztráció</button>
          </div>
        </form>
      </div>
    </div>

    <div v-else class="alert alert-success col-12 col-md-6 mx-auto">
      A regisztráció sikerült, most már bejelentkezhet.
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import userservice from '../../services/userservice';


const regForm = ref({
  name : '',
  email: '',
  password: '',
  confirm_password:'',
  role: 0
});

const regSuccess = ref(false);
const errorMessages = ref({});

function onRegiter(){
  // console.log(regForm.value);
  userservice.registerUser(regForm.value)
    .then(()=>{
      regSuccess.value = true;
    })
    .catch(err => {
      // console.log(err.data.data);
      errorMessages.value = err.data.data;
    })
}
</script>

<style lang="scss" scoped></style>
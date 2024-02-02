<template>
    <div class="container">
        <h1 class="display-5 mt-5">Hirdetések</h1>
        <div class="row">
            <div class="col-12" v-for="ad in ads">
                <!-- <h3>{{ blog.title }}</h3>
                <p><strong>Dátum:</strong> {{ blog.updated_at }}, <strong>Szerző: </strong>{{ blog.user_name  }} </p>
                <p>{{ blog.description }}</p> -->
                <div v-if="ad.user_id == user.id || ad.role == 1">
                    <AdminBlog :ad="ad"/>
                </div>
                <div v-else>
                    <ShowBlog :ad="ad"/>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import adservices from '../../services/adservices';
import { useUserStore } from '../../stores/userstore';
import {storeToRefs} from 'pinia';

const { user } = storeToRefs( useUserStore() );

const ads = ref();

adservices.getAllAd()
    .then(resp => {
        // console.log(resp.data);
        ads.value = resp.data;
    })
    

</script>

<style lang="scss" scoped>

</style>
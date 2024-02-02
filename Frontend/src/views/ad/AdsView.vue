<template>
    <div class="container">
        <h1 class="display-5 mt-5">Hirdetések</h1>
        <div class="row">
            <div class="col-12" v-for="blog in blogs">
                <!-- <h3>{{ blog.title }}</h3>
                <p><strong>Dátum:</strong> {{ blog.updated_at }}, <strong>Szerző: </strong>{{ blog.user_name  }} </p>
                <p>{{ blog.description }}</p> -->
                <div v-if="blog.user_id == user.id || user.role == 1">
                    <AdminBlog :blog="blog"/>
                </div>
                <div v-else>
                    <ShowBlog :blog="blog"/>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import blogservices from '../../services/adservices';
import ShowAd from '../../components/blog/ShowAd.vue';
import AdminAd from '../../components/blog/AdminAd.vue';
import { useUserStore } from '../../stores/userstore';
import {storeToRefs} from 'pinia';

const { user } = storeToRefs( useUserStore() );

const blogs = ref();

adservices.getAllBlog()
    .then(resp => {
        // console.log(resp.data);
        blogs.value = resp.data;
    })
    

</script>

<style lang="scss" scoped>

</style>
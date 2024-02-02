<template>
    <div class="container">
        <h1 class="display-5 mt-5">Új hirdetés</h1>
        <div class="row">
            <div class="col-12 col-md-5">
                <div class="mb-3">
                    <label for="" class="form-label">Cím:</label>
                    <input 
                        id="title"
                        type="text" 
                        class="form-control" 
                        :class="{'is-invalid' : error.title}"
                        v-model="newAd.title">
                    <div class="invalid-feedback" id="titleFeedback">
                        Kötelező kitöleni!
                    </div>    
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Szöveg:</label>
                    <textarea 
                        id="description"
                        class="form-control" 
                        :class="{'is-invalid' : error.description}"
                        rows="6" 
                        v-model="newAd.description"></textarea>
                    <div class="invalid-feedback" id="descriptionFeedback">
                        Kötelező kitöleni!
                    </div>  
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="onSave">Elküld</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import adservice from '../../services/adservices.js';
import { useUserStore } from '../../stores/userstore';
import { useRouter } from 'vue-router';

const { user } = useUserStore();
const router = useRouter();

const newAd = ref({
    title: '',
    description: ''
});

const error = ref({
    title: false,
    description: false
});

function onSave() {
    // console.log(newBlog.value);
    if (formValidate()) return;
    // mentés
    adservice.insertAd(newAd.value,user.token)
        .then(()=>{ router.push('/hirdetesek') });

}

function formValidate(){
    error.value.title = false;
    error.value.description = false;

    if (!newAd.value.title){
        error.value.title = true;
    }
    if (!newAd.value.description){
        error.value.description = true;
    }

    return error.value.title || error.value.description;
}
</script>

<style lang="scss" scoped></style>
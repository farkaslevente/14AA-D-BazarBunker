<template>
    <div class="d-flex justify-content-between">
        <div class="w-75">
            <div v-if="!canEdit">
                <h3>{{ blog.title }}</h3>
            </div>
            <div class="w-25" v-else>
                <label>Cím:</label>
                <input type="text" class="form-control" v-model="blog.title">
            </div>

            <p><strong>Dátum:</strong> {{ blog.updated_at }}, <strong>Szerző: </strong>{{ blog.user_name }} </p>
            
            <div v-if="!canEdit">
                <p>{{ blog.description }}</p>
            </div>
            <div class="w-50" v-else>
                <textarea  rows="6" class="form-control" v-model="blog.description" ></textarea>
            </div>

        </div>
        <div v-if="!canEdit">
            <button class="btn btn-primary me-2" @click="onEdit"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
        </div>
        <div v-else>
            <button class="btn btn-primary me-2" >Mentés</button>
            <button class="btn btn-primary" @click="onCancel">Mégse</button>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const props = defineProps(['blog']);

const canEdit = ref(false);

function onEdit(){
    canEdit.value = true;
}
function onCancel(){
    canEdit.value = false;
}
</script>

<style lang="scss" scoped></style>
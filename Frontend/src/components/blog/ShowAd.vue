<template>
    <h3>{{ blog.title }}</h3>
    <p><strong>Dátum:</strong> {{ blog.updated_at }}, <strong>Szerző: </strong>{{ blog.user_name }} </p>
    <p>{{ blog.description }}</p>
</template>

<script setup>
const props = defineProps(['blog']);
</script>

<style lang="scss" scoped></style>
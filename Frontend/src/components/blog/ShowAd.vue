<template>
    <h3>{{ ad.title }}</h3>
    <p><strong>Dátum:</strong> {{ ad.updated_at }}, <strong>Szerző: </strong>{{ blog.user_name }} </p>
    <p>{{ ad.description }}</p>
</template>

<script setup>
const props = defineProps(['ad']);
</script>

<style lang="scss" scoped></style>
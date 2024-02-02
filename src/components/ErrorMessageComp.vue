<template>
    <p>{{ message }}</p>
</template>

<script setup>

const props = defineProps({
    message: String
})
</script>


<style scoped>
p {
    color: red;
}
</style>
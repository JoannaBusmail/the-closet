<template>
    <Spinner v-if="loadingPosts" />

    <div
        v-else
        class="card-container"
    >
        <img
            class="image"
            :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
            alt="random image"
        />
        <div class="image-info">
            <p>{{ post.color }}</p>
            <p>{{ post.style }}</p>
        </div>
    </div>
</template>
<script setup>
import Spinner from './Spinner.vue'

const { VITE_BASE_PHOTO_URL } = import.meta.env

const props = defineProps({
    post: Object,
    loadingPosts: Boolean
})


</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 240px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 20px 20px;
}

.image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #ccc;
}

.image-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 15px 15px;
}
</style>
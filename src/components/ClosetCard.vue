<template>
    <Spinner v-if="loadingPosts" />

    <div
        v-else
        class="card-container"
    > <Button
            class="close-btn"
            btnName="X"
            btnType="close"
            @btnClick="$emit('btnClick', post)"
        ></Button>
        <div class="images-container">
            <img
                class="image"
                :src="`${VITE_BASE_PHOTO_URL}${post.top_url}`"
                alt="random image"
            />
            <img
                class="image"
                :src="`${VITE_BASE_PHOTO_URL}${post.bottom_url}`"
                alt="random image"
            />
            <img
                class="image"
                :src="`${VITE_BASE_PHOTO_URL}${post.shoes_url}`"
                alt="random image"
            />
        </div>
        <div class="image-info">
            <p>{{ post.outfit_name }}</p>

        </div>
    </div>
</template>
<script setup>
import Spinner from './Spinner.vue'
import Button from './Button.vue'

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
    width: 640px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 20px 20px;
    position: relative;
    border: 2px solid rgb(248, 57, 120);
}

.images-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
}

.image {
    width: 200px;
    height: 250px;
    object-fit: cover;
    margin: 8px 0px;
}

.image-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 15px 15px;
    border-top: 2px solid rgb(248, 57, 120);
    ;
}

p {
    font-size: 16px;
    font-weight: bold;
    color: rgb(248, 57, 120);

}

.close-btn {
    position: absolute;
    top: 10px;
    right: 5px;
}
</style>
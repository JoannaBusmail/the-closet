<template>
    <Spinner v-if="loadingPosts" />

    <div
        v-else
        class="card-container"
    >

        <div class="image-box-container">


            <img
                v-for="(image, index) in [post.top_url, post.bottom_url, post.shoes_url] "
                :key="index"
                class="image"
                :src="`${VITE_BASE_PHOTO_URL}${image}`"
                alt="random image"
            />
        </div>

        <div class="image-info">
            <div class="user-info">
                <Avatar
                    size="small"
                    :src="post.profile_url"
                ></Avatar>
                <p>{{ post.username }}</p>
            </div>
            <p class="outfit-name">{{ post.outfit_name }}</p>

        </div>
    </div>

</template>

<script setup>
import Spinner from './Spinner.vue'
import Avatar from './Avatar.vue'
import { ref } from 'vue'




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
    width: 500px;
    border-radius: 10px;
    margin: 20px auto;

    position: relative;
    border: 2px solid rgb(248, 57, 120);
}

.image-box-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;

}

.image {
    width: 150px;
    height: 200px;
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



.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

}

.outfit-name {
    padding-top: 15px;
}

@media screen and (max-width: 820px) {
    .card-container {
        width: 500px;
    }

    .images-container {
        gap: 5px;
    }

    .image {
        width: 150px;
        height: 200px;
        object-fit: cover;
        margin: 3px 0px;
    }
}


@media screen and (max-width: 420px) {

    .card-container {
        width: 300px;
    }

    .images-container {
        gap: 5px;
    }

    .image {
        width: 90px;
        height: 140px;
        object-fit: cover;
        margin: 2px 0px;
    }

}
</style>
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

        <div class="image-box-container">
            <div
                class="image-box"
                v-for="(item, index) in postImagesAndTags"
                :key="index"
            >
                <Tag
                    v-if="item.tag"
                    class="closet-card-tag"
                    :tag="item.tag"
                ></Tag>
                <img
                    class="image"
                    :src="`${VITE_BASE_PHOTO_URL}${item.image}`"
                    alt="random image"
                />
            </div>
        </div>
        <div class="image-info">
            <p>{{ post.outfit_name }}</p>

        </div>
    </div>
</template>

<script setup>
import Spinner from './Spinner.vue'
import Button from './Button.vue'
import Tag from './Tag.vue'

const { VITE_BASE_PHOTO_URL } = import.meta.env

const props = defineProps({
    post: Object,
    loadingPosts: Boolean
})

const postImagesAndTags = [
    { image: props.post.top_url, tag: props.post.top_seen_at },
    { image: props.post.bottom_url, tag: props.post.bottom_seen_at },
    { image: props.post.shoes_url, tag: props.post.shoes_seen_at }
]


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

.image-box-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 10px;
}

.image-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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


.closet-card-tag {
    position: absolute;
    bottom: 75px;
    left: auto;
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
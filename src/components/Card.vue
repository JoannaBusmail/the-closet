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
        <Tag
            class="card-tag"
            v-if="post.seen_at"
            :tag="post.seen_at"
        ></Tag>

        <img
            class="image"
            :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
            alt="random image"
        />

        <div class="image-info">
            <p>{{ post.color }}</p>
            <p>{{ post.style }}</p>
        </div>

        <SwitchButton
            class="card-switchBtn"
            :isSwitchActive="post.sale"
            :switchBtnText="post.sale ? 'For sale' : 'Sale?'"
            @toggleSwitch="toggleSwitch"
        ></SwitchButton>

    </div>
</template>

<script setup>
import Spinner from './Spinner.vue'
import Button from './Button.vue'
import Tag from './Tag.vue'
import SwitchButton from './SwitchButton.vue'


const { VITE_BASE_PHOTO_URL } = import.meta.env

const props = defineProps({
    post: Object,
    loadingPosts: Boolean
})

const emit = defineEmits([ 'toggleSwitch' ])

const toggleSwitch = (post) => { emit('toggleSwitch', post) }


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
    position: relative;
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

.close-btn {
    position: absolute;
    top: 10px;
    right: 5px;
}

.card-tag {
    position: absolute;
    top: 15px;
    left: 15px;
}

.card-switchBtn {
    position: absolute;
    bottom: 65px;


}
</style>
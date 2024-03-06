<template>
    <ErrorMessageComp
        class="error-message"
        v-if="errorMessage"
        :message="errorMessage"
    />
    <div
        v-else
        class="carousel-container"
    >


        <div
            class="nav-button"
            @click="moveCarousel(-1)"
        >&#8249;</div>
        <div
            class="carousel"
            ref="carousel"
        >
            <div
                class="carousel-inner"
                :class="'carousel-id-' + carouselId"
            >
                <div
                    class="carousel-item"
                    :class="{ selected: post.id === selectedIndex }"
                    v-for="(  post ) in   posts  "
                    :key="post.id"
                    @click="selectImage(post.id)"
                >
                    <img
                        class="carousel-image"
                        :src="`${VITE_BASE_PHOTO_URL}${post.url}`"
                        :alt="'Image ' + (post.id + 1)"
                    />
                </div>

            </div>


        </div>

        <div
            class="nav-button"
            @click="moveCarousel(1)"
        >&#8250;</div>

    </div>
</template>
  
<script setup>
import { ref } from 'vue'
import ErrorMessageComp from './ErrorMessageComp.vue'

const { VITE_BASE_PHOTO_URL } = import.meta.env

const props = defineProps({
    posts: Array,
    errorMessage: String,
    carouselId: String
})

const selectedIndex = ref(null)

const emit = defineEmits([ 'selectImage' ])

const selectImage = (postId) =>
{
    console.log('postId in  carusel selectImage:', postId)
    if (selectedIndex.value === postId) {

        selectedIndex.value = null
    } else {

        selectedIndex.value = postId
    }
    emit('selectImage', postId)
}

const currentIndex = ref(0)



const moveCarousel = (direction) =>
{
    const container = document.querySelector(`.carousel-id-${props.carouselId}`)

    const itemWidth = container?.clientWidth / props.posts.length

    currentIndex.value += direction

    if (currentIndex.value < 0) {
        currentIndex.value = props.posts.length - 1
    } else if (currentIndex.value >= props.posts.length) {
        currentIndex.value = 0
    }

    const newPosition = -currentIndex.value * itemWidth
    container.style.transform = `translateX(${newPosition}px)`

    // Restart carousel if at the last image
    if (currentIndex.value === props.posts.length - 1) {
        setTimeout(() =>
        {
            container.style.transition = 'none'
            currentIndex.value = 0
            container.style.transform = 'translateX(0)'
            setTimeout(() =>
            {
                container.style.transition = ''
            })
        })
    }
}


</script>
  
<style scoped>
.carousel-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 30px 5px;
}

.carousel {
    display: flex;
    overflow: hidden;
}

.carousel-inner {
    display: flex;
    transition: transform 0.3s ease;
}

.carousel-item {
    flex-shrink: 0;
    border: 2px solid transparent;
}

.carousel-item.selected {
    border-color: rgb(248, 57, 120);
}

.carousel-image {
    width: 180px;
    height: 250px;
    object-fit: cover;
    cursor: pointer;
    margin: 10px 10px;
}

.nav-button {
    font-size: 40px;
    cursor: pointer;
    margin: 0 15px;
}

.error-message {
    margin-top: 20px;
    text-align: center;
}
</style>
  
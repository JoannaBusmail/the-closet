<template>
    <div class="avatar">
        <img
            :class="style"
            :src="src"
            alt="Random Avatar"
        />
    </div>
</template>


<script setup>
import { computed } from 'vue'
import defaultImage from '@/assets/images/no-profile.jpg'


const { VITE_BASE_PROFILE_PHOTO_URL } = import.meta.env

const props = defineProps({
    src: String,
    size: 'small' | 'big'
})

const style = computed(() =>
{
    return props.size === 'small' ? 'avatar-small' : 'avatar-big'
})



const src = computed(() =>
{
    if (!props.src) {
        return defaultImage
    } else {
        return `${VITE_BASE_PROFILE_PHOTO_URL}${props.src}`
    }

});


</script>

<style scoped>
.avatar-small {
    object-fit: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgb(248, 57, 120);
}

.avatar-big {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
}
</style>
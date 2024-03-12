<template>
    <div class="cards-container">

        <ClosetCard
            v-for="post in postData"
            :key="post.id"
            :post="post"
            :loadingPosts="loadingPosts"
            :isOwner="isOwner"
            @btnClick="$emit('btnClick', post)"
        />

    </div>
    <Observer
        v-if="postData && postData.length"
        @intersect="emitIntersectEvent"
    />
</template>

<script setup>
import ClosetCard from './ClosetCard.vue'
import Observer from './Observer.vue'


const emit = defineEmits([ 'intersect', 'btnClick' ])

const emitIntersectEvent = () =>
{
    emit('intersect')
}

const props = defineProps({
    postData: Array,
    loadingPosts: Boolean,
    isOwner: Boolean

})



</script>


<style scoped>
.cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 20px 0px;
}
</style>
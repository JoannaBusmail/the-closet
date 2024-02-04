<template>
    <div class="cards-container">

        <Card
            v-for="post in postData"
            :key="post.id"
            :post="post"
            :loadingPosts="loadingPosts"
            @btnClick="$emit('btnClick', post)"
        />
        <Observer
            v-if="postData.length"
            @intersect="emitIntersectEvent"
        />
    </div>
</template>

<script setup>
import Card from './Card.vue'
import Observer from './Observer.vue'


const emit = defineEmits([ 'intersect' ])

const emitIntersectEvent = () =>
{
    emit('intersect')
}

const props = defineProps({
    postData: Array,
    loadingPosts: Boolean

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
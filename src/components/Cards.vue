<template>
    <div class="cards-container">

        <Card
            v-for="post in postData"
            :key="post.id"
            :post="post"
            :loadingPosts="loadingPosts"
        />
    </div>
</template>

<script setup>
import Card from './Card.vue'
import Spinner from './Spinner.vue'


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
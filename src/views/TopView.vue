<template>
    <SectionsContent
        sectionName="TOP"
        :postData="topPosts"
        :loadingPosts="loadingPosts"
        @btnClick="handleBtnClick"
        @intersect="fetchNextTopPosts"
    >
    </SectionsContent>
</template>

<script setup>
import SectionsContent from '@/components/SectionsContent.vue'
import Observer from '@/components/Observer.vue'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchDataStore } from '@/stores/fetchData'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchDataStore = useFetchDataStore()
const { fetchTopPosts, deleteTopPost, fetchNextTopPosts } = fetchDataStore
const { topPosts, loadingPosts } = storeToRefs(fetchDataStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        console.log('Botón clickeado en TopView:', post)
        deleteTopPost(post.id)
    }
}


onMounted(() =>
{
    fetchTopPosts()
})

</script>

<style scoped></style>
<template>
    <SectionsContent
        sectionName="TOP"
        :postData="topPosts"
        :loadingPosts="loadingPosts"
        onView="top"
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
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { fetchTopPosts, deleteTopPost, fetchNextTopPosts } = fetchTopDataStore
const { topPosts, loadingPosts } = storeToRefs(fetchTopDataStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        console.log('Botón clickeado en TopView:', post)
        deleteTopPost(post.id)
    }
}


onMounted(async () =>
{
    await fetchTopPosts()
})

</script>

<style scoped></style>
<template>
    <SectionsContent
        sectionName="BOTTOM"
        :postData="bottomPosts"
        :loadingPosts="loadingBottomPosts"
        onView="bottom"
        @btnClick="handleBtnClick"
        @intersect="fetchNextBottomPosts"
    >
    </SectionsContent>
</template>

<script setup>
import SectionsContent from '@/components/SectionsContent.vue'
import Observer from '@/components/Observer.vue'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchBottomDataStore } from '@/stores/fetchBottomData'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchBottomDataStore = useFetchBottomDataStore()
const { fetchBottomPosts, deleteBottomPost, fetchNextBottomPosts } = fetchBottomDataStore
const { bottomPosts, loadingBottomPosts } = storeToRefs(fetchBottomDataStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        console.log('Botón clickeado en TopView:', post)
        deleteBottomPost(post.id)
    }
}


onMounted(async () =>
{
    await fetchBottomPosts()
})

</script>

<style scoped></style>
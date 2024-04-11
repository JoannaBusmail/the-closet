<template>
    <SectionsContent
        sectionName="TOP"
        :postData="topPosts"
        :loadingPosts="loadingPosts"
        onView="top"
        @btnClick="handleBtnClick"
        @toggleSwitch="handleSwitchBtnClick"
        @intersect="fetchNextTopPosts"
    >
    </SectionsContent>
</template>

<script setup>
import SectionsContent from '@/components/SectionsContent.vue'
import Observer from '@/components/Observer.vue'
import { onMounted, watch, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { storeToRefs } from 'pinia'





const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { fetchTopPosts, deleteTopPost, fetchNextTopPosts, addSaleTag, deleteSaleTag } = fetchTopDataStore
const { topPosts, loadingPosts } = storeToRefs(fetchTopDataStore)



const handleBtnClick = (post) =>
{
    if (post && post.id) {
        deleteTopPost(post.id)
    }
}


const handleSwitchBtnClick = async (post) =>
{
    // Toggle the sale status locally
    post.sale = !post.sale

    if (post.sale) {
        await addSaleTag(post.id)
    } else {
        await deleteSaleTag(post.id)
    }
}


onMounted(async () =>
{
    await fetchTopPosts()

})

</script>

<style scoped></style>
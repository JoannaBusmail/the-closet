<template>
    <SectionsContent
        sectionName="SHOES"
        :postData="shoesPosts"
        :loadingPosts="loadingPosts"
        onView="shoes"
        @btnClick="handleBtnClick"
        @toggleSwitch="handleSwitchBtnClick"
        @intersect="fetchNextShoesPosts"
    >
    </SectionsContent>
</template>

<script setup>
import SectionsContent from '@/components/SectionsContent.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchShoesDataStore } from '@/stores/fetchShoesData'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchShoesDataStore = useFetchShoesDataStore()
const { fetchShoesPosts, deleteShoesPost, fetchNextShoesPosts, addSaleTag, deleteSaleTag } = fetchShoesDataStore
const { shoesPosts, loadingPosts } = storeToRefs(fetchShoesDataStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        deleteShoesPost(post.id)
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
    await fetchShoesPosts()
})

</script>

<style scoped></style>
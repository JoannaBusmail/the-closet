<template>
    <SectionsContent
        sectionName="BOTTOM"
        :postData="bottomPosts"
        :loadingPosts="loadingBottomPosts"
        onView="bottom"
        @btnClick="handleBtnClick"
        @toggleSwitch="handleSwitchBtnClick"
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
const { fetchBottomPosts, deleteBottomPost, fetchNextBottomPosts, addSaleTag, deleteSaleTag } = fetchBottomDataStore
const { bottomPosts, loadingBottomPosts } = storeToRefs(fetchBottomDataStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        deleteBottomPost(post.id)
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
    await fetchBottomPosts()
})

</script>

<style scoped></style>
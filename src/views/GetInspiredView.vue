<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>GET INSPIRED</h1>

            <GetInspiredCard
                v-for="post in postsWithUserInfo"
                :key="post.id"
                :post="post"
                :loadingPosts="loading"
            />

        </div>
    </div>
</template>

<script setup>


// UI AND POSTS ACTIONS
import GetInspiredCard from '@/components/GetInspiredCard.vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useFetchGetInspiredDataStore } from '@/stores/fetchGetInspiredData'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'


const fetchGetInspiredStore = useFetchGetInspiredDataStore()
const { fetchAllUsersPosts, mergeUserDataWithPosts, fetchUsers } = fetchGetInspiredStore
const { postsWithUserInfo, posts, loadingGetInspiredCasualPosts } = storeToRefs(fetchGetInspiredStore)


const { contentStyles } = useUIActions()

const loading = ref(false)

onMounted(async () =>
{
    loading.value = true
    await fetchAllUsersPosts()
    await fetchUsers()
    postsWithUserInfo.value = mergeUserDataWithPosts()
    loading.value = false
})




</script>

<style scoped>
.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    transition: margin-left 0.3s ease;
}

.content-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;
}

h1 {
    padding-top: 20px;
    margin-left: 20px;
}
</style>
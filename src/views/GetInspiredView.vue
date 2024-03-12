<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>GET INSPIRED</h1>
            <Spinner v-if="loading" />
            <div class="cards-container">
                <GetInspiredCard
                    v-for="post in postsWithUserInfo"
                    :key="post.id"
                    :post="post"
                    :loadingPosts="loading"
                    @handleClick="goToUserProfile"
                />
            </div>

        </div>
    </div>
</template>

<script setup>


// UI AND POSTS ACTIONS
import GetInspiredCard from '@/components/GetInspiredCard.vue'
import Spinner from '@/components/Spinner.vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useFetchGetInspiredDataStore } from '@/stores/fetchGetInspiredData'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'


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


const router = useRouter()

const goToUserProfile = (post) =>
{
    console.log(post.username)
    router.push(`/getInspired/${post.username}`)
}


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
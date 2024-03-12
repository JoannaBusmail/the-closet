<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>CASUAL CLOSET</h1>

            <Spinner v-if="loadingClosetCasualPosts" />
            <ClosetCardsVue
                v-else
                isOwner
                :postData="closetCasualPosts"
                :loadingPosts="loadingClosetCasualPosts"
                @btnClick="handleBtnClick"
                @intersect="fetchNextClosetCasualPosts"
            />


        </div>
    </div>
</template>

<script setup>


// UI AND POSTS ACTIONS
import { useUIActions } from '@/composables/useUIActions.js'
import ClosetCardsVue from '@/components/ClosetCards.vue'
import Spinner from '@/components/Spinner.vue'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchClosetCasualDataStore } from '@/stores/fetchClosetCasual'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)

// FETCH DATA STORE
const fetchClosetCasualStore = useFetchClosetCasualDataStore()
const { fetchClosetCasualPosts, deleteClosetCasualPosts, fetchNextClosetCasualPosts } = fetchClosetCasualStore
const { closetCasualPosts, loadingClosetCasualPosts } = storeToRefs(fetchClosetCasualStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        console.log('Botón clickeado en TopView:', post)
        deleteClosetCasualPosts(post.id)
    }
}


onMounted(async () =>
{
    await fetchClosetCasualPosts()
})



const { contentStyles } = useUIActions()


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
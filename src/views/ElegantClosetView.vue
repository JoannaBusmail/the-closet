<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>ELEGANT CLOSET</h1>

            <Spinner v-if="loadingClosetElegantPosts" />
            <ClosetCardsVue
                v-else
                isOwner
                :postData="closetElegantPosts"
                :loadingPosts="loadingClosetElegantPosts"
                @btnClick="handleBtnClick"
                @intersect="fetchNextClosetElegantPosts"
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
import { useFetchClosetElegantDataStore } from '@/stores/fetchClosetElegant'
import { storeToRefs } from 'pinia'



const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)

// FETCH DATA STORE
const fetchClosetElegantStore = useFetchClosetElegantDataStore()
const { fetchClosetElegantPosts, deleteClosetElegantPosts, fetchNextClosetElegantPosts } = fetchClosetElegantStore
const { closetElegantPosts, loadingClosetElegantPosts } = storeToRefs(fetchClosetElegantStore)


const handleBtnClick = (post) =>
{
    if (post && post.id) {
        console.log('Botón clickeado en TopView:', post)
        deleteClosetElegantPosts(post.id)
    }
}


onMounted(async () =>
{
    await fetchClosetElegantPosts()
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
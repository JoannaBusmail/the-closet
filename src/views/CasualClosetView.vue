<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">

            <h1>CASUAL CLOSET</h1>
            <div class="btn-closet">
                <Button
                    :btnName="isPublicPosts ? 'Unpublish' : 'Publish'"
                    :btnType="isPublicPosts ? 'extra' : 'secondary'"
                    @btnClick="handlePublishBtn"
                >
                </Button>
            </div>
            <PublishModal
                class="publish-modal"
                :showPublicModal="isPublicModalShown"
                :isPublic="isPublicPosts"
                @closeModal="handlePublishBtn"
                @submit="handleMakePublic"
            />

            <div
                v-if="isPublicPosts"
                class="follow-class"
            >
                <p>
                    {{ `Followers ${loggedUserInfo.followers}` }}
                </p>
                <p>
                    {{ `Following ${loggedUserInfo.following}` }}
                </p>
            </div>

            <Spinner v-if="loadingClosetCasualPosts" />
            <ClosetCardsVue
                v-else
                isOwner
                :postData="closetCasualPosts"
                :loadingPosts="loadingClosetCasualPosts"
                @btnClick="handleDeleteCard"
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
import Button from '@/components/Button.vue'
import PublishModal from '@/components/PublishModal.vue'
import { onMounted, watch, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchClosetCasualDataStore } from '@/stores/fetchClosetCasual'
import { useFollowDataStore } from '@/stores/followData'
import { storeToRefs } from 'pinia'



// USER STORE
const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)

// FETCH DATA STORE
const fetchClosetCasualStore = useFetchClosetCasualDataStore()
const { fetchClosetCasualPosts, deleteClosetCasualPosts, fetchNextClosetCasualPosts, publishCasualPosts, unPublishCasualPosts, fetchIsPublicPosts } = fetchClosetCasualStore
const { closetCasualPosts, loadingClosetCasualPosts, isPublicPosts } = storeToRefs(fetchClosetCasualStore)


// FOLLOW DATA STORE
const followDataStore = useFollowDataStore()
const { fetchLoggedUserFollowCount } = followDataStore
const { loggedUserInfo } = storeToRefs(followDataStore)

// UI ACTIONS
const { contentStyles } = useUIActions()

// REF

const isPublicModalShown = ref(false)


const handlePublishBtn = () =>
{
    isPublicModalShown.value = !isPublicModalShown.value
}


const handleMakePublic = () =>
{
    if (!isPublicPosts.value) {
        publishCasualPosts()
        isPublicModalShown.value = false
    } else {
        unPublishCasualPosts()
        isPublicModalShown.value = false
    }


}

const handleDeleteCard = (post) =>
{
    if (post && post.id) {
        deleteClosetCasualPosts(post.id)
    }
}


onMounted(async () =>
{
    await fetchClosetCasualPosts()
    await fetchIsPublicPosts()
    await fetchLoggedUserFollowCount()

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

.follow-class {
    display: flex;
    justify-content: space-around;
    margin-top: 40px;
}

p {
    font-size: 16px;
    font-weight: bold;
    color: rgb(248, 57, 120);
}

.btn-closet {
    margin-left: 90%;
    margin-top: -40px;
}

.publish-modal {
    position: absolute;
    top: -1%;

}
</style>
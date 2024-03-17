<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <div class="title-btn-container">
                <h1>ELEGANT CLOSET</h1>

                <div class="btn-closet">
                    <Button
                        v-if="closetElegantPosts.length"
                        :btnName="isPublicPosts ? 'Unpublish' : 'Publish'"
                        :btnType="isPublicPosts ? 'extra' : 'secondary'"
                        @btnClick="handlePublishBtn"
                    >
                    </Button>
                </div>
            </div>
            <p
                class="no-posts"
                v-if="!closetElegantPosts.length"
            >No outfit's created yet</p>

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
            <Spinner v-if="loadingClosetElegantPosts" />
            <ClosetCardsVue
                isOwner
                :postData="closetElegantPosts"
                :loadingPosts="loadingClosetElegantPosts"
                @btnClick="handleDeleteCard"
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
import Button from '@/components/Button.vue'
import PublishModal from '@/components/PublishModal.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchClosetElegantDataStore } from '@/stores/fetchClosetElegant'
import { useFollowDataStore } from '@/stores/followData'
import { storeToRefs } from 'pinia'


// USER STORE
const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)

// FETCH DATA STORE
const fetchClosetElegantStore = useFetchClosetElegantDataStore()
const { fetchClosetElegantPosts, deleteClosetElegantPosts, fetchNextClosetElegantPosts, publishElegantPosts, unPublishElegantPosts, fetchIsPublicPosts } = fetchClosetElegantStore
const { closetElegantPosts, loadingClosetElegantPosts, isPublicPosts } = storeToRefs(fetchClosetElegantStore)


// FOLLOW DATA STORE
const followDataStore = useFollowDataStore()
const { fetchLoggedUserFollowCount } = followDataStore
const { loggedUserInfo } = storeToRefs(followDataStore)

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
        publishElegantPosts()
        isPublicModalShown.value = false
    } else {
        unPublishElegantPosts()
        isPublicModalShown.value = false
    }


}




const handleDeleteCard = (post) =>
{
    if (post && post.id) {
        deleteClosetElegantPosts(post.id)
    }
}


onMounted(async () =>
{
    await fetchClosetElegantPosts()
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


.title-btn-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
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


.publish-modal {
    position: absolute;
    top: -1%;

}

.no-posts {
    text-align: center;
    margin-top: 30px;
    color: rgb(248, 57, 120);
    font-size: 14px;
    font-weight: 600;
}

@media screen and (max-width: 768px) {
    .title-btn-container {
        padding-top: 10%;
    }

    h1 {
        font-size: 24px;
    }

}
</style>
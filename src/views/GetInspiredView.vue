<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>GET INSPIRED</h1>

            <div class="inputs-container">
                <p>Filter by username or the closets you are following</p>

                <InputText
                    class="secondary"
                    type="text"
                    placeholder="Search by username"
                    v-model="searchUsername"
                />
                <div class="radio-input">
                    <InputRadio
                        v-for="(option, index) in radioOptions"
                        v-model="searchByFollow"
                        :key="index"
                        :id="option.id"
                        :label="option.label"
                        :value="option.value"
                    >
                    </InputRadio>
                </div>
                <p>Click in the post username to check the user's closets and
                    follow</p>

            </div>

            <Spinner v-if="loading" />
            <div class="cards-container">
                <GetInspiredCard
                    v-for="post in postsWithUserInfo"
                    :key="post.id"
                    :post="post"
                    :loadingPosts="loading"
                    @handleClick="goToUserProfile"
                    :isFollowing="isFollowingMap[post.username]"
                    :isFollowingTag="isFollowingMap[post.username]"
                />
            </div>

        </div>
    </div>
</template>

<script setup>


// UI AND POSTS ACTIONS
import GetInspiredCard from '@/components/GetInspiredCard.vue'
import Spinner from '@/components/Spinner.vue'
import InputText from '@/components/InputText.vue'
import InputRadio from '@/components/InputRadio.vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useFetchGetInspiredDataStore } from '@/stores/fetchGetInspiredData'
import { storeToRefs } from 'pinia'
import { onMounted, watch, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useFollowDataStore } from '@/stores/followData'

// UI ACTIONS
const { contentStyles } = useUIActions()

// GET INSPIRED DATA STORE
const fetchGetInspiredStore = useFetchGetInspiredDataStore()
const { fetchAllUsersPosts, mergeUserDataWithPosts, fetchUsers } = fetchGetInspiredStore
const { postsWithUserInfo } = storeToRefs(fetchGetInspiredStore)


//FOLLOW DATA STORE
const followDataStore = useFollowDataStore()
const { fetchIsFollowingTag } = followDataStore


//ROUTER
const router = useRouter()


//REFS
const loading = ref(false)
const searchUsername = ref('')
const searchByFollow = ref('all')
const isFollowingMap = ref({})

//RADIO OPTIONS
const radioOptions = ref([
    { id: 'all', label: 'All', value: 'all' },
    { id: 'following', label: 'Following closets', value: 'following' },
])


watch([ searchUsername, searchByFollow ], async () =>
{
    await filterPosts()
})


const filterPosts = async () =>
{
    loading.value = true
    await fetchAllUsersPosts()
    postsWithUserInfo.value = mergeUserDataWithPosts()
    await fetchIsFollowinfForAllposts()

    // Filter posts based on searchUsername
    if (searchUsername.value.trim() !== '') {
        postsWithUserInfo.value = postsWithUserInfo.value.filter(post =>
            post.username.toLowerCase().includes(searchUsername.value.trim().toLowerCase())
        )
    }

    // Filter posts based on searchByFollow
    if (searchByFollow.value === 'following') {

        postsWithUserInfo.value = postsWithUserInfo.value.filter(post =>
            isFollowingMap.value[ post.username ]
        )
    }

    loading.value = false
}

// check if the user is following the user of the post and render following tag
const fetchIsFollowinfForAllposts = async () =>
{
    for (const post of postsWithUserInfo.value) {
        const isFollowing = await fetchIsFollowingTag(post.username)
        isFollowingMap.value[ post.username ] = isFollowing
        console.log(isFollowingMap.value)
    }
}

const goToUserProfile = (post) =>
{
    router.push(`/getInspired/${post.username}`)
}



onMounted(async () =>
{
    loading.value = true
    await fetchAllUsersPosts()
    await fetchUsers()

    await filterPosts()
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

.cards-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    padding: 20px 0px;
}



.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

}

.radio-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

p {
    margin-top: 20px;
    margin-bottom: 10px;
    color: rgb(248, 57, 120);
    font-size: 14px;
    font-weight: 600;
}
</style>
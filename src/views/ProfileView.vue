<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <Spinner v-if="loadingParamUser" />
            <div v-if="paramUser">
                <div class="user-info">
                    <Avatar
                        size="small"
                        :src="`${paramUser.profile_url}`"
                    ></Avatar>
                    <p>{{ `${paramUser.username}'s closet` }}</p>
                </div>
                <ClosetCardsVue
                    :isOwner=false
                    :postData="paramUserPosts"
                    :loadingPosts="loadingParamUserPost"
                />

            </div>
            <ErrorMessageComp
                v-else
                :message="errorMessage"
            />

        </div>
    </div>
</template>

<script setup>
import Avatar from '@/components/Avatar.vue'
import ErrorMessageComp from '@/components/ErrorMessageComp.vue'
import Spinner from '@/components/Spinner.vue'
import ClosetCardsVue from '@/components/ClosetCards.vue'
import { onMounted } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useRoute } from 'vue-router'

import { useFetchUserParamsDataStore } from '@/stores/fetchUserParamsData'
import { storeToRefs } from 'pinia'

const { contentStyles } = useUIActions()

const route = useRoute()
const { username: usernameParam } = route.params
console.log(usernameParam)


const fetchUserParamsDataStore = useFetchUserParamsDataStore()
const { getParamUser, fetchParamUserPosts } = fetchUserParamsDataStore
const { paramUser, paramUserPosts, errorMessage, loadingParamUser, loadingParamUserPost } = storeToRefs(fetchUserParamsDataStore)


onMounted(async () =>
{
    await getParamUser(usernameParam)
    await fetchParamUserPosts()
})



</script>


<style scoped>
.user-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

}

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

p {
    font-size: 16px;
    font-weight: bold;
    color: rgb(248, 57, 120);

}
</style>

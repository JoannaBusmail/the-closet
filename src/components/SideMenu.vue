<template>


    <div
        v-if="isSmallScreen"
        class="side-menu-container"
    >
        <ph-t-shirt
            :size="24"
            @click="goToTop"
        />
        <ph-pants
            :size="24"
            @click="goToBottom"
        />
        <ph-sneaker
            :size="24"
            @click="goToShoes"
        />
        <ph-intersect
            :size="28"
            @click="goToMixAndMatch"
        />

        <div
            @click="handleClosetsClick"
            class="closets-container"
        >
            <ph-coat-hanger
                :size="24"
                @click="handleClosetsClick"
            />

            <ph-caret-down
                v-if="!showClosetsMenu"
                :size="24"
            />
            <ph-caret-up
                v-else
                :size="24"
            />
        </div>
        <div
            v-if="showClosetsMenu"
            class="closets-menu"
        >
            <h4
                class="casual"
                @click="goToCasual"
            >CASUAL</h4>
            <h4
                class="elegant"
                @click="goToElegant"
            >ELEGANT</h4>
        </div>

    </div>

    <div
        v-else
        class="side-menu-container"
    >
        <h3 @click="goToTop">TOP</h3>
        <h3 @click="goToBottom">BOTTOM</h3>
        <h3 @click="goToShoes">SHOES</h3>
        <h3 @click="goToMixAndMatch">MIX & MATCH</h3>
        <div
            @click="handleClosetsClick"
            class="closets-container"
        >
            <h3>CLOSETS</h3>
            <ph-caret-down
                v-if="!showClosetsMenu"
                :size="24"
            />
            <ph-caret-up
                v-else
                :size="24"
            />
        </div>
        <div
            v-if="showClosetsMenu"
            class="closets-menu"
        >
            <h4
                class="casual"
                @click="goToCasual"
            >CASUAL</h4>
            <h4
                class="elegant"
                @click="goToElegant"
            >ELEGANT</h4>
        </div>

    </div>
</template>

<script setup>
import { PhCaretDown, PhCaretUp, PhTShirt, PhPants, PhSneaker, PhCoatHanger, PhIntersect } from "@phosphor-icons/vue"
import { ref, watch, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUIActions } from '@/composables/useUIActions.js'

import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


const router = useRouter()

const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)

const { isSmallScreen } = useUIActions()


const showClosetsMenu = ref(false)

const handleClosetsClick = () =>
{
    showClosetsMenu.value = !showClosetsMenu.value
}


watch(loggedUser, (newUser) =>
{
    if (newUser) {
        redirectIfLoggedIn()
    }
})



const redirectIfLoggedIn = () =>
{
    const currentPath = router.currentRoute.value.path

    if (currentPath === '/notFound' && loggedUser.value) {
        goHome()
    }
}

onMounted(() =>
{
    redirectIfLoggedIn()
})



const goHome = () =>
{
    router.push('/')
}

const goToTop = () =>
{

    if (loggedUser.value) {
        router.push(`/closet/top/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }

}

const goToBottom = () =>
{
    if (loggedUser.value) {
        router.push(`/closet/bottom/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }
}


const goToShoes = () =>
{
    if (loggedUser.value) {
        router.push(`/closet/shoes/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }

}

const goToMixAndMatch = () =>
{
    if (loggedUser.value) {
        router.push(`/closet/mixandmatch/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }

}

const goToCasual = () =>
{
    if (loggedUser.value) {
        router.push(`/closet/mixandmatch/casualcloset/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }

}


const goToElegant = () =>
{
    if (loggedUser.value) {
        router.push(`/closet/mixandmatch/elegantcloset/${loggedUser?.value.username}`)
    } else {
        router.push('/notFound')
    }

}

</script>

<style scoped>
.side-menu-container {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F5F5F5;
    height: 100vh;
    width: 18vw;
    padding: 2rem;
    z-index: 10;
}

@media screen and (max-width: 768px) {
    .side-menu-container {
        flex-direction: row;
        width: 100%;
        height: 11vh;
        justify-content: space-between;
        padding: 20px 15px;
        min-height: 0vh;
    }
}

h3 {
    margin-bottom: 30px;
    cursor: pointer;
}

@media screen and (max-width: 768px) {
    h3 {
        font-size: 14px;

    }
}

h4:hover,
h3:hover {
    color: rgb(248, 57, 120);
}

.closets-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;

}



.closets-container h3 {
    margin-bottom: 0;
    margin-right: 15px;
}

.closets-menu {
    display: flex;
    flex-direction: column;
    margin-left: 50px;
    align-items: flex-end;
    margin-top: 10px;
    width: 6vw;
}

h4 {
    cursor: pointer;
}

.casual {
    margin-right: 4px;
}

@media screen and (max-width: 768px) {
    .closets-menu {
        position: absolute;
        flex-direction: row;
        top: 50%;
        right: 18%;
        gap: 20px;
    }

    .casual,
    .elegant {
        font-size: 12px;
        font-weight: 600;
    }
}

@media screen and (max-width: 440px) {
    .closets-menu {
        right: 30%;
    }
}


@media screen and (max-width: 280px) {
    .closets-menu {
        right: 40%;
    }
}
</style>
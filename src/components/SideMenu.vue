<template>
    <div class="side-menu-container">
        <h3 @click="goToTop">TOP</h3>
        <h3 @click="goToBottom">BOTTOM</h3>
        <h3 @click="goToShoes">SHOES</h3>
        <div
            @click="handleMixMatchClick"
            class="mixMatch-container"
        >
            <h3 @click="goToMixAndMatch">MIX & MATCH</h3>
            <ph-caret-down
                v-if="!showMixMatchMenu"
                :size="24"
            />
            <ph-caret-up
                v-else
                :size="24"
            />
        </div>
        <div
            v-if="showMixMatchMenu"
            class="mixMatch-menu"
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
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue"
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


const router = useRouter()

const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


const showMixMatchMenu = ref(false)

const handleMixMatchClick = () =>
{
    showMixMatchMenu.value = !showMixMatchMenu.value
}


const goToTop = () =>
{
    if (loggedUser.value)
        router.push(`/closet/top/${loggedUser?.value.username}`)
}

const goToBottom = () =>
{
    router.push(`/closet/bottom/${loggedUser?.value.username}`)
}

const goToShoes = () =>
{
    router.push(`/closet/shoes/${loggedUser?.value.username}`)
}

const goToMixAndMatch = () =>
{
    router.push(`/closet/mixandmatch/${loggedUser?.value.username}`)
}

const goToCasual = () =>
{
    router.push(`/closet/mixandmatch/casualcloset/${loggedUser?.value.username}`)
}


const goToElegant = () =>
{
    router.push(`/closet/mixandmatch/elegantcloset/${loggedUser?.value.username}`)
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
    width: 25vw;
    padding: 2rem;
    z-index: 10;
}

@media screen and (max-width: 768px) {
    .side-menu-container {
        flex-direction: row;
        width: 100%;
        height: 8vh;
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

.mixMatch-container {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-bottom: 10px;

}



.mixMatch-container h3 {
    margin-bottom: 0;
    margin-right: 15px;
}

.mixMatch-menu {
    display: flex;
    flex-direction: column;
    margin-left: 100px;
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
    .mixMatch-menu {
        flex-direction: row;
        margin-left: -80px;


    }

    .casual,
    .elegant {
        font-size: 12px;
        margin-top: 12px;
        text-align: center;
        padding-bottom: 10px;
    }

    .casual {
        margin-left: -100px;
    }

    .elegant {
        margin-left: 10px;
    }
}
</style>
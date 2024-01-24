<template>
    <main>
        <ModalContainer
            @closeModal="handleAuthModal"
            v-if="showModal"
        > <template #modalContent>
                <AuthModal
                    :isLogin="isLogin"
                    @cancelBtn="handleCancelBtn"
                >
                </AuthModal>
            </template>
        </ModalContainer>

        <NavBar
            @chevronClick="handleChevronClick"
            @loginClick="() => handleAuthModal('login')"
            @signUpClick="() => handleAuthModal('signUp')"
            :caretUp="showSideMenu"
        />
        <div class="layout-container">

            <SideMenu v-if="showSideMenu" />

            <ContentContainer>

            </ContentContainer>

        </div>

    </main>
</template>



<script setup>
import NavBar from '@/components/NavBar.vue'
import SideMenu from '@/components/SideMenu.vue'
import ModalContainer from '@/components/ModalContainer.vue'
import AuthModal from '@/components/AuthModal.vue'
import ContentContainer from './ContentContainer.vue'
import { ref } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'

const { showSideMenu, toggleSideMenu, showModal, toggleModal } = useUIActions()


const isLogin = ref(false)


const handleChevronClick = () =>
{
    toggleSideMenu()
}

const handleAuthModal = (action) =>
{
    toggleModal()
    isLogin.value = action === 'login'
}

const handleCancelBtn = () =>
{
    showModal.value = false
    event.preventDefault()
}

</script>   

<style scoped>
.layout-container {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;

}
</style>

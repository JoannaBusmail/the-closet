<template>
    <main>
        <ProfileForm v-if="isProfile" />

        <AuthModal
            v-else
            :isLogin="isLogin"
        >
        </AuthModal>



        <NavBar
            @chevronClick="handleChevronClick"
            @loginClick="() => handleAuthModal('login')"
            @signUpClick="() => handleAuthModal('signUp')"
            @profileClick="handleProfile"
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
import ProfileForm from '@/components/ProfileForm.vue'
import ContentContainer from './ContentContainer.vue'
import { ref } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'


const { showSideMenu, toggleSideMenu, toggleModal } = useUIActions()


const isLogin = ref(false)
const isProfile = ref(false)


const handleChevronClick = () =>
{
    toggleSideMenu()
}

const handleAuthModal = (action) =>
{
    toggleModal()
    isLogin.value = action === 'login'
    isProfile.value = false
}

const handleProfile = () =>
{
    toggleModal()
    isProfile.value = true

}


</script>   

<style scoped>
.layout-container {
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
}

@media screen and (max-width: 768px) {
    .layout-container {
        flex-direction: column;
    }
}
</style>

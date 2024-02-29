<template>
    <ModalContainer
        v-if="showModal"
        @closeModal="handleCancel"
    >
        <template #modalContent>
            <h5>{{ title }}</h5>

            <form @submit.prevent="handleSubmit">
                <div class="input-container">

                    <InputText
                        v-if="!isLogin"
                        class="primary"
                        type="text"
                        placeholder="Username"
                        v-model=userCredentials.username
                    />
                    <InputText
                        class="primary"
                        type="text"
                        placeholder="Email"
                        v-model=userCredentials.email
                    />
                    <InputText
                        class="primary"
                        type="password"
                        placeholder="Password"
                        v-model=userCredentials.password
                    />
                    <ErrorMessageComp
                        v-if="errorMessage"
                        :message="errorMessage"
                    />
                </div>
                <div class="button-container">
                    <Button
                        @btnClick="handleCancel"
                        btnName="Cancel"
                        btnType="secondary"
                    ></Button>
                    <Button
                        btnName="Submit"
                        btnType="secondary"
                        :disabled="loading"
                    ></Button>
                </div>


            </form>
        </template>
    </ModalContainer>
</template>

<script setup>
import { computed, reactive } from 'vue'
import ModalContainer from '@/components/ModalContainer.vue'
import Button from './Button.vue'
import InputText from './InputText.vue'
import ErrorMessageComp from './ErrorMessageComp.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useUIActions } from '@/composables/useUIActions.js'

const { showModal, toggleModal } = useUIActions()

// STORE
const userStore = useUserStore()
const { handleSignup, handleLogin } = userStore
const { errorMessage, loading, user } = storeToRefs(userStore)






const props = defineProps({
    isLogin: Boolean,

})

const userCredentials = reactive({
    username: '',
    email: '',
    password: '',

})

const clearCredentialsInput = () =>
{
    userCredentials.username = ''
    userCredentials.email = ''
    userCredentials.password = ''

}

const handleSubmit = async () =>
{

    if (props.isLogin) {
        await handleLogin({ email: userCredentials.email, password: userCredentials.password })
    } else {
        await handleSignup(userCredentials)
        console.log('userCredentials', userCredentials)
    }
    if (user.value) {

        clearCredentialsInput()
    }
    if (!errorMessage.value) {
        toggleModal()
    }


}

const handleCancel = (e) =>
{
    e.preventDefault()
    toggleModal()
    clearCredentialsInput()
    errorMessage.value = ''
}


const title = computed(() => { return props.isLogin ? 'LOGIN' : 'SIGN UP' })


</script>

<style scoped>
h5 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    display: flex;
    justify-content: center;
    font-weight: 600;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 40px;
    margin-top: 25px;

}
</style>
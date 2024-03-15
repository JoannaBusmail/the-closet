<template>
    <ModalContainer
        v-if="showPublicModal"
        @closeModal="handleCancel"
    >
        <template #modalContent>


            <form @submit.prevent="handleSubmit">

                <div>
                    <p>
                        {{ isPublic ? modalMessage.makePrivate : modalMessage.makePublic }}
                    </p>
                </div>

                <div class="button-container">
                    <Button
                        @btnClick="handleCancel"
                        btnName="Cancel"
                        btnType="secondary"
                    ></Button>
                    <Button
                        :btnName="isPublic ? 'Make Private' : 'Make Public'"
                        btnType="secondary"
                        :disabled="loading"
                    ></Button>
                </div>


            </form>
        </template>
    </ModalContainer>
</template>

<script setup>
import ModalContainer from '@/components/ModalContainer.vue'
import Button from './Button.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'




// USER STORE
const userStore = useUserStore()
const { errorMessage, loading, user } = storeToRefs(userStore)



const props = defineProps({
    showPublicModal: Boolean,
    isPublic: Boolean
})

const emit = defineEmits([ 'closeModal', 'submit' ])


const modalMessage = {
    makePublic: 'If you make public, your closet will be publish in GET INSPIRED. Other users will be able to see you outfits and follow you.',
    makePrivate: 'If you make private, your outfits wont be share in GET INSPIRED anymore.'
}

const handleCancel = (e) =>
{
    e.preventDefault()
    emit('closeModal')

    errorMessage.value = ''
}

const handleSubmit = (e) =>
{
    e.preventDefault()
    emit('submit')
}


</script>

<style scoped>
h5 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    display: flex;
    justify-content: center;
    font-weight: 600;
}



.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 40px;
    margin-top: 25px;

}

p {
    font-size: 16px;
    text-align: center;
    margin: 10px 0;
    color: rgb(248, 57, 120);
}
</style>
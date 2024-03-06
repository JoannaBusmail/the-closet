<template>
    <ModalContainer
        v-if="showModal"
        @closeModal="handleCancel"
    >
        <template #modalContent>
            <h5 class="text-styles">PROFILE</h5>

            <form @submit.prevent="handleSubmit">

                <Spinner v-if="uploadingUpdateInfo" />


                <div
                    v-else
                    class="input-container"
                >

                    <Avatar
                        size="big"
                        :src="user.profile_url"
                    />



                    <label
                        class="info-label text-styles"
                        for="inputFile"
                    >Upload Photo</label>
                    <div class="file-upload">


                        <label
                            for="inputFile"
                            class="custom-file-upload"
                        >
                            <span
                                v-if="uploadingImageProfile"
                                class="file-upload-text"
                            >. . .</span>
                            <span
                                v-else
                                class="file-upload-text"
                            >{{ selectedFileProfileName ? selectedFileProfileName : 'Upload  profile photo' }}</span>
                        </label>

                        <input
                            class="input-file"
                            type="file"
                            id="inputFile"
                            accept=".jpg, .png, .jpeg"
                            @change="handleUploadImageProfile"
                        />
                    </div>
                    <label
                        class="info-label text-styles"
                        for="Input"
                    >User Name</label>

                    <InputText
                        class="primary"
                        type="text"
                        placeholder="Change username"
                        v-model=newUsername
                    />

                </div>




                <ErrorMessageComp
                    v-if="errorUpdateMessage"
                    :message="errorUpdateMessage"
                />



                <div
                    v-else
                    class="button-container"
                >
                    <Button
                        @btnClick="handleCancel"
                        btnName="Cancel"
                        btnType="secondary"
                    ></Button>
                    <Button
                        btnName="Update"
                        btnType="secondary"
                        :disabled="uploadingUpdateInfo"
                    ></Button>
                </div>


            </form>

        </template>
    </ModalContainer>
</template>

<script setup>
import { ref } from 'vue'
import ModalContainer from '@/components/ModalContainer.vue'
import Avatar from './Avatar.vue'
import Button from './Button.vue'
import InputText from './InputText.vue'
import ErrorMessageComp from './ErrorMessageComp.vue'
import Spinner from './Spinner.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useUIActions } from '@/composables/useUIActions.js'

const { showModal, toggleModal } = useUIActions()

// STORE
const userStore = useUserStore()
const { handleUploadImageProfile, handleUpdateProfile, getUser } = userStore
const { selectedFileProfileName, uploadingImageProfile, user, errorUpdateMessage, uploadingUpdateInfo } = storeToRefs(userStore)






const props = defineProps({
    isProfile: Boolean,

})

const newUsername = ref('')

const handleSubmit = async () =>
{

    await handleUpdateProfile(newUsername.value)

    selectedFileProfileName.value = ''
    newUsername.value = ''


}

const handleCancel = (e) =>
{
    e.preventDefault()
    toggleModal()
    props.isProfile = false
}



</script>

<style scoped>
.text-styles {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    display: flex;
    justify-content: center;
    font-weight: 600;
}

h5 {
    margin-bottom: 20px;
}


.info-label {
    margin-top: 20px;
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

.file-upload {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    width: 90%;
}

.custom-file-upload {
    width: 100%;
    height: 2rem;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    font-size: 14px;
    padding: 0 15px;

    cursor: pointer;
}

.input-file {
    display: none;
}

.custom-file-upload:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}

.file-upload-text {
    display: block;
    justify-self: center;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    line-height: 1.9rem;

}
</style>
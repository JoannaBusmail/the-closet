<template>
    <div class="upload-container">
        <form
            class="upload-form-container"
            @submit.prevent="handleUploadPhotoInfo"
        >
            <Spinner v-if="uploadingPost" />

            <div
                v-else
                class="input-container"
            >
                <div class="file-text-input">
                    <label
                        for="inputFile"
                        class="custom-file-upload"
                    >
                        <span
                            v-if="uploadingImage"
                            class="file-upload-text"
                        >. . .</span>
                        <span
                            v-else
                            class="file-upload-text"
                        >{{ selectedFileName ? selectedFileName : 'Upload photo' }}</span>
                    </label>
                    <input
                        class="input-file"
                        type="file"
                        id="inputFile"
                        accept=".jpg, .png, .jpeg"
                        @change="handleUploadImage"
                    />
                    <InputText
                        class="secondary"
                        type="text"
                        placeholder="Color"
                        v-model="color"
                    />
                </div>
                <div class="radio-input">
                    <InputRadio
                        v-for="(option, index) in radioOptions"
                        v-model="style"
                        :key="index"
                        :id="option.id"
                        :label="option.label"
                        :value="option.value"
                    >
                    </InputRadio>
                </div>



            </div>
            <InputText
                v-if="!uploadingPost"
                class="secondary"
                type="text"
                placeholder="Seen at: ex. Zara, H&M, etc."
                v-model="seenAt"
            />
            <ErrorMessageComp
                v-if="errorMessage"
                :message="errorMessage"
            />
            <div class="button-container">

                <Button
                    btnName="OK"
                    btnType="secondary"
                    :disabled="uploadingPost"
                ></Button>
                <Button
                    btnName="CANCEL"
                    btnType="secondary"
                    @btnClick="handlleCancelUpload"
                ></Button>
            </div>
        </form>
    </div>
</template>

<script setup>
import Button from './Button.vue'
import InputText from './InputText.vue'
import InputRadio from './InputRadio.vue'
import Spinner from './Spinner.vue'
import ErrorMessageComp from './ErrorMessageComp.vue'
import { ref, watchEffect } from 'vue'
import { useUploadDataStore } from '@/stores/uploadData'
import { storeToRefs } from 'pinia'


const props = defineProps({
    onView: String
})

// UPLOAD DATA STORE
const uploadDataStore = useUploadDataStore()
console.log('onView:', props.onView)
const { handleUploadImage, handleUploadPhotoInfo, handlleCancelUpload } = uploadDataStore
const { onView, color, style, seenAt, uploadingPost, uploadingImage, selectedFileName, errorMessage } = storeToRefs(uploadDataStore)

const emit = defineEmits([ 'update:colorInputValue' ])

onView.value = props.onView

const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },
])



</script>

<style scoped>
.upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.upload-photo {
    margin-bottom: 10px;
}

.upload-form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-container,
.file-text-input,
.radio-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}



.custom-file-upload {
    width: 75%;
    height: 2rem;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
    font-size: 14px;
    padding: 0 15px;
    margin-right: 15px;
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
    height: 100%;
    width: 100px;
    justify-self: center;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
    line-height: 1.9rem;

}

.button-container {
    margin-top: 20px;
}

@media screen and (max-width: 768px) {
    .input-container {
        flex-direction: column;
    }



    .custom-file-upload {
        width: 50%;
        margin-right: 5px;
        margin-left: 10px;
    }
}
</style>

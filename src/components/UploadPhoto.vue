<template>
    <div class="upload-container">
        <form class="upload-form-container">
            <div class="input-container">
                {{ color }}
                <div class="file-text-input">
                    <label
                        for="inputFile"
                        class="custom-file-upload"
                    >
                        <span class="file-upload-text">Upload photo</span>
                    </label>
                    <input
                        class="input-file"
                        type="file"
                        id="inputFile"
                        accept=".jpg, .png, .jpeg"
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
                        v-model="selectedRadio"
                        :key="index"
                        :id="option.id"
                        :label="option.label"
                        :value="option.value"
                    >{{ selectedRadio }}
                    </InputRadio>
                </div>
            </div>
            <div class="button-container">
                <Button
                    btnName="OK"
                    btnType="secondary"
                ></Button>
                <Button
                    btnName="CANCEL"
                    btnType="secondary"
                ></Button>
            </div>
        </form>
    </div>
</template>
  
<script setup>
import Button from './Button.vue'
import InputText from './InputText.vue'
import InputRadio from './InputRadio.vue'
import { ref, watchEffect } from 'vue'

const emit = defineEmits([ 'update:colorInputValue' ])


const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },
])

const color = ref('')
const selectedRadio = ref('')


watchEffect(() =>
{
    console.log(selectedRadio.value)
})


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
    display: flex;
    align-items: center;
    height: 100%;
}

.button-container {
    margin-left: 20px;
}

@media screen and (max-width: 768px) {
    .input-container {
        flex-direction: column;
    }

    .button-container {
        margin-left: 0;
    }

    .custom-file-upload {
        width: 50%;
        margin-right: 5px;
        margin-left: 10px;
    }
}
</style>
  
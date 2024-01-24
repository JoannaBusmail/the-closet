<template>
    <div>Upload Photo</div>
    <div>
        <form class="upload-form-container">
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
            >
            <InputText
                class="secondary"
                type="text"
                placeholder="Color"
                v-model=color
                @update:modelValue="$emit('update:colorInputValue', $event)"
            />
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
import { ref } from 'vue'

const emit = defineEmits([ 'update:colorInputValue' ])

const color = ref('')

</script>

<style scoped>
.upload-form-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 40px;
}

@media screen and (max-width: 768px) {
    .upload-form-container {
        flex-direction: column;
        align-items: flex-start;
    }


    .custom-file-upload {
        width: 80%;
        margin-top: 10px;
    }

    .secondary {
        margin-left: -2px;
    }

    .button-container {
        margin-top: 10px;
    }
}


.custom-file-upload {
    width: 30%;
    height: 2rem;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    padding: 0 15px;
    margin-right: 20px;
    cursor: pointer;


}

.input-file {
    display: none;
}

.custom-file-upload {
    display: inline-block;
    justify-content: center;
}

.file-upload-text {
    display: flex;
    align-items: center;
    height: 100%;
}



.custom-file-upload:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}
</style>
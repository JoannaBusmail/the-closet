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
            <input
                type="text"
                placeholder="Color"
            >

            <Button
                btnName="OK"
                btnType="secondary"
            ></Button>
            <Button
                btnName="CANCEL"
                btnType="secondary"
            ></Button>

        </form>

    </div>
</template>

<script setup>
import Button from './Button.vue';

</script>

<style scoped>
.upload-form-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 40px;
}


input,
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


input:focus,
.custom-file-upload:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}
</style>
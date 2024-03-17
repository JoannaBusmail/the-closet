<template>
    <div
        v-for="(instruction, index) in instructions"
        :key="index"
        class="step"
    >
        <p class="stepNum">{{ index + 1 }}</p>
        <p class="text-instructions">{{ instruction }}</p>
    </div>
</template>

<script setup>

const instructions = [
    "Register to create and save your outfits",
    "Upload images for TOP, BOTTOM and SHOES",
    "MIX & MATCH selected items to create outfits",
    "Check your saved outfits in the closets"

]

</script>

<style scoped>
.step {
    display: flex;
    align-items: center;
    color: rgb(248, 57, 120);
    font-weight: 600;
    font-size: 20px;
    margin-top: 40px;

}

.stepNum {
    background-color: rgb(248, 57, 120);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    color: #fff;
    width: 2em;
    height: 2em;
    border-radius: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;

}

@media (max-width: 768px) {
    .stepNum {
        width: 1.5em;
        height: 1.5em;
        font-size: 16px;
    }

    .step {
        font-size: 18px;
        margin-top: 30px;
        align-self: flex-start;

    }


}

@media (max-width: 420px) {
    .stepNum {
        width: 1.3em;
        height: 1.3em;
        font-size: 14px;
    }
}
</style>
<template>
    <div
        v-for="(instruction, index) in instructions"
        :key="index"
        class="step"
    >
        <p class="stepNum">{{ index + 1 }}</p>
        <p>{{ instruction }}</p>
    </div>
</template>
  
<script setup>

const instructions = [
    "Upload images for TOP, BOTTOM and SHOES",
    "MIX & MATCH selected items to create outfits",
    "No need to register, unless you want to save your outfits",
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
        /* Ajusta para pantallas más pequeñas */
        height: 1.5em;
        /* Ajusta para pantallas más pequeñas */
        font-size: 16px;
        /* Ajusta para pantallas más pequeñas */
    }
}
</style>
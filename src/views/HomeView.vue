
<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="overlay">
            <h1>THE CLOSET</h1>
            <Instructions />
        </div>

        <img
            class="image"
            src="../assets/images/pexels-dark-siren-2307303-cut.jpg"
            alt="logo"
        />

    </div>
</template>

<script setup>
import Instructions from '@/components/Instructions.vue'
import { useUIActions } from '@/composables/useUIActions.js'


const { contentStyles } = useUIActions()

</script>

<style scoped>
.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    transition: margin-left 0.3s ease;

}

.image {
    width: calc(100% - 60px);
    /* 100% width minus 2 * 30px margin */
    height: calc(100% - 60px);
    /* 100% height minus 2 * 30px margin */
    margin: 30px;
    object-fit: cover;
    /* Preserve aspect ratio while covering the entire container */
}



.overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 6;

}

h1 {
    margin: 0;
    padding: 60px;
    font-size: 60px;
    font-weight: 600;
    color: rgb(248, 57, 120);
    border: 5px solid rgb(248, 57, 120);
    /* Fondo semitransparente */
}
</style>

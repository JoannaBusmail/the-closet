<template #content>
    <div
        class="container"
        :style="contentStyles"
    >

        <div class="overlay">
            <h1>Need to be registered or logged in to use app features</h1>
        </div>


    </div>
</template>

<script setup>

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


h1 {
    padding: 20px;
    font-size: 20px;
    font-weight: 600;
    color: rgb(248, 57, 120);
    border: 3px solid rgb(248, 57, 120);
    /* Fondo semitransparente */
}

.overlay {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: 6;

}
</style>

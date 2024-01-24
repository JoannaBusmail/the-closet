<template #content >
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>BOTTOM</h1>
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

.content-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;

}
</style>
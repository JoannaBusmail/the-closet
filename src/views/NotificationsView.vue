<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>NOTIFICATIONS</h1>
            <BoxMessage />

        </div>
    </div>
</template>

<script setup>
import { useUIActions } from '@/composables/useUIActions.js'
import BoxMessage from '@/components/BoxMessage.vue'


// UI AND POSTS ACTIONS
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



h1 {
    padding-top: 20px;
    margin-left: 20px;
}



@media screen and (max-width: 768px) {

    h1 {
        font-size: 24px;
        padding-top: 40px;
        margin-left: 5px;
    }

}
</style>
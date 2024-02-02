
<template>
    <div
        class="content-container"
        :style="contentStyles"
    >
        <div class="content-overlay">
            <slot name="content"></slot>
        </div>
    </div>
</template>


<script setup>

import { useUIActions } from '@/composables/useUIActions.js'


const { contentStyles, isSmallScreen } = useUIActions()


</script>

<style scoped>
.content-container {
    width: 100%;
    height: 100vh;
    background-color: rgb(248, 57, 120);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 12%;
    left: 0;

}

@media screen and (max-width: 768px) {
    .content-container {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        top: 0;


    }
}

.content-overlay {
    width: 100%;
    position: relative;
    top: 12%;
    left: 0;
    overflow: hidden;
}
</style>
```
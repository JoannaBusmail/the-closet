
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
    background-color: rgb(248, 57, 120);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;


}



.content-overlay {
    width: 100%;
    position: relative;
    left: 0;
    overflow: hidden;
}
</style>
```
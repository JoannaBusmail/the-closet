
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


const { contentStyles } = useUIActions()


</script>

<style scoped>
.content-container {
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

.content-overlay {
    width: 100%;
    position: absolute;
    top: 12%;
    left: 0;
    overflow: hidden;
}
</style>
```
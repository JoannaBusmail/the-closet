<template>
    <div class="notification-container">
        <div class="bubble">1</div>
        <ph-bell-ringing
            class="bell-icon"
            :size="20"
        />
    </div>
</template>

<script setup>
import { PhBellRinging } from "@phosphor-icons/vue"
</script>

<style scoped>
.notification-container {
    position: relative;
    display: inline-flex;
    align-items: center;
}

.bubble {
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: rgb(248, 57, 120);
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
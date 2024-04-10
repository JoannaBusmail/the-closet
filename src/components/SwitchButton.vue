<template>
    <button
        @click="handleToggleSwitch"
        :class="{ 'active': isSwitchActive }"
    >
        <span class="text">{{ switchBtnText }}</span>
        <span class="slider"></span>

    </button>
</template>

<script setup>


const props = defineProps({
    isSwitchActive: Boolean,
    switchBtnText: String
})


const emit = defineEmits([ 'toggleSwitch' ])

const handleToggleSwitch = (e) => { emit('toggleSwitch', e) }



</script>

<style scoped>
/* Estilos para el botón toggle */
button {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 22px;
    background-color: transparent;
    border-radius: 34px;
    border: 1px solid rgb(248, 57, 120);
    cursor: pointer;
    outline: none;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    border-radius: 34px;
    transition: 0.4s;

}

button.active .slider {
    background-color: rgb(248, 57, 120);
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 2px;
    background-color: rgb(248, 57, 120);
    border-radius: 50%;
    border: 1px solid rgb(248, 57, 120);
    transition: 0.4s;
}

.text {
    position: absolute;
    bottom: 3.5px;
    left: 40px;
    font-size: 12px;
    color: rgb(248, 57, 120);
}

button.active .slider:before {
    transform: translateX(53px);
    background-color: #fff;
}

button.active .text {
    color: #fff;
    left: 8px;
    z-index: 1;
}
</style>
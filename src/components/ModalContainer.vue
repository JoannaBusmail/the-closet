<template>
    <div class="overlay">
        <div class="modal">
            <button
                @click="closeModal"
                class="close"
            >X</button>
            <slot name="modalContent"></slot>

        </div>
    </div>
</template>

<script setup>



const emit = defineEmits([ 'closeModal' ])

const closeModal = () =>
{
    emit('closeModal')
}

</script>

<style scoped>
.overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(156, 156, 156, 0.5);
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal {
    width: 650px;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.modal .close {
    border: none;
    padding: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-color: rgb(248, 57, 120);
    border-radius: 100%;
    color: white;
    font-size: 12px;
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
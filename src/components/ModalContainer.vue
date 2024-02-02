<template>
    <div class="overlay">
        <div class="modal">
            <Button
                @btnClick="closeModal"
                btnName="X"
                btnType="close"
            ></Button>
            <slot name="modalContent"></slot>

        </div>
    </div>
</template>

<script setup>
import Button from './Button.vue'



const emit = defineEmits([ 'closeModal' ])

const closeModal = (e) =>
{
    emit('closeModal', e)
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
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
}
</style>
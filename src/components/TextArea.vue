<template>
    <div class="textArea_container">
        <textarea
            class="custom-textarea"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            style="width: 100%;"
        />
        <ph-paper-plane-tilt
            class="sendLogo"
            :size="28"
        />
    </div>
</template>

<script setup>
import { PhPaperPlaneTilt } from '@phosphor-icons/vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: String,



})

</script>
<style scoped>
.textArea_container {
    display: flex;
    margin: 20px auto;
    width: 100%;

}

.custom-textarea {
    width: 100%;
    height: 150px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    resize: vertical;
    /* Permite redimensionar verticalmente */
    box-sizing: border-box;
    /* Incluye el padding y border en el ancho y alto */
    font-size: 14px;
    line-height: 1.5;
}

.custom-textarea:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}

.sendLogo {
    cursor: pointer;
    color: rgb(248, 57, 120);
    margin-top: 110px;
}
</style>
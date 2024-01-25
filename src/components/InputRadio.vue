<template>
    <input
        class="fixedStyles"
        type="radio"
        :id="id"
        :checked="isChecked"
        @change="$emit('update:modelValue', value)"
    >
    <label :for="id">{{ label }}</label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    id: String,
    label: String,
    value: String
})

const isChecked = computed(() => props.modelValue === props.value)

</script>


<style scoped>
.fixedStyles {
    margin: 15px 10px;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
    width: 20px;
    height: 20px;


}
</style>
```
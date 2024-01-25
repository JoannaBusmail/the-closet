<template>
    <input
        class="fixedStyles"
        :class="inputStyle"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    placeholder: String,
    type: {
        type: String,
        required: true
    },
    styleType: 'primary' | 'secondary'

})

const inputStyle = computed(() =>
{
    return props.styleType === 'primary' ? 'input-primary' : 'input-secondary'
})

</script>
<style scoped>
.fixedStyles {
    width: 90%;
    height: 2rem;
    margin: 15px 10px;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;

}

.secondary {
    width: 75%;
}


.primary:focus,
.secondary:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}

@media screen and (max-width: 768px) {
    .secondary {
        width: 50%;
    }
}
</style>
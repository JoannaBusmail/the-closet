<template>
    <button
        class="fixedStyles"
        :class="btnClass"
        @click="handleBtnClick"
        :disabled="disabled"
    >{{ btnName }}</button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    btnName: String,
    btnType: 'principal' | 'secondary' | 'close' | 'extra',
    disabled: Boolean
})

const emit = defineEmits([ 'btnClick' ])


const handleBtnClick = (e) => { emit('btnClick', e) }


const btnClass = computed(() =>
{

    if (props.btnType === 'close') {
        return 'close-btn'
    }
    if (props.btnType === 'principal') {
        return 'principle-btn'
    }
    if (props.btnType === 'secondary') {
        return 'secondary-btn'
    }
    if (props.btnType === 'extra') {
        return 'extra-btn'
    }

})

</script>

<style scoped>
.fixedStyles {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    border: none;
    background-color: #F5F5F5;
    padding: 6px 12px;
    margin: 0 10px;
    color: #070707;
    cursor: pointer;

}

.secondary-btn {
    border: 1px solid rgb(248, 57, 120);
    background-color: #fff;
    border-radius: 18px;

}

.extra-btn {
    border: 1px solid rgb(248, 57, 120);
    background-color: rgb(248, 57, 120);
    border-radius: 18px;
    color: #fff;
    font-weight: 600;
}

.close-btn {
    padding: 10px;
    width: 30px;
    height: 30px;
    background-color: rgb(248, 57, 120);
    border-radius: 100%;
    color: #fff;
    font-size: 12px;
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
}

.principle-btn:hover,
.secondary-btn:hover {
    color: rgb(248, 57, 120);

}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
```
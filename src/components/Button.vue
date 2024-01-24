<template>
    <button
        class="btn"
        @click="handleBtnClick"
    >{{ btnName }}</button>
</template>

<script setup>

const props = defineProps({
    btnName: String
})

const emit = defineEmits([ 'btnClick' ])


const handleBtnClick = () =>
{
    emit('btnClick')
}


</script>

<style scoped>
.btn {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    ;
    font-size: 14px;
    border: none;
    background-color: #F5F5F5;
    padding: 5px 10px;
    margin-right: 15px;
    color: #070707;
    cursor: pointer;

}

.btn:hover {
    color: rgb(248, 57, 120);
}
</style>
```
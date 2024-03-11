<template>

    <div class="tag-container">

        <p class="tag">{{ tag }}</p>

    </div>
</template>

<script setup>

const props = defineProps({
    tag: String
})


</script>

<style scoped>
.tag-container {
    display: inline-block;
}


.tag {
    padding: 2px 12px;
    border-radius: 9999px;
    border: 1px solid rgb(248, 57, 120);
    color: rgb(248, 57, 120);
    font-size: 12px;
    justify-content: center;


}
</style>
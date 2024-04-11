<template>

    <div class="tag-container">

        <p :class="followTag">{{ tag }}</p>

    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    tag: String,
    isActiveTag: Boolean
})


const followTag = computed(() =>
{
    return props.isActiveTag ? 'active-tag' : 'tag'
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
    font-weight: 700;
    justify-content: center;

}

.active-tag {
    padding: 2px 12px;
    border-radius: 9999px;
    border: 1px solid rgb(248, 57, 120);
    background-color: rgb(248, 57, 120);
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    justify-content: center;

}
</style>
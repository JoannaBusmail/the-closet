<template>

    <div class="tag-container">

        <p :class="followTag">{{ tag }}</p>

    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    tag: String,
    isFollowingTag: Boolean
})


const followTag = computed(() =>
{
    return props.isFollowingTag ? 'follow-tag' : 'tag'
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

.follow-tag {
    padding: 2px 12px;
    border-radius: 9999px;
    border: 1px solid rgb(248, 57, 120);
    background-color: rgb(248, 57, 120);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    justify-content: center;

}
</style>
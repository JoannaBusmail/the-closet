<template>
    <div
        class="observer"
        ref="root"
    >

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const observer = ref(null)
// we need to get the root element and asign it to the dom element
const root = ref(null)

const emit = defineEmits([ 'intersect' ])



onMounted(() =>
{
    observer.value = new IntersectionObserver(([ entry ]) =>
    {
        /*console.log(entry)
        - Object
        - when we are not seein the element, entry.isIntersecting = false
        - when we are seein the element, entry.isIntersecting = true
        
        */

        // if we have the entry and is intersecting
        // then we have to run tht logic---> fetch more data
        // but the logic is in the parent component
        // so we need to emit an event
        if (entry && entry.isIntersecting) {
            emit('intersect')
        }
    })

    observer.value.observe(root.value)
})

</script>

<style scoped>
.observer {
    height: 10px;
    width: 10px;

}
</style>
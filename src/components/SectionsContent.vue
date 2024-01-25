<template #content >
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>{{ sectionName }}</h1>

            <UploadPhoto />
        </div>

    </div>
</template>

<script setup>
import UploadPhoto from '@/components/UploadPhoto.vue'
import { ref } from 'vue'

import { useUIActions } from '@/composables/useUIActions.js'


const { contentStyles } = useUIActions()

const props = defineProps({
    sectionName: String

})


</script>



<style scoped>
.container {

    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    transition: margin-left 0.3s ease;
}

.content-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;

}

h1 {
    padding-top: 20px;
    margin-left: 20px;
}
</style>
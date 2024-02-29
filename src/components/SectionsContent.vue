<template #content >
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>{{ sectionName }}</h1>

            <UploadPhoto :onView="onView" />
            <Spinner v-if="loadingPosts" />
            <Cards
                v-else
                :postData="postData"
                :loadingPosts="loadingPosts"
                @btnClick="handleCardBtnClick"
                @intersect="emitIntersectEvent"
            />


        </div>


    </div>
</template>

<script setup>
import UploadPhoto from '@/components/UploadPhoto.vue'
import Cards from './Cards.vue'
import Spinner from './Spinner.vue'
import { useUIActions } from '@/composables/useUIActions.js'

const { contentStyles } = useUIActions()

const props = defineProps({
    sectionName: String,
    postData: Array,
    loadingPosts: Boolean,
    onView: String

})

const emit = defineEmits([ 'btnClick', 'intersect' ])

const handleCardBtnClick = (post) =>
{
    console.log('Button clicked in section component:', post)
    emit('btnClick', post)
}

const emitIntersectEvent = () =>
{
    emit('intersect')
}

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



@media screen and (max-width: 768px) {
    .content-container {
        width: 95vw;
        height: 95vh;
    }

}


@media screen and (max-width: 420px) {
    .content-container {
        width: 85vw;

    }

}
</style>
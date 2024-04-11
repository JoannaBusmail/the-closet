<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>{{ sectionName }}</h1>

            <UploadPhoto :onView="onView" />
            <p v-if="!postData.length">No {{ sectionName }} yet</p>
            <div v-else>
                <Spinner v-if="loadingPosts" />
                <Cards
                    v-else
                    :postData="postData"
                    :loadingPosts="loadingPosts"
                    @btnClick="handleCardBtnClick"
                    @toggleSwitch="handleCardSwitchBtnClick"
                    @intersect="emitIntersectEvent"
                />
            </div>

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

const emit = defineEmits([ 'btnClick', 'intersect', 'toggleSwitch' ])

const handleCardBtnClick = (post) => { emit('btnClick', post) }

const handleCardSwitchBtnClick = (post) => { emit('toggleSwitch', post) }

const emitIntersectEvent = () => { emit('intersect') }

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

p {
    margin-top: 30px;
    text-align: center;
    color: rgb(248, 57, 120);
    font-size: 14px;
    font-weight: 600;
}

@media screen and (max-width: 768px) {
    .content-container {
        width: 95vw;
        height: 95vh;
    }

    h1 {
        font-size: 24px;
        padding-top: 40px;
        margin-left: 5px;
    }

}


@media screen and (max-width: 420px) {
    .content-container {
        width: 85vw;

    }

}
</style>
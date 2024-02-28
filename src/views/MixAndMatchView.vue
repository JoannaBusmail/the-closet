<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>MIX & MATCH</h1>

            <div class="inputs-container">
                <p>1. Name your outfit</p>
                <InputText
                    class="secondary"
                    type="text"
                    placeholder="Outfit Name"
                    v-model="outfitName"
                />
                <p>2. Choose closet to save your outfit</p>
                <div class="radio-input">
                    <InputRadio
                        v-for="(option, index) in radioOptions"
                        v-model="style"
                        :key="index"
                        :id="option.id"
                        :label="option.label"
                        :value="option.value"
                        @update:modelValue="updateStyle"
                    >
                    </InputRadio>
                </div>
                <p class="mixMatchForm-instruction">3. Select post to combine Top,
                    Bottom and Shoes. You can filter by
                    color and style</p>
            </div>

            <MixAndMatchForm
                formName="TOP"
                :isLoadingPosts="loadingPosts"
                :posts="showTopPosts"
                @selectImage="selectTopPostHandler"
                @updateBoth="filterTopPosts"
                :errorMessage="topErrorMessage"
            />

            <MixAndMatchForm
                formName="BOTTOM"
                :isLoadingPosts="loadingBottomPosts"
                :posts="showBottomPosts"
                @selectImage="selectBottomPostHandler"
                @updateBoth="filterBottomPosts"
                :errorMessage="bottomErrorMessage"
            />


            <MixAndMatchForm
                formName="SHOES"
                :isLoadingPosts="loadingShoesPosts"
                :posts="showShoesPosts"
                @selectImage="selectShoesPostHandler"
                @updateBoth="filterShoesPosts"
                :errorMessage="shoesErrorMessage"
            />




            <p>Selected Top Image: {{ selectedPost.top.url }}</p>
            <p>Selected Bottom Image: {{ selectedPost.bottom.url }}</p>
            <p>Selected Bottom Image: {{ selectedPost.shoes.url }}</p>

        </div>
    </div>
</template>
  
<script setup>
import MixAndMatchForm from '@/components/MixAndMatchForm.vue'
import InputText from '@/components/InputText.vue'
import InputRadio from '@/components/InputRadio.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { useFetchBottomDataStore } from '@/stores/fetchBottomData'
import { useFetchShoesDataStore } from '@/stores/fetchShoesData'
import { storeToRefs } from 'pinia'
import { usePostActions } from '@/composables/usePostActions.js'
import { useUIActions } from '@/composables/useUIActions.js'




// FETCH TOP DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { fetchTopPosts, setFilteredTopPosts } = fetchTopDataStore
const { topPosts, loadingPosts, filteredTopPosts } = storeToRefs(fetchTopDataStore)

// FETCH BOTTOM DATA STORE
const fetchBottomDataStore = useFetchBottomDataStore()
const { fetchBottomPosts, setFilteredBottomPosts } = fetchBottomDataStore
const { bottomPosts, loadingBottomPosts, filteredBottomPosts } = storeToRefs(fetchBottomDataStore)


// FETCH SHOES DATA STORE
const fetchShoesDataStore = useFetchShoesDataStore()
const { fetchShoesPosts, setFilteredShoesPosts } = fetchShoesDataStore
const { shoesPosts, loadingShoesPosts, filteredShoesPosts } = storeToRefs(fetchShoesDataStore)


// UI AND POSTS ACTIONS
const { selectedPost, selectPost, filterPosts, selectPostHandler, showPosts } = usePostActions()


const topErrorMessage = ref('')
const bottomErrorMessage = ref('')
const shoesErrorMessage = ref('')
const outfitName = ref('')
const style = ref('')

const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },

])


const emit = defineEmits([ 'updateStyle' ])


const updateStyle = () =>
{
    emit('updateStyle', { style: style })

}



onMounted(async () =>
{
    await fetchTopPosts()
    await fetchBottomPosts()
    await fetchShoesPosts()

})




//select post handlers
const selectTopPostHandler = (index) =>
{
    selectPostHandler(index, topPosts.value, 'top')
}

const selectBottomPostHandler = (index) =>
{
    selectPostHandler(index, bottomPosts.value, 'bottom')
}


const selectShoesPostHandler = (index) =>
{
    selectPostHandler(index, shoesPosts.value, 'shoes')
}


//filter posts

const filterTopPosts = (filters) =>
{
    filterPosts(topPosts, setFilteredTopPosts, topErrorMessage, filters)
}

const filterBottomPosts = (filters) =>
{
    filterPosts(bottomPosts, setFilteredBottomPosts, bottomErrorMessage, filters)
}


const filterShoesPosts = (filters) =>
{
    filterPosts(shoesPosts, setFilteredShoesPosts, shoesErrorMessage, filters)
}


//show posts
const showTopPosts = showPosts(topPosts, filteredTopPosts, topErrorMessage)
const showBottomPosts = showPosts(bottomPosts, filteredBottomPosts, bottomErrorMessage)
const showShoesPosts = showPosts(shoesPosts, filteredShoesPosts, shoesErrorMessage)





// UI AND POSTS ACTIONS
const { contentStyles } = useUIActions()


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


.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

p,
.mixMatchForm-instruction {
    margin-top: 50px;
    margin-bottom: 10px;
    color: rgb(248, 57, 120);
    font-size: 14px;
    font-weight: 600;


}

.mixMatchForm-instruction {
    margin-bottom: -10px;

}


.radio-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
</style>
  
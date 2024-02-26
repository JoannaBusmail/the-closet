<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>MIX & MATCH</h1>

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

            <p>Selected Top Image: {{ selectedPost.top.id }}</p>
            <p>Selected Bottom Image: {{ selectedPost.bottom.id }}</p>
            <p>Selected Bottom Image: {{ selectedPost.shoes.id }}</p>

        </div>
    </div>
</template>
  
<script setup>
import MixAndMatchForm from '@/components/MixAndMatchForm.vue'
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


onMounted(async () =>
{
    await fetchTopPosts()
    await fetchBottomPosts()
    await fetchShoesPosts()

})



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

const showTopPosts = showPosts(topPosts, filteredTopPosts, topErrorMessage)
const showBottomPosts = showPosts(bottomPosts, filteredBottomPosts, bottomErrorMessage)
const showShoesPosts = showPosts(shoesPosts, filteredShoesPosts, shoesErrorMessage)





const selectedPostUrl = computed(() => selectedPost.value ? selectedPost.value.url : null)
const selectedPostID = computed(() => selectedPost.value ? selectedPost.value.id : null)

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
</style>
  
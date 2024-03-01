<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>MIX & MATCH</h1>

            <p class="mixMatchForm-instruction">1. Select post to combine Top,
                Bottom and Shoes. You can filter by
                color and style</p>
            <form @submit.prevent="handleFormSubmit">
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

                <div class="inputs-container">
                    <p>2. Name your outfit</p>
                    <InputText
                        class="secondary"
                        type="text"
                        placeholder="Outfit Name"
                        v-model="outfitName"
                    />
                    <p>3. Choose closet to save your outfit</p>
                    <div class="radio-input">
                        <InputRadio
                            v-for="(option, index) in radioOptions"
                            v-model="style"
                            :key="index"
                            :id="option.id"
                            :label="option.label"
                            :value="option.value"
                        >
                        </InputRadio>
                    </div>

                </div>
                <div class="button-container">
                    <Button
                        @btnClick="handleCancel"
                        btnName="Cancel"
                        btnType="secondary"
                    ></Button>

                    <Button
                        btnName="Submit"
                        btnType="secondary"
                        :disabled="loadingClosetPost"
                    ></Button>
                </div>

                <ErrorMessageComp
                    class="submit-message"
                    v-if="errorMsgUploadClosetPost || successMsgUploadClosetPost"
                    :message="errorMsgUploadClosetPost ? errorMsgUploadClosetPost : successMsgUploadClosetPost"
                    v-show="showErrorMessage"
                />



            </form>

        </div>
    </div>
</template>
  
<script setup>
import MixAndMatchForm from '@/components/MixAndMatchForm.vue'
import InputText from '@/components/InputText.vue'
import InputRadio from '@/components/InputRadio.vue'
import Button from '@/components/Button.vue'
import ErrorMessageComp from '@/components/ErrorMessageComp.vue'
import { ref, onMounted } from 'vue'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { useFetchBottomDataStore } from '@/stores/fetchBottomData'
import { useFetchShoesDataStore } from '@/stores/fetchShoesData'
import { storeToRefs } from 'pinia'
import { usePostActions } from '@/composables/usePostActions.js'
import { useUIActions } from '@/composables/useUIActions.js'
import { useUserStore } from '@/stores/users'


const userStore = useUserStore()
const { user } = storeToRefs(userStore)


const showErrorMessage = ref(false)

// Función para mostrar el mensaje de error durante 5 segundos
const showErrorMessageFor5Seconds = () =>
{
    showErrorMessage.value = true
    setTimeout(() =>
    {
        showErrorMessage.value = false
    }, 5000) // 5000 milisegundos = 5 segundos
}


// FETCH TOP DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { setFilteredTopPosts, fetchAllTopPosts } = fetchTopDataStore
const { topPosts, loadingPosts, filteredTopPosts } = storeToRefs(fetchTopDataStore)

// FETCH BOTTOM DATA STORE
const fetchBottomDataStore = useFetchBottomDataStore()
const { fetchAllBottomPosts, setFilteredBottomPosts } = fetchBottomDataStore
const { bottomPosts, loadingBottomPosts, filteredBottomPosts } = storeToRefs(fetchBottomDataStore)


// FETCH SHOES DATA STORE
const fetchShoesDataStore = useFetchShoesDataStore()
const { fetchAllShoesPosts, setFilteredShoesPosts } = fetchShoesDataStore
const { shoesPosts, loadingShoesPosts, filteredShoesPosts } = storeToRefs(fetchShoesDataStore)


// UI AND POSTS ACTIONS
const { filterPosts, selectPostHandler, showPosts, handleUploadClosetPost, loadingClosetPost, errorMsgUploadClosetPost, successMsgUploadClosetPost } = usePostActions()



// UI AND POSTS ACTIONS
const { contentStyles } = useUIActions()



const topErrorMessage = ref('')
const bottomErrorMessage = ref('')
const shoesErrorMessage = ref('')
const outfitName = ref('')
const style = ref('')

const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },

])



onMounted(async () =>
{
    await fetchAllTopPosts()
    await fetchAllBottomPosts()
    await fetchAllShoesPosts()

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


const handleFormSubmit = async () =>
{
    await handleUploadClosetPost(outfitName.value, 'casual', user.value.id, style.value)
    await handleUploadClosetPost(outfitName.value, 'elegant', user.value.id, style.value)
    showErrorMessageFor5Seconds()
    outfitName.value = ''
    style.value = ''

}

const handleCancel = (e) =>
{
    e.preventDefault()
    outfitName.value = ''
    style.value = ''
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


.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
    text-align: center;


}


.radio-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 40px;
    margin: 25px 0;
    padding-bottom: 35px;

}


.submit-message {
    text-align: center;
    font-size: 18px;
    margin-bottom: 20px;
}
</style>
  
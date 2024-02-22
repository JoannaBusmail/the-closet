<template>
    <div class="container">

        <MixAndMatchForm
            formName="TOP"
            :isLoadingPosts="loadingPosts"
            :posts="showPosts"
            @selectImage="selectTopPostHandler"
            @updateBoth="filterPosts"
            :errorMessage="errorMessage"
        />
        <p>Selected Image: {{ selectedPostUrl }}</p>
        <p>Selected Image: {{ selectedPostID }}</p>

    </div>
</template>
  
<script setup>
import MixAndMatchForm from '@/components/MixAndMatchForm.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { storeToRefs } from 'pinia'
import { usePostActions } from '@/composables/usePostActions.js'




// FETCH TOP DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { fetchTopPosts, setTopPosts, setFilteredPosts } = fetchTopDataStore
const { topPosts, loadingPosts, filteredPosts } = storeToRefs(fetchTopDataStore)


// UI AND POSTS ACTIONS

const { selectedPost, selectPost } = usePostActions()

const errorMessage = ref('')

onMounted(async () =>
{
    await fetchTopPosts()
    console.log('Top posts:', topPosts.value)
})

const selectTopPostHandler = (index) =>
{
    selectPost(index, topPosts.value)
}




const filterPosts = ({ color, style }) =>
{
    let filtered = topPosts.value

    if (color) {
        filtered = filtered.filter(post =>
        {
            const postColor = post.color ? post.color.trim().toLowerCase() : ''
            return postColor.includes(color.trim().toLowerCase())
        })

    }

    if (style && style !== 'all') {
        filtered = filtered.filter(post => post.style === style)
    }

    if (style === 'all') {
        errorMessage.value = ''
        setFilteredPosts(filtered)
        return
    }


    if ((color || style) && filtered.length === 0) {
        errorMessage.value = 'No matching posts found.'

    } else {
        errorMessage.value = ''
    }

    setFilteredPosts(filtered)
}



const showPosts = computed(() =>
{
    if (filteredPosts.value.length === 0) {
        if (errorMessage.value !== '') {
            return []
        } else {
            return topPosts.value
        }
    } else {
        return filteredPosts.value
    }
})



const selectedPostUrl = computed(() => selectedPost.value ? selectedPost.value.url : null)
const selectedPostID = computed(() => selectedPost.value ? selectedPost.value.id : null)



</script>
  
<style scoped></style>
  
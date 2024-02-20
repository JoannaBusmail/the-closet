<template>
    <div class="container">

        <MixAndMatchForm
            formName="TOP"
            :isLoadingPosts="loadingPosts"
            :posts="topPosts"
            @selectImage="selectTopPostHandler"
            @update="filterTopPosts"
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
const { fetchTopPosts, setTopPosts } = fetchTopDataStore
const { topPosts, loadingPosts } = storeToRefs(fetchTopDataStore)


// UI AND POSTS ACTIONS

const { selectedPost, selectPost } = usePostActions()


onMounted(async () =>
{
    await fetchTopPosts()
    console.log('Top posts:', topPosts.value)
})

const selectTopPostHandler = (index) =>
{
    selectPost(index, topPosts.value)
}

const filterTopPosts = ({ color }) =>
{
    const inputColor = color ? color.trim().toLowerCase() : null

    if (!inputColor) {
        // If color is empty, show all posts
        fetchTopPosts()
        return
    }

    const filteredPosts = topPosts.value.filter(post =>
    {
        const postColor = post.color.trim().toLowerCase()
        return postColor.includes(inputColor)
    })

    if (filteredPosts.length === 0) {
        console.log('No matching posts found.')
    }

    setTopPosts(filteredPosts)
}





const selectedPostUrl = computed(() => selectedPost.value ? selectedPost.value.url : null)
const selectedPostID = computed(() => selectedPost.value ? selectedPost.value.id : null)





</script>
  
<style scoped></style>
  
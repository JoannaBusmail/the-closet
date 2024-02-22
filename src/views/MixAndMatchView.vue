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

            <p>Selected Top Image: {{ selectedPost.top.id }}</p>
            <p>Selected Bottom Image: {{ selectedPost.bottom.id }}</p>
        </div>
    </div>
</template>
  
<script setup>
import MixAndMatchForm from '@/components/MixAndMatchForm.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { useFetchBottomDataStore } from '@/stores/fetchBottomData'
import { storeToRefs } from 'pinia'
import { usePostActions } from '@/composables/usePostActions.js'
import { useUIActions } from '@/composables/useUIActions.js'




// FETCH TOP DATA STORE
const fetchTopDataStore = useFetchTopDataStore()
const { fetchTopPosts, setFilteredTopPosts } = fetchTopDataStore
const { topPosts, loadingPosts, filteredTopPosts } = storeToRefs(fetchTopDataStore)

// FETCH TOP DATA STORE
const fetchBottomDataStore = useFetchBottomDataStore()
const { fetchBottomPosts, setFilteredBottomPosts } = fetchBottomDataStore
const { bottomPosts, loadingBottomPosts, filteredBottomPosts } = storeToRefs(fetchBottomDataStore)


// UI AND POSTS ACTIONS
const { selectedPost, selectPost } = usePostActions()


const topErrorMessage = ref('')
const bottomErrorMessage = ref('')


onMounted(async () =>
{
    await fetchTopPosts()
    await fetchBottomPosts()

})


/*const selectTopPostHandler = (index) =>
{

    if (selectedPost.value && selectedPost.value.top.id === topPosts.value[ index ]?.id) {
        // Si el mismo post se selecciona nuevamente, deseleccionarlo
        selectPost(null, null)

    } else {
        selectPost(index, topPosts.value)

    }
}*/

const selectTopPostHandler = (index) =>
{
    const post = topPosts.value[ index ]

    if (selectedPost.top.id === post?.id) {
        // Si el mismo post se selecciona nuevamente, deseleccionarlo
        selectPost(null, null, 'top')
    } else {
        selectPost(index, topPosts.value, 'top')
    }
}

const selectBottomPostHandler = (index) =>
{
    const post = bottomPosts.value[ index ]

    if (selectedPost.bottom.id === post?.id) {

        selectPost(null, null, 'bottom')
    } else {
        selectPost(index, bottomPosts.value, 'bottom')
    }
}

/*const selectBottomPostHandler = (index) =>
{
    selectPost(index, bottomPosts.value)
}
*/


const filterTopPosts = ({ color, style }) =>
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
        topErrorMessage.value = ''
        setFilteredTopPosts(filtered)
        return
    }


    if ((color || style) && filtered.length === 0) {
        topErrorMessage.value = 'No matching posts found.'

    } else {
        topErrorMessage.value = ''
    }

    setFilteredTopPosts(filtered)
}


const filterBottomPosts = ({ color, style }) =>
{
    let filtered = bottomPosts.value

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
        bottomErrorMessage.value = ''
        setFilteredBottomPosts(filtered)
        return
    }


    if ((color || style) && filtered.length === 0) {
        bottomErrorMessage.value = 'No matching posts found.'

    } else {
        bottomErrorMessage.value = ''
    }

    setFilteredBottomPosts(filtered)
}



const showTopPosts = computed(() =>
{
    if (filteredTopPosts.value.length === 0) {
        if (topErrorMessage.value !== '') {
            return []
        } else {
            return topPosts.value
        }
    } else {
        return filteredTopPosts.value
    }
})

const showBottomPosts = computed(() =>
{
    if (filteredBottomPosts.value.length === 0) {
        if (bottomErrorMessage.value !== '') {
            return []
        } else {
            return bottomPosts.value
        }
    } else {
        return filteredBottomPosts.value
    }
})



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
  
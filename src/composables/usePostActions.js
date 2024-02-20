import { reactive} from 'vue';


const selectedPost = reactive({ id: null, url: null })

export function usePostActions () {

    const { VITE_BASE_PHOTO_URL } = import.meta.env

    const selectPost = (index, post) =>
    {
        if (post && post[ index ]) {
            selectedPost.value = {
                id: post[ index ].id,
                url: `${VITE_BASE_PHOTO_URL}${post[ index ].url}`
            }
            console.log('Selected image:', selectedPost.value)
        } else {
            console.log('Unable to select image. TopPosts is not populated yet or the specified index is out of bounds.')
        }
    }
    
    return {selectedPost, selectPost}
}


// before in mix and match component

/*const selectedPost = reactive({ id: null, url: null })
const selectPost = (index) =>
{
    if (!loadingPosts.value && topPosts.value && topPosts.value[ index ]) {
        selectedPost.value = {
            id: topPosts.value[ index ].id,
            url: `${VITE_BASE_PHOTO_URL}${topPosts.value[ index ].url}`
        }
        console.log('Selected image:', selectedPost.value)
    } else {
        console.log('Unable to select image. TopPosts is not populated yet or the specified index is out of bounds.')
    }
}
*/
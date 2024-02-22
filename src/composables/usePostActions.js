/*import { reactive} from 'vue';


const selectedPost = reactive({ id: null, url: null })

export function usePostActions () {

    const { VITE_BASE_PHOTO_URL } = import.meta.env

    const selectPost = (index, post) => {
     if (post && post[index]) {
            // If post exists and index is not null, select the post
            selectedPost.value = {
                id: post[index].id,
                url: `${VITE_BASE_PHOTO_URL}${post[index].url}`
            };
            console.log('Selected id:', selectedPost.value.id)
           
        } else {
            // If index is null or post is not found, deselect the post
            selectedPost.value = { id: null, url: null };
            console.log('POST DESELECTED');
            console.log('Selected id:', selectedPost.value.id)
        }
    };
    
    
    return {selectedPost, selectPost}
}
*/

import { reactive } from 'vue';

const selectedPost = reactive({ top: { id: null, url: null }, bottom: { id: null, url: null } })

export function usePostActions () {

    const { VITE_BASE_PHOTO_URL } = import.meta.env

    const selectPost = (index, post, postType) => {
        if (post && post[index]) {
            // If post exists and index is not null, select the post
            selectedPost[postType] = {
                id: post[index].id,
                url: `${VITE_BASE_PHOTO_URL}${post[index].url}`
            };
            console.log('Selected id:', selectedPost[postType].id)
           
        } else {
            // If index is null or post is not found, deselect the post
            selectedPost[postType] = { id: null, url: null };
            console.log(`${postType.toUpperCase()} POST DESELECTED`);
            console.log('Selected id:', selectedPost[postType].id)
        }
    };
    
    return { selectedPost, selectPost }
}

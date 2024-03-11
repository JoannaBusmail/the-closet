import { reactive, computed, ref } from 'vue';
import { supabase } from '../../supabase'




const selectedPost = reactive({ top: { id: null, url: null, seen_at: null }, bottom: { id: null, url: null, seen_at: null  }, shoes: { id: null, url: null, seen_at: null  }})
const loadingClosetPost= ref(false)
const errorMsgUploadClosetPost = ref('')
const successMsgUploadClosetPost = ref('')
const uploadedClosetPost = ref(false)





export function usePostActions () {

    
 

    const { VITE_BASE_PHOTO_URL } = import.meta.env

    const selectPost = (postId, post, postType) => {
        console.log('postId:', postId);
        console.log('post:', post);
        console.log('postType:', postType);
        if (post && postId) {
       
            selectedPost[postType] = {
                id: post.id,
                url: `${post.url}`,
                seen_at: post.seen_at
            };
            console.log('Selected id:', selectedPost[postType].id)
            console.log('url:', selectedPost[postType].url)
            console.log('seen_at:', selectedPost[postType].seen_at)
           
        } else {
  
            selectedPost[postType] = { id: null, url: null };
            console.log(`${postType} POST DESELECTED`);
            console.log('Selected id:', selectedPost[postType].id)
        }
    };



    const selectPostHandler = (postId, post, postType) => {
        const currentPost = selectedPost[postType];
        const postID = post ? post.id : null;
        
        if (currentPost.id === postID) {
            selectPost(null, null, postType);
        } else {
            selectPost(postId, post, postType);
        }
    };


    const showPosts = (posts, filteredPosts, errorMessage) => {
        return computed(() => {
            if (filteredPosts.value.length === 0) {
                if (errorMessage.value !== '') {
                    return [];
                } else {
                    return posts.value;
                }
            } else {
                return filteredPosts.value;
            }
        });
    };



    const filterPosts = (posts, setFilteredPosts, errorMessage, { color, style }) => {
        let filtered = posts.value;
    
        if (color) {
            filtered = filtered.filter(post => {
                const postColor = post.color ? post.color.trim().toLowerCase() : '';
                return postColor.includes(color.trim().toLowerCase());
            });
        }
    
        if (style && style !== 'all') {
            filtered = filtered.filter(post => post.style === style);
        }
    
        if (style === 'all') {
            errorMessage.value = '';
            setFilteredPosts(filtered);
            return;
        }
    
        if ((color || style) && filtered.length === 0) {
            errorMessage.value = 'No matching posts found.';
        } else {
            errorMessage.value = '';
        }
    
        setFilteredPosts(filtered);
    };




    const handleUploadClosetPost = async(name, closet, user, style) => {
        const newClosetPost = {
            top_id: selectedPost.top.id,
            top_url: selectedPost.top.url,
            top_seen_at: selectedPost.top.seen_at,
            bottom_id: selectedPost.bottom.id,
            bottom_url: selectedPost.bottom.url,
            bottom_seen_at: selectedPost.bottom.seen_at,
            shoes_id: selectedPost.shoes.id,
            shoes_url: selectedPost.shoes.url,
            shoes_seen_at: selectedPost.shoes.seen_at,
            outfit_name: name,
            owner_id: user
        }

        try {
            if (style === closet && selectedPost.top.id && selectedPost.bottom.id && selectedPost.shoes.id ) {
            // If both top and bottom posts are selected, upload the casual post
                loadingClosetPost.value = true
                await supabase.from(closet).insert(newClosetPost)
                successMsgUploadClosetPost.value = 'Outfit uploaded successfully into closet!'
                uploadedClosetPost.value = true
           
                 console.log('add to closet db')
        }
        
        } catch (error) {
                console.error('Error uploading post:', error.message)
                errorMsgUploadClosetPost.value = 'Error uploading outfit into closet. Please try again.'
       
        
        }

            loadingClosetPost.value = false

    }
  
    
    return { selectedPost, loadingClosetPost, selectPost, filterPosts, selectPostHandler, showPosts, handleUploadClosetPost, errorMsgUploadClosetPost, successMsgUploadClosetPost, uploadedClosetPost}
}
















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


//FILTER


/*const filterTopPosts = ({ color, style }) =>
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
}*/





//SELECT HANDLER

    /*const selectTopPostHandler = (index) =>
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
}*/



//SHOW POSTS

/*const showTopPosts = computed(() =>
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
})*/
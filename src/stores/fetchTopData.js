import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchTopDataStore = defineStore('fetchTopData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)


    const topPosts = ref([])
    const filteredTopPosts = ref([])
    const lastCardIndex = ref(1)
    const reachEndOfPosts = ref(false)
    const loadingPosts = ref(false)


    const fetchTopPosts = async () => {
        if (user.value && user.value.id) {
            loadingPosts.value = true
         
            const { data: fetchTopPosts } = await supabase
            .from('top')
            .select()
            .eq('owner_id', user.value.id)
            .range(0, lastCardIndex.value)
            .order('created_at', { ascending: false })


            topPosts.value = fetchTopPosts
            console.log(topPosts.value)
            loadingPosts.value = false
            
      };
      
    }
    
    const addNewPost = (newPost) => {
        topPosts.value = [newPost, ...topPosts.value]
    }

 
    const deleteTopPostFromDB = async (id) => {
        await supabase
        .from('top')
        .delete()
        .eq('id', id)
    }



    const deleteTopPost = async (id) => {
        // Find the post to be deleted
        const postToDelete = topPosts.value.find(post => post.id === id);
        if (!postToDelete) {
            // Post not found, handle error or return
            return;
        }
    
        // Delete the post from the database
        await deleteTopPostFromDB(id);
    
        // Remove the post from the local array
        topPosts.value = topPosts.value.filter(post => post.id !== id);
    
        // Delete the corresponding image from the bucket
        const fileName = postToDelete.url.split('/').pop(); // Extract the file name from the URL
        await supabase.storage.from('photos').remove([`public/${fileName}`]);
    }
    

    const fetchNextTopPosts = async () => {

        if (!reachEndOfPosts.value) {
       
          
            const { data: fetchTopPosts } = await supabase
                .from('top')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
                .order('created_at', { ascending: false })
    
          
            topPosts.value = [ ...topPosts.value, ...fetchTopPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 2
    
            if (!fetchTopPosts.length) {
                reachEndOfPosts.value = true
            }
          
        }
    }


    

    const setTopPosts = (posts) => {
        topPosts.value = posts
    }   

    const setFilteredTopPosts = (posts) =>{
        filteredTopPosts.value = posts
    }

   

    return { fetchTopPosts, topPosts, loadingPosts, filteredTopPosts, addNewPost, deleteTopPost, fetchNextTopPosts , setTopPosts, setFilteredTopPosts}
})


 

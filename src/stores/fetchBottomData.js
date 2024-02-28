import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive, watchEffect } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchBottomDataStore = defineStore('fetchBottomData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    /*watchEffect(() => {
        if (user.value) {
          fetchbottomPosts()
        }
      })*/

    const bottomPosts = ref([])
    const filteredBottomPosts = ref([])
    const lastCardIndex = ref(1)
    const reachEndOfPosts = ref(false)
    const loadingBottomPosts = ref(false)


    const fetchBottomPosts = async () => {
        if (user.value && user.value.id) {
            loadingBottomPosts.value = true
         
            const { data: fetchBottomPosts } = await supabase
            .from('bottom')
            .select()
            .eq('owner_id', user.value.id)
            .range(0, lastCardIndex.value)
            .order('created_at', { ascending: false })


            bottomPosts.value = fetchBottomPosts
            console.log(bottomPosts.value)
            loadingBottomPosts.value = false
            
      };
      
    }
    
    const addNewPost = (newPost) => {
        bottomPosts.value = [newPost, ...bottomPosts.value]
    }

 
    const deleteBottomPostFromDB = async (id) => {
        await supabase
        .from('bottom')
        .delete()
        .eq('id', id)
    }

    /*const deleteBottomPost = async (id) => {
        bottomPosts.value = bottomPosts.value.filter(post => post.id !== id)
        await deleteBottomPostFromDB(id)
    }*/

    const deleteBottomPost = async (id) => {
        // Find the post to be deleted
        const postToDelete = bottomPosts.value.find(post => post.id === id);
        if (!postToDelete) {
            // Post not found, handle error or return
            return;
        }
    
        // Delete the post from the database
        await deleteBottomPostFromDB(id);
    
        // Remove the post from the local array
        bottomPosts.value = bottomPosts.value.filter(post => post.id !== id);
    
        // Delete the corresponding image from the bucket
        const fileName = postToDelete.url.split('/').pop(); // Extract the file name from the URL
        await supabase.storage.from('photos').remove([`public/${fileName}`]);
    }
    
    

    const fetchNextBottomPosts = async () => {

        if (!reachEndOfPosts.value) {
      
          
            const { data: fetchbottomPosts } = await supabase
                .from('bottom')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
                .order('created_at', { ascending: false })
    
          
            bottomPosts.value = [ ...bottomPosts.value, ...fetchbottomPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 2
    
            if (!fetchbottomPosts.length) {
                reachEndOfPosts.value = true
            }
       
        }
    }

    const setFilteredBottomPosts = (posts) =>{
        filteredBottomPosts.value = posts
    }


    return { fetchBottomPosts, bottomPosts, loadingBottomPosts, filteredBottomPosts, addNewPost, deleteBottomPost, fetchNextBottomPosts, setFilteredBottomPosts }
})


 

import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchClosetElegantDataStore = defineStore('fetchClosetElegant', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)


    const closetElegantPosts = ref([])
    const filteredClosetElegantPosts = ref([])
    const lastCardIndex = ref(1)
    const reachEndOfPosts = ref(false)
    const loadingClosetElegantPosts = ref(false)
    const isPublicPosts = ref(false)



    // fetch only the 2 first posts - this fetch is for loading post while scrolling down
    const fetchClosetElegantPosts = async () => {
        if (user.value && user.value.id) {
            loadingClosetElegantPosts.value = true
         
            const { data: fetchClosetElegantPosts } = await supabase
            .from('elegant')
            .select()
            .eq('owner_id', user.value.id)
            .range(0, lastCardIndex.value)
            .order('created_at', { ascending: false })


            closetElegantPosts.value = fetchClosetElegantPosts
            console.log(closetElegantPosts.value)
            loadingClosetElegantPosts.value = false
            
      };
      
    }

    // this fetch is for carousel

    const fetchAllClosetElegantPosts = async () => {
        if (user.value && user.value.id) {
            loadingClosetElegantPosts.value = true
         
            const { data: fetchClosetElegantPosts } = await supabase
            .from('elegant')
            .select()
            .eq('owner_id', user.value.id)
            .order('created_at', { ascending: false })


            closetElegantPosts.value = fetchClosetElegantPosts
            console.log(closetElegantPosts.value)
            loadingClosetElegantPosts.value = false
            
      };
      
    }
    
  
 
    const deleteClosetElegantPostsFromDB = async (id) => {
        await supabase
        .from('elegant')
        .delete()
        .eq('id', id)
    }



    const deleteClosetElegantPosts = async (id) => {
        // Find the post to be deleted
        const postToDelete = closetElegantPosts.value.find(post => post.id === id);
        if (!postToDelete) {
            // Post not found, handle error or return
            return;
        }
    
        // Delete the post from the database
        await deleteClosetElegantPostsFromDB(id);
    
        // Remove the post from the local array
        closetElegantPosts.value = closetElegantPosts.value.filter(post => post.id !== id);
    
       /* // Delete the corresponding image from the bucket
        const fileName = postToDelete.url.split('/').pop(); // Extract the file name from the URL
        await supabase.storage.from('photos').remove([`public/${fileName}`]);*/
    }
    

    const fetchNextClosetElegantPosts = async () => {

        if (!reachEndOfPosts.value) {
       
          
            const { data: fetchClosetElegantPosts } = await supabase
                .from('elegant')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
                .order('created_at', { ascending: false })
    
          
            closetElegantPosts.value = [ ...closetElegantPosts.value, ...fetchClosetElegantPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 2
    
            if (!fetchClosetElegantPosts.length) {
                reachEndOfPosts.value = true
            }
          
        }
    }


    const publishElegantPosts = async () => {
      
        await supabase
        .from('elegant')
        .update({ public: true })
        .eq('owner_id', user.value.id)
        
        isPublicPosts.value = true

    }

    const unPublishElegantPosts = async () => {
      
        await supabase
        .from('elegant')
        .update({ public: false })
        .eq('owner_id', user.value.id)
        
        isPublicPosts.value = false

    }

    const fetchIsPublicPosts = async () => {
        const { data, error } = await supabase
            .from('elegant')
            .select('public')
            .eq('owner_id', user.value.id)
            .eq('public', true)
            .limit(1) 
    
        if (data && data.length > 0) {
            isPublicPosts.value = true
        } else {
            isPublicPosts.value = false
        }
    }
   

    return {isPublicPosts, fetchIsPublicPosts, unPublishElegantPosts, publishElegantPosts, fetchClosetElegantPosts, fetchAllClosetElegantPosts,  closetElegantPosts, loadingClosetElegantPosts, filteredClosetElegantPosts, deleteClosetElegantPosts, fetchNextClosetElegantPosts }
})


 

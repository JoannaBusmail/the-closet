import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchClosetCasualDataStore = defineStore('fetchClosetCasual', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)


    const closetCasualPosts = ref([])
    const filteredClosetCasualPosts = ref([])
    const lastCardIndex = ref(1)
    const reachEndOfPosts = ref(false)
    const loadingClosetCasualPosts = ref(false)
    const isPublicPosts = ref(false)



    // fetch only the 2 first posts - this fetch is for loading post while scrolling down
    const fetchClosetCasualPosts = async () => {
        if (user.value && user.value.id) {
            loadingClosetCasualPosts.value = true
         
            const { data: fetchClosetCasualPosts } = await supabase
            .from('casual')
            .select()
            .eq('owner_id', user.value.id)
            .range(0, lastCardIndex.value)
            .order('created_at', { ascending: false })


            closetCasualPosts.value = fetchClosetCasualPosts
            console.log(closetCasualPosts.value)
            loadingClosetCasualPosts.value = false
            
      };
      
    }

    // this fetch is for carousel

    const fetchAllClosetCasualPosts = async () => {
        if (user.value && user.value.id) {
            loadingClosetCasualPosts.value = true
         
            const { data: fetchClosetCasualPosts } = await supabase
            .from('casual')
            .select()
            .eq('owner_id', user.value.id)
            .order('created_at', { ascending: false })


            closetCasualPosts.value = fetchClosetCasualPosts
            console.log(closetCasualPosts.value)
            loadingClosetCasualPosts.value = false
            
      };
      
    }
    
  
 
    const deleteClosetCasualPostsFromDB = async (id) => {
        await supabase
        .from('casual')
        .delete()
        .eq('id', id)
    }



    const deleteClosetCasualPosts = async (id) => {
        // Find the post to be deleted
        const postToDelete = closetCasualPosts.value.find(post => post.id === id);
        if (!postToDelete) {
            // Post not found, handle error or return
            return;
        }
    
        // Delete the post from the database
        await deleteClosetCasualPostsFromDB(id);
    
        // Remove the post from the local array
        closetCasualPosts.value = closetCasualPosts.value.filter(post => post.id !== id);
    
       /* // Delete the corresponding image from the bucket
        const fileName = postToDelete.url.split('/').pop(); // Extract the file name from the URL
        await supabase.storage.from('photos').remove([`public/${fileName}`]);*/
    }
    

    const fetchNextClosetCasualPosts = async () => {

        if (!reachEndOfPosts.value) {
       
          
            const { data: fetchClosetCasualPosts } = await supabase
                .from('casual')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
                .order('created_at', { ascending: false })
    
          
            closetCasualPosts.value = [ ...closetCasualPosts.value, ...fetchClosetCasualPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 2
    
            if (!fetchClosetCasualPosts.length) {
                reachEndOfPosts.value = true
            }
          
        }
    }


    const publishCasualPosts = async () => {
      
        await supabase
        .from('casual')
        .update({ public: true })
        .eq('owner_id', user.value.id)
        
        isPublicPosts.value = true

    }

    const unPublishCasualPosts = async () => {
      
        await supabase
        .from('casual')
        .update({ public: false })
        .eq('owner_id', user.value.id)
        
        isPublicPosts.value = false

    }

    const fetchIsPublicPosts = async () => {
        const { data, error } = await supabase
            .from('casual')
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

    return { isPublicPosts,fetchIsPublicPosts,  unPublishCasualPosts, publishCasualPosts, fetchClosetCasualPosts, fetchAllClosetCasualPosts,  closetCasualPosts, loadingClosetCasualPosts, filteredClosetCasualPosts, deleteClosetCasualPosts, fetchNextClosetCasualPosts }
})


 

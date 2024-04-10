import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchShoesDataStore = defineStore('fetchShoesData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    /*watchEffect(() => {
        if (user.value) {
          fetchshoesPosts()
        }
      })*/

    const shoesPosts = ref([])
    const filteredShoesPosts = ref([])
    const lastCardIndex = ref(1)
    const reachEndOfPosts = ref(false)
    const loadingShoesPosts = ref(false)


    const fetchShoesPosts = async () => {
        if (user.value && user.value.id) {
            loadingShoesPosts.value = true
         
            const { data: fetchShoesPosts } = await supabase
            .from('shoes')
            .select()
            .eq('owner_id', user.value.id)
            .range(0, lastCardIndex.value)
            .order('created_at', { ascending: false })


            shoesPosts.value = fetchShoesPosts
            console.log(shoesPosts.value)
            loadingShoesPosts.value = false
            
      };
      
    }

    const fetchAllShoesPosts = async () => {
        if (user.value && user.value.id) {
            loadingShoesPosts.value = true
         
            const { data: fetchShoesPosts } = await supabase
            .from('shoes')
            .select()
            .eq('owner_id', user.value.id)
            .order('created_at', { ascending: false })


            shoesPosts.value = fetchShoesPosts
            console.log(shoesPosts.value)
            loadingShoesPosts.value = false
            
      };
      
    }
    
    const addNewPost = (newPost) => {
        shoesPosts.value = [newPost, ...shoesPosts.value]
    }

 
    const deleteShoesPostFromDB = async (id) => {
        await supabase
        .from('shoes')
        .delete()
        .eq('id', id)
    }

    /*const deleteShoesPost = async (id) => {
        shoesPosts.value = shoesPosts.value.filter(post => post.id !== id)
        await deleteShoesPostFromDB(id)
    }*/


    
    const deleteShoesPost = async (id) => {
        // Find the post to be deleted
        const postToDelete = shoesPosts.value.find(post => post.id === id);
        if (!postToDelete) {
            // Post not found, handle error or return
            return;
        }
    
        // Delete the post from the database
        await deleteShoesPostFromDB(id);
    
        // Remove the post from the local array
        shoesPosts.value = shoesPosts.value.filter(post => post.id !== id);
    
        // Delete the corresponding image from the bucket
        const fileName = postToDelete.url.split('/').pop(); // Extract the file name from the URL
        await supabase.storage.from('photos').remove([`public/${fileName}`]);
    }
    
    const addSaleTag = async (id) => {
   
        const saleTag = shoesPosts.value.find(post => post.id === id);
        if (!saleTag) { return}
        await supabase
        .from('shoes')
        .update({ sale: true}) 
        .eq('id', id)
    }

    const deleteSaleTag = async (id) => {
        const saleTag = shoesPosts.value.find(post => post.id === id);
        if (!saleTag) {return}
        await supabase
        .from('shoes')
        .update({ sale: false}) 
        .eq('id', id)
    }


    const fetchNextShoesPosts = async () => {

        if (!reachEndOfPosts.value) {
          
            const { data: fetchShoesPosts } = await supabase
                .from('shoes')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
                .order('created_at', { ascending: false })
    
          
            shoesPosts.value = [ ...shoesPosts.value, ...fetchShoesPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 2
    
            if (!fetchShoesPosts.length) {
                reachEndOfPosts.value = true
            }
        }
    }

    const setFilteredShoesPosts = (posts) =>{
        filteredShoesPosts.value = posts
    }


    return { fetchShoesPosts, fetchAllShoesPosts, addSaleTag, deleteSaleTag,  shoesPosts, loadingShoesPosts,filteredShoesPosts, addNewPost, deleteShoesPost, fetchNextShoesPosts, setFilteredShoesPosts }
})


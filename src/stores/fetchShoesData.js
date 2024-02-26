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
        .from('top')
        .delete()
        .eq('id', id)
    }

    const deleteShoesPost = async (id) => {
        shoesPosts.value = shoesPosts.value.filter(post => post.id !== id)
        await deleteShoesPostFromDB(id)
    }
    

    const fetchNextShoesPosts = async () => {

        if (!reachEndOfPosts.value) {
          
            const { data: fetchShoesPosts } = await supabase
                .from('top')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
                .order('created_at', { ascending: false })
    
          
            shoesPosts.value = [ ...shoesPosts.value, ...fetchShoesPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 3
    
            if (!fetchShoesPosts.length) {
                reachEndOfPosts.value = true
            }
        }
    }

    const setFilteredShoesPosts = (posts) =>{
        filteredShoesPosts.value = posts
    }


    return { fetchShoesPosts, shoesPosts, loadingShoesPosts,filteredShoesPosts, addNewPost, deleteShoesPost, fetchNextShoesPosts, setFilteredShoesPosts }
})


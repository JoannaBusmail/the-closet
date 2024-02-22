import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchTopDataStore = defineStore('fetchTopData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    /*watchEffect(() => {
        if (user.value) {
          fetchTopPosts()
        }
      })*/

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
        topPosts.value = topPosts.value.filter(post => post.id !== id)
        await deleteTopPostFromDB(id)
    }
    

    const fetchNextTopPosts = async () => {

        if (!reachEndOfPosts.value) {
          
            const { data: fetchTopPosts } = await supabase
                .from('top')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
                .order('created_at', { ascending: false })
    
          
            topPosts.value = [ ...topPosts.value, ...fetchTopPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 3
    
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


 

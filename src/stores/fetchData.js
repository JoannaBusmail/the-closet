import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive, watchEffect } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchDataStore = defineStore('fetchData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    /*watchEffect(() => {
        if (user.value) {
          fetchTopPosts()
        }
      })*/

    const topPosts = ref([])
    const lastCardIndex = ref(1)
    const ownersIds = ref([])
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
            loadingPosts.value = false
            
      };
      
    }
    
    const addNewPost = (newPost) => {
        topPosts.value = [newPost, ...topPosts.value]
    }

 
    
    return { fetchTopPosts, topPosts, loadingPosts, addNewPost}
})


 

    /*const fetchNextTopPosts = async () => {

    if (!reachEndOfPosts.value) {
      
        const { data: fetchTopPosts } = await supabase
            .from('top')
            .select()
            .in('owner_id', ownersIds.value)
            .range(lastCardIndex.value + 1, lastCardIndex.value + 2)
            .order('created_at', { ascending: false })

      
        posts.value = [ ...posts.value, ...fetchTopPosts ]

   
        lastCardIndex.value = lastCardIndex.value + 2

        if (!fetchTopPosts.length) {
            reachEndOfPosts.value = true
        }
    }


}*/
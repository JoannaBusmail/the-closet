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

    const deleteBottomPost = async (id) => {
        bottomPosts.value = bottomPosts.value.filter(post => post.id !== id)
        await deleteBottomPostFromDB(id)
    }
    

    const fetchNextBottomPosts = async () => {

        if (!reachEndOfPosts.value) {
          
            const { data: fetchbottomPosts } = await supabase
                .from('bottom')
                .select()
                .in('owner_id', [user.value.id])
                .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
                .order('created_at', { ascending: false })
    
          
            bottomPosts.value = [ ...bottomPosts.value, ...fetchbottomPosts ]
    
       
            lastCardIndex.value = lastCardIndex.value + 3
    
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


 

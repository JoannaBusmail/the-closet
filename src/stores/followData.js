import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive, watchEffect } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchUserParamsDataStore } from '@/stores/fetchUserParamsData'
import { storeToRefs } from 'pinia'



export const useFollowDataStore = defineStore('followData', () => { 


    const userStore = useUserStore()
    const { user: loggedUser } = storeToRefs(userStore)

    const fetchUserParamsDataStore = useFetchUserParamsDataStore()
    const { paramUser, paramUserPosts, errorMessage, loadingParamUser, loadingParamUserPost } = storeToRefs(fetchUserParamsDataStore)

    const isFollowing = ref(false)


    const loggedUserInfo = reactive({
        followers: null,
        following: null
    })

    const paramsUserFollowersCount = ref(null)

    const followUser = async () =>{
        isFollowing.value = false
        const { data, error } = await supabase
            .from('follow')
            .insert([
                { follower_id: loggedUser.value.id, 
                  follower_username: loggedUser.value.username, 
                  following_id: paramUser.value.id, 
                  following_username: paramUser.value.username}
            ])
            console.log('logged user:', loggedUser.value)
            console.log('param user:', paramUser.value)
 
        isFollowing.value = true
        fetchParamUserFollowersCount()
    }

    const unfollowUser = async () =>{
        isFollowing.value = true
        const { data, error } = await supabase
            .from('follow')
            .delete()
            .eq('follower_id', loggedUser.value.id)
            .eq('following_id', paramUser.value.id)
     
        isFollowing.value = false
        fetchParamUserFollowersCount()
    }



    const fetchLoggedUserFollowCount = async() => {
        const followersCount = await fetchLoggedUserFollowersCount()
        const followingCount = await fetchLoggedUserFollowingCount()
        loggedUserInfo.followers = followersCount
        loggedUserInfo.following = followingCount
        console.log('Logged user followers:', loggedUserInfo.followers)
        console.log('Logged user following:', loggedUserInfo.following)

    }

    const fetchLoggedUserFollowersCount = async () =>{

    const { count } = await supabase
        .from('follow')
        .select('*', { count: 'exact' })
        .eq('following_id', loggedUser.value.id)

        return count
    }

    const fetchLoggedUserFollowingCount = async () =>{
    
        const { count } = await supabase
        .from('follow')
        .select('*', { count: 'exact' })
        .eq('follower_id', loggedUser.value.id)

        return count
    }

    const fetchFollowersCount = async () =>{

        const { count } = await supabase
            .from('follow')
            .select('*', { count: 'exact' })
            .eq('following_id',  paramUser.value.id)
           
            return count
        }
            
          

        const fetchParamUserFollowersCount = async () =>{
            const followersCount = await fetchFollowersCount()
            paramsUserFollowersCount.value = followersCount
            console.log('Followers count:', paramsUserFollowersCount.value)
        
        }

    //check if logged user is following the user
        const fetchIsFollowing = async () => {
            isFollowing.value = false
            if(loggedUser.value && (loggedUser.value.id !== paramUser.value.id)){
                const { data, error } = await supabase
                .from('follow')
                .select()
                .eq('follower_id', loggedUser.value.id)
                .eq('following_id', paramUser.value.id)
                .single()
                if(data){
                    isFollowing.value = true
                   
                }
                if(!data){
                 return paramsUserFollowersCount.value = 0
                   
                } else {
                    console.error('Error fetching followers:', error)
                }
            }
        }

        const fetchIsFollowingTag = async (cardUser) => {
            if (loggedUser.value && (loggedUser.value.id !== cardUser)) {
                const { data, error } = await supabase
                    .from('follow')
                    .select()
                    .eq('follower_id', loggedUser.value.id)
                    .eq('following_username', cardUser)
                    .single()
        
                if (data) {
                    return true;
                } else {
                    return false; 
                }
            }
            return false; 
        }
        

    return {loggedUserInfo, paramsUserFollowersCount, fetchIsFollowingTag, fetchIsFollowing, followUser, unfollowUser, fetchLoggedUserFollowersCount, fetchLoggedUserFollowingCount, fetchParamUserFollowersCount, fetchLoggedUserFollowCount, isFollowing}
})


 

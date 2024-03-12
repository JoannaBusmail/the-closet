import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive } from 'vue'


export const useFetchUserParamsDataStore = defineStore('fetchUserParams', () => { 


    const paramUser = reactive({
        username: '',
        profile_url: '',
        id: ''
    })
    
    const paramUserPosts = ref([])
    const errorMessage = ref('')
    const loadingParamUser = ref(false)
    const loadingParamUserPost = ref(false)


    const getParamUser = async (paramUserName) =>
    {
        loadingParamUser.value = true
        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('username', paramUserName)
        console.log(data)
        if (data && data.length > 0) {
            paramUser.username = data[ 0 ].username
            paramUser.profile_url = data[ 0 ].profile_url
            paramUser.id = data[ 0 ].id
        }
        else {
            errorMessage.value = 'User not found'
        }
        loadingParamUser.value = false
    }
    
    
    const fetchParamUserPosts = async () =>
    {
        loadingParamUserPost.value = true
        const { data: casualData, error: casualError } = await supabase.from('casual').select().eq('owner_id', paramUser.id).order('created_at', { ascending: false })
        const { data: elegantData, error: elegantError } = await supabase.from('elegant').select().eq('owner_id', paramUser.id).order('created_at', { ascending: false })
    
        if (casualError || elegantError) {
            console.error('Error fetching posts:', casualError || elegantError)
            return
        }
    
        paramUserPosts.value = [ ...casualData, ...elegantData ]
        console.log(paramUserPosts.value)
        loadingParamUserPost.value = false
    };

    return {paramUser, paramUserPosts, errorMessage, loadingParamUser,  loadingParamUserPost, getParamUser,  fetchParamUserPosts }
})


 
import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'

export const useFetchGetInspiredDataStore = defineStore('fetchGetInspired', () => { 

    const userStore = useUserStore()
    const { user: loggedUser } = storeToRefs(userStore)

  
const posts = ref([]);
const restOfUsers = ref([]);
const postsWithUserInfo = ref([]);

const fetchAllUsersPosts = async () => {
    const { data: casualData, error: casualError } = await supabase.from('casual').select('*').not('owner_id', 'eq', loggedUser.value.id);
    const { data: elegantData, error: elegantError } = await supabase.from('elegant').select('*').not('owner_id', 'eq', loggedUser.value.id);
    
    if (casualError || elegantError) {
      console.error('Error fetching posts:', casualError || elegantError);
      return;
    }
    
    posts.value = [...casualData, ...elegantData];
  };


const fetchUsers = async () => {
  const { data: userData, error } = await supabase.from('users').select('*').neq('id', loggedUser.value.id);;
  if (error) {
    console.error('Error fetching users:', error.message);
    return;
  }
  restOfUsers.value = userData;
};

const mergeUserDataWithPosts = () => {
  return posts.value.map(post => {
    const user = restOfUsers.value.find(user => user.id === post.owner_id);
    return {
      id: post.id,
      top_url: post.top_url,
      bottom_url: post.bottom_url,
      shoes_url: post.shoes_url,
      outfit_name: post.outfit_name,
      username: user ? user.username : '',
      profile_url: user ? user.profile_url : ''
    };
  });
};



   

    return { fetchAllUsersPosts, mergeUserDataWithPosts, fetchUsers, postsWithUserInfo, posts  }
})


 

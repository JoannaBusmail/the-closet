import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useFetchTopDataStore } from '@/stores/fetchTopData'
import { useFetchBottomDataStore } from '@/stores/fetchBottomData'
import { useFetchShoesDataStore } from '@/stores/fetchShoesData'



export const useUploadDataStore = defineStore('uploadData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)


    // FETCH TOP DATA STORE
    const fetchTopDataStore = useFetchTopDataStore()
    const { addNewPost, fetchTopPosts } = fetchTopDataStore

    // FETCH BOTTOM DATA STORE
    const fetchBottomDataStore = useFetchBottomDataStore()
    const { fetchBottomPosts } = fetchBottomDataStore


    //FETCH SHOES DATA STORE
    const fetchShoesDataStore = useFetchShoesDataStore()
    const { fetchShoesPosts } = fetchShoesDataStore
  

    const color = ref('')
    const style = ref('')
    const file = ref(null)
    const seenAt = ref('')
    const errorMessage = ref('')
    const uploadingPost = ref(false)
    const uploadingImage = ref(false)
    const selectedFileName = ref(null)
    const onView = ref('')


   

    const handleUploadPhotoInfo = async () =>
    {
        uploadingPost.value = true
    
     
        const fileName = Math.floor(Math.random() * 1000000000000000000000000)
    
   
        let filePath
    
        if (file.value) {
         
            const { data, error } = await supabase.storage.from('photos').upload('public/' + fileName, file.value)
            if (error) {
                console.error('Error uploading file:', error);
                uploadingPost.value = false
                errorMessage.value = 'Something went wrong'
                return 
            }
    
            filePath = data.path

            if(!filePath || !color.value || !style.value) {
                uploadingPost.value = false
                errorMessage.value = 'Please fill all fields'
                return 
            }

            if (data) {
                const newPost = {
                  url: filePath,
                  color: color.value,
                  style: style.value,
                  seen_at: seenAt.value,
                  owner_id: user.value.id,
                };

            
                addNewPost(newPost);

                if(onView.value === 'top'){
                    await supabase.from('top').insert(newPost);
                    await fetchTopPosts()
                }else if(onView.value === 'bottom'){
                    await supabase.from('bottom').insert(newPost);
                    await fetchBottomPosts()
                }else if(onView.value === 'shoes'){
                    await supabase.from('shoes').insert(newPost);
                    await fetchShoesPosts()
                }
            }
    
        }
        resetValues()
        uploadingPost.value = false
      
     

    
    }
    const handleUploadImage = async (e) => {
        uploadingImage.value = true;
    
        if (e.target.files[0]) {
            file.value = e.target.files[0];
    
           selectedFileName.value = e.target.files[0].name;
            await new Promise(resolve => setTimeout(resolve, 2000));
    
            uploadingImage.value = false;
           
        }
    };
    

    const handlleCancelUpload = () => { 
  
        resetValues()
    }

    const resetValues = () => {
        uploadingPost.value = false;
        color.value = '';
        style.value = '';
        seenAt.value = '';
        file.value = null;
        selectedFileName.value = null;
        errorMessage.value = '';
    
      };


    return {onView, color, style, file, seenAt, errorMessage, uploadingPost, selectedFileName, uploadingImage, handleUploadPhotoInfo, handleUploadImage, handlleCancelUpload}
})



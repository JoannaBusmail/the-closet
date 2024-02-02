import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useFetchDataStore } from '@/stores/fetchData'






export const useUploadDataStore = defineStore('uploadData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)


    // FETCH DATA STORE
    const fetchDataStore = useFetchDataStore()
    const { addNewPost } = fetchDataStore
  

    const color = ref('')
    const style = ref('')
    const file = ref(null)
    const errorMessage = ref('')
    const uploadingPost = ref(false)
    const uploadingImage = ref(false)
    const selectedFileName = ref(null)


   

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
                  owner_id: user.value.id,
                };
            
                await supabase.from('top').insert(newPost);
            
              
                addNewPost(newPost);
              }
    
        }
        resetValues()
      
     

    
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
        file.value = null;
        selectedFileName.value = null;
        errorMessage.value = '';
    
      };


    return { color, style, file, errorMessage, uploadingPost, selectedFileName, uploadingImage, handleUploadPhotoInfo, handleUploadImage, handlleCancelUpload}
})



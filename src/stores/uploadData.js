import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useFetchDataStore } from '@/stores/fetchData'





export const useUploadDataStore = defineStore('uploadData', () => { 


    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const fetchDataStore = useFetchDataStore()
const { fetchTopPosts } = fetchDataStore
  

    const color = ref('')
    const style = ref('')
    const file = ref(null)
    const errorMessage = ref('')
    const loading = ref(false)


    const handleUploadPhotoInfo = async () =>
    {
        loading.value = true
    
     
        const fileName = Math.floor(Math.random() * 1000000000000000000000000)
    
   
        let filePath
    
        if (file.value) {
         
            const { data, error } = await supabase.storage.from('photos').upload('public/' + fileName, file.value)
            if (error) {
                console.error('Error uploading file:', error);
                loading.value = false
                return errorMessage.value = 'Something went wrong'
            }
    
            filePath = data.path
    
            if (data) {
                await supabase.from('top').insert(
                    {
                        url: filePath,
                        color: color.value,
                        style: style.value,
                        owner_id: user.value.id
    
                    }
                )
                await fetchTopPosts()
            }
    
        }
        loading.value = false
   
        color.value = ''
        style.value = ''
        file.value = null
      
   
    
    
    }

    const handleUploadImage = e => {
    // store file in our state
        if (e.target.files[ 0 ]) {
            file.value = e.target.files[ 0 ]
        }
    }

    return { color, style, file, errorMessage, loading, handleUploadPhotoInfo, handleUploadImage}
})



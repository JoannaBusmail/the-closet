import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '../../supabase'
import {  useRouter } from 'vue-router'

export const useUserStore = defineStore('users', () => {
  // ROUTER
  const router = useRouter()

  //STATES
  const user = ref(null)
  const errorMessage = ref('')
  const loading = ref(false)
  const loadingUser = ref(false)


  //STATES UPDATE PROFILE
  const fileProfile = ref(null)
  const errorUpdateMessage = ref('')
  const uploadingUpdateInfo = ref(false)
  const uploadingImageProfile = ref(false)
  const selectedFileProfileName = ref(null)
  const successUpdateMessage = ref('')


  //validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // -----LOGIN-----
  const handleLogin = async (credentials) => {
    const { email, password } = credentials

    // inputa validations
    if(!validateEmail(email)) {
      errorMessage.value = 'Please enter a valid email'
      return
    }
    if(password.length < 6) {
      errorMessage.value = 'Password must be at least 6 characters'
      return
    }
    // before checking db, set loading to true
    loading.value = true

    // check db for user

    const { data, error} = await supabase.auth.signInWithPassword({ email, password })
    if(error) {
      loading.value = false
      errorMessage.value = error.message
      return
    }

    // if user exists, set user
    const { data: existingUser} = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()

      user.value = {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email
      }

      loading.value = false

      errorMessage.value = ''

  }


  // -----SIGNUP-----
  const handleSignup = async (credentials) => {
    const {email, password, username} = credentials
  
  
      if(username.length < 4) {
        return errorMessage.value = 'Username is too short'
       }
  
      if(!validateEmail(email)) {
        return errorMessage.value = 'Email is not valid'
       }

       if (password.length < 6) {
        
        return errorMessage.value = 'Password must be at least 6 characters'
       }

   

      errorMessage.value = ''
  
    // before checking DB we set loading to true
      loading.value = true
  
  
    // check if user exists in DB
    // response --> data is null if user does not exist
    const {data: userWithUsername} = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single()
  
      if(userWithUsername) {
        loading.value = false
        return errorMessage.value = 'Username already exists'
      }

      const {data: userWithEmail} = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()
  
      if(userWithEmail) {
        loading.value = false
        return errorMessage.value = 'Email already exists'
      }
  
    
    // signup
    const {data, error} = await supabase.auth.signUp({email, password})
    console.log(data, error)
      if (error) {
       loading.value = false
   
        errorMessage.value = error.message
     
      }
  
      await supabase
        .from('users')
        .insert(
        {email, username}
      )
  

    const {data: newUser} = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single()
   
      // set user ref to the new user
      user.value = {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username
      }
     
      loading.value = false
  }
  

  // --------LOGOUT -----------
  const handleLogout = async() => {
    // sign out from supabase
    await supabase.auth.signOut()
    // set user to null
    user.value = null
    // redirect to home page
    router.push('/')
 }


 // --------GET USER -----------
 // to get persisting user state - if not every time we refresh the user is lost
 const getUser = async() => {
  loadingUser.value = true

  const {data, error} = await supabase.auth.getUser()

  // if there is no user we set user to null

  if(!data.user){
    loadingUser.value = false
    return user.value = null
  }

  const { data: userWithEmail } = await supabase
   .from('users')
   .select()
   .eq('email', data.user.email)
   .single()

   user.value = {
     id: userWithEmail.id,
     email: userWithEmail.email,
     username: userWithEmail.username,
     profile_url: userWithEmail.profile_url
   }

   loadingUser.value = false
}

//need to clear error message after every action, used in AuthModal
  const clearErrorMessage = () => {
  errorMessage.value = ''}




  //----------EDIT USER------------

  const handleUpdateProfile = async (newUsername) => {

    uploadingUpdateInfo.value = true
    const fileProfileName = Math.floor(Math.random() * 1000000000000000000000000)
    let filePathProfile


    if (fileProfile.value) {
        const { data, error } = await supabase.storage.from('user_profile').upload('public/' + fileProfileName, fileProfile.value);
        if (error) {
            console.error('Error uploading file:', error)
            uploadingUpdateInfo.value = false
            errorUpdateMessage.value = 'Something went wrong'
            return;
        }
        filePathProfile = data.path
    }


    if (newUsername && filePathProfile) {
        const newProfile = {
            profile_url: filePathProfile,
            username: newUsername,
        };
        await editUser(newProfile)
    
    } else if (newUsername) { 
        await editUser({ username: newUsername })
    } else if (filePathProfile) { 
        await editUser({ profile_url: filePathProfile })
    } else {
      
        uploadingUpdateInfo.value = false;
        errorMessage.value = 'Please fill at least one field'
        return
    }
};


const editUser = async (newProfile) => {
    const { data, error } = await supabase
        .from('users')
        .update(newProfile)
        .eq('id', user.value.id);

        uploadingUpdateInfo.value = false;
    

    if (error) {
        console.error('Error updating user:', error);
        uploadingUpdateInfo.value = false;
        errorUpdateMessage.value = 'Something went wrong';
        return;
    }

 
    user.value = { ...user.value, ...newProfile };
};


 

   const handleUploadImageProfile = async(e)=> {
    uploadingImageProfile.value = true
     if(e.target.files[0]) {
       fileProfile.value = e.target.files[0]
       selectedFileProfileName.value = e.target.files[0].name
       await new Promise (resolve => setTimeout(resolve, 1000))

       uploadingImageProfile.value = false
     }
   }


  return { user, errorMessage, successUpdateMessage, loading, loadingUser,uploadingImageProfile, selectedFileProfileName, fileProfile, errorUpdateMessage, uploadingUpdateInfo,handleLogin, handleSignup, handleLogout, getUser, clearErrorMessage, editUser, handleUpdateProfile, handleUploadImageProfile}


})
 

//edit user

 /*const handleUpdateProfile = async (newUsername) => {
    uploadingUpdateInfo.value = true
    const fileProfileName = Math.floor(Math.random() * 1000000000000000000000000)

    let filePathProfile

    if(fileProfile.value) {
      const {data, error} = await supabase.storage.from('user_profile').upload('public/' + fileProfileName, fileProfile.value)

      if(error) {
        console.error('Error uploading file:', error);
        uploadingUpdateInfo.value = false
        errorUpdateMessage.value = 'Something went wrong'
        return
      }
      filePathProfile = data.path
      
   
      if(!filePathProfile || !newUsername) {
        uploadingUpdateInfo.value = false
        errorMessage.value = 'Please fill at least one field'
        return 
      }

      if(data) {
        const newProfile = {
          profile_url: filePathProfile,
          username:newUsername,
        }

        editUser(newProfile)
      }
   
    }


  }


   const editUser = async (newProfile) => {

    const {data, error} = await supabase
    
    .from('users')
    .update({username: newProfile.username, profile_url: newProfile.profile_url})
    .eq('id', user.value.id)
   

    if(error) {
      console.log(error)
    }

    user.value = {
      id: user.value.id,
      email: user.value.email,
      username: newProfile.username,
      profile_url: newProfile.profile_url
    }
  
   }
*/
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
     username: userWithEmail.username
   }

   loadingUser.value = false
}

//need to clear error message after every action, used in AuthModal
const clearErrorMessage = () => {
  errorMessage.value = ''}




  return { user, errorMessage, loading, loadingUser, handleLogin, handleSignup, handleLogout, getUser, clearErrorMessage}


})
 
import {defineStore} from 'pinia'
import { supabase } from '../../supabase'
import { ref, reactive } from 'vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'



export const useFetchMessages = defineStore('fetchMessages', () => { 

    
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    const messagesData = ref([])
    const newMessage = ref('')
    const lastMessageData = ref([])
    const errorMessage = ref('')

    const addNewMessage = (newMessage) => {
        messagesData.value =[...messagesData.value, newMessage]
    }
    
    const addMessageToDB = async ( receiverUser) => {
        const newMessageData = {
            content: newMessage.value,
           sender_user_id: user.value.id,
           sender_user_email: user.value.email,
            sender_user_username: user.value.username,
            sender_user_avatar: user.value.profile_url,
            receiver_user_id: receiverUser.id,
           receiver_user_email: receiverUser.email,
           receiver_user_username: receiverUser.username,
            receiver_user_avatar: receiverUser.profile_url,
        }
    
        const { data, error } = await supabase
            .from('messages')
            .insert([newMessageData])
 
    }

    
    const fetchMessages = async (receiverUser) => {
        if (user.value && user.value.id && receiverUser.id) {
            try {
                // Consulta mensajes enviados por el usuario logueado al usuario con el que se está chateando
                const { data: sentMessages, error: sentError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('sender_user_id', user.value.id)
                    .eq('receiver_user_id', receiverUser.id)
                    .order('created_at', { ascending: true });
    
                // Consulta mensajes enviados por el usuario con el que se está chateando al usuario logueado
                const { data: receivedMessages, error: receivedError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('sender_user_id', receiverUser.id)
                    .eq('receiver_user_id', user.value.id)
                    .order('created_at', { ascending: true });
    
                if (sentError || receivedError) {
                    console.error('Error fetching messages:', sentError || receivedError);
                    return;
                }
    
                // Combina los mensajes enviados y recibidos en un solo arreglo
                const allMessages = [...sentMessages, ...receivedMessages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                messagesData.value = allMessages;
                console.log('Mensajes:', messagesData.value);
            } catch (error) {
                console.error('Error fetching messages:', error.message);
            }
        }
    };
    

    /*const fetchLastMessages = async () => {
        if (user.value && user.value.id) {
            try {
                // Obtenemos todos los usuarios con los que el usuario logueado ha intercambiado mensajes
                const { data: users, error: usersError } = await supabase
                    .from('messages')
                    .select('receiver_user_id')
                    .eq('sender_user_id', user.value.id)
                  
                
                if (usersError) {
                    console.error('Error fetching users:', usersError);
                    return;
                }
    
                // Iteramos sobre cada usuario y encontramos su último mensaje
                for (const receiverUser of users) {
                    const receiverUserId = receiverUser.receiver_user_id;
    
                    // Consultamos el último mensaje enviado por el usuario logueado a este usuario
                    const { data: lastSentMessage, error: sentError } = await supabase
                        .from('messages')
                        .select('*')
                        .eq('sender_user_id', user.value.id)
                        .eq('receiver_user_id', receiverUserId)
                        .order('created_at', { ascending: false })
                        .limit(1);
    
                    // Consultamos el último mensaje enviado por este usuario al usuario logueado
                    const { data: lastReceivedMessage, error: receivedError } = await supabase
                        .from('messages')
                        .select('*')
                        .eq('sender_user_id', receiverUserId)
                        .eq('receiver_user_id', user.value.id)
                        .order('created_at', { ascending: false })
                        .limit(1);
    
                    if (sentError || receivedError) {
                        console.error('Error fetching messages:', sentError || receivedError);
                        return;
                    }
    
                    // Comparamos las fechas de los últimos mensajes para determinar cuál es más reciente
                    const lastSentCreatedAt = lastSentMessage ? new Date(lastSentMessage[0].created_at) : null;
                    const lastReceivedCreatedAt = lastReceivedMessage ? new Date(lastReceivedMessage[0].created_at) : null;
    
             
                    if (lastSentCreatedAt && lastReceivedCreatedAt) {
                        lastMessageData.value = lastSentCreatedAt > lastReceivedCreatedAt ? lastSentMessage[0] : lastReceivedMessage[0];
                    } else if (lastSentCreatedAt) {
                        lastMessageData.value  = lastSentMessage[0];
                    } else if (lastReceivedCreatedAt) {
                        lastMessageData.value  = lastReceivedMessage[0];
                    } else {
                        // No hay mensajes intercambiados entre estos usuarios
                        continue;
                    }
    
                    // Aquí tienes el último mensaje entre el usuario logueado y el usuario actual
                    console.log('Último mensaje:', lastMessageData.value );
                }
            } catch (error) {
                console.error('Error fetching messages:', error.message);
            }
        }
    };*/
    
    
    const fetchLastMessages = async () => {
    if (user.value && user.value.id) {
        try {
            // Obtenemos todos los usuarios con los que el usuario logueado ha intercambiado mensajes
            const { data: users, error: usersError } = await supabase
                .from('messages')
                .select('receiver_user_id')
                .eq('sender_user_id', user.value.id);
            
            if (usersError) {
                console.error('Error fetching users:', usersError);
                return;
            }

            // Conjunto para mantener un registro de los usuarios para los que ya hemos obtenido el último mensaje
            const processedUsers = new Set();

            // Iteramos sobre cada usuario y encontramos su último mensaje
            for (const receiverUser of users) {
                const receiverUserId = receiverUser.receiver_user_id;

                // Verificamos si ya hemos procesado este usuario
                if (processedUsers.has(receiverUserId)) {
                    continue;
                }

                // Consultamos el último mensaje enviado por el usuario logueado a este usuario
                const { data: lastSentMessage, error: sentError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('sender_user_id', user.value.id)
                    .eq('receiver_user_id', receiverUserId)
                    .order('created_at', { ascending: false })
                    .limit(1);

                // Consultamos el último mensaje enviado por este usuario al usuario logueado
                const { data: lastReceivedMessage, error: receivedError } = await supabase
                    .from('messages')
                    .select('*')
                    .eq('sender_user_id', receiverUserId)
                    .eq('receiver_user_id', user.value.id)
                    .order('created_at', { ascending: false })
                    .limit(1);

                if (sentError || receivedError) {
                    console.error('Error fetching messages:', sentError || receivedError);
                    return;
                }

                // Comparamos las fechas de los últimos mensajes para determinar cuál es más reciente
                const lastSentCreatedAt = lastSentMessage ? new Date(lastSentMessage[0].created_at) : null;
                const lastReceivedCreatedAt = lastReceivedMessage ? new Date(lastReceivedMessage[0].created_at) : null;

                let lastMessage;
                if (lastSentCreatedAt && lastReceivedCreatedAt) {
                    lastMessage = lastSentCreatedAt > lastReceivedCreatedAt ? lastSentMessage[0] : lastReceivedMessage[0];
                } else if (lastSentCreatedAt) {
                    lastMessage = lastSentMessage[0];
                } else if (lastReceivedCreatedAt) {
                    lastMessage = lastReceivedMessage[0];
                } else {
                    // No hay mensajes intercambiados entre estos usuarios
                    continue;
                }

                // Agregamos este usuario al conjunto de usuarios procesados
                processedUsers.add(receiverUserId);
                lastMessageData.value.push(lastMessage);
                // Aquí tienes el último mensaje entre el usuario logueado y el usuario actual
                console.log('Último mensaje:', lastMessageData.value);
            }
        } catch (error) {
            console.error('Error fetching messages:', error.message);
        }
    }
};

    return { addMessageToDB, fetchMessages, fetchLastMessages,  messagesData, newMessage, lastMessageData, errorMessage, addNewMessage}
})


 
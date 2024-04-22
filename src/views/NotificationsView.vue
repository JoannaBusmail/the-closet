<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>NOTIFICATIONS</h1>


            <p>Param user name{{ paramUser.username }}</p>

            <div v-if="lastMessageData.length > 0">
                <div v-if="isSmallScreen">

                    <BoxMessagesList
                        v-if="!showChat"
                        :lastMessageData="lastMessageData"
                        :isLoggedUserSender="getLastMessageUser"
                        @msgClick="handleBoxMessage"
                    />
                    <ChatMessagesList
                        v-else
                        :smallScreen="isSmallScreen"
                        @clickBack="showChat = false"
                        :messagesData="messagesData"
                        :getMessageAlignment="getMessageAlignment"
                        :isLoggedUser="isLoggedUser"
                    />

                </div>



                <div
                    v-else
                    class="msgList_andChat_container"
                >

                    <BoxMessagesList
                        :lastMessageData="lastMessageData"
                        :isLoggedUserSender="getLastMessageUser"
                        @msgClick="handleBoxMessage"
                    />


                    <ChatMessagesList
                        :messagesData="messagesData"
                        :getMessageAlignment="getMessageAlignment"
                        :isLoggedUser="isLoggedUser"
                        @sendMessage="handleSendMessage"
                    />

                </div>
            </div>
            <div v-else>
                <p>No messages received yet</p>
                <ChatMessagesList
                    :messagesData="messagesData"
                    :getMessageAlignment="getMessageAlignment"
                    :isLoggedUser="isLoggedUser"
                    @sendMessage="handleSendMessage"
                />

            </div>

        </div>
    </div>
</template>

<script setup>
import { useUIActions } from '@/composables/useUIActions.js'
import BoxMessagesList from '@/components/BoxMessagesList.vue'
import ChatMessagesList from '@/components/ChatMessagesList.vue'
import { ref, onMounted, reactive, computed } from 'vue'
import { useFetchUserParamsDataStore } from '@/stores/fetchUserParamsData'
import { useFetchMessages } from '@/stores/fetchMessages'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'



const isSmallScreen = ref(window.innerWidth <= 767)
// UI AND POSTS ACTIONS
const { contentStyles } = useUIActions()

const showChat = ref(false)

const userStore = useUserStore()
const { user } = storeToRefs(userStore)


//FETCH USER PARAM STORE
const fetchUserParamsDataStore = useFetchUserParamsDataStore()
const { paramUser, paramUserPosts } = storeToRefs(fetchUserParamsDataStore)

//FETCH MESSAGES
const fetchMessagesStore = useFetchMessages()
const { addMessageToDB, fetchMessages, fetchLastMessages, fetchRealTimeMessages } = fetchMessagesStore
const { newMessage, messagesData, lastMessageData } = storeToRefs(fetchMessagesStore)






const getMessageAlignment = (message) =>
{
    return message.sender_user_id === user.value.id ? 'sender' : 'receiver'
}



const connectWith = reactive({})

const handleBoxMessage = async (message) =>
{
    showChat.value = true
    console.log(message)

    connectWith.value = message.sender_user_id === user.value.id ? {
        id: message.receiver_user_id,
        username: message.receiver_user_username,
        profile_url: message.receiver_user_profile_url,
        email: message.receiver_user_email
    } : {
        id: message.sender_user_id,
        username: message.sender_user__username,
        profile_url: message.senderuser__profile_url,
        email: message.sender_user_email
    }

    console.log('connectWith', connectWith.value)

    await fetchMessages(connectWith.value)
    await fetchRealTimeMessages(connectWith.value)
}



const handleSendMessage = async (message) =>
{
    newMessage.value = message
    if (paramUser.value.id === '') {
        await addMessageToDB(connectWith.value)

    } else {
        await addMessageToDB(paramUser.value)
    }



}

const isLoggedUser = computed(() =>
{
    const isSender = messagesData.value.some((message) => message.sender_user_id === user.value.id)
    return isSender
})


//OTRA FORMA DE HACERLO
/*const isLoggedUser = computed(() =>
{
    for (const message of messagesData.value) {
       
        if (message.sender_user_id === user.value.id) {
            return true 
        }
    }
    return false 
})*/


const getLastMessageUser = (message) =>
{
    return message.sender_user_id === user.value.id ? 'isLoggedUserSender' : 'isLastMessageLoggedUser'

}


const orderLastMessage = (a, b) =>
{
    return new Date(b.created_at) - new Date(a.created_at)
}



const fetchLastMessagesWithoutRepetition = async () =>
{
    await fetchLastMessages()


    const newMessages = messagesData.value.filter(message =>
    {   //con ! para que devuelva true si no lo encuentra y por tanto agregarlo
        return !lastMessageData.value.find(existingMessage => existingMessage.id === message.id)
    })

    lastMessageData.value.push(...newMessages)
    lastMessageData.value.sort(orderLastMessage)
}




onMounted(async () =>
{
    await fetchMessages(paramUser.value)
    await fetchRealTimeMessages(paramUser.value)

    if (lastMessageData.value.length === 0) {
        await fetchLastMessagesWithoutRepetition()
    }
    //await fetchLastMessages()



    console.log('actualUser', user.value.id)
    console.log('messagesData', messagesData.value)
    console.log('lastMessageData', lastMessageData.value)
    console.log('paramUser', paramUser.value)
    console.log('paramUserPosts', paramUserPosts.value)

})

</script>

<style scoped>
.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    transition: margin-left 0.3s ease;
}

.content-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;
}



h1 {
    padding-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.msgList_andChat_container {
    display: flex;
    gap: 20px;
    height: 100vh;
    padding: 20px;

}




.nameChat_container {
    display: flex;
    flex-direction: column;
    margin: 20px;

}

@media screen and (max-width: 768px) {

    h1 {
        font-size: 24px;
        padding-top: 40px;
        margin-left: 5px;
    }

}
</style>
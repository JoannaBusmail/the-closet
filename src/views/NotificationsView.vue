<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>NOTIFICATIONS</h1>
            <form
                @submit.prevent="handleSendMessage"
                v-if="isSmallScreen"
            >
                <div>

                    <BoxMessagesList
                        class="msgList_container"
                        v-if="!showChat"
                        :messagesData="messagesData"
                        @msgClick="handleMessage"
                    />
                    <ChatMessagesList
                        v-else
                        :smallScreen="isSmallScreen"
                        @clickBack="showChat = false"
                        :messagesData="messagesData"
                    />


                </div>
            </form>

            <form
                v-else
                @submit.prevent="handleSendMessage"
                class="msgList_andChat_container"
            >
                <div class="msgList_andChat_container">

                    <BoxMessagesList
                        :messagesData="messagesData"
                        @msgClick="handleMessage"
                    />
                    <ChatMessagesList
                        :messagesData="messagesData"
                        @updateMessage="handleSendMessage"
                    />

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useUIActions } from '@/composables/useUIActions.js'
import BoxMessagesList from '@/components/BoxMessagesList.vue'
import ChatMessagesList from '@/components/ChatMessagesList.vue'
import { ref } from 'vue'

const isSmallScreen = ref(window.innerWidth <= 767)
// UI AND POSTS ACTIONS
const { contentStyles } = useUIActions()

const showChat = ref(false)

const messagesData = [
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer gdfgdfgdfgdfgfgnn fgshfsgh fdg adfgs dfg adfga dfgfgj hgjyrjrwtg dfg fhfghfdghvyer vyer vyer',
        username: 'LONG USERNAMEEEEEEE',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: true,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: 'USER 2',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: false,
    },
    {
        newMessage: false,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: 'USER 3',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: true,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: 'USER 4',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: false,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: '5 LONG USERNAMEEEEEEE',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: true,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: '6 LONG USERNAMEEEEEEE',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: false,
    },

    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: 'USER 4',
        loggedUser: true,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: '5 LONG USERNAMEEEEEEE',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: false,
    },
    {
        newMessage: true,
        message: 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer',
        username: '6 LONG USERNAMEEEEEEE',
        date: '2024-02-28 10:28:34.379527+00',
        loggedUser: true,
    },

]


const handleMessage = (message) =>
{
    showChat.value = true
    console.log(message)
}

const handleSendMessage = (message) =>
{
    console.log('send message', message)
}


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
    width: 100%;
    padding: 20px;

}

.msgList_container {
    margin: auto;
}


@media screen and (max-width: 768px) {

    h1 {
        font-size: 24px;
        padding-top: 40px;
        margin-left: 5px;
    }

}
</style>
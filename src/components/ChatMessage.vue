<template>
    <div :class="chatDirection">
      <Avatar size="super-small" :src="getMessageAvatar" />
      <div class="name_msg_container">
        <h4>{{ getDisplayName }}</h4>
        <p>{{ messagesData.content }}</p>
        <p class="date">{{ formatDate(messagesData.created_at) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import Avatar from './Avatar.vue'
  import { computed } from 'vue'
  
  const props = defineProps({
    messagesData: Object,
    messageAlignment: 'sender' | 'receiver' | undefined,
    isLoggedUser: Boolean
  })
  
 
  const formatDate = (date) => {
    const dateObj = new Date(date)
    const options = {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit',
      minute: '2-digit'
    }
    return dateObj.toLocaleDateString(undefined, options)
  }
  
  const chatDirection = computed(() => {
    return props.messageAlignment === 'sender' ? 'chatMsg_container_reverse' : 'chatMsg_container';
  });
  

  const getMessageAvatar = computed(() => {
    return props.isLoggedUser ? props.messagesData.sender_user_avatar : props.messagesData.receiver_user_avatar;
  })
  
  const getDisplayName = computed(() => {
    return props.isLoggedUser ? props.messagesData.sender_user_username : props.messagesData.receiver_user_username;
  })

  </script>



<style scoped>
.chatMsg_container {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    margin: 30px 20px 0 20px;
    max-width: 60%;

}

.chatMsg_container_reverse {
    display: flex;
    align-items: flex-start;
    margin: 30px 20px 0 20px;
    max-width: 60%;
    flex-direction: row-reverse;
    margin-left: auto;

}

.name_msg_container {
    display: flex;
    flex-direction: column;
    margin: 0 10px 0 10px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
}

p {
    font-size: 12px;
}

.date {
    font-size: 12px;
    color: #9e9d9d;
    align-self: center;
    margin-top: 5px;

}


</style>
<template>
    <div class="msgList_container">

        <BoxMessage
            v-for="message in lastMessageData"
            :key="message.id"
            :messagesData="message"
            :isSender="isLoggedUserSender(message)"
            @click="$emit('msgClick', message)"
        >
        </BoxMessage>


    </div>

</template>

<script setup>
import BoxMessage from './BoxMessage.vue'


const props = defineProps({
    lastMessageData: Array,
    isLoggedUserSender: Function,
})



</script>

<style scoped>
.msgList_container {
    display: flex;
    flex-direction: column;
    width: 280px;
    overflow-y: auto;
    flex: 0 0 280px;
    height: 100vh;

}

/* For Webkit based browsers (e.g., Chrome, Safari) */
/* The ::-webkit-scrollbar pseudo-element targets the whole scrollbar */
/* Track (the area behind the scrollbar) */
::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;


}

/* Thumb (the draggable part of the scrollbar) */
::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;

}

/* Hover styles for the thumb */
::-webkit-scrollbar-thumb:hover {
    background-color: #555;

}

/* For Firefox */
/* Set width and color */
.scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #888 #f5f5f5;
}

/* Track */
.scrollbar-track {
    background-color: #f5f5f5;
}

/* Thumb */
.scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
}

/* Hover styles for the thumb */
.scrollbar-thumb:hover {
    background-color: #555;
}

@media screen and (max-width: 767px) {
    .msgList_container {
        justify-content: center;
        height: auto;
    }



}
</style>
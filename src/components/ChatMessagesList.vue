<template>

    <ph-arrow-left
        v-if="props.smallScreen"
        @click="$emit('clickBack')"
        :size="24"
    />
    <div class="chat_container">
        <div class="msgList_container">
            <ChatMessage
                v-for="message in messagesData"
                :key="message.id"
                :messagesData="message"
                @click="$emit('msgClick', message)"
            >
            </ChatMessage>

        </div>
        <TextArea
            v-model="message"
            @input="updateMessage"
            @sendMessage="sendMessageHandler"
        />
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { PhArrowLeft } from '@phosphor-icons/vue'
import ChatMessage from './ChatMessage.vue'
import TextArea from './TextArea.vue'

const props = defineProps({
    smallScreen: Boolean,
    messagesData: Array,
})

const message = ref('')

const emit = defineEmits([ 'clickBack', 'updateMessage', 'sendMessage' ])

const updateMessage = () =>
{
    emit('updateMessage', { message: message.value })

}

const sendMessageHandler = () =>
{
    emit('sendMessage', message.value)
}

</script>

<style scoped>
.chat_container {
    display: flex;
    flex-direction: column;

}

.msgList_container {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #F5F5F5;
    border-radius: 10px;
    overflow-y: auto;
    padding-bottom: 20px;
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
</style>
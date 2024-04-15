<template>

    <div
        @click="$emit('msgClick', messagesData)"
        class="boxMsg_container"
    >
        <div
            v-if="messagesData.newMessage"
            class="bubble"
        >1</div>
        <Avatar
            size="small"
            :src=null
        />
        <div class="name_msg_container">

            <h3>{{ formatUserName(messagesData.username) }}</h3>
            <p>{{ formatMessage(messagesData.message) }}</p>
            <p class="date">{{ formatDate(messagesData.date) }}</p>
        </div>
    </div>
</template>
<script setup>
import Avatar from './Avatar.vue'

const props = defineProps({
    messagesData: Object
})



const formatMessage = (message) =>
{
    if (message.length > 50) {
        return message.slice(0, 50) + ' . . . '
    }
    return message
}

const formatUserName = (name) =>
{
    if (name.length > 14) {
        return name.slice(0, 13) + ' . . . '
    }
    return name
}



const formatDate = (date) =>
{

    const dateObj = new Date(date)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return dateObj.toLocaleDateString(undefined, options)

}



</script>

<style scoped>
.boxMsg_container {
    display: flex;
    width: 260px;
    align-items: center;
    margin-right: 15px;
    margin-top: 5px;
    border-top: 1px solid #c2bfbf;
    position: relative;
}

.name_msg_container {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    margin-left: 15px;
    margin-top: 20px;
}

p {
    font-size: 12px;
}

.date {
    font-size: 12px;
    color: #9e9d9d;
    align-self: flex-end;
    position: relative;
    top: -5px;

}

.bubble {
    position: absolute;
    top: 15px;
    left: 35px;
    background-color: rgb(248, 57, 120);
    color: white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}


@media screen and (max-width: 767px) {
    .boxMsg_container {
        display: flex;
        width: 260px;

    }



}
</style>
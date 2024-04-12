<template>

    <div class="boxMsg_container">
        <div
            v-if="newMessage"
            class="bubble"
        >1</div>
        <Avatar
            size="small"
            :src=null
        />
        <div class="name_msg_container">

            <h3>{{ formatUserName(username) }}</h3>
            <p>{{ formatMessage(message) }}</p>
            <p class="date">{{ formatDate(date) }}</p>
        </div>
    </div>
</template>
<script setup>
import Avatar from './Avatar.vue'


const newMessage = true
const message = 'very loooonng messsage for this user who is ver intense very very vyer vyer vyer vyer vyer'
const username = 'LONG USERNAMEEEEEEE'

const formatMessage = (message) =>
{
    if (message.length > 50) {
        return message.slice(0, 50) + ' . . . '
    }
    return message
}

const formatUserName = (name) =>
{
    if (name.length > 16) {
        return name.slice(0, 15) + ' . . . '
    }
    return name
}


const date = '2024-02-28 10:28:34.379527+00'
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
    width: 280px;
    align-items: center;
    margin-top: 20px;
    margin-right: 15px;
    border-bottom: 1px solid #c2bfbf;
    border-top: 1px solid #c2bfbf;
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
    top: 105px;
    left: 65px;
    background-color: rgb(248, 57, 120);
    color: white;
    border-radius: 50%;
    width: 25px;
    height: px;
    display: flex;
    justify-content: center;
    align-items: center;
}


@media screen and (max-width: 767px) {
    .boxMsg_container {
        display: flex;
        width: 340px;

    }

}
</style>
<template>
    <h5>{{ title }}</h5>
    <form>
        <div class="input-container">
            <input
                type="text"
                placeholder="Email"
            />
            <input
                type="password"
                placeholder="Password"
            />
            <input
                v-if="!isLogin"
                type="password"
                placeholder="Confirm Password"
            />
        </div>
        <div class="button-container">
            <button @click="handleCancel">Cancel</button>
            <button>Submit</button>
        </div>


    </form>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    isLogin: Boolean
})

const emit = defineEmits([ 'cancelBtn' ])
const title = computed(() => { return props.isLogin ? 'LOGIN' : 'SIGN UP' })


</script>

<style scoped>
h5 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    display: flex;
    justify-content: center;
    font-weight: 600;
}

.input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

input {
    width: 90%;
    height: 2rem;
    margin: 15px 0;
    border: 1px solid #a8a5a5;
    border-radius: 10px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    padding: 0 15px;

}


input:focus {
    outline: none;
    border: 1px solid rgb(248, 57, 120);
}



.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 40px;
    margin-top: 25px;

}

button {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 10px;
    background-color: rgb(248, 57, 120);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
}

button:hover {
    background-color: #ff96ca;

}
</style>
<template>
    <div class="navBar-Container">
        <div
            @click="handleLogoClick"
            class="logo"
        >
            <h1>THE CLOSET</h1>
            <ph-caret-down
                v-if="!caretUp"
                :size="24"
            />
            <ph-caret-up
                v-else
                :size="24"
            />
        </div>
        <div
            v-if="!user"
            class="auth-buttons"
        >
            <Button
                btnName="PROFILE"
                btnType="principal"
            />
            <Button
                @btnClick="() => handleAuth('signUp')"
                btnName="SIGN UP"
                btnType="principal"
            />
            <Button
                @btnClick="() => handleAuth('login')"
                btnName="LOGIN"
                btnType="principal"
            />
        </div>
        <div
            v-else
            class="auth-buttons"
        >
            <Avatar />
            <Button btnName="LOGOUT" />

        </div>

    </div>
</template>


<script setup>
import Button from './Button.vue'
import Avatar from './Avatar.vue'
import { PhCaretDown } from "@phosphor-icons/vue"
import { PhCaretUp } from "@phosphor-icons/vue"
import { ref } from 'vue'

const caretUp = ref(false)
const user = ref(null)

const emit = defineEmits([ 'chevronClick', 'loginClick', 'signUpClick' ])

const handleLogoClick = () =>
{
    emit('chevronClick')
    caretUp.value = !caretUp.value
}

const handleAuth = (action) =>  
{
    if (action === 'login') {
        emit('loginClick')
    } else if (action === 'signUp') {
        emit('signUpClick')
    }
}

</script>

<style scoped>
.navBar-Container {
    display: flex;
    align-items: center;
    background-color: #F5F5F5;
    padding: 0 2rem;
    height: 5rem;
    width: 100vw;

}

.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: rgb(248, 57, 120);

}

h1 {
    font-size: 28px;
    margin-right: 20px;


}


.auth-buttons {
    display: flex;
    margin-left: auto;

}
</style>
```
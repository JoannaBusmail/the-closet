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
        <div v-if="!isSmallScreen">
            <div
                v-if="!user"
                class="auth-buttons"
            >

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
                <Avatar
                    size="small"
                    :src="user.profile_url"
                />

                <Button
                    :btnName=user.username.toUpperCase()
                    btnType="principal"
                    @btnClick="handleProfile"
                />

                <Button
                    btnName="GET INSPIRED"
                    btnType="principal"
                    @btnClick="handleGetInspired"
                />
                <Button
                    btnName="LOGOUT"
                    btnType="principal"
                    @btnClick="handleLogout"
                />

            </div>
        </div>
        <div v-else>
            <div
                v-if="!user"
                class="auth-mobile-btns"
            >

                <ph-password
                    @click="() => handleAuth('signUp')"
                    class="mobile-btn"
                    :size="24"
                />
                <ph-sign-in
                    @click="() => handleAuth('login')"
                    class="mobile-btn"
                    :size="24"
                />
            </div>
            <div v-else>
                <ph-user-circle
                    @click="handleProfile"
                    class="mobile-btn"
                    :size="24"
                />
                <ph-lightbulb
                    class="mobile-btn"
                    :size="24"
                    @click="handleGetInspired"
                />

                <ph-sign-out
                    class="mobile-btn"
                    :size="24"
                    @click="handleLogout"
                />
            </div>

        </div>

    </div>
</template>


<script setup>
import Button from './Button.vue'
import Avatar from './Avatar.vue'
import { PhCaretDown, PhUserCircle, PhSignIn, PhPassword, PhSignOut, PhLightbulb } from "@phosphor-icons/vue"
import { PhCaretUp } from "@phosphor-icons/vue"
import { ref } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'


const userStore = useUserStore()
const { handleLogout } = userStore
const { user } = storeToRefs(userStore)


console.log('user:', user.value)

const { isSmallScreen } = useUIActions()

const caretUp = ref(false)


const emit = defineEmits([ 'chevronClick', 'loginClick', 'signUpClick', 'profileClick', 'getInspiredClick' ])

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

const handleProfile = () =>
{
    emit('profileClick')
}

const handleGetInspired = () =>
{
    emit('getInspiredClick')
}

</script>

<style scoped>
.navBar-Container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

@media screen and (max-width: 768px) {
    h1 {
        font-size: 18px;
        margin-right: 5px;
    }
}



.auth-buttons {
    display: flex;
    margin-left: auto;
}

.auth-mobile-btns {
    display: flex;
    margin-left: 20px;
    align-items: center;
}

.mobile-btn {
    margin: 0 15px;
}
</style>
```
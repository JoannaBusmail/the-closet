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
                <NotificationBubble
                    v-if="notification"
                    class="bigScreen-btn"
                    @click="handleNotifications"
                />

                <ph-bell-ringing
                    v-else
                    class="bigScreen-btn"
                    :size="20"
                    @click="handleNotifications"
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
                    :size="22"
                />
                <NotificationBubble
                    v-if="notification"
                    class="mobile-btn"
                    @click="handleNotifications"
                />
                <ph-bell-ringing
                    v-else
                    class="mobile-btn"
                    :size="22"
                    @click="handleNotifications"
                />
                <ph-lightbulb
                    class="mobile-btn"
                    :size="22"
                    @click="handleGetInspired"
                />

                <ph-sign-out
                    class="mobile-btn"
                    :size="22"
                    @click="handleLogout"
                />
            </div>

        </div>

    </div>
</template>


<script setup>
import Button from './Button.vue'
import Avatar from './Avatar.vue'
import NotificationBubble from './NotificationBubble.vue'
import { PhCaretDown, PhUserCircle, PhSignIn, PhPassword, PhSignOut, PhLightbulb, PhBellRinging } from "@phosphor-icons/vue"
import { PhCaretUp } from "@phosphor-icons/vue"
import { ref, onMounted, onUnmounted } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'


const notification = ref(true)

const userStore = useUserStore()
const { handleLogout } = userStore
const { user } = storeToRefs(userStore)

const router = useRouter()


const { isSmallScreen } = useUIActions()

const caretUp = ref(false)


const emit = defineEmits([ 'chevronClick', 'loginClick', 'signUpClick', 'profileClick', 'getInspiredClick', 'notificationsClick' ])

const handleLogoClick = () =>
{
    emit('chevronClick')
    caretUp.value = !caretUp.value
    if (!caretUp.value && !user.value) {
        router.push('/')

    }
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

const handleNotifications = () =>
{
    emit('notificationsClick')
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


.bigScreen-btn {
    margin: 20px 15px;

}

.bigScreen-btn:hover {
    color: rgb(248, 57, 120);

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
    margin: 0 12px;
}
</style>
```
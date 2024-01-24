<template>
    <h5>{{ title }}</h5>

    <form>
        <div class="input-container">
            <InputText
                class="primary"
                type="text"
                placeholder="Email"
                v-model=email
                @update:modelValue="$emit('update:emailInputValue', $event)"
            />
            <InputText
                class="primary"
                type="password"
                placeholder="Password"
                v-model=password
                @update:modelValue="$emit('update:passwordInputValue', $event)"
            />
            <InputText
                v-if="!isLogin"
                class="primary"
                type="password"
                placeholder="Confirm Password"
                v-model=confirmPassword
                @update:modelValue="$emit('update:confirmPasswordInputValue', $event)"
            />
        </div>
        <div class="button-container">
            <Button
                @btnClick="handleCancel"
                btnName="Cancel"
                btnType="secondary"
            ></Button>
            <Button
                btnName="Submit"
                btnType="secondary"
            ></Button>
        </div>


    </form>
</template>

<script setup>
import { computed, ref } from 'vue'
import Button from './Button.vue'
import InputText from './InputText.vue'



const emit = defineEmits([ 'cancelBtn', 'update:emailInputValue', 'update:passwordInputValue', 'update:confirmPasswordInputValue' ])


const props = defineProps({
    isLogin: Boolean,

})

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleCancel = () =>
{
    emit('cancelBtn')
}


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

.button-container {
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 40px;
    margin-top: 25px;

}
</style>
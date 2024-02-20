<template #content>
    <div
        class="container"
        :style="contentStyles"
    >
        <div class="content-container">
            <h1>MIX & MATCH</h1>
            <div class="inputs-container">
                <h3>{{ formName }}</h3>

                <InputText
                    class="secondary"
                    type="text"
                    placeholder="Color"
                    v-model="color"
                    @input="updateColor"
                />
                <div class="radio-input">
                    <InputRadio
                        v-for="(option, index) in radioOptions"
                        v-model="style"
                        :key="index"
                        :id="option.id"
                        :label="option.label"
                        :value="option.value"
                    >
                    </InputRadio>
                </div>
            </div>
            <Spinner v-if="isLoadingPosts" />
            <Carrousel
                v-else
                :posts="posts"
                @selectImage="selectImage"
            />


        </div>
    </div>
</template>
  
<script setup>
import Spinner from '@/components/Spinner.vue'
import Carrousel from '@/components/Carrousel.vue'
import InputText from '@/components/InputText.vue'
import InputRadio from './InputRadio.vue'
import { ref } from 'vue'
import { useUIActions } from '@/composables/useUIActions.js'


const props = defineProps({
    formName: String,
    isLoadingPosts: Boolean,
    posts: Array,
})


const emit = defineEmits([ 'selectImage', 'update' ])

const selectImage = (index) =>
{
    emit('selectImage', index)

}

const updateColor = () =>
{
    emit('update', { color: color.value })
    console.log(color.value)
}


const color = ref('')
const style = ref('')
const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },
])



// UI AND POSTS ACTIONS
const { contentStyles } = useUIActions()






</script>
  
<style scoped>
.container {
    position: relative;
    width: 100vw;
    height: 100vh;
    z-index: 5;
    transition: margin-left 0.3s ease;
}

.content-container {
    width: calc(100% - 60px);
    height: calc(100% - 60px);
    margin: 30px;
    background-color: #fff;
}

h1,
h3 {
    padding-top: 20px;
    margin-left: 20px;
}

.inputs-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}

.radio-input {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
</style>
  
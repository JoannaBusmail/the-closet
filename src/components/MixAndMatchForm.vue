<template>
    <div class="inputs-container">
        <h3>{{ formName }}</h3>

        <InputText
            class="secondary"
            type="text"
            placeholder="Color"
            v-model="state.color"
            @input="updateColor"
        />
        <div class="radio-input">
            <InputRadio
                v-for="(option, index) in radioOptions"
                v-model="state.style"
                :key="index"
                :id="option.id"
                :label="option.label"
                :value="option.value"
                @update:modelValue="updateStyle"
            >
            </InputRadio>
        </div>
    </div>
    <Spinner v-if="isLoadingPosts" />
    <Carrousel
        v-else
        :posts="posts"
        @selectImage="selectImage"
        :errorMessage="errorMessage"
    />
</template>
  
<script setup>
import Spinner from '@/components/Spinner.vue'
import Carrousel from '@/components/Carrousel.vue'
import InputText from '@/components/InputText.vue'
import InputRadio from './InputRadio.vue'
import { ref, reactive } from 'vue'


const props = defineProps({
    formName: String,
    isLoadingPosts: Boolean,
    posts: Array,
    errorMessage: String
})


const emit = defineEmits([ 'selectImage', 'update', 'updateStyle', 'updateBoth' ])

const selectImage = (index) =>
{
    emit('selectImage', index)

}

const updateColor = () =>
{
    emit('update', { color: state.color })
    emit('updateBoth', { color: state.color, style: state.style })
}

const updateStyle = () =>
{
    emit('updateStyle', { style: state.style })
    emit('updateBoth', { color: state.color, style: state.style })
}

const state = reactive({
    color: '',
    style: '',
})
const radioOptions = ref([
    { id: 'casual', label: 'Casual', value: 'casual' },
    { id: 'elegant', label: 'Elegant', value: 'elegant' },
    { id: 'all', label: 'All', value: 'all' },
])



</script>
  
<style scoped>
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
  
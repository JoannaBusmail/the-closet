<template>
    <main>
        <LayoutApp />
        <RouterView />
    </main>
</template>



<script setup>
import LayoutApp from './components/LayoutApp.vue'
import { RouterView } from 'vue-router'
import { useUserStore } from './stores/users'
import { useFetchDataStore } from '@/stores/fetchData'
import { onMounted } from 'vue'


const userStore = useUserStore()
const { getUser } = userStore



onMounted(async () =>
{
    await getUser()

})

</script>   



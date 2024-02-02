<template>
    <SectionsContent
        sectionName="TOP"
        :postData="topPosts"
        :loadingPosts="loadingPosts"
    >
    </SectionsContent>
</template>

<script setup>
import SectionsContent from '@/components/SectionsContent.vue'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/users'
import { useFetchDataStore } from '@/stores/fetchData'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user: loggedUser } = storeToRefs(userStore)


// FETCH DATA STORE
const fetchDataStore = useFetchDataStore()
const { fetchTopPosts } = fetchDataStore
const { topPosts, loadingPosts } = storeToRefs(fetchDataStore)



onMounted(() =>
{
    fetchTopPosts()
})

</script>

<style scoped></style>
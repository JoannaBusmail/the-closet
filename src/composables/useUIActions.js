import { ref, computed } from 'vue';

const showSideMenu = ref(false)
const showModal = ref(false)

export function useUIActions () {

    const contentStyles = computed(() => ({
        width: showSideMenu.value ? 'calc(100vw - 25vw)' : '100vw',
        left: showSideMenu.value ? '25vw' : '0',
      }));


 
    const toggleSideMenu = () => {
        showSideMenu.value = !showSideMenu.value
    }

    const toggleModal = () => {
        showModal.value = !showModal.value
    }

    return { showSideMenu, contentStyles, toggleSideMenu, showModal, toggleModal }
}


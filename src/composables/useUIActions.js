import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const showSideMenu = ref(false)
const showModal = ref(false)
const isSmallScreen = ref(window.innerWidth <= 768);

const handleResize = () => {
    isSmallScreen.value = window.innerWidth <= 768;
  };

export function useUIActions () {


    //SCREEN SIZE
    onMounted(() => {
        window.addEventListener('resize', handleResize);
      });
    
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
      });
    


    //SIDE MENU
    const contentStyles = computed(() => {
      if (isSmallScreen.value) {
          return {
              width: '100%',
              left: '0',
              top:showSideMenu.value ? '5vh' : '0'
          };
      } else {
          return {
              width: showSideMenu.value ? 'calc(100vw - 25vw)' : '100vw',
              left: showSideMenu.value ? '25vw' : '0',
          };
      }
  });
 
    const toggleSideMenu = () => {
        showSideMenu.value = !showSideMenu.value
    }


    //MODAL
    const toggleModal = () => {
        showModal.value = !showModal.value
    }

    return { showSideMenu, contentStyles, toggleSideMenu, showModal, toggleModal, isSmallScreen }
}


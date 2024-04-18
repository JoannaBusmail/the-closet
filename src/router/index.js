import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopView from '../views/TopView.vue'
import BottomView from '../views/BottomView.vue'
import ShoesView from '../views/ShoesView.vue'
import MixAndMatchView from '../views/MixAndMatchView.vue'
import CasualClosetView from '../views/CasualClosetView.vue'
import ElegantClosetView from '../views/ElegantClosetView.vue'
import GetInspiredView from '../views/GetInspiredView.vue'
import ProfileView from '../views/ProfileView.vue'
import NoRegisterUserView from '../views/NoRegisterUserView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import { useUserStore } from '@/stores/users'
import { storeToRefs } from 'pinia'





const requireAuth = (to, from, next) => {
  const userStore = useUserStore()
  const { user: loggedUser } = storeToRefs(userStore)

  if (loggedUser.value) {
    next()
  }else {
    next({ name: 'home' })
  }
}



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/notFound',
      name: 'notFound',
      component: NoRegisterUserView
    },
    {
      path: '/getInspired',
      name: 'GetInspiredView',
      component: GetInspiredView,
      beforeEnter: requireAuth
    },
    {
      path: '/getInspired/:username',
      name: 'ProfileView',
      component: ProfileView,
      beforeEnter: requireAuth
    },
      {
        path: '/closet/top/:username',
        name: 'TopView',
        component: TopView,
        beforeEnter: requireAuth
      },
      {
        path: '/closet/bottom/:username',
        name: 'BottomView',
        component: BottomView,
        beforeEnter: requireAuth
      },
      {
        path: '/closet/shoes/:username',
        name: 'ShoesView',
        component: ShoesView,
        beforeEnter: requireAuth
      },
      {
        path: '/closet/mixandmatch/:username',
        name: 'MixAndMatchView',
        component: MixAndMatchView,
        beforeEnter: requireAuth
      },
      {
        path: '/closet/mixandmatch/casualcloset/:username',
        name: 'CasualClosetView',
        component: CasualClosetView,
        beforeEnter: requireAuth
      },
      {
        path: '/closet/mixandmatch/elegantcloset/:username',
        name: 'ElegantClosetView',
        component: ElegantClosetView,
        beforeEnter: requireAuth
      },
      {
        path: '/notifications',
        name: 'NotificationsView',
        component: NotificationsView,
        beforeEnter: requireAuth,
        
      }
    
  ]
})

export default router

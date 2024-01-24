import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopView from '../views/TopView.vue'
import BottomView from '../views/BottomView.vue'
import ShoesView from '../views/ShoesView.vue'
import MixAndMatchView from '../views/MixAndMatchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
 
      {
        path: '/closet/top',
        name: 'TopView',
        component: TopView
      },
      {
        path: '/closet/bottom',
        name: 'BottomView',
        component: BottomView
      },
      {
        path: '/closet/shoes',
        name: 'ShoesView',
        component: ShoesView
      },
      {
        path: '/closet/mixandmatch',
        name: 'MixAndMatchView',
        component: MixAndMatchView
      },
    
  ]
})

export default router

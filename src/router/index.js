import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Favourites from '../views/Favourites.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  },
  {
    path: '/compare',
    name: 'Compare',
    component: Favourites
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

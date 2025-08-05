import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Other from '../views/Other.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/other', name: 'Other', component: Other }
]

const router = createRouter({
  history: createWebHistory('/Official-Site-Comics-Onofrietti/'),
  routes
})

export default router 
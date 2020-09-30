import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../components/main.vue'
import dashboard from '../components/dashboard.vue'
import scanner from '../components/scanner'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: main
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    component: dashboard
  },
  {
    path: '/scanner',
    component: scanner
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

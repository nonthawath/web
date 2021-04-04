import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../components/main.vue'
import dashboard from '../components/dashboard.vue'
// import scanner from '../components/scanner'
import table from '../components/table'
import Borrow from '../components/Borrow.vue'
import createBox from '../components/createBox'
import tablehistory from '../components/tablehistory'
import Queue from '../components/Queue'
import QueueStudent from '../components/QueueStudent'
import ShowQueue from '../components/ShowQueue'
import Upload from '../components/Upload'
import Histtoryborrow from '../components/Histtoryborrow'
import GetSubject from '@/components/GetSubject'
import CreateSubject from '@/components/CreateSubject'
import EditSubject from '@/components/EditSubject'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: main
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard
  },
  {
    path: '/scanner',
    name: 'Scanner',
    component: () => import(/* webpackChunkName: "about" */ '../views/scanner.vue')
  },

  {
    path: '/table',
    name: 'table',
    component: table
  }
  ,
  {
    path: '/Borrow',
    name: 'Borrow',
    component: Borrow
  },
  {
    path: '/createBox',
    name: 'createBox',
    component: createBox
  },
  {
    path: '/tablehistory',
    name: 'tablehistory',
    component: tablehistory
  },
  {
    path: '/Queue',
    name: 'Queue',
    component: Queue

  },
  {
    path: '/QueueStudent',
    name: 'QueueStudent',
    component: QueueStudent

  },
  {
    path: '/ShowQueue',
    name: 'ShowQueue',
    component: ShowQueue

  },
  {
    path: '/Upload',
    name: 'Upload',
    component: Upload

  },
  {
    path: '/Histtoryborrow',
    name: 'Histtoryborrow',
    component: Histtoryborrow

  },
  {
    path: '/GetSubject',
    name: 'GetSubject',
    component: GetSubject
  },
  {
    path: '/CreateSubject',
    name: 'CreateSubject',
    component: CreateSubject
  },
  {
    path: '/EditSubject',
    name: 'EditSubject',
    component: EditSubject
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

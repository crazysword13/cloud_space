import Vue from 'vue'
import VueRouter from 'vue-router'
import vuexIndex from '@/store/index.js'

// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'

import Private from '../components/Private.vue'
import Share from '../components/Share.vue'
import Container from '../components/container.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/index',
    name: 'Index',
    component: Index,
    children:
    [
      {
        path: "/Private",
        name: "Private",
        component: Private,
      },
      {
        path: "/Share",
        name: "Share",
        component: Share,
      },
    ]
    
  },
  {
    path: '/container',
    name: 'container',
    component: Container,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history', //此模式，部署到线上时，可能会出现一些（请求“错误”接口）的问题 
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path != '/login' && !vuexIndex.state.token) {
    router.replace('/login')
  }
  next()
})

export default router

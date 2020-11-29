import Vue from 'vue'
import Router from 'vue-router'
import pcrouter from './pc_router/pc'
// import MobileRouter from './mobile_router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () =>
      import(/* webpackChunkName: "pc" */ '@/App.vue'),
      redirect:'/index',
      children:[
        pcrouter
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import pcrouter from './pc_router/pc'
// import MobileRouter from './mobile_router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:pcrouter,
      component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/index'),
      children:[
        pcrouter
      ]
    }
  ]
})

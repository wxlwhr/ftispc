import Vue from 'vue'
import Router from 'vue-router'
import pcrouter from './pc_router/pc'

// import MobileRouter from './mobile_router'
Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
      component: () =>
        import(/* webpackChunkName: "pc" */ '@/pages/index'),
      children: [
        ...pcrouter

      ]
    },
    {
      path: '/productInfo',
      name: 'ProductInfo',
      component: () =>
        import(/* webpackChunkName: "pc" */ '@/pages/pc_page/product/detail'),
    },
    {
      path: '/solutionInfo',
      name: 'SolutionInfo',
      component: () =>
        import(/* webpackChunkName: "pc" */ '@/pages/pc_page/solution/detail'),
    },
  ]
})

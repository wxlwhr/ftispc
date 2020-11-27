export default {
  path: '/login',
  name: 'login',
  meta: {
    requireAuth: true,  // 除此路由外，其他都需登录
  },
  component: () =>
    import(/* webpackChunkName: "menu" */ '@/pages/index/views/login/index'),
}

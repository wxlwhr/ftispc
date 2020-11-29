export default {
    path: '/index',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "auth" */ '@/pages/mobile_page/index'),

  }
  
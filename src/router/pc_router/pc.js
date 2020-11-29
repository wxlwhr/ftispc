export default {
    path: '/index',
    name: 'Index',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/index'),

  }
  
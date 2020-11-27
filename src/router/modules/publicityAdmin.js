export default {
    path: '/publicityAdmin',
    name: '合作公示管理',
    component: () =>
      import(/* webpackChunkName: "publicity" */ '@/pages/index/views/publicityAdmin/index'),
    children: [
      
    ]
  }
  
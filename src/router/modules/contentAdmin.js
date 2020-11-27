export default {
    path: '/contentAdmin',
    name: '内容管理',
    component: () =>
      import(/* webpackChunkName: "certify" */ '@/pages/index/views/contentAdmin/index'),
    children: [

    ]
  }
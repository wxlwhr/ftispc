export default [{
    path: '/menuAdmin',
    name: '菜单管理',
    redirect: 'menuAdmin/organMenu',
    component: () =>
      import(/* webpackChunkName: "menu" */ '@/pages/index/views/menuAdmin/index'),
    children: [
      {
        path: 'organMenu',
        name: '机构菜单管理',
        component: () =>
          import(/* webpackChunkName: "user" */ '@/pages/index/views/menuAdmin/model/organ-menu'),
        children: [

        ]
      }
    ]
  },
  {
    path: '/message',
    name: '消息中心',
    component: () =>
      import(/* webpackChunkName: "menu" */ '@/pages/index/views/message/index'),
  },
]
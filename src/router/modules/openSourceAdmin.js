export default {
    path: '/openSourceAdmin',
    name: '开源软件管理',
    component: () =>
      import(/* webpackChunkName: "role" */ '@/pages/index/views/openSourceAdmin/index'),
    children: [
      {
        path: 'openSourceCatalogAdmin',
        name: '开源软件目录管理',
        component: () =>
          import(/* webpackChunkName: "role" */ '@/pages/index/views/openSourceAdmin/model/OpenSourceCatalogAdmin'),
      }
    ]
  }
  
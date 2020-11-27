export default {
    path: '/authAdmin',
    name: '权限管理',
    component: () =>
      import(/* webpackChunkName: "auth" */ '@/pages/index/views/authAdmin/index'),
      children: [
        {
          path: 'OrganUserAudit',
          name: '机构管理员管理',
          component: () =>
            import(/* webpackChunkName: "auth" */ '@/pages/index/views/authAdmin/model/OrganUserAudit'),
        },
        {
          path: 'organUserAuth',
          name: '机构用户权限管理',
          component: () =>
          import(/* webpackChunkName: "auth" */ '@/pages/index/views/authAdmin/model/OrganUserAuth'),
        },
        {
          path: 'adminAuth',
          name: '管理员权限管理',
          component: () =>
          import(/* webpackChunkName: "auth" */ '@/pages/index/views/authAdmin/model/adminAuth'),
        },
        {
          path: 'authApply',
          name: '权限申请',
          component: () =>
          import(/* webpackChunkName: "auth" */ '@/pages/index/views/authAdmin/model/authApply'),
        }
      ] 
  }
  
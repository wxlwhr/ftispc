export default [{
  path: '/userAdmin',
  name: '用户管理',
  component: () =>
    import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/index'),
  children: [
    {
      path: 'organAdmin',
      name: '机构管理员管理',
      redirect: 'organAdmin/list',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/router-view'),
      children: [
        {
          path: 'list',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/OrganAdmin'),
        },
        {
          path: 'detail',
          name: '查看',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/OrganDetail'),
        },
        {
          path: 'audit',
          name: '审核',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/OrganDetail'),
        },
      ]
    },
    {
      path: 'organUser',
      name: '机构用户管理',
      redirect: 'organUser/list',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/router-view'),
      children: [
        {
          path: 'list',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/OrganUser'),
        }
      ]
    },
    {
      path: 'ptAdmin',
      name: '平台用户管理',
      redirect: 'ptAdmin/list',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/router-view'),
      children: [
        {
          path: 'list',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/PtAdmin'),
        }
      ]
    },
    {
      path: 'UserManage',
      name: '用户管理',
      redirect: 'UserManage/list',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/router-view'),
      children: [
        {
          path: 'list',
          component: () =>
            import(/* webpackChunkName: "user" */ '@/pages/index/views/userAdmin/model/UserManage'),
        }
      ]
    }
  ]
},
{
  path: '/revisePsw',
  name: '修改密码',
  component: () =>
    import(/* webpackChunkName: "menu" */ '@/pages/index/views/login/revise/revisePsw'),
},
{
  path: '/reviseData',
  name: '修改资料',
  component: () =>
    import(/* webpackChunkName: "menu" */ '@/pages/index/views/login/revise/reviseData'),
},
{
  path: '/organReviseData',
  name: '修改资料',
  component: () =>
    import(/* webpackChunkName: "menu" */ '@/pages/index/views/login/revise/organReviseData'),
},

]

export default {
  path: '/roleAdmin',
  name: '角色管理',
  component: () =>
    import(/* webpackChunkName: "role" */ '@/pages/index/views/roleAdmin/index'),
  children: [
    {
      path: 'orgRole',
      name: '机构角色管理',
      component: () =>
        import(/* webpackChunkName: "role" */ '@/pages/index/views/roleAdmin/model/orgRole'),
    },
    {
      path: 'adminRole',
      name: '管理员角色管理',
      component: () =>
        import(/* webpackChunkName: "role" */ '@/pages/index/views/roleAdmin/model/adminRole'),
    }
  ]
}

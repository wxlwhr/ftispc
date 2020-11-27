export default {
  path: '/certifyAdmin',
  name: '披露认证管理',
  component: () =>
    import(/* webpackChunkName: "certify" */ '@/pages/index/views/certifyAdmin/index'),
  children: [
    {
      path: 'topicAdmin',
      name: '专题管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/TopicAdmin'),
    },
    {
      path: 'bottomTechAdmin',
      name: '底层技术管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/BottomTechAdmin'),
    },
    {
      path: 'caseCatalogAdmin',
      name: '解决方案目录管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/CaseCatalogAdmin'),
    },
    {
      path: 'casaDisclosureReview',
      name: '解决方案披露审核',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/CasaDisclosureReview'),
    },
    {
      path: 'businessSceneAdmin',
      name: '业务细分场景管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/BusinessSceneAdmin'),
    },
    {
      path: 'casaDisclosureAdmin',
      name: '解决方案披露',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/CasaDisclosureAdmin'),
    },
    {
      path: 'certificateAdmin',
      name: '证书管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/CertificateAdmin'),
    },
    {
      path: 'patentSceneAdmin',
      name: '专利管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/PatentSceneAdmin'),
    },
    {
      path: 'certificationBody',
      name: '认证机构管理',
      component: () =>
        import(/* webpackChunkName: "user" */ '@/pages/index/views/certifyAdmin/model/CertificationBodyAdmin'),
    },
  ]
}

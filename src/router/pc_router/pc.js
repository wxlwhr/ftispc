export default [{
    path: '/index',
    name: 'Index',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/index'),
  },
  {
    path: '/product',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/product'),
  },
  {
    path: '/productInfo',
    name: 'ProductInfo',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/product/detail'),
  },
  {
    path: '/solution',
    name: 'Solution',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/solution'),
  },
  {
    path: '/solutionInfo',
    name: 'SolutionInfo',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/solution/detail'),
  },
  {
    path: '/organization',
    name: 'Organization',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/organization'),
  },
  {
    path: '/organizationDetail',
    name: 'OrganizationDetail',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/organization/detail'),
  },
  {
    path: '/policy',
    name: 'Policy',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/policy'),
  },
  {
    path: '/dynamic_issue',
    name: 'Dynamic_issue',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/dynamic_issue'),
  },
  {
    path: '/about_us',
    name: 'About_us',
    component: () =>
      import(/* webpackChunkName: "pc" */ '@/pages/pc_page/about_us'),
  },
]
  
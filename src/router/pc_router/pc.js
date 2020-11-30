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
]
  
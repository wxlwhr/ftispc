export const list = [
  {
    selct: 'menuAdmin',
    icon: "iconfont iconcaidanguanli1",
    title: "菜单管理",
    path: "/menuAdmin",
    secondMenu: [
      {
        title: '机构菜单管理',
        index: 'organMenu'
      }
    ]
  },
  {
    selct: 'roleAdmin',
    icon: "iconfont iconjiaoseguanli",
    title: "角色管理",
    path: "/roleAdmin",
    secondMenu: [
      {
        title: '机构角色管理',
        index: 'orgRole'
      },
      {
        title: '管理员角色管理',
        index: 'adminRole'
      }
    ]
  },
  {
    selct: 'userAdmin',
    icon: "iconfont iconshequnguanli",
    title: "用户管理",
    path: "/userAdmin",
    secondMenu: [
      {
        title: '机构管理员管理',
        index: 'organAdmin'
      },
      {
        title: '机构用户管理',
        index: 'organUser'
      },
      {
        title: '平台管理员管理',
        index: 'ptAdmin'
      },
      {
        title:"用户管理",
        index:'Usermanage'
      }
    ]
  },
  {
    selct: 'authAdmin',
    icon: "iconfont iconquanxianguanli",
    title: "权限管理",
    path: "/authAdmin",
    secondMenu: [
      {
        title: '机构用户角色审核',
        index: 'OrganUserAudit'
      },
      {
        title: '机构用户权限管理',
        index: 'organUserAuth'
      },
      {
        title: '管理员权限管理',
        index: 'adminAuth'
      },
      {
        title: '权限申请',
        index: 'authApply'
      }
    ]
  },
  {
    selct: 'contentAdmin',
    icon: "iconfont iconcaidanguanli",
    title: "内容管理",
    index:'contentAdmin',
    path: "/contentAdmin",
  },
  {
    selct: 'certifyAdmin',
    icon: "iconfont iconnav_xinxipilou_sel",
    title: "披露认证管理",
    path: "/certifyAdmin",
    secondMenu: [
      {
        title: '专题管理',
        index: 'topicAdmin'
      },
      {
        title: '底层技术管理',
        index: 'bottomTechAdmin'
      },
      {
        title: '解决方案目录管理',
        index: 'caseCatalogAdmin'
      },
      {
        title: '解决方案披露审核',
        index: 'casaDisclosureReview'
      },
      {
        title: '业务细分场景管理',
        index: 'businessSceneAdmin'
      },
      {
        title: '解决方案披露',
        index: 'casaDisclosureAdmin'
      },
      {
        title: '证书管理',
        index: 'certificateAdmin'
      },
      {
        title: '专利管理',
        index: 'patentSceneAdmin'
      },
      {
        title: '认证机构管理',
        index: 'certificationBody'
      },
      {
        title: '披露管理',
        index: '5-4'
      },
      {
        title: '认证受理',
        index: '5-5'
      },
      {
        title: '评论管理',
        index: '5-6'
      }
    ]
  },
  {
    selct: '',
    icon: "iconfont iconpiloubiaohuizong",
    title: "合作公示管理",
    // path: "/",
    secondMenu: [
      {
        title: '机构菜单管理',
        index: 'publicityAdmin'
      },
      {
        title: '管理员菜单管理',
        index: '6-2'
      }
    ]
  },

  // 请求菜单
  // {
  //   "selct": "3",
  //   "parentId": "-1",
  //   "level": 1,
  //   "icon": null,
  //   "title": "菜单管理",
  //   "path": "/menu",
  //   "secondMenu": [
  //     {
  //       "selct": "8",
  //       "parentId": "3",
  //       "level": 2,
  //       "icon": null,
  //       "title": "机构菜单管理",
  //       "path": "/menu/organ",
  //       "secondMenu": []
  //     },
  //     {
  //       "selct": "9",
  //       "parentId": "3",
  //       "level": 2,
  //       "icon": null,
  //       "title": "管理员菜单管理",
  //       "path": "/menu/manager",
  //       "secondMenu": []
  //     }
  //   ]
  // },
  // {
  //   "selct": "4",
  //   "parentId": "-1",
  //   "level": 1,
  //   "icon": null,
  //   "title": "角色管理",
  //   "path": "/role",
  //   "secondMenu": null
  // },
  // {
  //   "selct": "1",
  //   "parentId": "-1",
  //   "level": 1,
  //   "icon": null,
  //   "title": "用户管理",
  //   "path": "/user",
  //   "secondMenu": [
  //     {
  //       "selct": "5",
  //       "parentId": "1",
  //       "level": 2,
  //       "icon": null,
  //       "title": "机构管理员管理",
  //       "path": "/user/organ/manager",
  //       "secondMenu": []
  //     },
  //     {
  //       "selct": "6",
  //       "parentId": "1",
  //       "level": 2,
  //       "icon": null,
  //       "title": "机构用户管理",
  //       "path": "/user/ogran/ordinary",
  //       "secondMenu": []
  //     },
  //     {
  //       "selct": "7",
  //       "parentId": "1",
  //       "level": 2,
  //       "icon": null,
  //       "title": "平台管理员管理",
  //       "path": "/user/plantform/manager",
  //       "secondMenu": []
  //     }
  //   ]
  // },
  // {
  //   "selct": "2",
  //   "parentId": "-1",
  //   "level": 1,
  //   "icon": null,
  //   "title": "权限管理",
  //   "path": "/perm",
  //   "secondMenu": null
  // }
]

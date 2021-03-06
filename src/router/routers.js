import Main from '@/components/main'
// import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/upms',
    name: 'upms',
    meta: {
      icon: 'logo-buffer',
      title: '权限管理',
      showAlways: true,
      access: ['upms']
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          icon: 'md-trending-up',
          title: '用户管理',
          access: ['user:list']
        },
        component: () => import('@/view/upms/user-list.vue')
      },
      {
        path: 'group',
        name: 'group',
        meta: {
          icon: 'ios-infinite',
          title: '组管理',
          access: ['group:list']
        },
        component: () => import('@/view/upms/group-list.vue')
      },
      {
        path: 'resource',
        name: 'resource',
        meta: {
          icon: 'md-grid',
          title: '资源管理',
          access: ['resource:list']
        },
        component: () => import('@/view/upms/resource-mgr.vue')
      },
      {
        path: 'unit',
        name: 'unit',
        meta: {
          icon: 'md-people',
          title: '组织机构管理',
          access: ['unit:list']
        },
        component: () => import('@/view/upms/unit-list.vue')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-settings',
      title: '系统管理',
      showAlways: true,
      access: ['sys']
    },
    component: Main,
    children: [
      {
        path: 'data-category',
        name: 'dataCategory',
        meta: {
          icon: 'md-bookmarks',
          title: '字典类别管理',
          access: ['dictionary-category:list']
        },
        component: () => import('@/view/upms/dict-category-list.vue')
      },
      {
        path: 'data-dictionary',
        name: 'dataDictionary',
        meta: {
          icon: 'md-bookmarks',
          title: '数据字典管理',
          access: ['data-dictionary:list']
        },
        component: () => import('@/view/upms/dict-list.vue')
      },
      {
        path: 'schedule',
        name: 'schedule',
        meta: {
          icon: 'md-bookmarks',
          title: '定时任务',
          access: ['job:list']
        },
        component: () => import('@/view/upms/job-manager.vue')
      },
      {
        path: 'logs',
        name: 'logs',
        meta: {
          icon: 'md-bookmarks',
          title: '日志查询',
          access: ['audit:list']
        },
        component: () => import('@/view/upms/sys-logs.vue')
      },
      {
        path: 'dynamic-form',
        name: 'dynamic-form',
        meta: {
          icon: 'md-bookmarks',
          title: '动态表格'
        },
        component: () => import('@/view/upms/dynamic-form.vue')
      },
      {
        path: 'frame',
        name: 'iframe',
        meta: {
          icon: 'md-bookmarks',
          title: 'iframe',
          src: 'http://127.0.0.1:7400/api/druid/index.html'
        },
        component: () => import('@/view/components/frame/frame.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]

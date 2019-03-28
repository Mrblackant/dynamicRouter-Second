import Vue from 'vue'
import Router from 'vue-router'
const layout = () => import('@/components/layout')
// 登录页
const reload = () => import('@/components/reLoad')

// 首页
const main = () => import('@/views/index')
const table = () => import('@/views/example/table/index')
const tree = () => import('@/views/example/tree')
const tableFirst = () => import('@/views/example/table/tableFirst')
const tableSecond = () => import('@/views/example/table/tableSecond')
Vue.use(Router)
export const fixedRouter = [{
    path: '',
    component: reload,
    hidden: true
  },
  {
    // 一级菜单写法,对应demo首页
    path: '',
    // name: 'layout',
    component: layout,
    children: [{
      path: 'main',
      component: main,
      meta: { title: '首页', roles: ['user', 'admin'], icon: 'el-icon-info' }
    }]
  },
]
export const permissionRouter = [{
  path: "/example",
  component: layout,
  name: "Example",
  meta: {
    title: "案例",
    icon: "el-icon-success",
    roles: ['admin', 'user']
  },
  children: [{
      path: "/example/table",
      name: "Table",
      component: table,
      // redirect: '/example/table/table1',
      meta: {
        title: "table案例",
        icon: "el-icon-goods"
      },
      // 三级菜单写法，对应demotable案例下边的两个菜单
      children: [{
          path: "table1",
          name: "Table1",
          component: tableFirst,
          meta: {
            title: "table1",
            icon: "el-icon-mobile-phone",
            roles: ['admin','user']

          }
        },
        {
          path: "table2",
          name: "Table2",
          component: tableSecond,
          meta: {
            title: "table2",
            icon: "el-icon-service",
            roles: ['admin']
          }
        }
      ]
    },
    {
      path: "tree",
      name: "Tree",
      component: tree,
      meta: {
        title: "树形菜单",
        icon: "el-icon-upload",
        roles: ['user', 'admin']
      }
    }
  ]
}]


export default new Router({
  routes: fixedRouter

})

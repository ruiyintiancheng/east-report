/*
 * @Author: lk
 * @Date: 2019-02-01 17:38:40
 * @Last Modified by: lk
 * @Last Modified time: 2020-03-17 10:55:38
 */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.permission_routers.length === 0) {
        store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          // if (!store.getters.name) { // 判断当前用户是否已拉取完user_info信息
          //   store.dispatch('GetUserInfo')// 拉取user_info
          // }
          // next({ ...to })
          store.dispatch('GetUserInfo').then(_ => {
            next({ path: '/' })
          })// 拉取user_info
        })
      } else {
        if (process.env.NODE_ENV === 'production') {
          store.commit('SET_BASE_URL', getBaseUrl(to))
        }
        if (store.state.tagsView.visitedViews.every(item => item.path !== to.path)) {
          store.dispatch('deleteErrorNotifitions', [{ path: to.path }]).then(_ => {
            next()
          })
        } else {
          next()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

function getBaseUrl(to) {
  const modules = require('@/utils/baseUrl').default
  for (const key in modules) {
    if (to.meta.name && to.meta.name.startsWith(key) && modules[key].baseUrl) {
      return modules[key].baseUrl
    }
  }
  return null
}

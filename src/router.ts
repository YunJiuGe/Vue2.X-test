import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/Regist',
      name: 'Regist',
      component: () => import('@/views/User/Regist.vue')
    },
    {
      path: '/Guid',
      name: 'Guid',
      component: () => import('@/views/company/equipment/GuidanceFile.vue')
    },
    {
      name: 'scanCodePage',
      path: '/scanCodePage',
      component: () => import('@/views/common/views/scanCodePage.vue')
    }
  ]
})

// 导入了Vue
import Vue from 'vue'
// 导入第三方包 Vue-router
import Router from 'vue-router'
// 导入创建的子组件login
import Login from '@/views/login'
// 导入创建的子组件home
import Home from '@/views/home'

// 使用路由
Vue.use(Router)

// 创建并且导出一个Router对象
export default new Router({
  // 设置路由选项
  routes: [
    // 路由重定向,访问根目录直接跳转主页
    {
      path: '/',
      redirect: '/home'
    },
    { path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})

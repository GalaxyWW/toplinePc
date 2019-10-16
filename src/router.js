// 导入了Vue
import Vue from 'vue'
// 导入第三方包 Vue-router
import Router from 'vue-router'
// 导入创建的子组件login
import Login from '@/views/login'
// 导入创建的子组件home
import Home from '@/views/home'
// 导入布局路由layout
import Layout from '@/views/layout'
// 导入publish组件
import Publish from '@/views/article/publish'
// 导入list
import List from '@/views/article/list'
// 导入评论组件
import Comment from '@/views/comment'
// 导入素材组件
import Material from '@/views/material'
// 导入账户路由
import User from '@/views/user'

// 导入nprogress
import nprogress from 'nprogress'
// 导入样式文件
import 'nprogress/nprogress.css'

// 使用路由
Vue.use(Router)

// 创建并且导出一个Router对象
let router = new Router({
  // 设置路由选项
  routes: [
    // 路由重定向,访问根目录直接跳转主页
    {
      path: '/',
      redirect: '/home'
    },
    // 登录路由
    { path: '/login',
      name: 'login',
      component: Login
    },
    // 布局路由
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      // 添加它的子路由
      children: [
        // 将Home作为layout的子路由存在
        { path: '/home', component: Home },
        // 将publish作为layout的子路由存在
        { path: '/article/publish', component: Publish },
        // 将list作为layout的子路由存在
        { path: '/article/list', component: List },
        // 添加一个修改文章的路由
        { path: '/article/edit/:id', component: Publish },
        // 添加评论的子路由
        { path: '/comment', component: Comment },
        // 添加素材的子路由
        { path: '/material', component: Material },
        // 添加用户的子路由
        { path: '/user/center', component: User }
      ]
    }
  ]
})

// router: 路由对象
// 给路由对象添加导航守卫: 全局前置导航守卫
// beforeEach:当一个路由跳转另一个路由的出发方法
// to: 要到达的目标路由   from: 发起跳转的路由
// next: 函数,是否执行后续代码
router.beforeEach((to, from, next) => { // 这个方法执行了,就说明请求的路由发生了改变
  // 开启进度条
  nprogress.start()
  // 排除跳转到登录页面
  if (to.path !== '/login') {
    // 得到 localStorage 中的 userInfo
    let userInfo = window.localStorage.getItem('userInfo')
    if (!userInfo) {
      // 如果不存在,说明没有登录过,应该跳转到登录页面
      router.push('./login')
    } else {
      next()// 执行后续代码
    }
  } else {
    next()// 执行后续代码
  }
})

// 在全局后置钩子中关闭
router.afterEach((to, from) => {
  // 关闭进度条
  nprogress.done()
})
export default router

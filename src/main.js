// 导入了Vue
import Vue from 'vue'
// 导入跟组件
import App from './App.vue'
// 导入路由
import router from './router'
// 导入了 Vuex
import store from './store'
// 导入element-ul第三方包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式
import { } from '@/style/index.less'

// 使用element
Vue.use(ElementUI)

// 设置当前项目模式为:开发模式--非生产模式
Vue.config.productionTip = false

// 创建一个Vue实例
new Vue({
  router,
  store,
  // 将跟组件APP渲染到id为app的容器中
  render: h => h(App)
}).$mount('#app')

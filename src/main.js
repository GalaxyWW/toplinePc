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
import '@/style/index.less'
// 导入axios
import axios from 'axios'
// 导入 json-bigint
import JSONBig from 'json-bigint'
// 导入富文本编辑框文件
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 使用
Vue.use(VueQuillEditor)

// 对服务器响应给 axios 的数据进行 bigint 的处理
axios.defaults.transformResponse = [
  function (data) {
    try {
    // 这个 data 就是服务器响应给 axios 的数据
      // 在return之前要进行转换
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]

// 给axios设置一个基准地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 设置 axios的拦截器
// 请求拦截器,请求之前执行
axios.interceptors.request.use(function (config) {
  // 请求正常时执行的逻辑
  // config: axios 请求服务器的相关信息
  // 在请求拦截器执行完逻辑代码之后一定要 return config ,否则无法发送请求

  // 得到token   得到的是字符串,所以需要JSON转换
  let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
  // 判断只有在 userInfo 存在时,才需要添加 token
  if (userInfo) {
  // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  // 当请求异常时的逻辑
  return Promise.reject(error)
})

// 响应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // 当服务器响应回信息时执行
  // 响应拦截器如果返回信息,必须return response,否则无法接受返回的信息
  // 使用响应来改造返回的数据
  return response.data.data
},
function (error) {
  // 当响应错误时执行,错误时的信息
  return Promise.reject(error)
}
)

// 将axios挂在到Vue原型上
// axios可以通过$http来使用
// .Vue都是 Vue中的组件,所有组件都是Vue的实例
// 在所有Vue实例中都可以使用$http
Vue.prototype.$http = axios

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

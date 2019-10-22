import Vue from 'vue'
// 导入了vuex
import Vuex from 'vuex'

// 使用了vuex
Vue.use(Vuex)

// 导入了一个 vuex 对象
export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(window.localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    changeUserInfo (state, newUser) {
      // 将新的值赋值给userInfo
      state.userInfo.name = newUser.name
      state.userInfo.intro = newUser.intro
      state.userInfo.email = newUser.email
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    changeUserInfoImg (state, newImg) {
      state.userInfo.photo = newImg
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      // 将数据同步到 localstorage 中
      window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  },
  actions: {

  }
})

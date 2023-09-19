import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  // /* vuex数据持久化配置 */
  // plugins: [
  //   createPersistedState({
  //     // 存储方式：localStorage、sessionStorage、cookies
  //     storage: window.sessionStorage,
  //     // 存储的 key 的key值
  //     key: "store",
  //     render(state) {
  //       // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
  //       return {
  //         ...state
  //       };
  //     }
  //   })
  // ],

  state: {
    userInfo:{
      uid: '',
      username: '',
      password: '',
      new_password: '',
    }
  },

  // 设置属性状态，处理数据的唯一途径，state的改变或赋值只能在这里
  mutations: {
    SET_userInfo(state,data){
      state.userInfo = data
    },
  },
  actions: {
  },
  modules: {
  }
})

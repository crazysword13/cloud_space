import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import createPersistedState from "vuex-persistedstate"

export default new Vuex.Store({
  /* vuex数据持久化配置 */
  plugins: [
    createPersistedState({
      // 存储方式：localStorage、sessionStorage、cookies
      storage: window.sessionStorage,
      // 存储的 key 的key值
      key: "store",
      render(state) {
        // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
        return {
          ...state
        };
      }
    })
  ],

  state: {
    userInfo: {
      username: '',//无用
      a_code: '',//无用
      
      uid: '',
      root_id: '',
      email: '',
      password: '',
      new_password: '',
    },
    token: '',
    IsLogin: false,

    currentListId: 0, // 当前文件的id
    currentListParent_id: -1,//当前文件夹的 parent_id
    IsBack: false,//判断是否处于回退状态

    personalList:[
      {
        prid: 4,    // 文件唯一标识id
        uid: 4,     // 所属用户标识id
        parent_id: 0,   // 上级目录id
        rid: 8,        // 文件资源标识
        isdir: 0,     // 是否是文件 dir:1; file:0
        src_name: "liuqi.word",   // 资源名（带扩展名）

        //下列参数在获取后端的数据后，在前端生成，生成方法见 Private.vue组件 test1()函数
        type: 'word',
        checked: false,
      },
      {
        prid: 3,    // 文件唯一标识id
        uid: 3,     // 所属用户标识id
        parent_id: 0,   // 上级目录id
        rid: 6,        // 文件资源标识
        isdir: 0,     // 是否是文件 dir:1; file:0
        src_name: "666.php",   // 资源名（带扩展名）
        type: 'php',
        checked: false,
      },
      {
        prid: 2,    // 文件唯一标识id
        uid: 2,     // 所属用户标识id
        parent_id: 0,   // 上级目录id
        rid: 1,        // 文件资源标识
        isdir: 1,     // 是否是文件 dir:1; file:0
        src_name: "666",   // 资源名（带扩展名）

        type: 'folder',
        checked: false,
      }
        
    ],
  },

  // 设置属性状态，处理数据的唯一途径，state的改变或赋值只能在这里
  mutations: {
    SET_userInfo(state,data){
      state.userInfo = data
    },
    //设置token
    SET_Token(state,data){
      state.token = data
    },

    //修改文件列表信息
    SET_PersonalList(state,data){
      state.personalList = data
    },

    //修改当前文件夹 ID
    SET_CurrentListId(state,data){
      state.currentListId = data
    },

    //修改当前文件夹的 parent_id
    SET_CurrentListParent_id(state,data){
      state.currentListParent_id = data
    },

    //修改是否处于回退的状态 IsBack
    SET_IsBack(state,data){
      state.IsBack = data
    }, 
  },
  actions: {
  },
  modules: {
  }
})

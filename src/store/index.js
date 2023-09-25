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
    FileOprationId: -1,//操作的id
    FileOprationCId: -1,//操作的Cid

    IsFileOprationFolder: false,//操作文件是否为 folder
    //当前正在操作的文件
    FileOpration:{
      prid: 0,    
      uid: 0,     
      parent_id: 0,   
      rid: 0,        
      isdir: 0,     
      src_name: "",  
      type: '',
      checked: false,
    },

    currentListId: 0, // 当前文件的id
    currentListCId: 1, // 当前文件的id

    currentListParent_id: -1,//当前文件夹的 parent_id
    currentListParent_cid: -1,//当前文件夹的 parent_id

    IsBack: false,//判断是否处于回退状态

    PageName: '',//主页名

    //个人文件页的面包屑列表
    cunrrentFileList_private: ['全部'],
    // [
    //   //  '全部'
    // ],
    //分享空间页的面包屑列表
    cunrrentFileList_share:[
      // '全部'
    ],


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
    ShareList:[

    ]
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

    //修改文件列表信息
    SET_ShareList(state,data){
      state.ShareList = data
    },

    //修改当前文件夹 ID
    SET_CurrentListId(state,data){
      state.currentListId = data
    },

    //修改当前文件夹 ID
    SET_CurrentListCId(state,data){
      state.currentListCId = data
    },

    //修改当前文件夹的 parent_id
    SET_CurrentListParent_id(state,data){
      state.currentListParent_id = data
    },

    //修改当前文件夹的 parent_id
    SET_CurrentListParent_cid(state,data){
      state.currentListParent_cid = data
    },

    //修改是否处于回退的状态 IsBack
    SET_IsBack(state,data){
      state.IsBack = data
    }, 

    //修改个人文件组件，面包屑列表
    SET_CunrrentFileList_share(state,data){
      state.cunrrentFileList_share = data
    }, 

    //修改分享空间组件，面包屑列表
    SET_CunrrentFileList_private(state,data){
      state.cunrrentFileList_private = data
    },

    //修改主页名，PageName值
    SET_PageName(state,data){
      state.PageName = data
    },

    //修改FileOprationId值
    SET_FileOprationId(state,data){
      state.FileOprationId = data
    },

    //修改FileOprationCId值
    SET_FileOprationCId(state,data){
      state.FileOprationCId = data
    },

    //修改IsFileOprationFolder值
    SET_IsFileOprationFolder(state,data){
      state.IsFileOprationFolder = data
    },
 
    //修改FileOpration值
    SET_FileOpration(state,data){
      state.FileOpration = data
    },
    
  },
  actions: {
  },
  modules: {
  }
})

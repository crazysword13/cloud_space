<template>
  <div class="toolBar">
    <!-- <div>
      <Breadcrumb/>
    </div> -->
    <ul class="breadcrumb">
      <li v-for="(item, index) in currentFileList" :key="item.prid" >
        <Icon class="icon-break-next" type="ios-arrow-forward" size=20 color="#777" v-if="index !== 0"></Icon>
        {{item.src_name}}
      </li>
    </ul>

    <Upload 
      action="http://10.122.194.184:8082/upload"
      show-file-list: false
      :on-success="uploadSuccess"
      :data="submitData">
        <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    
    <div class="btn-list">
      <div v-if="length === 0">
        <ButtonGroup size="large" class="btn-grounp" >
          <Button type="ghost" @click="changeViewTo('list')" :class="view === 'list'? 'btn-active': ''" key="list">
            <img src="../assets/list.png" class="btn-img" />
          </Button>
          <Button type="ghost" @click="changeViewTo('thumbnail')" :class="view === 'thumbnail'? 'btn-active': ''" key="thumbnail">
            <img src="../assets/big.png" class="btn-img" />
          </Button>
        </ButtonGroup>
        
      </div>
      <div v-else>
        <ButtonGroup size="large" class="btn-grounp" >
          <Button class="btn-item" key="delete" @click="modal1 = true">删除</Button>
          <!-- <Button class="btn-item" key="rename" @click="renameStart">重命名</Button> -->
          <!-- <Button class="btn-item" key="moveTo" @click="modal2 = true" disable>移动到</Button> -->
          <Button class="btn-item" key="download" >下载</Button>
          <Button class="btn-item" key="share" >分享</Button>
        </ButtonGroup>
      </div>
      <Button style="border: none;border-radius: 2px;font-size: 16px;font-weight: bold;" type="info" icon="plus-round" size="large" @click="goBack" >返回</Button>
      <Button style="background-color: #1296db;border: none;border-radius: 2px;font-size: 16px;font-weight: bold;" type="primary" icon="plus-round" size="large" @click="addNewFolder" >新建文件夹</Button>
    </div>
    <!-- <Modal
      v-model="modal1"
      title="删除文件"
      class-name="vertical-center-modal"
      @on-ok="okDelete"
      @on-cancel="cancelDelete">
      <p>确定删除这{{checkedBuffer.length}}个文件/文件夹？</p>
    </Modal> -->
    <Modal
      v-model="modal2"
      title="新建文件夹"
      class-name="vertical-center-modal"
      @on-ok="okMove"
      @on-cancel="cancelMove">
      <el-input
        v-model="newName"
        placeholder="请输入新建文件夹名"
      ></el-input>
    </Modal>
  </div>
</template>

<script>
import {  Button, ButtonGroup, Modal,  Icon, Upload} from 'iview'
// import Breadcrumb from './breadcrumb'
// import { getChildrenById, canMoveData, getCheckedFileFromBuffer } from '../store/data'
// import { mapState } from 'vuex'

import { PersonalSave } from "../network/request.js";

export default {
  name: 'toolbar',
  components: {
    // Col,
    Button,
    ButtonGroup,
    // Breadcrumb,
    Modal,
    // Message,
    Icon,
    Upload,
  },
  data () {
    return {
      //上传文件时携带的时候参数
      submitData:{
        uid: 4,
        rid: 8,
        parent_id: 0,
        isdir: 0,
        src_name: "ddddd"

      },
      userInfo:{
        username: '',//无用
        a_code: '',//无用
        
        uid: '',
        root_id: '',
        email: '',
        password: '',
        new_password: '',
      },


      active: false,
      newName: '',

      modal1: false,
      modal2: false,
      activeId: 0,
      length: 0,
      currentFileList:[
        {
          prid: 3,    // 文件唯一标识id
          uid: 4,     // 所属用户标识id
          parent_id: 0,   // 上级目录id
          rid: 8,        // 文件资源标识
          isdir: 1,     // 是否是文件 dir:1; file:0
          src_name: "全部",   // 资源名（带扩展名）
          type: 'folder',
          checked: false,
        },
        {
          prid: 3,    // 文件唯一标识id
          uid: 4,     // 所属用户标识id
          parent_id: 0,   // 上级目录id
          rid: 8,        // 文件资源标识
          isdir: 1,     // 是否是文件 dir:1; file:0
          src_name: "first",   // 资源名（带扩展名）
          type: 'folder',
          checked: false,
        },
        {
          prid: 2,    // 文件唯一标识id
          uid: 4,     // 所属用户标识id
          parent_id: 0,   // 上级目录id
          rid: 8,        // 文件资源标识
          isdir: 1,     // 是否是文件 dir:1; file:0
          src_name: "Second",   // 资源名（带扩展名）
          type: 'folder',
          checked: false,
        },
      ]
    }
  },
  computed: {
    
    
  },
  created:function(){
    this.userInfo = JSON.parse(this.$store.state.userInfo)
  },
  methods: {
    addNewFolder(){
      this.modal2 = !this.modal2
    },
    goBack(){

      let currentListId = this.$store.state.currentListId
      let user = JSON.parse(this.$store.state.userInfo)
      if(currentListId != user.root_id)
      {
        //修改IsBack的状态
        this.$store.commit("SET_IsBack", true);
        this.$router.go(0)
      }
      else{
        this.$message.warning("当前已经处于根目录");
      }
    },

    async okMove(){
      let List = await PersonalSave({
        uid: this.userInfo.uid,
        rid: 0,
        parent_id: this.$store.state.currentListId,//将当前文件夹的id，作为上传文件的parent_id
        isdir: 1,
        src_name: this.newName,
      });
      console.log(List);
      this.$router.go(0)
    },

    cancelMove(){
      this.newName = ''
    },


    async uploadSuccess(response){
      let res = response.data
      // console.log(res)
      let List = await PersonalSave({
        uid: this.userInfo.uid,
        rid: res.rid,
        parent_id: this.$store.state.currentListId,//将当前文件夹的id，作为上传文件的parent_id
        isdir: 0,
        src_name: res.filename,
      });
      console.log(List);
      this.$router.go(0)
    }
  },
  mounted () {
    // eventBus.$on('moveFolderTo', () => {
    //   this.modal2 = true
    // })
    // eventBus.$on('deleteFolder', () => {
    //   this.modal1 = true
    // })
  }
}
</script>

<style>
.toolBar {
  display: flex;
  justify-content: space-between;
  height: 64px;
  line-height: 64px;
  padding-left: 20px;
}
.btn-list {
  display: flex;
  justify-content: flex-end;
  padding: 13px 45px 14px 0;
}
.btn-grounp {
  margin-right: 20px;
  vertical-align: top !important;
}
.btn-img {
  width: 16px;
  margin-bottom: -2px;
}
.btn-active {
  background-color: #E6E7EC !important;
  pointer-events: none;
}
.activeTree {
  background-color: antiquewhite;
}
.btn-item {
  font-weight: 500;
  color: #000;
}
.vertical-center-modal {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vertical-center-modal .ivu-modal{
  top: 0;
}

  .breadcrumb {
    height: 40px;
    line-height: 40px;
    margin: 10px;
    text-align: center;
    font-size: 14px;
  }
  .breadcrumb li {
    display: inline-block;
    font-family: -apple-system;
    font-weight: 700;
  }
  .breadcrumb li a {
    color: #777;
  }
  .breadcrumb li:last-child a {
    color: #000;
    pointer-events: none;
  }
  .icon-break-next {
    margin: 0 10px;
    vertical-align: text-bottom;
  }
</style>

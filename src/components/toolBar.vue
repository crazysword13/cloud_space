<template>
  <div class="toolBar">
    <!-- <div>
      <Breadcrumb/>
    </div> -->
    <ul class="breadcrumb">
      <li v-for="(item, index) in currentFileList" :key="index" >
        <Icon class="icon-break-next" type="ios-arrow-forward" size=20 color="#777" v-if="index !== 0"></Icon>
        {{item}}
      </li>
    </ul>

    <Upload 
      action="http://localhost:8082/upload"
      show-file-list: false
      :on-success="uploadSuccess">
        <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
    </Upload>
    <!-- v-if="PageName == 'private'" -->

    
    
    <div class="btn-list">
      <!-- <div v-if="IsFileOpration">
        <ButtonGroup size="large" class="btn-grounp" >
          <Button type="ghost" @click="changeViewTo('list')" :class="view === 'list'? 'btn-active': ''" key="list">
            <img src="../assets/list.png" class="btn-img" />
          </Button>
          <Button type="ghost" @click="changeViewTo('thumbnail')" :class="view === 'thumbnail'? 'btn-active': ''" key="thumbnail">
            <img src="../assets/big.png" class="btn-img" />
          </Button>
        </ButtonGroup>
        
      </div> -->
      <!-- <div v-else> -->
      <div>
        <ButtonGroup size="large" class="btn-grounp" >
          <Button class="btn-item" key="delete" @click="deleteFile">删除</Button>
          <!-- <Button class="btn-item" key="rename" @click="renameStart">重命名</Button> -->
          <!-- <Button class="btn-item" key="moveTo" @click="modal2 = true" disable>移动到</Button> -->
          <Button class="btn-item" key="download" @click="downloadFile">下载</Button>
          <Button class="btn-item" key="share" disabled>分享</Button>
        </ButtonGroup>
      </div>
      <Button style="border: none;border-radius: 2px;font-size: 16px;font-weight: bold;" type="info" icon="plus-round" size="large" @click="goBack" >返回</Button>
      <Button style="background-color: #1296db;border: none;border-radius: 2px;font-size: 16px;font-weight: bold;" type="primary" icon="plus-round" size="large" @click="addNewFolder" >新建文件夹</Button>
    </div>

    <Modal
      v-model="modal1"
      title="删除文件"
      class-name="vertical-center-modal"
      @on-ok="okDelete"
      @on-cancel="cancelDelete">
      <p style="color:#464c5b; font-size:20px">是否确定删除这个文件</p>
    </Modal>

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

import { PersonalSave, PersonalDel, CourseSave, CourseDel} from "../network/request.js";

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
      PageName: this.$store.state.PageName,//主页名

      //上传文件时携带的时候参数
      submitData:{
        uid: 4,
        rid: 8,
        parent_id: 0,
        isdir: 0,
        src_name: "ddddd",
      },

      submitData_course:{
        rid: 2,
        parent_id: 0,
        isdir: 0,
        src_name: "dddd"
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
      IsFileOpration: false,

      currentFileList:[
        '全部',
        'first',
        'second',
        'third',
      ]
    }
  },
  computed: {
    
    
  },
  created:function(){
    this.userInfo = JSON.parse(this.$store.state.userInfo)
    let PageName = this.$store.state.PageName
    // console.log('目前的主页名字为'+PageName)
    if(PageName == 'private')
    {
      this.currentFileList = JSON.parse(this.$store.state.cunrrentFileList_private)
    }
    else if(PageName == 'share')
    {
      this.currentFileList = JSON.parse(this.$store.state.cunrrentFileList_share)
    }
  },
  methods: {
    deleteFile(){
      let FileOprationId = this.$store.state.FileOprationId
      if(FileOprationId == -1)
      {

        this.$message.warning("请选则操作的文件")
      }
      else{
        this.modal1 = true
      }
    },

    downloadFile(){
      let FileOprationId = this.$store.state.FileOprationId
      if(FileOprationId == -1)
      {
        this.$message.warning("请选则操作的文件")
      }
      else{
        // console.log(111)
        let FileInit = JSON.parse(this.$store.state.FileOpration)
        // console.log(FileInit)
        if(FileInit.type == 'folder')
        {
          this.$message.warning("暂不支持下载文件夹")
        }else{
          this.$message.success("正在下载")
          // Download({
          //   rid: FileInit.rid,
          // })
          
          //http://localhost:8082/download
          this.$axios.post('http://10.122.194.184:8082/download', {
            rid: FileInit.rid
          },{responseType: 'blob' // 设置响应数据的格式
          }).then(res => {
              console.log(res)
              const fileName = decodeURIComponent(
                res.headers
                  .get('Content-Disposition')
                  .split("=")[1]
              );
              const url = window.URL.createObjectURL(new Blob([res.data]), {
                type: res.headers.get('Content-Type'),
              });
              const link = document.createElement('a');
              link.style.display = 'none';
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          })
        }
        // let IsFileOprationFolder = this.$store.state.IsFileOprationFolder
        // if(IsFileOprationFolder)
        // {
        //   this.$message.warning("暂不支持下载文件夹")
        // }else{
        //   this.$message.success("什么情况")
        // }
      }
    },

    async okDelete(){
      let FileOprationId = this.$store.state.FileOprationId
      if(this.PageName == 'private')
      {
        let res = await PersonalDel({
          prid: FileOprationId
        })
        if(res.data.msg == 'ok')
        {
          this.$message.success("删除成功")
          // this.$message.error("删除失败")
          this.$store.commit("SET_FileOprationId", -1)//设置为-1，表示无文件被选中
          this.$router.go(0)
        }
        else{
          this.$message.error("删除失败")
        }
      }
      else if(this.PageName == 'share')
      {
        let res = await CourseDel({
          crid: FileOprationId
        })
        if(res.data.msg == 'ok')
        {
          this.$message.success("删除成功")
          // this.$message.error("删除失败")
          this.$store.commit("SET_FileOprationId", -1)//设置为-1，表示无文件被选中
          this.$router.go(0)
        }
        else{
          this.$message.error("删除失败")
        }
      }
    },

    addNewFolder(){
      this.modal2 = !this.modal2
    },
    goBack(){
      let PageName = this.$store.state.PageName
      if(PageName == 'private')
      {
        let currentListId = this.$store.state.currentListId
        let user = JSON.parse(this.$store.state.userInfo)
        if(currentListId != user.root_id)
        {
          let ListInit = JSON.parse(this.$store.state.cunrrentFileList_private)
          ListInit.pop()
          this.$store.commit("SET_CunrrentFileList_private", JSON.stringify(ListInit));
          
          //修改IsBack的状态
          this.$store.commit("SET_IsBack", true);
          this.$router.go(0)
        }
        else{
          this.$message.warning("当前已经处于根目录");
        }
      }else if(PageName == 'share'){
        let currentListCId = this.$store.state.currentListCId
        if(currentListCId != 1)
        {
          let ListInit = JSON.parse(this.$store.state.cunrrentFileList_share)
          ListInit.pop()
          this.$store.commit("SET_CunrrentFileList_share", JSON.stringify(ListInit));
          
          //修改IsBack的状态
          this.$store.commit("SET_IsBack", true);
          this.$router.go(0)
        }
        else{
          this.$message.warning("当前已经处于根目录");
        }
      }
    },

    async okMove(){
      let PageName = this.$store.state.PageName
      if(PageName == 'private')
      {
        let List = await PersonalSave({
          uid: this.userInfo.uid,
          rid: 0,
          parent_id: this.$store.state.currentListId,//将当前文件夹的id，作为上传文件的parent_id
          isdir: 1,
          src_name: this.newName,
        });
        console.log(List);
        this.$router.go(0)
      }else{
        // http://127.0.0.1:8082/courseSave
        let List = await CourseSave({
          rid: 0,
          parent_id: this.$store.state.currentListCId,//将当前文件夹的id，作为上传文件的parent_id
          isdir: 1,
          src_name: this.newName,
        });
        console.log(List);
        this.$router.go(0)
      }
      
    },

    cancelMove(){
      this.newName = ''
    },


    async uploadSuccess(response){
      let res = response.data
      // console.log(res)
      if(this.PageName == "private")
      {
        let List = await PersonalSave({
          uid: this.userInfo.uid,
          rid: res.rid,
          parent_id: this.$store.state.currentListId,//将当前文件夹的id，作为上传文件的parent_id
          isdir: 0,
          src_name: res.filename,
        });
        console.log(List);
      }
      else//PageName == 'share'
      {
        let List = await CourseSave({
          rid: res.rid,
          parent_id: this.$store.state.currentListCId,//将当前文件夹的id，作为上传文件的parent_id
          isdir: 0,
          src_name: res.filename,
        });
        console.log(List);
      }
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

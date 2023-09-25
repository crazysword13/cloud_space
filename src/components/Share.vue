<template>
  <div class="Private">
    <toolBar/>
    <div v-if="FileList.length">
        <ul id="thumbnail" v-if="!Islist">
            <li v-for="item in FileList" :class="['list-item', {'checked': item.checked}]" :key="item.crid" >
                <div class="list-item-content" >
                    <Checkbox size="large" class="checkbox" v-model="item.checked"></Checkbox>
                    <!-- <div @click="changeChecked(item.crid)" @dblclick="into()">changeCurrentChecked -->
                    <div @click="changeCurrentChecked(item.crid,item)" @dblclick="into(item.crid,item.type,item.src_name)">
                    <!-- <div @click="changeChecked(item.crid)" @dblclick="into(item.crid, item.type)"> -->
                        <img src="../assets/folder.png" class="big-image" v-if="item.type === 'folder'">

                        <img src="../assets/img/pdf.png" class="big-image" v-else-if="item.type === 'pdf'">
                        <img src="../assets/img/word.png" class="big-image" v-else-if="item.type === 'docx'">
                        <img src="../assets/img/ppt.png" class="big-image" v-else-if="item.type === 'ppt'">

                        <img src="../assets/img/jpg.jpg" class="big-image" v-else-if="item.type === 'jpg'">
                        <img src="../assets/img/jpeg.png" class="big-image" v-else-if="item.type === 'jpeg'">
                        <img src="../assets/img/png.png" class="big-image" v-else-if="item.type === 'png'">

                        <img src="../assets/zip.png" class="small-image" v-else-if="item.type === 'zip'">
                        <img src="../assets/music.png" class="big-image" v-else-if="item.type === 'music'">
                        <img src="../assets/video.png" class="small-image" v-else-if="item.type === 'video'">
                        <img src="../assets/img/unknown.png" class="small-image" v-else>
                    </div>
                    <span class="folder-name">{{item.src_name}}</span>
                    
                </div>
            </li>
        </ul>
        
    </div>
    <div class="kong" v-else @click="test3">
      <img src="../assets/暂无消息.png">
      <p>暂无内容哦～</p>
    </div>
    
  </div>
</template>

<script>
// import { Checkbox, Col, Message, Menu, Submenu, MenuItem, MenuGroup, Icon, Modal } from 'iview'
import { Checkbox, } from 'iview'
import toolBar from '@/components/toolBar.vue'
import {  ParentCourseList,  SubCourseList } from "../network/request.js";
export default {
    // inject:['reload'],  //注入依赖
    name: 'Share',
    components: {
        Checkbox,
        toolBar,
    },
    data () {
        return {
          userInfo:{
            username: '',//无用
            a_code: '',//无用
            
            uid: '',
            root_id: '',
            email: '',
            password: '',
            new_password: '',
          },

          currentCheckdID: -1,//当前选中文件 or 文件夹的id
          currentIsCheckd: false, // 当前是否有文件被选中

          newName: '',
          oldName: '',
          cancelRename: false,
          contextMenu1: false,
          contextMenu2: false,
          contextMenuLeft: '0px',
          contextMenuTop: '0px',
          modal3: false,
          FileList:[
              // {
              //     crid: 4,    // 文件唯一标识id
              //     uid: 4,     // 所属用户标识id
              //     parent_id: 0,   // 上级目录id
              //     rid: 8,        // 文件资源标识
              //     isdir: 0,     // 是否是文件 dir:1; file:0
              //     src_name: "liuqi.word",   // 资源名（带扩展名）
              //     type: 'word',
              //     checked: false,
              // },
          ],
          
          Islist: false,  //是否以列表形式展示文件
      }
    },
    methods:{

        //将 pensonlist的每一项，添加参数 checked: flase
        test1(){
            // 原来的数组
            let arrY = this.$store.state.personalList

            // 使用 Array.map() 方法给每个对象添加一个属性 age 并赋值为 18
            arrY = arrY.map(item => {
                return { 
                    ...item,
                    //添加参数
                    type: item.src_name.substring(item.src_name.lastIndexOf(".")+1),
                    checked: false,
                }
            })
            console.log(arrY)
        },

        test2(){
            let name = '1+2+3.php'
            console.log(name.substring(name.lastIndexOf(".")+1))
        },

        test3(){
          let user = this.$store.state.userInfo
          console.log(user)

        },

        //改变指定crid的文件的Checked的值，切换选中状态
        changeChecked(crid){
            this.FileList = this.FileList.map((item) => {
                if (item.crid === crid) {
                    item.checked = !item.checked
                }
                return item
            })
        },

        //改变当前选中的文件（or文件夹）的Checked的值
        changeCurrentChecked(crid,item){
          this.$store.commit("SET_FileOpration", JSON.stringify(item))
          console.log(this.$store.state.FileOpration)
          if(this.currentIsCheckd)
          {
            //如果当前已经有文件被选中
            let id = this.currentCheckdID
            if(crid == id){
              this.currentIsCheckd = !this.currentIsCheckd
              this.currentCheckdID = -1//设置为-1，表示无文件被选中
              this.changeChecked(crid)

              //改变操作文件的 id
              this.$store.commit("SET_FileOprationId", -1)//设置为-1，表示无文件被选中
            }
            else{
              this.changeChecked(id)
              this.currentCheckdID = crid
              this.changeChecked(crid)

              this.$store.commit("SET_FileOprationId", crid)
            }
            
          }
          else{
            //如果当前没有文件被选中
            this.currentIsCheckd = !this.currentIsCheckd
            this.currentCheckdID = crid
            this.changeChecked(crid)
            this.$store.commit("SET_FileOprationId", crid)
          }

          console.log(this.$store.state.FileOprationId)
        },

        //双击文件夹，加载文件夹内容
        async into(crid,type,src_name){
          if(type == 'folder')
          {
            // let res = await SubCourseList({
            //   // crid: user.root_id,//
            //   crid: crid,
            // });
            // this.FileList = res.data.data
            // console.log(this.FileList)0

            this.$store.commit("SET_CurrentListParent_cid", crid);
            this.$store.commit("SET_CurrentListCId", crid);
            

            let ListInit = JSON.parse(this.$store.state.cunrrentFileList_share)
            ListInit.push(src_name)
            this.$store.commit("SET_CunrrentFileList_share", JSON.stringify(ListInit));

            this.$router.go(0)
          }
          else{
            this.$message.warning("当前暂不支持查看文件!");
          }
        }

    },
    created:async function(){
      this.$store.commit("SET_PageName", 'share');//修改主页名
      this.$store.commit("SET_FileOprationCId", -1)//设置为-1，表示无文件被选中

      // let cunrrentFileList = JSON.prase(this.$store.state.cunrrentFileList_private)
      // if(cunrrentFileList.length == 0){
      //   cunrrentFileList.push('全部')
      // }
      // this.$store.commit("SET_CunrrentFileList_private", JSON.stringify(cunrrentFileList));

      let user = JSON.parse(this.$store.state.userInfo)
      this.userInfo = user

      let res
      let IsBack = this.$store.state.IsBack
      //判断是否需要回退
      if(IsBack)
      {
        //如果处于回退状态
        this.$store.commit("SET_IsBack", false);//恢复状态

        let currentListCId = this.$store.state.currentListCId

        // console.log(currentListParent_id)
        if(currentListCId != 1)//当前已经处于根目录下了，无效回退
        {
          res = await ParentCourseList({
            parent_id: currentListCId,
          });
          // this.$store.commit("SET_currentListCId", this.$store.state.currentListParent_id);
          // console
        }
        else{
          this.$router.go(0)
          // this.reload();
        }
      }else{
        console.log(this.$store.state.currentListCId)

        res = await SubCourseList({
          // uid: user.uid,
          // crid: user.root_id,//
          crid: this.$store.state.currentListCId,
        });
      }

      let List = res.data.data;
      this.$store.commit("SET_CurrentListCId", List[0].parent_id);//将请求获取的文件列表的第一项的parent_id设置为当前文件夹的ID

      // 使用 Array.map() 方法给每个对象添加一个属性 age 并赋值为 18
      List = List.map(item => {
        if(item.isdir)
        {
          //isdir等于1时，type为folder，文件夹
          return { 
              ...item,
              //添加参数
              type: 'folder',
              // type: item.src_name.substring(item.src_name.lastIndexOf(".")+1),
              checked: false,
          }
        }
        else{
          let leixing = item.src_name
          if(leixing.indexOf(".") != -1)//找的到小数点，是有后缀的文件
          {
            return { 
              ...item,
              //添加参数
              type: item.src_name.substring(item.src_name.lastIndexOf(".")+1),
              checked: false,
            }
          }
          else{
            return { 
              ...item,
              //添加参数
              type: 'unknown',
              checked: false,
            }
          }
          
        }
          
      })
      
      this.FileList = List;

      //将请求的文件放入Vuex存储
      this.$store.commit("SET_ShareList", JSON.stringify(res.data.data));

    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Private{
    height: 100%;
}

  #thumbnail{
    margin: 5px 5px 5px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  #thumbnail .list-item {
    width:130px;
    height: 130px;
    padding: 5px;
    margin: 5px;
    list-style: none;
    color: #020202;
  }
  #thumbnail .list-item.checked {
    background-color: #f1f5fa;
  }
  #thumbnail .list-item:hover {
    background-color: #f1f5fa;
  }
  #thumbnail .list-item:hover .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item.checked .checkbox {
    visibility: visible;
  }
  #thumbnail .list-item-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #thumbnail .folder-name {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .folder-name-edit {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
  }
  .big-image {
    width: 60px;
  }
  .small-image {
    width: 50px;
    margin: 5px;
  }
  .auto-image {
    max-width: 80px;
    max-height: 60px;
  }
  #thumbnail .checkbox {
    visibility: hidden;
    align-self: flex-start
  }
  #list {
    width: 100%;
    border-collapse: collapse;
    color: #020202;
  }
  #list thead {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  #list thead tr th:nth-child(1) {
    width: 5%;
    border-bottom: none;
  }
  #list thead tr th {
    text-align: left;
    border-bottom: 1px solid #D5D7DF;
  }
  #list thead tr th:hover {
    background-color: #E6E7EC;
  }
  #list tbody tr.checked {
    background-color: #E6E7EC;
  }
  #list tbody tr:hover {
    background-color: #E6E7EC;
  }
  #list tbody tr {
    margin: 10px 60px 10px 20px;
    width: 100%;
    height: 60px;
    line-height: 60px;
  }
  #list tbody tr td:nth-child(1) {
    border-bottom: none;
  }
  #list tbody tr td {
    border-bottom: 1px solid #D5D7DF;
  }
  td, th {
    font-family: -apple-system;
    line-height: 60px;
    vertical-align: middle;
  }
  #list .checkbox {
    margin-left: 20px;
  }
  .t-big-image {
    width: 30px;
    height: 30spx;
    margin-bottom: -5px;
  }
  .t-small-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  .t-auto-image {
    width: 26px;
    height: 26px;
    margin-bottom: -5px;
  }
  #list .file-icon {
    display: inline-block;
    width: 40px;
    height: 55px;
    padding-top: 5px;
  }
  #list .file-name {
    display: inline-block;
  }
  #list .name-text {
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 auto;
    max-width: 70%;
    height: 40px;
  }
  #list .name-input {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    height: 30px;
    border: 1px solid #C8CCD3;
    background: #fff;
    vertical-align: text-bottom;
  }
  .kong {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    
  }
  
  .kong p {
    font-size: 24px;
    color: #bfbfbf;
  }
  .contextMenu {
    border-right: none;
    border: 1px solid rgb(221, 222, 225);
    border-radius: 5px;
    box-shadow: 2px 2px 10px 2px rgb(221, 222, 225);
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .vertical-center-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vertical-center-modal .ivu-modal{
    top: 0;
  }
  .shade {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,.80);
  }
  .img-header {
    width: 100%;
    height: 64px;
    background-color: #181818;
    font-size: 18px;
    color: #fff;
  }
  .img-header span {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    margin: 12px 40px;
  }
  .img-header .img-close {
    float: right;
    margin: 0 40px;
    width: 64px;
    height: 64px;
    color: #fff;
    border: none;
    background-color: #181818;
  }
  .img-header .img-close:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-container {
    position: absolute;
    width: 70%;
    left: 50%;
    transform: translateX(-50%);
    top: 64px;
    bottom: 0px;
    background-color: #fff;
    margin: 0 auto;
  }
  .swiper-btn-prev, .swiper-btn-next {
    position: absolute;
    width: 60px;
    height: 60px;
    top: 50%;
    color: #fff;
    border: none;
    background-color: rgba(0,0,0,0);
  }
  .swiper-btn-prev:hover, .swiper-btn-next:hover {
    background-color: rgba(255,255,255,.2);
  }
  .swiper-btn-prev {
    left: 80px;
  }
  .swiper-btn-next {
    right: 80px;
  }
</style>

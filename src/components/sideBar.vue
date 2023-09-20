<template>
  <div class="sider-bar-container ">
    <div class="avater">
      <a href="javascript:;" class="head">
        <img src="../assets/head.png" style="width: 100%; height: 100%;">
      </a>
      <button type="text" class="open-a">开通</button>
      <div class="bottom-line"></div>
    </div>
    
    <Menu :active-name="type" class="sideBar" >
      <MenuItem to='/Private' name="Private" style="font-size: 15px;font-weight: 500;">
        <Icon type="logo-buffer" style="font-size: 22px;margin: 0px 19px 0px 20px;"></Icon>个人文件
      </MenuItem>
      <MenuItem to='/Share' name="share" style="font-size: 15px;font-weight: 500;">
        <Icon type="md-share" style="font-size: 22px; margin: 0px 17px 0px 20px;"></Icon>分享空间
      </MenuItem>
      <!-- <MenuItem name="trash" style="font-size: 15px;font-weight: 500;" disabled>
        <Icon type="ios-trash-outline" style="font-size: 22px;margin: 0px 18px 0px 20px;"></Icon>回收站
      </MenuItem> -->
    </Menu>
    
    <div style="width: 80%;margin: 10px 0 40px 20px;font-weight: 500;color: #020202;">
      <Progress :percent="20" hide-info></Progress>
      <p>容量：2G / 10G</p>
    </div>
    <div class="bottom-line1"></div>
    
  </div>
</template>

<script>
import { Menu, MenuItem, Icon, Progress } from 'iview'

export default {
    components: {
        Menu,
        MenuItem,
        Icon,
        Progress
    },
    computed: {
        
    },
    methods: {
        selectHandle(path) {
          this.$router.push(path)
            // if(name == 'Private')
            // {
            //     console.log('folder')
            //     thi
            // }
            // else if(name == 'share')
            // {
            //     console.log('share')
            // }
            // else{
            //     console.log('trash')
            // }
        }
    }
}
</script>

<style scoped>
.sider-bar-container {
  border-right: 1px solid #dddee1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 90vh;
}
.avater {
  width: 100%;
  height: 30%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 200px;
}
.head {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-left: 40px;
}
.bottom-line {
  width: 80%;
  height: 1px;
  background-color: #E8EAEB;
  margin-left: 20px;
}

.bottom-line1 {
  width: 100%;
  height: 1px;
  background-color: #E8EAEB;
  margin-left: 20px;
}
.sideBar {
  width: 240px;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-right: none;
  /* background-color: bisque; */
}
.menu-item {
  font-size: 15px;
}
.open-a {
  width: 70px;
  height: 30px;
  margin: 30px 40px;
  border-radius: 2px;
  border: 1px solid #1296db;
  color: #1296db;
  font-weight: 500;
  background-color: #fff;
}

.ivu-menu-vertical.ivu-menu-light:after {
  content: '';
  display: block;
  width: 0;
  height: 100%;
  background: #dddee1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
</style>


<template>
  <div>
    <div class="header"><Head/></div>
      <div style="display: flex;width: 100%; height: 100%;">
        <div style="height: 100%;">
          <!-- 侧边栏 -->
          <side-bar/>
      </div>
      <div class='container'>
        <router-view></router-view>
      </div>
      <!-- <toolBar/> -->
    </div>
  </div>
</template>

<script>
import Head from '@/components/header'
import SideBar from '@/components/sideBar' 
// import Container  from '@/components/container'
// import toolBar from '@/components/toolBar.vue'

export default {
  name: 'Index',
  components: {
    Head,
    SideBar,
    // Container,
    // toolBar,
  },
  methods: {
    
  }
};
</script>

<!-- min-height: 650px; -->
<style>
.header {
  background: rgb(245, 245, 245);
  padding: 0px;
  border-bottom: 1px solid rgb(230, 231, 236);
  /* height: 6vh; */
  min-height: 64px;
  max-height: 64px;
}


.container {
  background-color: #fff;
  flex: 1;
  height: 90vh;
  border-bottom:1px solid #E8EAEB
}
</style>

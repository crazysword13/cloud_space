<template>
  <!-- <v-app>
    <v-main>
      <div class="header"><Head/></div>
      <router-view v-if="isReloadAlive"></router-view> 
    </v-main>
  </v-app> -->
  <div id="app" class="layout">
    <!-- <div class="header"><Head/></div> -->
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
// import Head from '@/components/header'
export default {
  name: 'App',
  // components: {
  //   Head
  // },

  provide(){
    return{
      reload: this.reload
    }
  },
  data(){
     return{
      isReloadAlive: true
    }
  },
  methods: {
    reload() {
      this.isReloadAlive = false;
      this.$nextTick(function(){
        this.isReloadAlive = true;
      })
    }
  }
  // data: () => ({
  //   //
  // }),
};
</script>

<style>
body {
  font: 14px/1.5 -apple-system,BlinkSystemFont,"Segoe UI",Roboto,Ubuntu,"Helvetica Neue",Helevetica,Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei UI","Microsoft YaHei","Source Han Sans CN",sans-serif !important;
  -webkit-font-smoothing: subpixel-antialiased;
  color: #020202;
  outline: 0;
}
.layout {
  background: #f5f7f9;
  overflow: hidden;
  min-width: 950px;
  height: 100%;
  min-height: 826px;
  font-size: 14px;
}
input {
  outline:none;
}


</style>

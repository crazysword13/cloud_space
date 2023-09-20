import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';

// 导入全局css
import './assets/css/base.css'

import './plugins/element.js'

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

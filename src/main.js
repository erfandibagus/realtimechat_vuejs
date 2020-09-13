import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import VueMeta from 'vue-meta'
import { api } from "./plugins/axios"

Vue.use(VueMeta)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  api,
  render: h => h(App)
}).$mount('#app')

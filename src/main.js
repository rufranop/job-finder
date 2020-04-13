import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import { store } from './store'
import axios from 'axios'
import dayjs from 'dayjs'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$dayjs = dayjs

Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

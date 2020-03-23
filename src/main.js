import Vue from 'vue'
import App from './App.vue'
import VueMoment from 'vue-moment'
import Vuex from 'vuex'
import { store } from './store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(VueMoment)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')

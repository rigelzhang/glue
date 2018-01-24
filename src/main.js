// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'

//Vue.prototype.$http = axios
//import Rglue from './reglue'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
// Vue.use(axios)
//Vue.use(Rglue)
axios.defaults.baseURL='http://127.0.0.1:8084/glue';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios
/* eslint-disable no-new */
const router = new VueRouter({
  routes
})
new Vue({
 // el: '#app',
  router,
  //template: '<App/>',
  //components: { App }
  render: h => h(App)
}).$mount('#app')

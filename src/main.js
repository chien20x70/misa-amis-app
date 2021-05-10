import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import EmployeeList from './components/views/employee/EmployeeList.vue'
import '../src/assets/font/fontawesome-5.15.1/css/all.min.css'
Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/employee', component: EmployeeList },
]

const router = new VueRouter({
  routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

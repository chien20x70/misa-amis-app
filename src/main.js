import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import EmployeeList from './components/views/employee/EmployeeList.vue'
import '../src/assets/font/fontawesome-5.15.1/css/all.min.css'
import { ValidationProvider, extend } from 'vee-validate';

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true,
  message: '{_field_} không thể để trống'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  { path: '/employee', component: EmployeeList },
]

const router = new VueRouter({
  routes
})

Vue.filter('dateFormatDDMMYY', function (date) {
  if (!date) return ''
  var newDate = new Date(date);
  var day = newDate.getDate();
  var month = newDate.getMonth() + 1;
  var year = newDate.getFullYear();
  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  return `${day}/${month}/${year}`;
})

Vue.filter('showDepartment', function (value) {
  if (!value) return ''
  if (value == "f79d916a-ae77-11eb-8a1f-00163e047e89") {
    return "Phòng nhân sự";
  } else if (value == "f79d9419-ae77-11eb-8a1f-00163e047e89") {
    return "Phòng đào tạo";
  } else if (value == "f79d915a-ae77-11eb-8a1f-00163e047e89") {
    return "Phòng quản lý";
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//TEMP
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Miwibm9tZSI6Ik1vbnRhbmhlciIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY1MjQ4NzMyNiwiZXhwIjoxNjUyNzQ2NTI2fQ.TeOKRjZo6wi5EI3C_1Lre6b1PnIYCzdwmkYLfLMFNEM'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
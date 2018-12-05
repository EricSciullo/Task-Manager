// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Tasks from './components/Tasks'
import router from './router'
require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#tasks',
  router,
  components: { Tasks },
  template: '<Tasks/>'
})

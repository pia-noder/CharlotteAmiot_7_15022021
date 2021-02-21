import Vue from 'vue'
import App from './App.vue'
//importation de la librairie font awesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from './router'

library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

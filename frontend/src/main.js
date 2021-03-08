import Vue from 'vue'
import App from './App.vue'
//importation de la librairie font awesome
import { library } from '@fortawesome/fontawesome-svg-core'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faImages} from '@fortawesome/free-solid-svg-icons'
import { faVideo} from '@fortawesome/free-solid-svg-icons'
import { faLink} from '@fortawesome/free-solid-svg-icons'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots} from '@fortawesome/free-solid-svg-icons'

/*  <span class="icon-search-images"><font-awesome-icon  icon="images" /></span>
    <span class="icon-search-video"><font-awesome-icon  icon="video" /></span>*/

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

///import vuelidate library
import vuelidate from 'vuelidate'
Vue.use(vuelidate)

import router from './router'
import store from './store'

library.add(faSearch, faImages, faVideo, faLink, faHeart, faTrashAlt, faExchangeAlt, faCommentDots)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
//importation de la librairie font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import moment from 'moment'

import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { faImages} from '@fortawesome/free-solid-svg-icons'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import { faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots} from '@fortawesome/free-solid-svg-icons'
import { faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import { faBell} from '@fortawesome/free-solid-svg-icons'
import { faNewspaper} from '@fortawesome/free-solid-svg-icons'
import { faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import { faUserMinus} from '@fortawesome/free-solid-svg-icons'




import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

///import vuelidate library
import vuelidate from 'vuelidate'
Vue.use(vuelidate)

import router from './router'
import store from './store'

library.add(faSearch, faHome, faUserCircle, faImages,  faHeart, faTrashAlt, faExchangeAlt, faCommentDots, faEllipsisH, faBell, faNewspaper, faPencilAlt, faSignOutAlt, faUserMinus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

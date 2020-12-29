import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import swiper from 'components/swiper/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    home,
    swiper
  }
})

export default store
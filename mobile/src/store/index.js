import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import category from 'pages/category/store'
import swiper from 'components/home/swiper/store'
import nav from 'components/home/nav/store'
import floor from 'components/home/floor/store'
import product from 'components/product/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    home,
    category,
    swiper,
    nav,
    floor,
    product
  }
})

export default store
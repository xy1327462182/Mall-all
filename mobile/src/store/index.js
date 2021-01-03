import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import category from 'pages/category/store'
import product from 'components/product/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    home,
    category,
    product
  }
})

export default store
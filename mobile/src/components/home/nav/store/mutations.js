import { GET_CATEGORIES } from './types'

export default {
  [GET_CATEGORIES](state, payload) {
    state.navList = payload
  }
}
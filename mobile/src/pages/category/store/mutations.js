import { LOAD_PARENT_CATEGORIES } from './types'

export default {
  [LOAD_PARENT_CATEGORIES](state, payload) {
    state.parent_cate_list = payload
  }
}
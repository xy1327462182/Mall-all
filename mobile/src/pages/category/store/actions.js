import { LOAD_PARENT_CATEGORIES } from './types'
import api from 'api'

export default {
  async [LOAD_PARENT_CATEGORIES]({ commit }) {
    const res = await api.getArrayCategories()
    commit(LOAD_PARENT_CATEGORIES, res.data)
  }
}

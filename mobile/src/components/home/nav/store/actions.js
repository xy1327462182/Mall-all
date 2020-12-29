import { GET_CATEGORIES } from './types'
import api from 'api'

export default {
  async [GET_CATEGORIES]({ commit }) {
    const result = await api.getArrayCategories()
    commit(GET_CATEGORIES, result.data)
  }
}

/*
icon: "http://127.0.0.1:3000/category-icons/1609229950710.jpg"
isFloor: "0"
isShow: "1"
level: 1
mobileName: "箱包手袋"
name: "箱包手袋"
order: 0
_id: "5feae67fea878a0ff0048b9d"
*/
import api from 'api'
import { 
  ADD_AJAXTIMES,
  DEC_AJAXTIMES,
  GET_ADS, 
  GET_CATEGORIES,
  GET_FLOORS,
} from './types'

export default {
  //获取轮播图广告
  async [GET_ADS]({ commit }) {
    commit(ADD_AJAXTIMES)

    const result = await api.getPositionAds({
      position: 2
    })
    commit(GET_ADS, result.data)

    commit(DEC_AJAXTIMES)
  },

  //获取导航分类数据
  async [GET_CATEGORIES]({ commit }) {
    commit(ADD_AJAXTIMES)

    const result = await api.getArrayCategories()
    commit(GET_CATEGORIES, result.data)

    commit(DEC_AJAXTIMES)
  },

  //获取首页楼层数据
  async [GET_FLOORS]({ commit }) {
    commit(ADD_AJAXTIMES)
    const result = await api.getFloors()
    commit(GET_FLOORS, result.data)
    commit(DEC_AJAXTIMES)
  }
}
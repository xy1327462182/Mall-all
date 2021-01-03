import { 
  ADD_AJAXTIMES,
  DEC_AJAXTIMES,
  BACK_TOP_SHOW, 
  BACK_TOP_HIDE, 
  GET_ADS,
  GET_CATEGORIES,
  GET_FLOORS,
} from './types'

export default {
  //置顶按钮显示
  [BACK_TOP_SHOW](state, payload) {
    state.backTopShow = true
  },

  //置顶按钮隐藏
  [BACK_TOP_HIDE](state, payload) {
    state.backTopShow = false
  },

  //获取轮播图广告
  [GET_ADS](state, payload) {
    state.banners = payload
  },

  //获取导航分类数据
  [GET_CATEGORIES](state, payload) {
    state.navList = payload
  },

  //获取首页楼层数据
  [GET_FLOORS](state, payload) {
    state.floors = payload
  },

  [ADD_AJAXTIMES](state, payload) {
    state.ajaxTimes += 1
  },

  [DEC_AJAXTIMES](state, payload) {
    state.ajaxTimes -= 1
  }
}
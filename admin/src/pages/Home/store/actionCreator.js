import api from 'api'
import * as actionTypes from './actionTypes'

const setCounts = (payload) => ({
  type: actionTypes.SET_COUNTS,
  payload
})

//前台首页获取数据
export const getCountsAction = () => {
  return async function (dispatch) {
    const { code, data } = await api.getCounts()
    if (code == 0) {
      dispatch(setCounts(data))
    }
  }
}
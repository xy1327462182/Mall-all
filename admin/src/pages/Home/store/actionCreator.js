import api from 'api'
import * as actionTypes from './actionTypes'

const setCounts = (payload) => ({
  type: actionTypes.SET_COUNTS,
  payload
})

export const getCountsAction = () => {
  return async function (dispatch) {
    const { code, data } = await api.getCounts()
    if (code == 0) {
      console.log(data);
      dispatch(setCounts(data))
    }
  }
}
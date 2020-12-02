import * as actionTypes  from './actionTypes'
import axios from 'axios'

export const getCaptchaAction = () => {
  return async function (dispatch) {
    const result = await axios({
      method: 'get',
      url: '/v1/users/captcha',
    });
    const { code, data } = result.data
    if (code == 0) {
      dispatch({
        type: actionTypes.SET_CAPTCHA,
        payload: data
      })
    }
  }
}
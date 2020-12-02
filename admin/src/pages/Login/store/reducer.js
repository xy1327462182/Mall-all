import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

//定义初始化state
const defaultState = fromJS({
  captcha: '',
  isFetching: false
})

function reducer(state = defaultState, action) {
  //更改captcha，设置验证码
  if (action.type == actionTypes.SET_CAPTCHA) {
    return state.set('captcha', action.payload)
  }
  //loading改为true
  if (action.type == actionTypes.LOGIN_START) {
    return state.set('isFetching', true)
  }
  //loading改为false
  if (action.type == actionTypes.LOGIN_END) {
    return state.set('isFetching', false)
  }
  return state
}

//导出login的reducer
export default reducer
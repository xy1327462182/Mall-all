import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

//定义初始化state
const defaultState = fromJS({
  captcha: ''
})

function reducer(state = defaultState, action) {
  if (action.type == actionTypes.SET_CAPTCHA) {
    return state.set('captcha', action.payload)
  }
  return state
}

//导出login的reducer
export default reducer
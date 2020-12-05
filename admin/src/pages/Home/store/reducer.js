import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  usernum: 0,
  productnum: 0,
  ordernum: 0
})

function reducer(state = defaultState, action) {
  if (action.type == actionTypes.SET_COUNTS) {
    const { usernum, productnum, ordernum } = action.payload
    return state.merge({
      usernum,
      productnum,
      ordernum
    })
  }
  return state
}

export default reducer

import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  current: 1,
  list: [],
  pageSize: 0,
  total: 0,
  isFetching: false,
  categories: []
})

function reducer(state = defaultState, action) {
  if (action.type == actionTypes.SET_LEVEL_CATEGORIES) {
    return state.set('categories', action.payload)
  }
  if (action.type == actionTypes.SET_PAGE) {
    const { current,list,pageSize,total } = action.payload
    return state.merge({
      current,
      list,
      pageSize,
      total
    })
  }
  if (action.type == actionTypes.PAGE_REQUEST_START) {
    return state.set('isFetching', true)
  }
  if (action.type == actionTypes.PAGE_REQUEST_END) {
    return state.set('isFetching', false)
  }
  return state
}

export default reducer
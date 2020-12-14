import { combineReducers } from 'redux-immutable'

//引入各个pages的reducer
import { reducer as login } from 'pages/Login/store'
import { reducer as home } from 'pages/Home/store'
import { reducer as user } from 'pages/User/store'
import { reducer as category } from 'pages/Category/store'
import { reducer as attr } from 'pages/Attr/store'
import { reducer as product } from 'pages/Product/store'
import { reducer as order } from 'pages/Order/store'

//合并所有组件的reducer
export default combineReducers({
  login,
  home,
  user,
  category,
  attr,
  product,
  order
})
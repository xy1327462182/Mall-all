import { combineReducers } from 'redux-immutable'

//引入各个pages的reducer
import { reducer as login } from 'pages/Login/store'

//合并所有组件的reducer
export default combineReducers({
  login
})
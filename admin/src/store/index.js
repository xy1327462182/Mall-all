import { createStore, applyMiddleware } from 'redux'

//中间件
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducer from './reducer'
//保存中间件
const middlewares = []

middlewares.push(thunk)

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({})
  middlewares.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middlewares))
//导出总的store
export default store
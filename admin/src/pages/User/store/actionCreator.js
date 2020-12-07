import api from 'api'
import { message } from 'antd'
import * as actionTypes from './actionTypes'

const setPageAction = (data) => ({
  type: actionTypes.SET_PAGE,
  payload: data
})

const pageRequestStartAction = {
  type: actionTypes.PAGE_REQUEST_START
}

const pageRequestEndAction = {
  type: actionTypes.PAGE_REQUEST_END
}

//获取用户列表数据
export const getUserListAction = (page) => {
  return async function (dispatch) {
    dispatch(pageRequestStartAction)
    try{
      const result = await api.getUserList({
        page
      })
      if (result.code == 0) {
        dispatch(setPageAction(result.data))
      }
    }catch(e){
      message.error('网络请求失败', 1)
    }finally{
      dispatch(pageRequestEndAction)
    }
  }
}
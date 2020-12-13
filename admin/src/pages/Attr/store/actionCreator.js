import api from 'api'
import { message } from 'antd'
import * as actionTypes from './actionTypes'

const pageRequestStartAction = {
  type: actionTypes.PAGE_REQUEST_START
}

const pageRequestEndAction = {
  type: actionTypes.PAGE_REQUEST_END
}

const setPage = (payload) => ({
  type: actionTypes.SET_PAGE,
  payload
})

//添加属性
export const getSaveAction = (values) => {
  return async function (dispatch) {
    try {
      let request = api.addAttr
      let successMessage = '添加成功'
      if (values.id) {
        request = api.updateAttr
        successMessage = '修改成功'
      }
      const result = await request(values)
      if (result.code == 0) {
        message.success(successMessage, 1)
      } else {
        message.error(result.message, 1)
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    }
  }
}

//获取属性列表
export const getAttrListAction = (page) => {
  return async function (dispatch) {
    dispatch(pageRequestStartAction)
    try {
      const result = await api.getAttrList(page)
      if (result.code == 0) {
        dispatch(setPage(result.data))
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    } finally {
      dispatch(pageRequestEndAction)
    }
  }
}

//修改排序
export const getUpdateAttrOrderAction = (id, newOrder) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('attr').get('current')
    try {
      const result = await api.updateAttrOrder({
        id,
        page,
        order: newOrder
      })
      if (result.code == 0) {
        dispatch(setPage(result.data))
        message.success('更新成功', 1)
      } else {
        message.error(result.message, 1)
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    } finally {
      dispatch(pageRequestEndAction)
    }
  }
}
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

//处理图片组件的fileList
export const getFileListAction = (fileList) => ({
  type: actionTypes.SET_FILELIST,
  payload: fileList
})

//添加广告
export const getSaveAction = (values) => {
  return async function (dispatch) {
    try {
      let request = api.addAd
      let successMessage = '添加广告成功'
      if (values.id) {
        request = api.updateAd
        successMessage = '修改广告成功'
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

//获取广告列表
export const getAdListAction = (page) => {
  return async function (dispatch) {
    dispatch(pageRequestStartAction)
    try {
      const result = await api.getAdList(page)
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

//修改是否显示
export const getUpdateIsShowAction = (id, newIsShow) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('ad').get('current')
    try {
      const result = await api.updateAdIsShow({
        id,
        page,
        isShow: newIsShow
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

//修改排序
export const getUpdateAdOrderAction = (id, newOrder) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('ad').get('current')
    try {
      const result = await api.updateAdOrder({
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
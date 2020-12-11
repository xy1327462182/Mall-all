import api from 'api'
import { message } from 'antd'
import * as actionTypes from './actionTypes'

const setCategories = (payload) => ({
  type: actionTypes.SET_LEVEL_CATEGORIES,
  payload
})

const setPage = (payload) => ({
  type: actionTypes.SET_PAGE,
  payload
})

const pageRequestStartAction = {
  type: actionTypes.PAGE_REQUEST_START
}

const pageRequestEndAction = {
  type: actionTypes.PAGE_REQUEST_END
}

//添加分类
export const getSaveAction = (values) => {
  return async function (dispatch) {
    try {
      const result = await api.addCategory(values)
      if (result.code == 0) {
        message.success('添加分类成功', 1)
        dispatch(setCategories(result.data))
      } else {
        message.error(result.message, 1)
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    }

  }
}

//获取分类数组数据
export const getLevelCategoriesAction = () => {
  return async function (dispatch) {
    try {
      const result = await api.getLevelCategories()
      if (result.code == 0) {
        dispatch(setCategories(result.data))
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    }
  }
}

//获取分类列表
export const getCategoryListAction = (page) => {
  return async function (dispatch) {
    dispatch(pageRequestStartAction)
    try {
      const result = await api.getCategoryList(page)
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
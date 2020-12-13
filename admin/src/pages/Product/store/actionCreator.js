import api from 'api'
import { message } from 'antd'
import * as actionTypes from './actionTypes'

const setCategories = (payload) => ({
  type: actionTypes.SET_LEVEL_CATEGORIES,
  payload
})

const setAllAttrs = (payload) => ({
  type: actionTypes.SET_ALL_ATTRS,
  payload
})

//获取分类数组数据
export const getLevelCategoriesAction = () => {
  return async function (dispatch) {
    try {
      const result = await api.getLevelCategories({
        level: 3
      })
      if (result.code == 0) {
        dispatch(setCategories(result.data))
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    }
  }
}

//获取所有属性数据
export const getAllAttrsAction = () => {
  return async function (dispatch) {
    try {
      const result = await api.getAllAttrs()
      if (result.code == 0) {
        dispatch(setAllAttrs(result.data))
      } else {
        message.error(result.message, 1)
      }
    } catch (e) {
      message.error('网络请求失败', 1)
    }
  }
}

//添加商品
export const getSaveAction = (values) => {
  return async function (dispatch) {
    try {
      let request = api.addProduct
      let successMessage = '添加商品成功'
      if (values.id) {
        request = api.updateProduct
        successMessage = '修改商品成功'
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

//更新SelectedKeys
export const getAttrSelectedKeysAction = (payload) => ({
  type: actionTypes.UPDATE_SELECTED_KEYS,
  payload
})

//更新TargetKeys
export const getAttrTargetKeysAction = (payload) => ({
  type: actionTypes.UPDATE_TARGET_KEYS,
  payload
})

//处理主图片组件的fileList
export const getMainImageFileListAction = (fileList) => ({
  type: actionTypes.SET_MAIN_IMAGE_FILELIST,
  payload: fileList
})

//处理详情图的fileList
export const getDetailImageFileListAction = (fileList) => ({
  type: actionTypes.SET_DETAIL_IMAGE_FILELIST,
  payload: fileList
})

//更新富文本数据
export const getRichDataAction = (payload) => ({
  type: actionTypes.SET_RICH_DATA,
  payload
})

//清除所有的fileList
export const getClearFileListAction = () => ({
  type: actionTypes.CLEAR_FILELIST
})
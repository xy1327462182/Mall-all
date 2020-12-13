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

const clearPage = () => ({
  type: actionTypes.CLEAR_PAGE,
})

const pageRequestStartAction = {
  type: actionTypes.PAGE_REQUEST_START
}

const pageRequestEndAction = {
  type: actionTypes.PAGE_REQUEST_END
}

//处理图片组件的fileList
export const getFileListAction = (fileList) => ({
  type: actionTypes.SET_FILELIST,
  payload: fileList
})

//添加分类
export const getSaveAction = (values) => {
  return async function (dispatch) {
    try {
      let request = api.addCategory
      let successMessage = '添加分类成功'
      if (values.id) {
        request = api.updateCategory
        successMessage = '修改分类成功'
      }
      const result = await request(values)
      if (result.code == 0) {
        message.success(successMessage, 1)
        dispatch(setCategories(result.data))
        dispatch(clearPage())
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
      const result = await api.getLevelCategories({
        level: 2
      })
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

//修改分类名称
export const getUpdateNameAction = (id, newName) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('category').get('current')
    try {
      const result = await api.updateCategoryName({
        id,
        page,
        name: newName
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

//修改手机分类名称
export const getUpdateMobileNameAction = (id, newMobileName) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('category').get('current')
    try {
      const result = await api.updateCategoryMobileName({
        id,
        page,
        mobileName: newMobileName
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

//修改是否显示
export const getUpdateIsShowAction = (id, newIsShow) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('category').get('current')
    try {
      const result = await api.updateCategoryIsShow({
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

//修改是否楼层
export const getUpdateIsFloorAction = (id, newIsFloor) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('category').get('current')
    try {
      const result = await api.updateCategoryIsFloor({
        id,
        page,
        isFloor: newIsFloor
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
export const getUpdateCategoryOrderAction = (id, newOrder) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('category').get('current')
    try {
      const result = await api.updateCategoryOrder({
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
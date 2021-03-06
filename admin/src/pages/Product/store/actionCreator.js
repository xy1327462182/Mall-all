import api from 'api'
import { message } from 'antd'
import * as actionTypes from './actionTypes'

const pageRequestStartAction = {
  type: actionTypes.PAGE_REQUEST_START
}

const pageRequestEndAction = {
  type: actionTypes.PAGE_REQUEST_END
}

const setCategories = (payload) => ({
  type: actionTypes.SET_LEVEL_CATEGORIES,
  payload
})

const setAllAttrs = (payload) => ({
  type: actionTypes.SET_ALL_ATTRS,
  payload
})

const setPage = (payload) => ({
  type: actionTypes.SET_PAGE,
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
        window.location.href = '/product'
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

//清除所有fileList、richData、attrs
export const getClearFileListAction = () => ({
  type: actionTypes.CLEAR_FILELIST
})

//处理列表分页
export const getHandelPageAction = (page,keyword) => {
  return async function (dispatch) {
    dispatch(pageRequestStartAction)
    try {
      let options = {
        page,
      }
      if (keyword) {
        options.keyword = keyword
      }
      //...................................................
      const result = await api.getPorductList(options)
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

//修改isShow
export const getUpdateIsShowAction = (id, newIsShow) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('product').get('current')
    try {
      const result = await api.updateProductIsShow({
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

//修改上下架status
export const getUpdateStatusAction = (id, newStatus) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('product').get('current')
    try {
      const result = await api.updateProductStatus({
        id,
        page,
        status: newStatus
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

//修改是否热门isHot
export const getUpdateIsHotAction = (id, newIsHot) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('product').get('current')
    try {
      const result = await api.updateProductIsHot({
        id,
        page,
        isHot: newIsHot
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
export const getUpdateProductOrderAction = (id, newOrder) => {
  return async function (dispatch, getState) {
    dispatch(pageRequestStartAction)
    const page = getState().get('product').get('current')
    try {
      const result = await api.updateProductOrder({
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
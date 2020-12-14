import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  current: 1,
  list: [],
  pageSize: 0,
  total: 0,
  isFetching: false,
  categories: [],
  attrDataSource: [],
  targetKeys: [],
  selectedKeys: [],
  mainImageFileList: [],
  detailImagesFileList: [],
  richData: ''
})

function reducer(state = defaultState, action) {
  if (action.type == actionTypes.PAGE_REQUEST_START) {
    return state.set('isFetching', true)
  }
  if (action.type == actionTypes.PAGE_REQUEST_END) {
    return state.set('isFetching', false)
  }
  //设置分页
  if (action.type == actionTypes.SET_PAGE) {
    const { current,list,pageSize,total } = action.payload
    return state.merge({
      current,
      list,
      pageSize,
      total
    })
  }
  //分类数组数据
  if (action.type == actionTypes.SET_LEVEL_CATEGORIES) {
    return state.set('categories', action.payload)
  }
  //所有属性
  if (action.type == actionTypes.SET_ALL_ATTRS) {
    return state.set('attrDataSource', action.payload)
  }
  //更新SelectedKeys
  if (action.type == actionTypes.UPDATE_SELECTED_KEYS) {
    return state.set('selectedKeys', action.payload)
  }
  //更新TargetKeys
  if (action.type == actionTypes.UPDATE_TARGET_KEYS) {
    return state.set('targetKeys', action.payload)
  }
  //处理主图片组件的fileList
  if (action.type == actionTypes.SET_MAIN_IMAGE_FILELIST) {
    return state.set('mainImageFileList', action.payload)
  }
  //处理详情图的fileList
  if (action.type == actionTypes.SET_DETAIL_IMAGE_FILELIST) {
    return state.set('detailImagesFileList', action.payload)
  }
  //更新富文本数据
  if (action.type == actionTypes.SET_RICH_DATA) {
    return state.set('richData', action.payload)
  }
  //清除所有fileList、richData、attrs
  if (action.type == actionTypes.CLEAR_FILELIST) {
    return state.merge({
      mainImageFileList: [],
      detailImagesFileList: [],
      targetKeys: [],
      selectedKeys: [],
      richData: ''
    })
  }
  return state
}

export default reducer
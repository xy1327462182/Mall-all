// api 的配置文件
export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''

export const VERSION = 'v1'

export const CATEGORY_ICON_UPLOAD = SERVER + '/' + VERSION + '/categories/icons'

export const API_CONFIG = {
  getCaptcha: ['/users/captcha', 'get'],
  getCounts: ['/counts', 'get'],
  login: ['/users/login', 'post'],
  logout: ['/users/logout', 'get'],
  getUserList: ['/users/list', 'get'],
  UpdateUserActive: ['/users/isActive', 'put'],

  addCategory: ['/categories', 'post'],
  updateCategory: ['/categories', 'put'],
  getLevelCategories: ['/categories/levelCategories', 'get'],
  getCategoryList: ['/categories/list', 'get'],
  getCategoryDetail: ['/categories/detail', 'get'],
  updateCategoryName: ['/categories/name', 'put'],
  updateCategoryMobileName: ['/categories/mobileName', 'put'],
  updateCategoryIsShow: ['/categories/isShow', 'put'],
  updateCategoryIsFloor: ['/categories/isFloor', 'put'],
  updateCategoryOrder: ['/categories/order', 'put'],
}
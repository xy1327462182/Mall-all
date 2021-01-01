// api 的配置文件
export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''

export const VERSION = 'v1'

export const API_CONFIG = {
  getPositionAds: ['/ads/positionAds', 'get'],
  getArrayCategories: ['/categories/arrayCategories', 'get'],
  getLevelCategories: ['/categories/levelCategories', 'get'],
  getTreeCategories: ['/categories/treeCategories', 'get'],
  getFloors: ['/floors', 'get'],
}
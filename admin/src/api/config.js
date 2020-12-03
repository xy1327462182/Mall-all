// api 的配置文件
export const SERVER =  process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
export const VERSION = 'v1'

export const API_CONFIG = {
  getCaptcha: ['/users/captcha', 'get'],
  login: ['/users/login', 'post']
}
// api 的配置文件
var SERVER = process.env.NODE_ENV == 'production' ? 'http://api.sortmall.com' : ''
var VERSION = 'v1'

var API_CONFIG = {
  login: ['/users/login', 'post'],
  getUsername: ['/users/username', 'get'],
  logout: ['/users/logout', 'get'],
  register: ['/users', 'post'],
  checkUsername: ['/users/checkUsername', 'get'],
  getRegisterVerifyCode: ['/users/registerVerifyCode', 'get'],
}

module.exports = {
  API_CONFIG,
  VERSION,
  SERVER
}
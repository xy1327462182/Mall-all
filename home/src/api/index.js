//引入配置文件数据
var { API_CONFIG, SERVER, VERSION } = require('./config.js')
var _util = require('util')

const getApiObj = (apiConfig) => {
  let apiObj = {}
  //根据配置文件的数据，遍历生成每一个api的可调用的方法
  for (let key in apiConfig) {
    apiObj[key] = (options) => {
      var version = VERSION
      if (options.version) {
        version = options.version
      }
      //处理请求路径
      let url = apiConfig[key][0] || ''
      if (version) {
        url = '/' + version + url
      }
      if (!url.startsWith('http://') && SERVER) {
        url = SERVER + url
      }
      //请求方式
      let method = apiConfig[key][1] || 'get'
      return request({
        url: url,
        method: method,
        data: options.data,
        success: options.success,
        error: options.error,
        params: options.params//其他特殊的配置
      })
    }
  }
  return apiObj
}

var request = (options) => {
  let params = {}
  if (options.params) {
    params = options.params
  }
  $.ajax({
    url: options.url,
    method: options.method,
    data: options.data,
    dataType: 'json',
    //允许携带cookie
    xhrFields: { withCredentials: true },
    ...params,
    success: function (res) {
      if (res.code == 0) {
        options.success && options.success(res.data)
      } else if (res.code == 1) {
        options.error && options.error(res.message)
      } else if (res.code == 19) {//无权限
        //跳转到登录页
        _util.goLogin()
      } else if (!res.code) {
        options.success && options.success(res)
      }
    },
    error: function (err) {
      options.error && options.error('网络错误,请稍后再试')
    }
  })
}


module.exports = getApiObj(API_CONFIG)
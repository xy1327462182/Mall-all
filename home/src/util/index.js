module.exports = {
  //验证规则
  validate: function (type, value) {
    //非空验证
    if (type == 'required') {
      return !!value
    }
    //用户名格式验证
    if (type == 'username') {
      return /^[a-z0-9][a-z0-9_]{2,10}$/.test(value)
    }
    //密码格式验证
    if (type == 'password') {
      return /^\w{3,6}$/.test(value)
    }
    //电话号码格式验证
    if (type == 'phone') {
      return /^1[3589]\d{9}$/.test(value)
    }
    if (type == 'email') {
      return /^\w+@\w+\.\w{2,6}$/.test(value)
    }
    if (type == 'verifyCode') {
      return /^\d{6}$/.test(value)
    }
    if (type == 'captchaCode') {
      return /^[a-zA-Z0-9]{4}$/.test(value)
    }
  },
  //表单错误信息提示
  formErr: {
    show: function (msg) {
      $('.error-item').show().html(msg)
    },
    hide: function () {
      $('.error-item').hide().html('')
    }
  },
  goLogin: function () {
    window.location.href = '/login.html'
  },
  goResult: function (type) {
    window.location.href = './result.html?type=' + type
  },
  getParamFromUrl: function (key) {
    var query = window.location.search.substr(1)
    var reg = new RegExp('(^|&)' + key + '=' + '([^&]*)(&|$)')
    var result = query.match(reg)
    return result ? decodeURIComponent(result[2]) : null
  }
}

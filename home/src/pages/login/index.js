require('./index.less')
require('pages/common/logo/index.less')
require('pages/common/footer/index.less')
var api = require('api')
var util = require('util')

var page = {
  init: function() {
    //获取图形验证码
    this.handelGetCaptcha()
    this.bindEvent()
  },
  handelGetCaptcha: function() {
    api.getCaptcha({
      success: function(res) {
        $('.captcha_box').html(res)
      },
      error: function(err) {
        console.log('err::', err);
      }
    })
  },
  bindEvent: function() {
    var _this = this
    //点击重新获取图形验证码
    $('.captcha_box').on('click', function() {
      _this.handelGetCaptcha()
    })
    //提交登录
    $('#login_submit').on('click', function() {
      //获取表单数据
      var formData = {
        username: $('#username').val(),
        password: $('#password').val(),
        captchaCode: $('#captcha_code').val()
      }
      var result = _this.validate(formData)
      if (result.status) {//验证通过
        util.formErr.hide()
        api.login({
          data: formData,
          success: function(res) {
            util.goHome()
          },
          error: function(err) {
            console.log('err::', err);
            util.formErr.show(err)
          }
        })
      } else {
        //验证失败
        util.formErr.show(result.msg)
      }
    })
  },
  //验证表单数据
  validate: function(formData) {
    var result = {
      status: false,
      msg: ''
    }
    if (!util.validate('required', formData.username)) {
      result.msg = '用户名或手机号不能为空'
      return result
    }
    if (!util.validate('username', formData.username)) {
      result.msg = '用户名或手机号格式不正确'
      return result
    }
    if (!util.validate('required', formData.password)) {
      result.msg = '密码不能为空'
      return result
    }
    if (!util.validate('password', formData.password)) {
      result.msg = '密码格式不正确'
      return result
    }
    if (!util.validate('required', formData.captchaCode)) {
      result.msg = '验证码不能为空'
      return result
    }
    if (!util.validate('captchaCode', formData.captchaCode)) {
      result.msg = '验证码格式不正确'
      return result
    }
    result = {
      msg: '',
      status: true
    }
    return result
  }
}

$(function(){
  page.init()
})
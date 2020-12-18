require('./index.less')
require('pages/common/logo/index.less')
require('pages/common/footer/index.less')

var util = require('util')
var api = require('api')

var page = {
  init: function () {
    this.bindEvent()
    this.handleTimer()
  },
  bindEvent: function () {
    var _this = this
    $('#dynamic_login_submit').on('click', function () {
      var formData = {
        phone: $('#phone').val(),
        verifyCode: $('#verify-code').val()
      }
      if (!util.validate('required', formData.phone)) {
        util.formErr.show('手机号不能为空')
        return
      }
      if (!util.validate('phone', formData.phone)) {
        util.formErr.show('手机号格式不正确')
        return
      }
      if (!util.validate('required', formData.verifyCode)) {
        util.formErr.show('验证码不能为空')
        return
      }
      if (!util.validate('verifyCode', formData.verifyCode)) {
        util.formErr.show('验证码格式不正确')
        return
      }
      api.dynamicLogin({
        data: formData,
        success: function () {
          util.goHome()
        },
        error: function (err) {
          util.formErr.show(err)
        }
      })
    })
    //获取验证码点击事件
    $('#btn-verify-code').on('click', function () {
      if (!$('#btn-verify-code').hasClass('disabled')) {
        var phone = $('#phone').val()
        if (!util.validate('required', phone)) {
          util.formErr.show('手机号不能为空')
          return
        }
        if (!util.validate('phone', phone)) {
          util.formErr.show('手机号格式不正确')
          return
        }
        $('.captcha-box').show()
        //获取图形验证码
        _this.getCaptcha()
      }
    })
    //点击重新获取验证码
    $('.captcha-img').on('click', function () {
      _this.getCaptcha()
    })
    //点击发送
    $('#btn-captcha-code').on('click', function () {
      var phone = $('#phone').val()
      var captchaCode = $('#captcha_code').val()
      if (!util.validate('required', phone)) {
        util.formErr.show('手机号不能为空')
        return
      }
      if (!util.validate('phone', phone)) {
        util.formErr.show('手机号格式不正确')
        return
      }
      if (!util.validate('required', captchaCode)) {
        util.formErr.show('图形验证码不能为空')
        return
      }
      if (!util.validate('captchaCode', captchaCode)) {
        util.formErr.show('图形验证码格式不正确')
        return
      }
      api.getLoginVerifyCode({
        data: {
          phone: phone,
          captchaCode: captchaCode
        },
        success: function () {
          alert('手机验证码获取成功');
          //图形验证码输入框清空
          $('#captcha_code').val('')
          //图形验证码盒子隐藏
          $('.captcha-box').hide()
          window.localStorage.setItem('getRegisterVerifyCodeTime', Date.now())
          _this.handleTimer()
        },
        error: function (err) {
          util.formErr.show(err)
        }
      })
    })
  },
  getCaptcha: function () {
    api.getCaptcha({
      success: function (res) {
        $('.captcha-img').html(res)
      },
      error: function (err) {
        util.formErr.show(err)
      }
    })
  },
  handleTimer: function () {
    var _this = this
    //获取本地存储中的时间戳
    var storeTime = window.localStorage.getItem('getRegisterVerifyCodeTime')
    if (storeTime) {
      var totalTime = 10//单位秒
      var restTime = parseInt(totalTime - (Date.now() - storeTime) / 1000)
      if (restTime < 0) {//时间戳已经过期
        $('#btn-verify-code').removeClass('disabled').html('获取验证码')
        clearInterval(_this.timer)
        window.localStorage.removeItem('getRegisterVerifyCodeTime')
      } else {
        $('#btn-verify-code').addClass('disabled').html('请' + restTime + '秒后重试')
        _this.timer = setInterval(function () {
          restTime = parseInt(totalTime - (Date.now() - storeTime) / 1000)
          if (restTime < 0) {
            clearInterval(_this.timer)
            $('#btn-verify-code').removeClass('disabled').html('获取验证码')
            window.localStorage.removeItem('getRegisterVerifyCodeTime')
          } else {
            $('#btn-verify-code').html('请' + restTime + '秒后重试')
          }
        }, 1000)
      }
    }
  }
}

$(function () {
  page.init()
})
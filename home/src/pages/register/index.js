require('./index.less')
require('pages/common/logo/index.less')
require('pages/common/footer/index.less')

var util = require('util')
var api = require('api')

var page = {
  init: function () {
    //绑定事件
    this.bindEvent()
    //处理获取验证码的倒计时
    this.handleTimer()
  },
  bindEvent: function () {
    var _this = this
    //绑定提交表单点击事件
    $('#btn_submit').on('click', function () {
      _this.handelSubmit()
    })
    //点击获取手机验证码事件
    $('#btn-verify-code').on('click', function () {
      if (!$('#btn-verify-code').hasClass('disabled')) {
        //输入框显示
        $('.captcha-box').show()
        _this.handelGetVerifyCode()
      }
    })
    //点击重新获取图形验证码
    $('.captcha-img').on('click', function () {
      _this.handelGetVerifyCode()
    })
    //发送手机验证码按钮点击事件
    $('#btn-captcha-code').on('click', function () {
      _this.handelSendCaptchaCode()
    })
  },
  //处理表单提交
  handelSubmit: function () {
    //1.获取表单数据
    var formData = {
      phone: $('input[name="phone"]').val(),
      verifyCode: $('input[name="verifyCode"]').val(),
      password: $('input[name="password"]').val(),
      repassword: $('input[name="repassword"]').val(),
    }
    //2.表单数据验证
    var result = this.validate(formData)
    if (result.status) {
      //验证通过
      util.formErr.hide()
      //3.提交,发送请求
      api.register({
        data: formData,
        success: function(res) {
          util.goResult('register')
        },
        error: function(err) {
          console.log(err);
        }
      })
    } else {
      //验证失败
      util.formErr.show(result.message)
    }
    
  },
  //验证表单数据
  validate: function (formData) {
    var result = {
      status: false,
      message: ''
    }
    if (!util.validate('required', formData.phone)) {
      result.message = '手机号不能为空'
      return result
    }
    if (!util.validate('phone', formData.phone)) {
      result.message = '手机号格式不正确'
      return result
    }
    if (!util.validate('required', formData.verifyCode)) {
      result.message = '手机验证码不能为空'
      return result
    }
    if (!util.validate('verifyCode', formData.verifyCode)) {
      result.message = '手机验证码格式不正确'
      return result
    }
    if (!util.validate('required', formData.password)) {
      result.message = '密码不能为空'
      return result
    }
    if (!util.validate('password', formData.password)) {
      result.message = '密码格式不正确'
      return result
    }
    if (formData.password != formData.repassword) {
      result.message = '两次密码输入不一致'
      return result
    }
    else {
      result.message = '',
        result.status = true
    }
    return result
  },
  //处理获取手机验证码按钮点击事件
  handelGetVerifyCode: function () {
    var _this = this
    //发送请求获取图形验证码
    api.getCaptcha({
      success: function (res) {
        $('.captcha-img').html(res)
      },
      error: function (err) {
        console.log('err::', err);
      }
    })
  },
  handelSendCaptchaCode: function () {
    var _this = this
    var captchaCode = $.trim($('input[name="captcha-code"]').val())
    var phone = $.trim($('input[name="phone"]').val())
    if (!util.validate('required', captchaCode)) {
      util.formErr.show('图形验证码不能为空')
      return
    }
    if (!util.validate('captchaCode', captchaCode)) {
      util.formErr.show('图形验证码格式不正确')
      return
    }
    if (!util.validate('required', phone)) {
      util.formErr.show('手机号不能为空')
      return
    }
    if (!util.validate('phone', phone)) {
      util.formErr.show('手机号格式不正确')
      return
    }
    //验证通过
    util.formErr.hide()
    api.getRegisterVerifyCode({
      data: {
        phone: phone,
        captchaCode: captchaCode
      },
      success: function () {
        alert('手机验证码获取成功');
        //图形验证码输入框清空
        $('input[name="captcha-code"]').val('')
        //图形验证码盒子隐藏
        $('.captcha-box').hide()
        //时间戳存进本地存储
        window.localStorage.setItem('getRegisterVerifyCodeTime', Date.now())
        _this.handleTimer()
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
      var restTime = parseInt(totalTime - (Date.now() - storeTime)/1000)
      if (restTime < 0) {//时间戳已经过期
        $('#btn-verify-code').removeClass('disabled').html('获取验证码')
        clearInterval(_this.timer)
        console.log(111);
        window.localStorage.removeItem('getRegisterVerifyCodeTime')
      } else {
        $('#btn-verify-code').addClass('disabled').html('请'+restTime+'秒后重试')
        _this.timer = setInterval(function(){
          restTime = parseInt(totalTime - (Date.now() - storeTime)/1000)
          if (restTime < 0) {
            clearInterval(_this.timer)
            $('#btn-verify-code').removeClass('disabled').html('获取验证码')
            window.localStorage.removeItem('getRegisterVerifyCodeTime')
          } else {
            $('#btn-verify-code').html('请'+restTime+'秒后重试')
          }
        },1000)
      }
    }

  }
}

$(function () {
  page.init()
})
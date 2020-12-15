require('./index.less')
require('../common/logo/index.less')
require('../common/footer/index.less')

var util = require('util')

var page = {
  init: function() {
    this.bindEvent()
  },
  bindEvent: function() {
    var _this = this
    //绑定提交表单点击事件
    $('#btn_submit').on('click', function() {
      _this.handelSubmit()
    })
  },
  handelSubmit: function() {
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
      console.log('okok');
    } else {
      //验证失败
      util.formErr.show(result.message)
    }
    //3.提交,发送请求
  },
  validate: function(formData) {
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
  }
}

$(function(){
  page.init()
})
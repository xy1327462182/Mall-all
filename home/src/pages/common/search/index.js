require('./index.less')
//var tpl = require('./index.tpl')
var api = require('api')
var util = require('util')

var page = {
  init: function() {
    this.$input = $('.search-input')
    //输入防抖定时器
    this.inputTimer = null
    this.bindEvent()
    
  },
  bindEvent: function() {
    var _this = this
    //搜索框绑定输入事件
    _this.$input.on('input', function() {
      if (_this.inputTimer) {
        clearTimeout(_this.inputTimer)
      }
      _this.inputTimer = setTimeout(function() {
        var keyword = $.trim(_this.$input.val())
      },300)
    })
  }
}

$(function() {
  page.init()
})
require('./index.less')
//var tpl = require('./index.tpl')
var api = require('api')
var util = require('util')

var cache = {
  count: 0,
  data: {},
  setData: function(key, val) {
    this.count++
    this.data[key] = val
  },
  getData: function(key) {
    return this.data[key]
  }
}

var page = {
  init: function() {
    this.$input = $('.search-input')
    //输入防抖定时器
    this.inputTimer = null
    this.bindEvent()
    this.initInputValue()
  },
  initInputValue: function() {
    var keyword = util.getParamFromUrl('keyword') || ''
    if (keyword) {
      this.$input.val(keyword)
    }
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
        _this.handleSearchData(keyword)
      },300)
    })
  },
  //发送搜索请求获取数据
  handleSearchData: function(keyword) {
    //从缓存中拿数据
    var list = cache.getData(keyword)
    if (!list) {
      //如果缓存没有再发送请求
      api.getProductsSearchList({
        data: {
          keyword: keyword
        },
        success: function(res){
          list = res
          //存入缓存中
          cache.setData('list',res)
        },
        error: function(err) {
          console.log('err::', err);
        }
      })
    }
  }
}

$(function() {
  page.init()
})
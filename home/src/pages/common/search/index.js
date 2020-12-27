require('./index.less')
var tpl = require('./index.tpl')
var api = require('api')
var util = require('util')

var cache = {
  count: 0,
  data: [],
  setData: function(key, val) {
    if (this.data.length >= 10) {
      this.data.pop()
    }
    this.data.unshift({
      keyword: key,
      value: val
    })
  },
  getData: function(key) {
    return this.data.find(function(item) {
      return item.keyword == key
    })
  }
}

var page = {
  init: function() {
    this.$input = $('.search-input')
    this.$layer = $('.search-layer')
    this.$navLinks = $('.head-right .nav-list .nav-item a')
    //输入防抖定时器
    this.inputTimer = null
    this.initInputValue()
    this.setActiveNav()
    this.bindEvent()
  },
  initInputValue: function() {
    var keyword = util.getParamFromUrl('keyword') || ''
    if (keyword) {
      this.$input.val(keyword)
    } else {
      this.$input.val('')
    }
  },
  setActiveNav: function() {
    var nav = util.getParamFromUrl('nav') || '1'
    if (nav == 1) {
      this.$navLinks.removeClass('active').eq(0).addClass('active')
    } else if (nav == 2) {
      this.$navLinks.removeClass('active').eq(1).addClass('active')
    } else if (nav ==3) {
      this.$navLinks.removeClass('active').eq(2).addClass('active')
    }
  },
  bindEvent: function() {
    var _this = this
    //搜索输入框获取焦点 layer显示
    //1. 如果输入框值为空，则layer显示最近搜索关键词历史记录
    //2. 如果输入框有值，则layer直接显示该值对应的数据
    _this.$input.on('focus', function() {
      var keyword = _this.getInputVal() || ''
      if (keyword) {
        if (_this.$layer.html()) {
          //如果有关键词和内容 直接显示
          _this.$layer.show()
        } else {
          //如果只有关键词 则获取数据
          _this.handleKeyword(keyword)
        }
      } else {
        //拿到缓存中最近搜索历史keyword
        var keywordList = cache.data.map(item=>{
          return {
            name: item.keyword
          }
        })
        if (keywordList.length > 0) {
          var html = util.render(tpl, {
            list: keywordList
          })
          //layer 显示
          _this.layerShow(html)
        }
      }
    })
    //搜索框失去焦点 layer隐藏
    $(document).on('click', function() {
      _this.$layer.hide()
    })
    //搜索框点击 组织冒泡
    _this.$input.on('click', function(ev) {
      ev.stopPropagation()
    })
    //搜索框绑定输入事件
    _this.$input.on('input', function() {
      if (_this.inputTimer) {
        clearTimeout(_this.inputTimer)
      }
      _this.inputTimer = setTimeout(function() {
        var keyword = $.trim(_this.$input.val())
        if (keyword) {
          _this.handleKeyword(keyword)
        } else {
          _this.layerHide()
        }
      },400)
    })
    //回车提交搜索
    _this.$input.on('keyup', function(ev) {
      if (ev.keyCode == 13) {
        _this.handleSubmit()
      }
    })
    //搜索提交点击事件
    $('.search-btn').on('click', function() {
      _this.handleSubmit()
    })
    //点击数据项的每一项 提交搜索
    _this.$layer.on('click', '.search-item', function(ev) {
      ev.stopPropagation()
      var keyword = $(this).html()
      _this.$input.val(keyword)
      _this.handleSubmit()
    })
  },
  //根据关键词获取数据
  handleKeyword: function(keyword) {
    var _this = this
    var html = ''
    //从缓存中拿数据
    var data = cache.getData(keyword)
    if (data) {
      //如果缓存中有数据，直接渲染
      html = util.render(tpl, {
        list: data.value
      })
      _this.layerShow(html)
      return
    } else {
      //缓存中没数据，发送请求
      api.getProductsSearchList({
        data: {
          keyword: keyword
        },
        success: function(res){
          if (res.length > 0) {
            //存入缓存中
            cache.setData(keyword, res)
            //显示layer
            html = util.render(tpl, {
              list: res
            })
            _this.layerShow(html)
          } else {
            _this.layerShow('对不起，什么也没有搜到')
          }
        },
        error: function(err) {
          console.log('err::', err);
        }
      })
    }
  },
  layerShow: function(html) {
    var _this = this
    _this.$layer.html(html).show()
  },
  layerHide: function() {
    var _this = this
    _this.$layer.html('').hide()
  },
  getInputVal: function() {
    var _this = this
    return $.trim(_this.$input.val())
  },
  //搜索提交
  handleSubmit: function() {
    var keyword = this.getInputVal()
    window.location.href = './list.html?keyword=' + keyword
  }
}

$(function() {
  page.init()
})
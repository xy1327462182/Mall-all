require('./index.less')
var tpl = require('./index.tpl')
var api = require('api')
var util = require('util')

var page = {
  init: function() {
    this.getUsername()
    this.loadCartsCount()
    this.bindEvent()
    this.cartTimer = null
    this.$cartContent = $('.cart-content')
  },
  //获取正在登陆的用户名
  getUsername: function() {
    api.getUsername({
      success: function(res){
        $('.not-login').hide()
        $('.user.login').show().find('.username').text(res.username)
      },
      error: function(err){
      }
    })
  },
  //加载购物车数据
  loadCartsCount: function() {
    api.getCartsCount({
      success: function(res) {
        $('.cart_count_num').text(res)
      }
    })
  },
  bindEvent: function() {
    var _this = this
    //登出
    $('#logout').on('click', function() {
      api.logout({
        success: function() {
          // util.goLogin()
          window.location.reload()
        }
      })
    })
    //加载购物车内容数据
    $('.cart-box').hover(function(){
      if (_this.cartTimer) {
        clearTimeout(_this.cartTimer)
      }
      _this.cartTimer = setTimeout(function() {
        _this.renderCartContent()
      },400)
    }, function() {
      if (_this.cartTimer) {
        clearTimeout(_this.cartTimer)
        _this.$cartContent.hide()
      }
    })
  },
  renderCartContent: function() {
    var _this = this;
    _this.$cartContent.show().html('<div class="loader"></div>')
    //发送请求
    api.getCarts({
      success: function(res) {
        if (res.cartList.length === 0) {
          _this.$cartContent.html('<span class="empty-cart">购物车中还没有商品,赶紧来购买吧!</span>')
        } else {
          var html = util.render(tpl, res);
          _this.$cartContent.html(html)
        }
      },
      error: function(err) {
        _this.$cartContent.html('<span class="empty-cart">出错了，请稍后再试！</span>')
      }
    })
  }
}

$(function() {
  page.init()
})
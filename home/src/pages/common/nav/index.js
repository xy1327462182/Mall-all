require('./index.less')
var api = require('api')
var util = require('util')

var page = {
  init: function() {
    this.getUsername()
    this.loadCartsCount()
    this.bindEvent()
  },
  //获取正在登陆的用户名
  getUsername: function() {
    api.getUsername({
      success: function(res){
        $('.not-login').hide()
        $('.user.login').show().find('.username').text(res.username)
      },
      error: function(err){
        console.log('err::', err);
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
          util.goLogin()
        }
      })
    })
    //加载购物车内容数据
    $('.cart-box').hover(function(){
       console.log(11);
    }, function() {
      console.log(22);
    })
  }
}

$(function() {
  page.init()
})
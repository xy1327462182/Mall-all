require('./index.less')
var api = require('api')
var util = require('util')

var page = {
  init: function() {
    this.getUsername()
    this.bindEvent()
  },
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
  bindEvent: function() {
    $('#logout').on('click', function() {
      api.logout({
        success: function() {
          util.goLogin()
        }
      })
    })
  }
}

$(function() {
  page.init()
})
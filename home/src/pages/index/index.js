require('./index.less')
require('pages/common/nav/index.js')
require('pages/common/search/index.js')
require('pages/common/footer/index.js')

var categoriesTpl = require('./categories.tpl')

var api = require('api')
var util = require('util')
var page = {
  init: function() {
    this.$categories = $('.parent-categories')
    this.categoryTimer = null
    this.cache = {}
    this.loadParentCategories()
    this.bindCategoriesEvent()
  },
  //加载一级分类列表
  loadParentCategories: function() {
    api.getArrayCategories({
      success: function(res) {
        var categoriesHtml = util.render(categoriesTpl,{
          categories: res
        })
        $('.parent-categories').html(categoriesHtml)
      },
      error: function(err) {
        console.log('err::', err);
      }
    })
  },
  //分类列表处的事件
  bindCategoriesEvent: function() {
    var _this = this
    _this.$categories.on('mouseenter', '.keyword-item', function() {
      //显示子分类面板
      $('.child-categories').show()
      var $this = $(this)
      if (_this.categoryTimer) {
        clearTimeout(_this.categoryTimer)
      }
      _this.categoryTimer = setTimeout(function() {
        var pid = $this.data('id')
        //从缓存中拿数据
        if (_this.cache[pid]) {
          _this.renderChildCategories(_this.cache[pid])
        } else {
          api.getChildArrayCategories({
            data:{
              pid: pid
            },
            success: function(res) {
              console.log(res);
            },
            error: function(err) {
              console.log(err);
            }
          })
        }
      },300)
    })
    _this.$categories.on('mouseleave', '.keyword-item', function() {
      if (_this.categoryTimer) {
        clearTimeout(_this.categoryTimer)
      }
      
    })
  },
  //渲染子分类面板
  renderChildCategories: function(categories) {
    console.log('categories::', categories);
  }
}

$(function() {
  page.init()
})
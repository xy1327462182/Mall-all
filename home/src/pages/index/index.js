require('./index.less')
require('pages/common/nav/index.js')
require('pages/common/search/index.js')
require('pages/common/footer/index.js')

var api = require('api')
var util = require('util')

var categoriesTpl = require('./categories.tpl')
var childCategoriesTpl = require('./childCategories.tpl')
var spinningTpl = require('./spinning.tpl')
var spinningHtml = util.render(spinningTpl,{})

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
    $('.parent-categories').html(spinningHtml)
    setTimeout(function(){
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
    },700)
  },
  //分类列表处的事件
  bindCategoriesEvent: function() {
    var _this = this
    _this.$categories.on('mouseenter', '.keyword-item', function() {
      //显示子分类面板
      $('.child-categories').html(spinningHtml).show()
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
              _this.renderChildCategories(res)
              _this.cache[pid] = res
            },
            error: function(err) {
              console.log(err);
            }
          })
        }
      },300)
    })
    //鼠标移出，子分类面板隐藏
    $('.focus .categories').on('mouseleave', function(ev) {
      ev.stopPropagation()
      if (_this.categoryTimer) {
        clearTimeout(_this.categoryTimer)
      }
      //子分类面板隐藏
      $('.child-categories').html('').hide()
    })
  },
  //渲染子分类面板
  renderChildCategories: function(categories) {
    var childCategoriesHtml = util.render(childCategoriesTpl, {
      categories: categories
    })
    $('.child-categories').html(childCategoriesHtml)
  }
}

$(function() {
  page.init()
})
require('./index.less')
require('pages/common/nav/index.js')
require('pages/common/search/index.js')
require('pages/common/footer/index.js')

import Swiper from 'swiper';
import LazyLoad from 'lazyload'
require('swiper/dist/css/swiper.min.css')
var api = require('api')
var util = require('util')

var spinningTpl = require('./spinning.tpl')
var spinningHtml = util.render(spinningTpl, {})
var categoriesTpl = require('./categories.tpl')
var childCategoriesTpl = require('./childCategories.tpl')
var swiperTpl = require('./swiper.tpl')
var hotTpl = require('./hot.tpl')
var floorTpl = require('./floor.tpl')
var elevatorTpl = require('./elevator.tpl')

var page = {
  init: function () {
    this.$win = $(window)
    this.$categories = $('.parent-categories')
    this.categoryTimer = null
    this.$floors = null
    this.$elevator = $('#elevator')
    this.$elevatorItems = null
    this.cache = {}
    this.loadParentCategories()
    this.loadSwiper()
    this.loadHotProducts()
    this.loadFloor()
    this.bindCategoriesEvent()
    this.bindFloorsEvent()
  },
  //加载一级分类列表
  loadParentCategories: function () {
    $('.parent-categories').html(spinningHtml)
    setTimeout(function () {
      api.getArrayCategories({
        success: function (res) {
          var categoriesHtml = util.render(categoriesTpl, {
            categories: res,
          })
          $('.parent-categories').html(categoriesHtml)
        },
        error: function (err) {
          console.log('err::', err)
        },
      })
    }, 700)
  },
  //分类列表处的事件
  bindCategoriesEvent: function () {
    var _this = this
    _this.$categories.on('mouseenter', '.keyword-item', function () {
      //显示子分类面板
      $('.child-categories').html(spinningHtml).show()
      var $this = $(this)
      if (_this.categoryTimer) {
        clearTimeout(_this.categoryTimer)
      }
      _this.categoryTimer = setTimeout(function () {
        var pid = $this.data('id')
        //从缓存中拿数据
        if (_this.cache[pid]) {
          _this.renderChildCategories(_this.cache[pid])
        } else {
          api.getChildArrayCategories({
            data: {
              pid: pid,
            },
            success: function (res) {
              _this.renderChildCategories(res)
              _this.cache[pid] = res
            },
            error: function (err) {
              console.log(err)
            },
          })
        }
      }, 300)
    })
    //鼠标移出，子分类面板隐藏
    $('.focus .categories').on('mouseleave', function (ev) {
      ev.stopPropagation()
      if (_this.categoryTimer) {
        clearTimeout(_this.categoryTimer)
      }
      //子分类面板隐藏
      $('.child-categories').html('').hide()
    })
  },
  //渲染子分类面板
  renderChildCategories: function (categories) {
    var childCategoriesHtml = util.render(childCategoriesTpl, {
      categories: categories,
    })
    $('.child-categories').html(childCategoriesHtml)
  },
  //加载首页轮播图
  loadSwiper: function () {
    $('.swiper-wrapper').html(spinningHtml)
    api.getPositionAds({
      data: {
        position: 1,
      },
      success: function (res) {
        var swiperHtml = util.render(swiperTpl, {
          slides: res
        })
        $('.swiper-wrapper').html(swiperHtml)
        var mySwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          width: 862,
          height: 440,
          autoplay: true,
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      },
      error: function (err) {
        console.log(err);
      }
    })
  },
  //加载热销商品
  loadHotProducts: function () {
    $('.hot .hot-bd').html(spinningHtml)
    api.getHotProducts({
      success: function (res) {
        var html = util.render(hotTpl, {
          products: res
        })
        $('.hot-bd').html(html)
      },
      error: function (err) {
        console.log(err);
      }
    })
  },
  //加载楼层
  loadFloor: function () {
    var _this = this
    api.getFloors({
      success: function (res) {
        var floorsHtml = util.render(floorTpl, {
          floors: res
        })
        $('.floor-wrap').html(floorsHtml)
        new LazyLoad($("img.lazyload"));
        _this.$floors = $('.floor-wrap .floor-box')

        var elevatorHtml = util.render(elevatorTpl, {
          floors: res
        })
        $('#elevator').html(elevatorHtml)
        _this.$elevatorItems = $('.elevator-item')
      },
      error: function (err) {
        console.log(err);
      }
    })
  },
  bindFloorsEvent: function () {
    var _this = this
    //点击楼层到达指定位置
    _this.$elevator.on('click', '.elevator-item', function () {
      var num = $(this).index()
      console.log(num);
      $('html, body').animate({
        scrollTop: _this.$floors.eq(num).offset().top
      })
    })
    //置顶
    _this.$elevator.on('click', '.elevator-backTop', function () {
      $('html, body').animate({
        scrollTop: 0
      })
    })
    this.$win.on('scroll resize load', function () {
      clearTimeout(_this.$elevator.showElevatorTimer);
      _this.$elevator.showElevatorTimer = setTimeout(_this.setElevator.bind(_this), 50);
    });
  },
  //设置楼层电梯
  setElevator: function () {
    var num = this.getFloorNum();
    if (num == -1) {
      this.$elevator.fadeOut();
    } else {
      this.$elevator.fadeIn();
      this.$elevatorItems.removeClass('elevator-active');
      this.$elevatorItems.eq(num).addClass('elevator-active');
    }
  },
  //获取楼层号
  getFloorNum() {
    //默认楼层号
    var _this = this
    var num = -1;
    if (this.$floors) {
      this.$floors.each(function (index, elem) {
        num = index;
        if ($(elem).offset().top > _this.$win.scrollTop() + _this.$win.height() / 2) {
          num = index - 1;
          return false;
        }
      });
    }
    return num;
  },
}

$(function () {
  page.init()
})

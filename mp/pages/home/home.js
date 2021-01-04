const { promisify } = require('../../utils/util')

// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {id:1, task: 'aaa'},
      {id:2, task: 'bbb'},
      {id:3, task: 'ccc'}
    ],
    msg: 'hello'
  },
  f3tap(){
    console.log('f3...');
  },
  f2tap(){
    console.log('f2...');
  },
  f1tap(){
    console.log('f1...');
  },
  updateMsg() {
    this.setData({
      msg: '你好'
    })
  },
  async req(){
    // wx.request({
    //   url: 'http://127.0.0.1:3000/v1/ads/positionAds',
    //   data:{
    //     position:1
    //   },
    //   success: function(res){
    //     console.log(res);
    //   }
    // })
    const res = await promisify(wx.request,{
      url: 'http://127.0.0.1:3000/v1/ads/positionAds',
      data:{
        position:1
      }
    })
    console.log(res);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
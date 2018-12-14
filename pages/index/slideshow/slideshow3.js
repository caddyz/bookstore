// pages/index/slideshow/slideshow3.js
var util = require('../../../utils/util.js')
Page({

  /**
  * 页面的初始数据
  */
  data: {
    list: [],
    theme: ''
  },
  skip: function (e) {
    wx.navigateTo({
      url: '../../classify/detail/detail?bookId=' + e.currentTarget.dataset.item.bookId,
    })
  },
  click: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let key = "list[" + index + "].flag";
    let val = that.data.list[index].flag;
    that.setData({
      [key]: !val
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    util.getTheme(3, function (data) {
      that.setData({
        theme: data
      })
    })
    util.slideshowConnection(3, function (data) {
      that.setData({
        list: data
      })
    })
    for (var i in that.data.book) {
      that.data.book[i].flag = false
    }
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

  },
  skipDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    // console.log(index)
    // console.log(JSON.stringify("bookId:"+this.data.list[index].bookId))
    wx.navigateTo({
      url: '../../classify/detail/detail?bookId=' + JSON.stringify(this.data.list[index].bookId),
    })
  }
})
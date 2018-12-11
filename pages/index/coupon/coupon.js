// pages/index/coupon/coupon.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    msg:[],
    flage:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.URL +'bookstore-mall/findcoupon/通用型',
      success:function(res){
        that.setData({
          list:res.data
        })
      }
    })
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
  draw:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    let couponId = that.data.list[index].couponId;
    wx.request({
      url: app.URL + 'bookstore-mall/getCoupon/' + app.globalData.userInfo.userId +'/'+couponId,
      success:function(res){
        that.setData({
          msg:res.data
        })
        wx.showToast({
          title: that.data.msg.msg,
          icon:'none'
        })
      },
      fail:function(){
        wx.showToast({
          title: '领取失败',
          icon:'none'
        })
      }
    })
  }
})
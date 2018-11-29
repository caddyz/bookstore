// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      "text":"最好玩的活动等着你",
      "url":"../slideshow/slideshow0"
    },{
      "text":"这里有折扣信息哟！",
      "url":"../slideshow/slideshow1",
    }]
  },
  messageSkip:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: that.data.list[index].url,
    })
  },
  messageSkip0:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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
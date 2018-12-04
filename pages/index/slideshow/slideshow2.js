// pages/index/slideshow/slideshow2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author:"马克思",
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let author = that.data.author
    wx.request({
      url: 'http://192.168.10.110:8080/bookstore-mall/author/' + author,
      success: function (res) {
        that.setData({
          list: res.data
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
  skipDetail:function(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(JSON.stringify(this.data.list[index]))
    wx.navigateTo({
      url: '../../classify/detail/detail?book=' + JSON.stringify(this.data.list[index]),
    })
  }
})
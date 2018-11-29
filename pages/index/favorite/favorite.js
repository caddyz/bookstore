// pages/favorite/favorite.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   list:[],
   mes:[]
  },
  deleteBookInfo: function (e) {
    let that = this;
    let listData = that.data.list;
    console.log(listData)
    let index = e.currentTarget.dataset.index;
    console.log(listData[index].bookId)
    console.log("index:" + index)
    wx.request({
      url: 'http://192.168.10.110:8080/bookstore-mall/delete/1/' + listData[index].bookId,
      header: { 'content-type': 'application/json' },
      success: function (res){
        listData.splice(index, 1);
        that.setData({
          list: listData,
          mes:res.data
        });
        wx.showToast({
          title: that.data.mes.msg,
          icon:'none'
        })
      },
      fail:function(){
        wx.showToast({
          title: '删除失败',
          icon:'none'
        })
      }
    })
    console.log(that.data.list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://192.168.10.110:8080/bookstore-mall/1/favorite',
      header: { 'content-type': 'application/json' },
      success: function (res) {
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
  
})
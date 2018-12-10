// pages/hot/hot.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    searchLoading: true,
    searchLoadingComplete: false,
    loadingpageNum: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.URL +'bookstore-mall/1/findhotbook',
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
    let that = this;
    that.data.loadingpageNum += 1;
    wx.request({
      url: app.URL +'bookstore-mall/'+that.data.loadingpageNum+'/findhotbook',
      success:function(res){
        let searchList = [];
        if (res.data.length != 0) {
          searchList = that.data.list.concat(res.data);
          that.setData({
            list: searchList
          })
        } else {
          searchList = that.data.list.concat(res.data);
          that.setData({
            list: searchList,
            searchLoadingComplete: true, //把“没有数据”设为true，显示
            searchLoading: false  //把"上拉加载"的变量设为false，隐藏
          });
        }
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  hotSkip:function(){
    wx.navigateTo({
      url: '/pages/classify/detail/detail',
    })
  }
})
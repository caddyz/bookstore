// pages/search/search.js
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seekValue:null,
    loadingpageNum: 1,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("接收到的seekValue参数是：" + JSON.stringify(options.seekValue));
    util.getKeywordSearch(options.seekValue,1,function(data){
      console.log("关键字查询数据："+data);
      that.setData({
        list:data,
        seekValue: options.seekValue
      })
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
    util.getKeywordSearch(that.data.seekValue,that.data.loadingpageNum, function (data) {
      console.log("数据长度：" + data.length)
      if (data.length > 0) {
        let searchList = [];
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList,
          searchLoading: true
        })
      } else {
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
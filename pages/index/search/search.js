// pages/search/search.js
var util = require('../../../utils/util.js')
import templates from '../../template/bookinfoTemplate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seekValue:null,
    loadingpageNum: 1,
    searchLoading: true,
    searchLoadingComplete: false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log("接收到的seekValue参数是：" + JSON.stringify(options.seekValue));
    util.getKeywordSearch(options.seekValue,1,function(data){
      console.log("关键字查询数据：" + JSON.stringify(data));
      if(data.length < 10){
        that.setData({
          searchLoadingComplete: true,
          searchLoading: false,
          list:data,
          seekValue: options.seekValue
        })
      } else{
        that.setData({
          searchLoadingComplete: false,
          searchLoading: true,
          list: data,
          seekValue: options.seekValue
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
    util.getKeywordSearch(that.data.seekValue,that.data.loadingpageNum, function (data) {
      console.log("数据长度：" + data.length)
      let searchList = [];
      if (data.length != 0) {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList
        })
      } else {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList,
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

  },
  bookInfoSkip: function (event) {
    templates.bookInfoSkip(event)
  }
})
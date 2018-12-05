// pages/more/more.js
var util = require('../../../utils/util.js')
import templates from '../../template/bookinfoTemplate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    loadingpageNum: 1,
    searchLoading: true,
    searchLoadingComplete: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("接收到的参数是list=" + options.list);
    // this.data.list = JSON.parse(options.list);
    let taht = this;
    util.getSearchBook(1, function (data) {
      // console.log(data);
      taht.setData({
        list: data
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
  // onPullDownRefresh: function () {
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    that.data.loadingpageNum += 1;
    util.getSearchBook(that.data.loadingpageNum, function (data) {
      // console.log("数据长度：" + data.length)
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
  itemclick(event) {
    templates.onclick(event)
  }
})
//index.js
// 导入utils.js文件
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    mzImgUrl:[
      '/pages/img/like.png',
      '/pages/img/comment.png',
      '/pages/img/message.png',
    ],
    imgUrls: [
      '/pages/img/history-1.jpg',
      '/pages/img/history-2.jpg',
      '/pages/img/history-3.jpg',
      '/pages/img/history-4.jpg',
      '/pages/img/history-5.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    list: [],
    loadingpageNum:1,
    searchLoading: true,  
    searchLoadingComplete: false 
  },
  // 数据起始加载
  onLoad: function (options) {
    // this.getData();
    let taht = this;
    util.getSearchBook(1,function(data){
      console.log(data);
      taht.setData({
        list:data
      })
    })
  },
  onPullDownRefresh: function () {
    let that = this;
    wx.showNavigationBarLoading()
    setTimeout(function () {
      that.onLoad()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 300);
  },
  onReachBottom: function () {
    let that = this;
    that.data.loadingpageNum += 1;
    util.getSearchBook(that.data.loadingpageNum, function (data) {
      console.log("数据长度："+data.length)
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
  // 跳转函数
  moreSkip:function(){
    // console.log(list);
    wx.navigateTo({
      url: '/pages/more/more?list='+JSON.stringify(this.data.list),
    })
  },
  favoriteSkip:function(){
    wx.navigateTo({
      url: '/pages/favorite/favorite',
    })
  },
  commentSkip: function () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },
  messageSkip: function () {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  vipSkip: function () {
    wx.navigateTo({
      url: '/pages/member/member',
    })
  },
  hotSkip: function () {
    wx.navigateTo({
      url: '/pages/hot/hot',
    })
  },
  helpSkip: function () {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  homepageSearch:function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
})

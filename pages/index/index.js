//index.js
// 导入utils.js文件
var util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
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
    swiperCurrent:0,

    list: [],
    loadingpageNum:1,
    seekValue:null
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
    }, 150);
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
  //轮播区事件
  //轮播区滑动事件
  swiperChange:function(e){
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播区点击事件
  swiperClick:function(e){
    wx.navigateTo({
      url: '/pages/index/slideshow/slideshow' + this.data.swiperCurrent,
    })
  },
  //新书更多事件
  moreSkip:function(){
    // console.log(list);
    wx.navigateTo({
      url: '/pages/index/more/more?list='+JSON.stringify(this.data.list),
    })
  },
  //分类区事件
  // 跳转函数
  favoriteSkip:function(){
    wx.navigateTo({
      url: '/pages/index/favorite/favorite',
    })
  },
  commentSkip: function () {
    wx.navigateTo({
      url: '/pages/index/comment/comment',
    })
  },
  messageSkip: function () {
    wx.navigateTo({
      url: '/pages/index/message/message',
    })
  },
  vipSkip: function () {
    wx.navigateTo({
      url: '/pages/index/member/member',
    })
  },
  hotSkip: function () {
    wx.navigateTo({
      url: '/pages/index/hot/hot',
    })
  },
  helpSkip: function () {
    wx.navigateTo({
      url: '/pages/index/help/help',
    })
  },
  //图书详情页跳转
  bookInfoSkip:function(){
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },
  //搜索区域事件
  homepageSearch:function(e){
    this.data.seekValue = e.detail.value
    wx.navigateTo({
      url: '/pages/index/search/search?seekValue=' + this.data.seekValue,
    })
  },
})

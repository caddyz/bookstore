//index.js
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
    list: []
  },
  onLoad: function (options) {
    this.getData();
  },
  getData: function () {
    var that = this;
    wx.request({
      url: 'http://192.168.10.110:8080/ssm/0/findBook',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data
        })
      }
    })
  },
  next:function(e){
    wx.navigateTo({
      url: '/pages/template/moreTemplate?list='+JSON.stringify(this.data.list),
    })
  },
  moreSkip:function(){
    wx.navigateTo({
      url: '/pages/more/more',
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
})

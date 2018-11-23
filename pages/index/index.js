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
  },
  moreSkip:function(){
    wx.switchTab({
      url: '/pages/classify/classify',
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

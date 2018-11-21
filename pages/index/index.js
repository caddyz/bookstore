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
    // imageWidth: 0,
    // imageHeight: 0 
  },
  // imgload: function (e) {
  //   console.log("图片加载完成=" + e.detail.width + ":" + e.detail.height);
  //   //用来计算高宽
  //   this.setData(wxAutoImageCal(e));
  // },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
// function wxAutoImageCal(e){
//     //获取图片的原始长宽
//     var originalWidth = e.detail.width;
//     var originalHeight = e.detail.height;
//     var windowWidth = 0, windowHeight = 0;
//     var imageWidth = 0, imageHeight = 0;
//     var results = {};
// //获取屏幕信息
//   wx.getSystemInfo({
//     success: function (res) {
//       windowWidth = res.windowWidth;
//       windowHeight = res.windowHeight;
//       console.log("屏幕大小：" + windowWidth + "*" + windowHeight);
//       //判断按照那种方式进行缩放
//       if (originalWidth > windowWidth) {//在图片width大于手机屏幕width时候
//         imageWidth = windowWidth;
//         imageHeight = (imageWidth * originalHeight) / originalWidth;
//         results.imageWidth = imageWidth;
//         results.imageHeight = imageHeight;
//       } else {//否则展示原来的数据
//         results.imageWidth = originalWidth;
//         results.imageHeight = originalHeight;
//       }
//     }
//   })
//   return results;
// }

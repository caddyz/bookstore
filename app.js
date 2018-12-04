//app.js
var scence=0;
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.reLaunch({
      url: '../../pages/index/index',
    })
  },
  //在app.js里声明全局变量scence，赋值为0，然后在onShow里判断scence的值，为0 进入首次进入页，为1则进入首页，在onHide里将scence的值变为1，然后在onLaunch里设置重启动的页面为首页，这样就能实现第一次进入为首次进入页，之后进入都是首页了
  //小程序启动，或从后台进入前台显示时  生命周期回调—监听小程序显示
  onShow: function (options) {
    console.log("app.onShow");
    // console.log('this.globalData.scence :' + this.globalData.scence);
    // 判断变量，选择跳转位置
    if (this.globalData.scence) {
      wx.redirectTo({
        url: '../../pages/index/index',
      })
      console.log('去首页')
    } else {
      wx.redirectTo({
        url: '/pages/login/login',
      })
      console.log('去首次进入页');
    }
  },
  //小程序从前台进入后台时 生命周期回调—监听小程序隐藏
  onHide: function () {
    this.globalData.scence = 1;
    console.log("app.onHide");
    // console.log(this.globalData.scence);
  },
  globalData: {
    userInfo: null
  }
})
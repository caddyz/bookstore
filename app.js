//app.js
var scence=0;
App({
  orderInfo:[
    {openid:''},
    {spbill_create_ip:''},
    {body:''},
    {detail:''},
    {out_trade_no: ''},
    {total_fee:''}],
  userInfo:null,
  code:null,
  payinfo:null,
  onLaunch: function () {
    let that = this;
    //获取本机的IP地址
    wx.request({
      url: 'http://ip-api.com/json/',
      success(res){
        // console.log("本机IP地址：" + res.data.query)
        that.orderInfo.spbill_create_ip = res.data.query
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success(res) {
        // console.log("code:"+res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/bookstore-mall/getopenid/'+res.code,//传送路径
            // data: {
            //    code: res.code
            //  },
            // method: 'GET',
            // header: {
            //   'Content-Type': 'application/json'
            // },
            success(res) {
              payinfo:res.data,
              that.orderInfo.openid=res.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
 
  }
})
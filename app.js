//app.js
var scence=0;
App({
  URL:'http://localhost:8080/',
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
  },
  globalData: {
    userInfo: null,
  }
})
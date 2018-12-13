// pages/person/person.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    motto: 'Hello World',
    list:'',
    newAddress:'',
    // orderItems
    orderItems: [
      {
        typeId: 0,
        name: '待付款',
        url: 'bill',
        imageurl: '../person/images/waiting_pay.png',
      },
      {
        typeId: 1,
        name: '待发货',
        url: 'bill',
        imageurl: '../person/images/waiting_send.png',
      },
      {
        typeId: 2,
        name: '待收货',
        url: 'bill',
        imageurl: '../person/images/waiting_receiv.png'
      },
      {
        typeId: 3,
        name: '待评价',
        url: 'bill',
        imageurl: '../person/images/waiting_estimate.png'
      }
    ],
  },
   onShow:function(){
      var that=this;
      let info = app.globalData.userInfo;
      console.log("info:" + JSON.stringify(info));
      if (info == null) {
        wx.showModal({
          title: '提示',
          content: '是否登陆',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: "/pages/login/login"
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          }
        })
        
      } else {
        //调用应用实例的方法获取全局数据
        //更新数据
        that.setData({
          username: app.globalData.userInfo.username,
          userId:app.globalData.userInfo.userId
        })
      }
    },
  //事件处理函数
  toOrder: function () {
    wx.navigateTo({
      url: '../person/order/order'
    })
  },
  //收货地址跳转界面
  toAddressList:function() {
    wx.navigateTo({
      url: '../person/addressList/addressList',
    })
  },
  //售后记录跳转界面
  toUserSaleRecord:function(){
    wx.navigateTo({
      url: '../person/userSaleRecord/userSaleRecord',
    })
  },
  //个人信息跳转页面
  toUserInfomation:function(){
  wx.navigateTo({
    url: '../person/userInfomation/userInfomation',
})
  },
  //我的评价跳转页面
  toMyEvaluate:function(){
    wx.navigateTo({
      url: '../person/myEvaluate/myEvaluate',
    })
  },
  onLoad: function () {
    //  console.log('onLoad')
    // wx.navigateTo({
    //   url: "/pages/login/login"
    // })
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getUserInfo(function (userinfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
 

})
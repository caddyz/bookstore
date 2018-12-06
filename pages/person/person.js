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
  },
  // 链接测试
  houduanButton1: function () {
    var that = this;
    let user = "嗨喽你好";
    wx.request({
      url: 'http://192.168.10.162:8080/springmvc01/getUser/' + user,
      method: 'GET',
      // data:{
      //   user:"嗨喽你好"
      // },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)//打印到控制台
        var list = res.data.list;
        if (list == null) {
          var toastText = '数据获取失败';
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            list: list
          })
        }
      }
    })
  }

})
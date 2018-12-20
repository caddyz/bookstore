// pages/person/person.js
var app = getApp()
var utils=require("../../utils/util.js");
Page({
  data: {
    user:{},
    userInfo: '',
    username:'',
    motto: 'Hello World',
    list:'',
    newAddress:'',
    first:false,
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
  //页面加载函数
      onShow:function(){
      var that=this;
      let info = app.globalData.userInfo;
      console.log("info:" + JSON.stringify(info));

    
          if (this.data.first == false) {
            // console.log("=============================================")
            //验证用户是否登录
            if (app.globalData.userInfo != null) {
              utils.getAllCarts(app.globalData.userInfo.userId);//如果用户登录状态从数据库中获取购物车商品信息
              this.setData({
                first: true
              })
            }
          }
        
       
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
          userId:app.globalData.userInfo.userId,
          user: app.globalData.userInfo
        })
      }
    },
//跳转到相应的订单状态栏
  toOrderStatus:function(e){
    var orderType =null;
    // console.log("状态：" + e.currentTarget.dataset.typeid);
    orderType = e.currentTarget.dataset.typeid
    wx.navigateTo({
      url: '../person/order/order?orderType=' + orderType
    })
  },
  //事件处理函数
  toOrder: function () {
    wx.navigateTo({
      url: '../person/order/order?orderType='+3
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
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  quit:function(){
    wx.showModal({
      title: '提示',
      content: '是否退出？',
      success: function (res) {
        if(res.confirm){
          app.globalData.userInfo = null;
          wx.switchTab({
            url: '/pages/index/index',
          })
        }else{
          return;
        }

      }

    })
  
  }
})
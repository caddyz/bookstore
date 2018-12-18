// pages/person/person.js
var app = getApp()
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
            console.log("=============================================")
            //验证用户是否登录
            if (app.globalData.userInfo != null) {
              this.getAllCarts(app.globalData.userInfo.userId);//如果用户登录状态从数据库中获取购物车商品信息
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
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //从数据库中获取购物车的数据
  getAllCarts: function (userId) {
    var that = this
    var cart = wx.getStorageSync("carts")||[];
    console.log("userId=================" + userId);
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/selectCart/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {
          if(cart.length>0){
            //缓存和数据库中都有数据
            for (var i in res.data) {
              for (var j in cart) {
                if (res.data[i].bookId != cart[j].bookId) {
                  cart = cart.concat(res.data[i]);
                }
              }
            }
          }else{
            //缓存中没有数据而数据库中有
            cart=res.data;
          }

          console.log("加入购物车的" + JSON.stringify(cart));
          //存入缓存
          wx.setStorage({
            key: 'carts',
            data: cart,
          })
          that.onShow();
          console.log(that.data.cart)
        } else {

          //数据库中没有数据
          that.setData({
            cart: cart
          })
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    })
  }
})
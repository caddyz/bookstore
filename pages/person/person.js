// pages/person/person.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    username:'',//用户名
    userId:'',//用户id
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

  onLoad: function (options) {  
    
  },
  // onLoad:function(){
    
  //   wx.navigateTo({
  //     url: '/pages/login/login',
  //     success:function(res){
      
  //     }
  //   });
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
          userId:app.globalData.userInfo.id
        })
      }
    },
  // },
  // onShow:function(){
  //   wx.checkSession({
  //     success: function () {
  //       //session_key 未过期，并且在本生命周期一直有效
  //       return;
  //     },
  //     fail: function () {
  //       // session_key 已经失效，需要重新执行登录流程
  //       wx.navigateTo({
  //         url: "/pages/login/login"
  //       })
  //     }
  //   })    
  // },
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
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
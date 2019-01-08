// pages/person/editorMyPassword/editorMyPassword.js
var app=getApp();
var utils=require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userPassword:null //用户的原始密码的获取
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserPassword();//获取用户的原始密码
  },
 submitPassword:function(e){
   var that=this;
   var oldPossword = e.detail.value.oldPossword;
   var newPossword = e.detail.value.newPossword;
   var userPassword = this.data.userPassword;//获取用户的原始密码
   //原始密码验证
   if (oldPossword != '' || null) {
     if (Number(oldPossword) == Number(userPassword)) {
       that.editorUserPassword(newPossword)//修改用户数据库中的密码
     } else {
       wx.showToast({
         title: '原始密码有误！',
         duration: 3000,
       })
       return;
     }
   } else {
     user.password = app.globalData.userInfo.password;
   }
 },
  //修改数据库中用户密码的方法
  editorUserPassword: function (password) {
    var that = this;
    var userId=app.globalData.userInfo.userId;
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/editorUserPassword/' + userId + '/' + password, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data == true) {
          wx.showToast({
            title: '修改成功！',
            duration: 3000
          })
          wx.navigateBack();
        } else {
          wx.showToast({
            title: '修改失败！',
            duration: 3000
          })

        }
        // console.log("我获取的默认收货地址：" + that.data.sendWay)
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    })
  },

  //获取数据库中用户密码的方法
  getUserPassword: function (password) {
    var that = this;
    var userId = app.globalData.userInfo.userId;
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/getUserPassword/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data !=null) {
          that.setData({
            userPassword: res.data
          })
      
        } else {
          wx.showToast({
            title: '修改失败！',
            duration: 3000
          })

        }
        // console.log("我获取的默认收货地址：" + that.data.sendWay)
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
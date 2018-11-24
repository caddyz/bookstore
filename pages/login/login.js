// pages/person/person.js
Page({
  //定义全局变量data
  data: {
    username: '',
    password: '',
    message: ""
  },

  // 获取输入账号 
  usernameinput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 获取输入密码 
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //点击登陆的时候触发的事件
  signin: function () {
    var that = this;
    //登陆的时候要传过来的参数
    var username = that.data.username
    var password = that.data.password
    if (that.data.username == "") {
      wx.showModal({
        title: "信息提示",
        content: "用户名不能为空!"
      })
    } else if (that.data.password == "") {
      wx.showModal({
        title: "信息提示",
        content: "请输入密码!"
      })
    }
    console.log("用户名：" + username + "密码：" + password)
    //发送ajax请求到服务器-登录
    wx.request({
      //开发者服务器接口地址
      url: 'http://localhost:8080/webFront/login',
      //请求的参数
      data: {
        username:username,
        password:password,
      },
      //设置请求的 header
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',//定义传到后台接受的是post方法还是get方法
      dataType: 'json', // 默认值json
      success: function (res) {  // 服务器响应成功的回调函数
        //调试，相当于alert
        // console.log("成功")
        if (res.data.message == "ok") {
          // 点击确定后跳转登录页面并关闭当前页面
          wx.redirectTo({
            //成功后跳转的路径
            url: '../index/index'
          })
        
        } else {
          //显示消息提示框
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
        
      },
      complete: function (res) {
        
      },
    })
  },
  //点击注册的时候触发的事件
  register: function () {
    wx.navigateTo({
      url: "../register/register"
    })
  },
  //点击找回密码的时候触发的事件
  retrieve: function () {
    wx.navigateTo({
      url: "../retrieve/retrieve"
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
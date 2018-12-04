// pages/login/login.js
//var util = require('../../utils/util.js')
Page({
  //定义全局变量data
  data: {
    phone: '',
    password: '',
    message:''
  },

  //从页面获取输入账号 
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value,
      
    })
  },

  // 获取输入密码 
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  //点击登陆的时候触发的事件
  login: function () {
    var that = this;
    //登陆的时候要传过来的参数
    var phone = that.data.phone
    var password = that.data.password
    if (this.data.phone=="") {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        //延迟时间
        //duration: 1000,
      })
    }else if(this.data.password==""){
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        //延迟时间
        //duration: 1000,
      })
      
    }else{
    console.log("用户名：" + phone + "，密码：" + password)
    //发送ajax请求到服务器-登录
    wx.request({
      //开发者服务器接口地址
      url: 'http://localhost:8080/bookstore-mall/' + phone + '/' + password + '/findUser',
      //请求的参数
      data: {
       phone:phone,
        password:password,
      },
      //设置请求的 header
      header: {
        //'content-type': 'application/x-www-form-urlencoded' // post默认值
        'Content-Type': 'application/json'
      },
      method: 'GET',//定义传到后台接受的是post方法还是get方法
      dataType: 'json', // 默认值json
      success: function (res) {  // 服务器响应成功的回调函数
        //调试，相当于alert
        //console.log("成功")
        if (res.statusCode === 200) {
          // //存入缓存
          // wx.setStorage({
          //   key: phone,
          // data: res.data.phone
          // })
          // 点击确定后跳转登录页面并关闭当前页面
          wx.switchTab({
            //成功后跳转的路径
            url: '/pages/index/index'
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
    }
  },
  //点击注册的时候触发的事件
  register: function () {
    wx.navigateTo({
      url: "/pages/login/register/register"
    })
  },
  //点击找回密码的时候触发的事件
  retrieve: function () {
    wx.navigateTo({
      url: "/pages/login/retrieve/retrieve"
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
  },

  onload: function (options) {
    // 生命周期回调—监听页面加载
  }
})
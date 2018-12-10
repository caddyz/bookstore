// pages/login/login.js
//var util = require('../../utils/util.js')
var app=getApp();
Page({
  //定义全局变量data
  data: {
    phone: '',
    password: '',
    userInfo:'',
    message:''
  },
  // onLoad: function (options) {
  //   //获取缓存的信息
  //   var phone = wx.getStorageSync("phone")
  //   var password = wx.getStorageSync("password")

  //   //判断用户名是否为null,如果为null,默认显示'请输入用户名'
  //   if (phone == null) {
  //     phone = '请输入用户名'
  //   }
  //   //判断密码是否为null,如果为null,默认显示'请输入密码'
  //   if (password == null) {
  //     password = '请输入密码'
  //   }
  //   this.setData({
  //     phone: phone,
  //     password: password
  //   })
  // },
  //从页面获取输入账号 
  phoneinput: function (e) {
    var user=this.data.user;
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
    if (that.data.phone=="") {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        //延迟时间
        //duration: 1000,
      })
      return
    } 
    if (that.data.password==""){
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        //延迟时间
        //duration: 1000,
      })
      return
    }
    console.log("用户名：" + phone + "，密码：" + password)
    //发送ajax请求到服务器-登录
    wx.request({
      //开发者服务器接口地址
      url: 'http://localhost:8080/bookstore-mall/' + phone + '/' + password + '/findUser',
      //请求的参数
      data: {
        phone:phone,
        password:password
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
        if (res.statusCode === 200) {
          //将用户名和密码缓存下来,留着实现不用重复登录  
          //  wx.setStorageSync("phone", that.data.phone)
          //  wx.setStorageSync("password", that.data.password)
          // 点击确定后跳转登录页面并关闭当前页面
          // wx.switchTab({
          //   //成功后跳转的路径
          //   url: '/pages/index/index',
          // })        
          //console.log("成功")
          // 用于点击后改变页面信息或者刷新后与后台交互获取最新的信息
          that.setData({
            userInfo: res.data
          });
          //信息正确,给userInfo赋值        
          console.log("userInfo"+that.data.userInfo.username);
          app.globalData.userInfo = that.data.userInfo;
          console.log("用户名" + app.globalData.userInfo.username);
          //返回上一页 上一页的跳转只能用wx.navigateTo
          wx.navigateBack({
            delta: 1
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
        wx.showModal({
          title: '提示',
          content: '调用API失败',
          showCancel: false
        })
        //console.log("调用API失败");
        
      },
      complete: function (res) {
        
      },
    })

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
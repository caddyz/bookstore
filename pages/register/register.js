// pages/register/register.js
Page({
  data: {
    username: "",
    password: "",
    passwordconfirm: ""

  },
  usernameinput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  passwordinput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  passwordconfirminput: function (e) {
    this.setData({
      passwordconfirm: e.detail.value
    })
  },
  signin: function () {
    var that = this;
    //请求的时候需要提交的参数
    var name = that.data.username
    var pwd = that.data.password
    // console.log("js中收到的用户名："+name+"，密码："+pwd)
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
    } else if (that.data.passwordconfirm == "") {
      wx.showModal({
        title: "信息提示",
        content: "请确认密码!"
      })
    } else if (that.data.passwordconfirm != that.data.password) {
      wx.showModal({
        title: "信息提示",
        content: "两次密码输入不一致!"
      })
    }
    //发送ajax请求将用户注册信息传递过去进行注册
    wx.request({
      url: 'http:localhost:8080/front/register',//后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      data: {
        name: name,
        pwd: pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: "POST",
      dataType: "json",
      success: function (res) {
        console.log("成功")
        console.log("响应的数据" + res.data)
        if (res.name == username) {
         wx.showModal({
        title: "信息提示",
         content: "该用户名已被注册"
         })
         } else {
        wx.showModal({
         title: "信息提示",
         content: "注册成功"
         }),
          // 点击确定后跳转登录页面并关闭当前页面
          wx.redirectTo({
            //成功后跳转的路径
            url: '../person/person'
          })
         }
      },
      fail: function (res) {
        wx: wx.showToast({
          title: '服务器网络错误,请稍后重试',

          icon: 'loading',
          duration: 1500,
        })
      },
      complete: function (res) {

      }
    })
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
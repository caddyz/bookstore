var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: '', 
    username: '',
    password: '',
    passwordAgain: '',
   // success: false,
    status:''
  },
  /**
    *
    */
  // return_login: function (e) {
  //   wx.navigateTo({
  //     url: '/pages/login/login',
  //   })
  // },
  //邮箱账号
  handleInputEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  //用户名
  handleNewName: function (e) {
    console.log(e);
    this.setData({
      username: e.detail.value
    })
  },
  //密码
  handleNewChanges: function (e) {
    console.log(e);
    this.setData({
     password: e.detail.value
    })
  },
  //确认密码
  handleNewChangesAgain: function (e) {
    console.log(e);
    this.setData({
     passwordAgain: e.detail.value
    })
  },
  submit: function (e) {
    var that = this
    var passwordAgain = that.data.passwordAgain;
    var username = that.data.username;
    var password = that.data.password
    var email=that.data.email
    if(that.data.email==""){
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
      return
    }else if (this.data.password == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.passwordAgain != this.data.password) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      wx.request({
        url: app.URL + 'bookstore-mall/' + email +'/'+username+ '/searchPhone',
        method: "GET",
        data: {
          email: email,
          username:username
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          //console.log("邮箱状态：" + JSON.stringify(res.data))
          if (res.data.status == false) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
          }
        }
      })
    }
      wx.request({
        url: app.URL +'bookstore-mall/' + email + '/' + username + '/' + password + '/searchUser',
        method: "GET",
        data: {
          email: email,
          username:username,
          password: that.data.password
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          if(res.data.status==true){
          wx.showToast({
            title: '注册成功~',
            icon: 'loading',
            duration: 2000
          })
            wx.navigateTo({
              url: '/pages/login/login',
            })
        }else{
          wx.showModal({
            title: '提示',
            content: '用户名已存在',
          })
        }
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
  
// pages/retrieve/retrieve.js
const app = getApp();
//倒计时
function countdown(that) {
  var second = that.data.second
  if (second == 0) {
    that.setData({
      disabled: true //只要点击了按钮就让按钮禁用
    });
    return;
  }
  var time = setTimeout(function () {
    that.setData({
      second: second - 1
    });
    countdown(that);
  }
    , 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: null,
    form_index: 0,
    second: 30,
    disabled: false,
    mask: true
  },
  switchChange: function (e) {
    // console.log(e.detail.value)
    this.setData({ mask: !e.detail.value })
  },
  submit_email: function (e) {
    // console.log(e);
    var username = e.detail.value.username;
    var email = e.detail.value.email;
    if (email == null || email == '') {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http:localhost:8080/API/login',//接口
      method: 'POST',
      data: {
        username: username,
        email: email
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res.data);
        if (res.data.error) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        } else {
          this.setData({ username: username, second: res.data.expire });
          countdown(this);
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            this.setData({ form_index: 1 });
          }, 2000)
        }
      }
    })

  },
  //重设密码
  submit_password: function (e) {
    // console.log(e);
    var password = e.detail.value.password;
    var validcode = e.detail.value.validcode;
    if (validcode == '' || validcode == null || password == '' || password == null) {
      wx.showToast({
        title: '验证码和密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url:'http:localhost:8080/API/login1',//接口
        method: 'POST',
        data: {
          username: this.data.username,
          password: password,
          validcode: validcode
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          // wx.hideLoading();
          console.log(res.data);
          if (res.data.error) {
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
            // 点击确定后跳转登录页面并关闭当前页面
            wx.redirectTo({
              //成功后跳转的路径
              url: '../person/person'
            })
          }
        }
      })
    }
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

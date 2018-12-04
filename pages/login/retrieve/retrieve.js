// pages/retrieve/retrieve.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    phone: '', //获取到的手机栏中的值
    VerificationCode: '',
    code:'',
    newPassword: '',
    success: false,
    state: ''
  },
  /**
     * 获取验证码
     */
    //返回登陆页面
  return_login: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  inputPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  varCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
    })
  },
  newPssword: function (e) {
    console.log(e);
    this.setData({
      userPssword: e.detail.value
    })
  },
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    var phone = that.data.phone;
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/' + phone + '/updatePhone', //后端判断是否已被注册
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          state: res.data
        })
        if (phone == '') {
          warn = "号码不能为空";
        } else if (phone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone)) {
          warn = "手机号格式不正确";
        } //手机号已被注册提示信息
        else if (that.data.state == 0) {  //判断是否被注册
          warn = "手机号未注册";

        }else {
          wx.request({
            url: 'http://localhost:8080/bookstore-mall/code', //填写发送验证码接口
            method: "GET",
            data: {
              phone: that.data.phone
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                VerificationCode: res.data.verifycode
              })


              //当手机号正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 2000
              });
              //设置一分钟的倒计时
              var interval = setInterval(function () {
                currentTime--; //每执行一次让倒计时秒数减一
                that.setData({
                  text: currentTime + 's', //按钮文字变成倒计时对应秒数

                })
                //如果当秒数小于等于0时 停止计时器 且按钮文字变成重新发送 且按钮变成可用状态 倒计时的秒数也要恢复成默认秒数 即让获取验证码的按钮恢复到初始化状态只改变按钮文字
                if (currentTime <= 0) {
                  clearInterval(interval)
                  that.setData({
                    text: '重新发送',
                    currentTime: 61,
                    disabled: false,
                    color: '#33FF99'
                  })
                }
              }, 1000);
            }
          })
        };
        //判断 当提示错误信息文字不为空 即手机号输入有问题时提示用户错误信息 并且提示完之后一定要让按钮为可用状态 因为点击按钮时设置了只要点击了按钮就让按钮禁用的情况
        if (warn != null) {
          wx.showModal({
            title: '提示',
            content: warn
          })
          that.setData({
            disabled: false,
            color: '#33FF99'
          })
          return;
        }
      }

    })
  },
  //重设密码
  submit_password: function (e) {
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.Code != this.data.VerificationCode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.newPassword == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      var that = this
      var phone = that.data.phone;
      var newPassword=that.data.newPassword
      wx.request({
        url: 'http://localhost:8080/bookstore-mall/'+ phone + ' /' + newPassword + '/updateUser',
        method: "GET",
        data: {
          phone: phone,
          newPassword: newPassword
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功~',
            icon: 'loading',
            duration: 2000
          })
          console.log(res)
          that.setData({
            success: true
          })
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

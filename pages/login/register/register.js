Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    email: '', //获取到的手机栏中的值
    //VerificationCode: '',
    Code: '',
    username: '',
    password: '',
    passwordAgain: '',
    success: false,
    state: ''
  },
  /**
    * 获取验证码
    */
  return_login: function (e) {
    wx.navigateTo({
      url: '/pages/login/login',
    })

  },
  //手机号
  handleInputEmail: function (e) {
    this.setData({
      email: e.detail.value
    })
  },
  //验证码
  handleVerificationCode: function (e) {
    console.log(e);
    this.setData({
      Code: e.detail.value
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
  //点击获取验证码触发的事件
  doGetCode: function () {
    var that = this;
    that.setData({
      disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
      color: '#ccc',
    })
    var username=that.data.username;
    var email = that.data.email;
    var currentTime = that.data.currentTime //把邮箱验证码跟倒计时值变例成js值
    var warn = null; //warn为当手机号为空或格式不正确时提示用户的文字，默认为空
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/' + email + '/' + username + '/searchPhone', //后端判断是否已被注册， 已被注册返回1 ，未被注册返回0
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          state: res.data
        })
        if(username==''){
          wx.showToast({
            title: '用户名不能为空',
            icon: 'none',
            duration: 2000
          })
        }else if(that.data.state==1){
          wx.showToast({
            title: '用户名已被注册',
            icon: 'none',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '正确',
            duration: 2000
          })
        }
        if (email == '') {
          warn = "邮箱不能为空";
        } else if (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email)) {
          warn = "邮箱格式不正确";
        } //邮箱已被注册提示信息
        else if (that.data.state == 1) {  //判断是否被注册
          warn = "邮箱已被注册";

        }
        else {
          wx.request({
            url: 'http://localhost:8080/bookstore-mall/'+code+'/codeNum', //填写发送验证码接口
            method: "GET",
            data: {
              email: that.data.email,
              code: that.data.code
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                code: res.data.code
              })


              //当邮箱正确的时候提示用户短信验证码已经发送
              wx.showToast({
                title: '短信验证码已发送',
                icon: 'none',
                duration: 1000
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
  submit: function (e) {
    var that = this
    if (this.data.Code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    // } else if (this.data.Code != this.data.VerificationCode) {
    //   wx.showToast({
    //     title: '验证码错误',
    //     icon: 'none',     
    //     duration: 2000
    //   })
    //   return
    } else if (this.data.username ==" ") {
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
      var that = this
      var email = that.data.email;
      var username=that.data.username
      wx.request({
        url: 'http://localhost:8080/bookstore-mall/' + email + '/' + username + '/' + password + '/searchUser',
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
  
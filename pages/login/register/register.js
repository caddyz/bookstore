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
    show_row:true,
    show_row1:false,
    show_row2: false,
    one:true,
    two:false,
    success:false
    
    
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
    this.setData({
      username: e.detail.value
    })
  },
  //密码
  handleNewChanges: function (e) {
    this.setData({
     password: e.detail.value
    })
  },
  //确认密码
  handleNewChangesAgain: function (e) {
    this.setData({
     passwordAgain: e.detail.value
    })
  },

//输入邮箱触发的事件
  next:function(){
    var that=this;
    var email=that.data.email
    if (that.data.email == '' || that.data.email == null){
      wx.showToast({
        title: '请输入邮箱',
        icon:'none',
        duration:2000
      })
      //判断邮箱格式
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.email))){
      wx.showToast({
        title: '邮箱格式不正确',
        icon: 'none',
        duration: 2000
      })
     }else{
       //输入之后的请求
      wx.request({
        url: app.URL + 'bookstore-mall/' + email + '/searchEmail',
        method: "GET",
        data: {
          email: email

        },
        header: {
          'Content-Type': 'application/json'
        },
        //接口调用成功之后的回调函数
        success: function (res) {
          //邮箱是否注册，已注册提示用户邮箱也被注册，没注册则下一步
          if (res.data.status == true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'success',
            //   duration: 2000
            // })
            that.setData({
              show_row: false,one:false, show_row1: true,two:true, show_row2: false
            })
          }
        }
      })
    }
  },
  //输入用户名触发的事件
  next1:function(){
    var that = this;
    var username = that.data.username
    if(username==""||username==null){
      wx.showToast({
        title: '请输入用户名',
        icon:'none',
        duration:2000
      })
    }else{
      wx.request({
        url: app.URL + 'bookstore-mall/' + username + '/searchName',
        method: "GET",
        data: {
          username: username
        },
        header: {
          'Content-Type': 'application/json'
        },
//接口调用成功之后的回调函数
        success: function (res) {
            //用户名是否注册，已注册提示用户用户名也被注册，没注册则下一步
          if (res.data.status == true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          } else {
            // wx.showToast({
            //   title: res.data.msg,
            //   icon: 'success',
            //   duration: 2000
            // })
            that.setData({
              show_row: false, show_row1: false, show_row2: true,success:true,two:false
            })
          }
        }
      })
    }
  },
  //点击提交触发的事件
  submit: function (e) {
    var that = this
    var passwordAgain = that.data.passwordAgain;
    var username = that.data.username;
    var password = that.data.password;
    var email=that.data.email;
    if (this.data.password == '') {
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
        url: app.URL + 'bookstore-mall/' + email + '/' + username + '/' + password + '/searchUser',
        method: "GET",
        data: {
          email: email,
          username: username,
          password: that.data.password
        },
        header: {
          'Content-Type': 'application/json'
        },
        //接口调用成功之后的回调函数
        success: function (res) {
          //console.log("数据："+res.data)
          //注册成功后跳转
          if (res.data.status == true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',                                    
            })
            //注册成功后跳转的延时
            setTimeout(function(){
                wx.navigateBack({
                  delta: 1
                })
            },1000)
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
    // var that = this
    // //判断页面栈里面的页面数是否大于2
    // if (getCurrentPages.length > 2) {
    //   //获取页面栈
    //   let pages = getCurrentPages()
    //   //给上一个页面设置状态
    //   let curPage = pages[pages.length - 2];
    //   let data = curPage.data;
    //   curPage.setData({ 'goBack': true });
    // } 
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
  
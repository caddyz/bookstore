// pages/retrieve/retrieve.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    email:'',
    newPassword:'',
    againNewPassword:'',
    // mask:true,
    show_content: true,
    show_content2: false
  },

  inputEmail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  inputPassword:function(e){
    this.setData({
      newPassword:e.detail.value
    })
  },
  inputNewPassword: function (e) {
    this.setData({
      againNewPassword: e.detail.value
    })
  },
  next: function () {
    // console.log(e.detail.value);
    var that=this;
    var re = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');; 
    var email=that.data.email
    if (that.data.email == '' || that.data.email == null) {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if(re.test(email)){
      wx.showToast({
        title: '邮箱格式不正确',
        icon:"none",
        duration:2000
      })
    }else {
      console.log("email:"+email)
      wx.request({
        url: app.URL + 'bookstore-mall/' + email +  '/updatePhone',
        data: {
          email: email
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res.data);
          if (res.data.status==false) {
            wx.showModal({
              title: '提示',
              content: '邮箱未被注册',
            })
            return
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000
            })
            that.setData({
              show_content: false, show_content2: true,
              email:email
            })
          }
        }
      })

    }
  },

  // switchChange: function (e) {
  //   // console.log(e.detail.value)
  //   this.setData({ mask: !e.detail.value })
  // },

  submit: function (e) {
    var that=this;
    var email=that.data.email;
    var newPassword =that.data.newPassword;
    var againNewPassword = that.data.againNewPassword
    if (newPassword == '' || newPassword == null) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.againNewPassword != this.data.newPassword) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 2000
      })
      return
    } else {
      wx.request({
        url: app.URL + 'bookstore-mall/' + email + '/'+newPassword +'/updateUser',
        method: 'GET',
        data: {
          email:email,
          newPassword: newPassword

        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          //console.log(res.data);
          if (res.data.status==true) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',
              duration: 2000,
              success:function(res){
                wx.navigateBack({
                  delta:1
                })
              }
            }) 
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
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

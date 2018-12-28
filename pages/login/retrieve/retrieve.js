// pages/retrieve/retrieve.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    text: '获取验证码', //按钮文字
    currentTime: 61, //倒计时
    disabled: false, //按钮是否禁用
    num:0,
    email:'',
    code:'',
    newPassword:'',
    againNewPassword:'',
    // mask:true,
    show_content: true,
    show_content2: false,
    one:true,
    success:false
    
  },
//从页面获取输入的邮箱
  inputEmail:function(e){
    this.setData({
      email:e.detail.value
    })
  },
  //从页面获取输入的原密码
  inputOldPassword:function(e){
    this.setData({
      code:e.detail.value
    })
  },
  //从页面获取输入的新密码
  inputPassword:function(e){
    this.setData({
      newPassword:e.detail.value
    })
  },
  //从页面获取第二次输入的新密码
  inputNewPassword: function (e) {
    this.setData({
      againNewPassword: e.detail.value
    })
  },
  //点击输入邮箱触发的事件
  doGetCode: function () {
    // console.log(e.detail.value);
    var that=this;
    var email=that.data.email
    var num = Math.floor((Math.random() * 9 + 1) * 100000);
    //console.log("num:"+num)
    that.setData({
      num:num
    })
    var currentTime = that.data.currentTime //把手机号跟倒计时值变例成js值
    if (that.data.email == '' || that.data.email == null) {
      wx.showToast({
        title: '邮箱不能为空',
        icon: 'none',
        duration: 1000
      })
      return
      //判断邮箱格式
    } else if(!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.email))){
      wx.showToast({
        title: '邮箱格式不正确',
        icon:"none",
        duration:2000
      })
    }else {
      //console.log("email:"+email)
      wx.request({
        url: app.URL + 'bookstore-mall/' + email +'/'+ num +  '/updatePhone',
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
              title: '邮件已发送',
              icon: 'success',
              duration: 2000
            })
            that.setData({
           disabled: true, //只要点击了按钮就让按钮禁用 （避免正常情况下多次触发定时器事件）
              color: '#ccc',
            })
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
        }
      })

    }
  },
  next: function () {
    var that = this;
    var code = that.data.code;
    //console.log("num:" + num)
    if (code == "" || code== null) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return
    } else if (this.data.num!=that.data.code){
            wx.showToast({
              title: "验证码输入错误",
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
              show_content: false, one:false, show_content2: true,success:true
            })
          }
  },

//点击提交触发的事件
  submit: function (e) {
    var that=this;
    var email=that.data.email;
    var password=that.data.password;
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
          if (res.data.status) {
            wx.showToast({
              title: res.data.msg,
              icon: 'success',            
            }) 
            //成功后的延时
            setTimeout(function(){
                wx.navigateBack({
                  delta:1
                })
            },1000)
          } else {
            wx.showToast({
              title: "修改失败",
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

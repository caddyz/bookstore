// pages/userInfomation/userInfomation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"你好我是用户信息界面",
    tempFilePaths: '',
    nickName: '',
    userInfoAvatar: '',
    sex: '',
    age:'23',
    userLevel:'2',
    balance:'123',
    score:'12345',
    mobile:'123456789',
    email:'1234568@163.com',
    signature:'书中自有黄金屋。',
    province: '',
    city: '',
    county:'',
    sex:'男',
 
  },

  // chooseimage: function () {
  //   var _this = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       _this.setData({
  //         userInfoAvatar: res.tempFilePaths
  //       })
  //     },
  //     radioChange: function (e) {
  //       console.log('radio发生change事件，携带value值为：', e.detail.value)
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })
        switch (res.userInfo.gender) {
          case 0:
            that.setData({
              sex: '未知'
            })
            break;
          case 1:
            that.setData({
              sex: '男'
            })
            break;
          case 2:
            that.setData({
              sex: '女'
            })
            break;
        }
      },
      fail: function () {
        // fail
        console.log("获取失败！")
      },
      complete: function () {
        // complete
        console.log("获取用户信息完成！")
        console.log(this.province)
      }
    })
  
  },
  //用户信息修改跳转函数
  toEditor:function(){
    var that=this
    var user={
      nickName:that.data.nickName,
      sex: that.data.sex,
      age: that.data.age,
      mobile: that.data.mobile,
      email: that.data.email,
      signature: that.data.signature,
      region: [that.data.province, that.data.city, that.data.county],
      sex: that.sex,
    }
    wx.setStorage({
      key: "user",
      data: user
    })
    wx.navigateTo({
      url: '../editorUserInfomation/editorUserInfomation',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
    
    this.setData({
      message:"你好！这是刷新后的我"
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      message: "你好！上拉后的我"
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
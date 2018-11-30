// pages/person/orderDetail/orderDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oderDetail:
      { 
        expressId: '123456',
        express: '顺丰快递',
        logisticsStartues:'已收货',

        receiveAddressId:'001',
        receiveConsignee:'杨天佑',
        receiveMobile:'123456789',
        receiveProvince:'四川',
        receiveCity:'成都',
        receiveCounty:'高新区',
        receiveDetail:'不知道',
      
        orderId:'002',
        orderDate:'2016-11-03',
        orderTime:'15:30:07',
        orderStatus:'已完成',

        BookId: "004",
        imgUrl: "../orderDetail/images/history-24.jpg",
        bookName: "十字军的故事",
        bookPrice: "119.00",
        tatolPrice:"119.00",
        bookNum: '1',

        nickName:'',
        userInfoAvatar:''
      }     
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("我接收的订单id是："+options.orderId)
    var that=this;
    //获取用户的头像和昵称
    wx.getUserInfo({
      success: function (res) {
        // success
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
        })
      }
    });
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
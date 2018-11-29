// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftButton:true,
    rightButton:false,
    memberInfo:[{
      'title':'会员套餐1',
      'price':'2000.00',
      'book':'5',
    },{
        'title': '会员套餐2',
        'price': '20000.00',
        'book': '15',
    },{
        'title': '会员套餐3',
        'price': '200.00',
        'book': '2',
    }]
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

  },
  buyClick:function(){
    let that = this;
    that.setData({
      leftButton: true,
      rightButton: false
    })
  },
  recordClick: function(){ 
    let that = this;
    that.setData({
      leftButton: false,
      rightButton: true
    })
  },
  playInterface:function(){
    wx.showToast({
      title: '调用支付接口',
    })
  }
})
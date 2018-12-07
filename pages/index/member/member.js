// pages/member/member.js
const app = getApp();
var pay = require('../../../utils/pay.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftButton:true,
    rightButton:false,
    memberInfo:[],
    recordList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/allmember',
      success:function(res){
        that.setData({
          memberInfo: res.data
        })
      }
    })
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/memberrecord/1',
      success: function (res) {
        that.setData({
          recordList: res.data
        })
      }
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
  playInterface:function(e){
    let that = this;
    let m = e.currentTarget.dataset.item;
    app.orderInfo.total_fee = m.memberMoney;
    app.orderInfo.body = '会员支付'; 
    app.orderInfo.detail = '购买会员服务';
    app.orderInfo.out_trade_no = Date.parse(new Date()); 
    // console.log(app.orderInfo)
    pay.oreder(app.orderInfo,function(data){
      wx.showToast({
        title: data.return_msg,
        icon:'none'
      })
    })
    // wx.showModal({
    //   title: '会员支付',
    //   content: '确认支付' + m.memberMoney+'元',
    //   success(res) {    
    //     if (res.confirm) {
    //       wx.request({
    //         url: 'http://localhost:8080/bookstore-mall/memberpay/1/' + m.memberId,
    //         success:function(res){
    //           wx.showToast({
    //             title: res.data.msg,
    //             icon:'none'
    //           })
    //         }
    //       })
    //     } else if (res.cancel) {
    //       wx.showToast({
    //         title: '取消支付',
    //         icon:'none'
    //       })
    //     }
    //   }
    // })
  }
})
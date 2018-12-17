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
      url: app.URL +'bookstore-mall/allmember',
      success:function(res){
        that.setData({
          memberInfo: res.data
        })
      }
    })
    wx.request({
      url: app.URL + 'bookstore-mall/memberrecord/' + app.globalData.userInfo.userId,
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
    pay.payOreder(app.orderInfo,function(data){
      if (data.return_code == 'SUCCESS' && data.result_code == 'SUCCESS') { //判断是否有效
        console.log("nonceStr:"+data.nonce_str)
        console.log("package:" + data.prepay_id)
        console.log("paySign:" + data.sign)
        wx.requestPayment({
          timeStamp: Date.parse(new Date()) / 1000,
          nonceStr: data.nonce_str,
          package: data.prepay_id,
          signType: 'MD5',
          paySign: data.sign,
          success(res) {
            wx.request({
              url: app.URL + 'bookstore-mall/memberpay/' + app.globalData.userInfo.userId + '/' +                   m.memberId,
              success(res){
                wx.showToast({
                  title: res.data.msg,
                  icon:'none'
                })
              },
              fail(){
                wx.showToast({
                  title: '购买请求失败',
                  icon:'none'
                })
              }
            })
          },
          fail() {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      } else {
        wx.showToast({
          title: data.return_msg,
          icon: 'none',
          duration: 500
        })
      }     
    })
  }
})
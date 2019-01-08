// pages/cart/payment/payment.js
var app = getApp()
var utils = require("../../../utils/util.js");
var pay = require("../../../utils/pay.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentList: [{
      index: 0,
      name: '微信付款',
      selected: true,
      imgUrl: '../payment/images/wechat.png',
      payMeth: 3
    },
    {
      index: 1,
      name: '余额付款',
      selected: false,
      imgUrl: '../payment/images/creditCard.png',
      payMeth: 1
    }
    ],
 realPayPrice:'',
orderId:'',
payMeth:0 //付款方式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var realPayPrice = options.realPayPrice; 
    console.log("获得的订单价格：" + JSON.stringify(realPayPrice)) ;
    that.setData({
      realPayPrice: realPayPrice,
      orderId: options.orderId
    })
  },

//发起支付显示支付密码输入弹框
  pay: function () {
    this.setData({
      isPay: true
    })
  },

  modalConfirm: function (data) {
    console.log("获得的密码" + JSON.stringify(data.detail))
    if (Number(data.detail)==123456){
    this.yuezhifu();//余额支付
    }else{
      // 模态交互效果
      wx.showToast({
        title: '您的密码有误！',
        icon: 'fail',
        duration: 2000
      })
    }
   
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
  changePayment: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index;
    var selected = e.currentTarget.dataset.selected;
    var paymentList = this.data.paymentList;
    if (!selected) {
      paymentList.forEach(function (item, key) {
        if (index == key) {
          item.selected = true
          that.data.payMeth = item.payMeth
        } else {
          item.selected = false;
        }
      })
      this.setData({
        paymentList: paymentList
      })
    }
  },

  //支付订单
  payNow:function(){
    var realPayPrice = this.data.realPayPrice
    var that=this;
    console.log("获得的支付方式：" + that.data.payMeth)
  var orderInfo = {
    body: '书本购买',
    detail: '买了4本书！',
    out_trade_no: this.data.orderId,
    total_fee: realPayPrice,
    spbill_create_ip: app.orderInfo.spbill_create_ip,
    openid: app.orderInfo.openid,

  }
    if (that.data.orderId != null && that.data.payMeth == 0) {
    //支付接口
    pay.payOreder(orderInfo, function (data) {
      if (data.return_code == 'SUCCESS' && data.result_code == 'SUCCESS') {  
        console.log("返回的东西：" + JSON.stringify(data));
        // //发起微信支付
        //   wx.requestPayment({
        //        timeStamp: Date.parse(new Date()) / 1000,
        //        nonceStr: data.nonce_str,
        //        package: data.prepay_id,
        //        signType: 'MD5',
        //        paySign: data.sign,
        //       'success': function (res) {
        //       wx.showToast({
        //     title: '支付成功！',
        //     duration: 3000
        //  })
        //     },
        //     'fail': function (res) {
        //       wx.showModal({
        //         title: "提示",
        //         content: "支付失败",
        //         showCancel: false,
        //         success: function () { }
        //       })
        //     }
        //   })
      
        that.updateUserCoupons(app.globalData.userInfo.userId, couponId, utils.formatTime(new Date()))//用户使用优惠券后改变数据库中优惠券的状态(用户id，优惠券id，优惠券使用时间)
        var score = Number(order.totalPrice) + Number(app.globalData.userInfo.score);
        app.globalData.userInfo.score = score;
        utils.addUserScore(score);//用户支付成功将积分添加到用户数据库中
        utils.updateOrder(orderId, 1);//支付成功修改订单状态为待发货
        wx.navigateBack({
          delta: 2 //返回到购物车界面
        })
      } else {
        if (data == 'NOTENOUGH') {
          wx.showToast({
            title: '您的余额不足！',
            duration: 3000
          })
        }
      }

    })
  }

  //用户余额支付
    if (that.data.orderId != null && that.data.payMeth == 1) {
      this.pay();
    }
},
//余额支付修改数据库余额的方法
  yuezhifu:function(){
    var orderId=this.data.orderId;
    var realPayPrice=this.data.realPayPrice;
    var that=this;
    //获取用户的余额
    var balance = Number(app.globalData.userInfo.balance) - realPayPrice;
    if (balance < 0) {
      wx.showToast({
        title: '您的余额不足！',
        duration: 3000
      })
      return;
    }
    // 修改用户数据库中的余额
    wx.request({
      url: app.URL + 'bookstore-mall/userPay/' + app.globalData.userInfo.userId + '/' + balance, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data

        if (res.data == true) {
          // that.updateUserCoupons(app.globalData.userInfo.userId, couponId, utils.formatTime(new Date()))//用户使用优惠券后改变数据库中优惠券的状态(用户id，优惠券id，优惠券使用时间)
          var score = Number(realPayPrice) + Number(app.globalData.userInfo.score);
          app.globalData.userInfo.score = score;
          utils.addUserScore(score);//用户支付成功将积分添加到用户数据库中
          utils.updateOrder(orderId, 1);//支付成功修改订单状态为待发货
          app.globalData.userInfo.balance = balance;//

          // 模态交互效果
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })

          wx.navigateBack({
            delta: 2 //返回到购物车界面
          })
        } else {
          wx.showToast({
            title: '支付失败',
            icon:'fail',
            duration: 3000
          })
        }

      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    })

  }
})
// pages/person/orderDetail/orderDetails.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oderDetail:
      { 
        expressId: '123456',
        expressName: '顺丰快递',
        expressStatus:'已收货',

        addressId:'001',
        addressConsignee:'杨天佑',
        addressMobile:'123456789',
        addressProvince:'四川',
        addressCity:'成都',
        addressCounty:'高新区',
        addressDetail:'不知道',
      
        orderId:'002',
        orderTime:'2016-11-03 15:30:07',
        orderStatus:'已完成',

        BookId: "004",
        bookCoverImage: "../orderDetail/images/history-24.jpg",
        bookName: "十字军的故事",
        bookSalesPrice: "119.00",
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
    var orderId = options.orderId;
    console.log("我接收的订单id是：" + orderId);
    var that=this;
    that.getOrderDetails(orderId);
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

  //获取订单详情页面数据的方法
  getOrderDetails: function (orderId) {
    var that = this
    console.log("getorderId:" + orderId);
    // //数据库获取初始数据
    wx.request({
      //需要传输到后台的数据有订单的id还有用户的id
      url: app.URL + 'bookstore-mall/getOrderDetails/' + orderId +'/'+ 1, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {
          that.setData({
            oderDetail: res.data,
          })
          console.log("oderDetail:" + that.data.oderDetail);
        } else {
          that.setData({
            oderDetail: oderDetail
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
// pages/person/orderDetail/orderDetails.js

var app=getApp();
var utils=require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:'',//订单的Id
    oderDetail:{}     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = options.orderId;
    // console.log("我接收的订单id是：" + orderId);
    var that=this;
    that.getOrderDetails(orderId);
    that.setData({
      orderId: orderId
    })
  },

  //用户点击退货后执行的方法
  returnGoods:function(){
    var id = this.data.orderId;
    var oderDetail = this.data.oderDetail;
    if (oderDetail.orderStatus =='退款中'){
      wx.showToast({
        title: '商品已退款中',
        duration:2000,
      });
      return;
    };
    if (oderDetail.orderStatus == '待付款'){
      wx.showToast({
        title: '商品未付款',
        duration: 2000,
      });
      return;
    };
    wx.showModal({
      title: '提示',
      content: '是否确认退货',
      success:function(res){
        if(res.confirm){
          //改变订单状态为退款中
          // console.log("修改订单状态为退款");
          utils.updateOrder(id, 4);//改变数据库中订单的相应状态
          wx.navigateBack();//返回上一页
        }else{
          return;
        }
      }
    })
  },

  //获取订单详情页面数据的方法
  getOrderDetails: function (orderId) {
    var that = this
    // console.log("getorderId:" + orderId);
    // //数据库获取初始数据
    wx.request({
      //需要传输到后台的数据有订单的id还有用户的id
      url: app.URL + 'bookstore-mall/getOrderDetails/' + orderId + '/' + app.globalData.userInfo.userId, //提交的网络地址
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
          that.getOrderStatus();
          // console.log("oderDetail:" + JSON.stringify(res.data));
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
  },
  //订单状态的定义
getOrderStatus:function(){
  var that=this
  var order = this.data.oderDetail;

  switch (order.orderStatus) {
      case 5:
      order.orderStatus = '待评价'; 
      that.setData({
          oderDetail: order
        });
        break;
      case 0:
      order.orderStatus = '待付款';
      that.setData({
        oderDetail: order
      });
        break;
      case 1:
      order.orderStatus = '待发货';
      that.setData({
        oderDetail: order
      });
        break;
      case 2:
      order.orderStatus = '待收货';
      that.setData({
        oderDetail: order
      });
        break;
      case 3:
      order.orderStatus = '已取消';
      that.setData({
        oderDetail: order
      });
        break;
      case 4:
      order.orderStatus = '退款中';
      that.setData({
        oderDetail: order
      });
        break;
      default:
        break;
    }
  
}

})
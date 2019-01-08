var app=getApp();
var utils=require("../../../utils/util.js");
var pay=require("../../../utils/pay.js");
Page({
  data:{
    orderType:'',//查看的订单类型
    userId:'',
    order: [],//所有订单
    alreadOder:[],
    waitingPay: [],//具体商品
    waitingSend:[],
    waitingReceive: [],
    conceled: [],
    goodsRejecting: [],
    isOrder:false,//是否有订单
    goodsCount: 0, //数量

    showOrder: [], //订单类型容器
    nickName:'',
    userInfoAvatar:'',

    //点击激活颜色
    alreadOderColor:'',
    waitingPayColor:'',
    waitingSendColor:'',
    conceledColor:'',
    goodsRejectingColor:''
  },

  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
    var that = this;
    this.getUserOrder();//从数据库中获取用户订单信息
    
    var orderType = options.orderType;//获得初始点击的状态
   
    var userId = app.globalData.userInfo.userId;//获取用户Id
    that.setData({
      userId: userId,
      orderType: orderType
    })
   

  },
  //页面显示
  onShow: function () {
  var that=this;
    var orderType = this.data.orderType;
 
    if (orderType != '') {
      switch (orderType) {
        case '0':
          that.waitingPay();
          break;
        case '1':
          that.waitingSend();
          break;
        case '2':
          that.waitingReceive();
          break;
        case '3':
          that.alreadOder();
          break;
        default:
          break;
      }
    } else {
      that.alreadOder();
    }

  },
 
  //已经完成订单操作
  alreadOder:function(){
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order=[];
    order = this.data.alreadOder;
    if (order.length>0){
      this.setData({
        showOrder: order,
        alreadOderColor: 'active',
        isOrder: true
      })
    }else{
      this.setData({
        alreadOderColor: 'active',
        isOrder: false
      })
    } 
  },
  //待付款订单操作
  waitingPay:function(){
    this.clearColor();
    this.data.isOrder=false;
    var that = this;
    var order = [];
    order = this.data.waitingPay;
    if (order.length > 0) {
      this.setData({
        showOrder: order,
        waitingPayColor: 'active',
        isOrder: true
      })
    } else {
      this.setData({
        waitingPayColor: 'active',
        isOrder: false
      })
    }  
  },

  //待发货订单操作
  waitingSend: function () {
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order = [];
    order = this.data.waitingSend;
    if (order.length > 0) {
      this.setData({
        showOrder: order,
        waitingSendColor: 'active',
        isOrder: true
      })
    } else {
      this.setData({
        waitingSendColor: 'active',
        isOrder: false
      })
    }  
  },
  //待收货订单操作
  waitingReceive: function () {
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order = [];
    order = this.data.waitingReceive;
    if (order.length > 0) {
      this.setData({
        showOrder: order,
        waitingReceiveColor: 'active',
        isOrder: true
      })
    } else {
      this.setData({
        waitingReceiveColor: 'active',
        isOrder: false
      })
    } 
  },
  //取消订单查看
  conceled: function () {
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order = [];
    order = this.data.conceled;
    if (order.length > 0) {
      this.setData({
        showOrder: order,
        conceledColor: 'active',
        isOrder: true
      })
    } else {
      this.setData({
        conceledColor: 'active',
        isOrder: false
      })
    }  
  },
  //退款订单查看
  goodsRejecting: function () {
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order = [];
    order = this.data.goodsRejecting;
    if (order.length>0) {
      this.setData({
        showOrder: order,
        goodsRejectingColor: 'active',
        isOrder: true
      })
    } else {
      this.setData({
        goodsRejectingColor: 'active',
        isOrder: false
      })
    }  
  },

//清除位置颜色激活状态
 clearColor:function(){
   this.setData({
     alreadOderColor: '',
     waitingPayColor: '',
     waitingSendColor: '',
     waitingReceiveColor:'',
     conceledColor: '',
     goodsRejectingColor: ''
   })
 },

  //相应的订单操作
  operatingOrder:function(e){
    let statues = e.currentTarget.dataset.statues;
    let bookId = e.currentTarget.dataset.book;
    let that=this;
    let id = e.currentTarget.dataset.id;
    let arr=this.data.order;
    // console.log("我获得的状态是：" + statues + "获得的id是" + id + "我获得的书的Id是" + bookId);
    //如果获得的订单状态是待付款对应的操作
    switch (statues){
      case '去付款':
        console.log("我结账去了")//如果用户已经付款了就改变订单状态
        wx.showModal({
          title: '提示',
          content: '是否确认付款？',
          success: function (res) {
            if (res.confirm) {
              console.log('弹框后点确认orderId' + id);
              for (var i in arr) {
                if (arr[i].orderId == id) {
                  arr[i].orderStatus = '待发货';
                  // console.log('循环后orderId' + id);
                  console.log("arr[i]" + JSON.stringify(arr[i]) )
                  wx.navigateTo({
                    url: '../../cart/payment/payment?orderId=' + arr[i].orderId +'&realPayPrice='+arr[i].totalPrivce,
                  })      
                }
              }
              that.setData({
                order: arr
              });
              that.clearGrouping();//清除分组
              that.getOrderGrouping();//重新分组
              that.waitingPay();//再次显示
              // console.log("调用函数修改数据库中订单的状态书的id=" + id + '修改后的状态是：' + '待发货')
              // console.log("确认收货后的操作");
            } else {
              // console.log('弹框后点取消')
              return;
            }
          }
        });
      break;

      case '确认收货':
        console.log("确认收货")//如果用户已经付款了就改变订单状态
        wx.showModal({
          title: '提示',
          content: '是否确认收货？',
          success: function (res) {
            if (res.confirm) {
              console.log('弹框后点确认');
              for (var i in arr) {
                if (arr[i].orderId == id) {
                  arr[i].orderStatus = '已完成';
                  utils.updateOrder(id, 5);//改变数据库中订单的相应状态
                }
              }
              that.setData({
                order: arr
              });
              that.clearGrouping();//清除分组
              that.getOrderGrouping();//重新分组
              that.waitingReceive();//再次显示
              console.log("确认收货后的操作");
            } else {
              console.log('弹框后点取消')
              return;
            }
          }
        });
      break;
      case'去评价':
      wx.showModal({
        title: '提示',
        content: '是否评价订单？',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
              url: '../myOrderRate/myOrderRate?orderId=' + id+'&bookId='+bookId,
            })
          }
          else{
            return;
          }
        }
      })
      break;
      default:
        return;
    }
  
  },

  //清除分组中的数据
  clearGrouping: function () {
    this.setData({
      alreadOder: [],
      waitingPay: [],//具体商品
      waitingSend: [],
      waitingReceive: [],
      conceled: [],
      goodsRejecting: []
    })
  },
//获取用户的所有订单并对用户订单进行分组操作
  getOrderGrouping:function(){
    var that = this;
    var alreadOders=[];
    var waitingPays=[];
    var waitingSends=[];
    var waitingReceives=[];
    var conceleds=[];
    var goodsRejectings=[];
    var arr=[];
    arr = this.data.order;
    
    var goodsCount = 0;
    // var arr =[]
    // 有数据的话，就遍历数据 进行分组
    if (arr.length > 0) {
      // console.log("order数据是:" + that.data.order[0].orderStatus);
      // console.log("arr数据是:" + arr[0].orderStatus);
      for (var i in arr) {
        // console.log("获得的订单状态：" + arr[i].orderStatus);
        switch (arr[i].orderStatus)
        {
          case 5:
            arr[i].orderStatus='去评价';
            alreadOders = this.data.alreadOder.concat(arr[i]);
            this.setData({
              alreadOder: alreadOders
            });
            break;
          case 0:
            arr[i].orderStatus = '去付款';
            waitingPays = this.data.waitingPay.concat(arr[i]);
            this.setData({
              waitingPay: waitingPays
            });
            break;
          case 1:
            arr[i].orderStatus = '待发货';
            waitingSends = this.data.waitingSend.concat(arr[i]);
            this.setData({
              waitingSend: waitingSends
            })
            break;
          case 2:
            arr[i].orderStatus = '确认收货';
            waitingReceives = this.data.waitingReceive.concat(arr[i]);
            this.setData({
              waitingReceive: waitingReceives
            });
            break;
          case 3:
            arr[i].orderStatus = '取消订单';
            conceleds = this.data.conceled.concat(arr[i]);
            this.setData({
              conceled: conceleds
            })
            break;
          case 4:
            arr[i].orderStatus = '退款中';
            goodsRejectings = this.data.goodsRejecting.concat(arr[i]);
            this.setData({
              goodsRejecting: goodsRejectings
            });
            break;
          default:
            break;
        }      
      }
    }
  },
//查看订单详细信息界面
  toOrderDetail: function (e) {
    let orderId = e.currentTarget.dataset.order;
    // console.log("我获得的订单号：" + orderId)
    wx.navigateTo({
      url: '../orderDetail/orderDetails?orderId=' + orderId
    })
  },


   
//从数据库中获取用户所有的商品
  getUserOrder:function(){

    var that = this;
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/selectOrders/' + app.globalData.userInfo.userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success: function (res) {
        //--init data
        // console.log("res.data" + JSON.stringify(res.data) )
        if (res.data != null) {
          that.setData({
            order: res.data,
            isOrder: true
          })
          that.getOrderGrouping();
          that.onShow();
        } else {
          that.setData({
            order: order
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
  
  //用户申请退款的方法
  toRefund: function (orderId,totalPrice){
/*
* 退款接口
退款接口的orderInfo需要传以下参数：
1、微信订单号，或者商品订单号  orderNumber
2、商户退款单号 out_refund_no  商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
3、订单金额 total_fee 订单总金额，单位为分，只能为整数
4、退款金额 refund_fee 退款总金额，订单总金额，单位为分，只能为整数
5、退款原因 refund_desc 若商户传入，会在下发给用户的退款消息中体现退款原因
5*/
   var orderInfo={
     orderNumber:orderId,
     out_refund_no:'',
     total_fee: totalPrice,
     refund_fee: totalPrice,
     refund_desc:''
   }
    pay.refund(orderInfo,function(data){
      if (data.return_code == SUCCESS){
        wx.showToast({
          title: '申请成功！',
        })
      }
    })
  }

})

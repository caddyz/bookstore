Page({
  data:{
    order:[
      // {
      //   id: "001",
      //   imgUrl: "../order/images/history-21.jpg",
      //   name: "燃烧的远征",
      //   price: "65.00",
      //   orderStatus: '交易成功',
      //   num: '2'
      // },
      // {
      //   id: "002",
      //   imgUrl: "../order/images/history-22.jpg",
      //   name: "人类简史",
      //   price: "68.00",
      //   orderStatus: '交易成功',
      //   num: '1'
      // },
      // {
      //   id: "003",
      //   imgUrl: "../order/images/history-23.jpg",
      //   name: "日本现代史",
      //   price: "86.00",
      //   orderStatus: '交易成功',
      //   num: '1'
      // }
    ],//具体商品
    waitingPay: [
      {
        id: "005",
        imgUrl: "../order/images/history-24.jpg",
        name: "十字军的故事",
        price: "68.00",
        orderStatus: '待付款',
        num: '1'
      },
      {
        id: "006",
        imgUrl: "../order/images/history-25.jpg",
        name: "丝绸之路",
        price: "86.00",
        orderStatus: '待付款',
        num: '1'
      }
    ],//具体商品
    waitingSend:[
      {
        id: "007",
        imgUrl: "../order/images/history-26.jpg",
        name: "宋徽宗",
        price: "86.00",
        orderStatus: '待发货',
        num: '1'
      }
    ],
    waitingReceive: [
      {
        id: "008",
        imgUrl: "../order/images/history-27.jpg",
        name: "万历十五年",
        price: "86.00",
        orderStatus: '待收货',
        num: '1'
      }
    ],
    conceled: [
      {
        id: "007",
        imgUrl: "../order/images/history-28.jpg",
        name: "未来简史",
        price: "86.00",
        orderStatus: '已经取消',
        num: '1'
      }
    ],
    goodsRejecting: [
      {
        id: "007",
        imgUrl: "../order/images/history-29.jpg",
        name: "曾国藩",
        price: "86.00",
        orderStatus: '退款中',
        num: '1'
      }
    ],
    isOrder:false,//是否有订单
    totalPrice: 0,    //总金额
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
    this.alreadOder();
  },
  //页面显示
  onShow: function () {
    var that = this;
    var arr = this.data.order;
    var goodsCount = 0;
    // var arr =[]
    // 有数据的话，就遍历数据， 总数量
    if (arr.length > 0) {
      for (var i in arr) {
        if (arr[i].statuse) {
          goodsCount += Number(arr[i].num);
        }
      }
      // 更新数据
      this.setData({
        showOrder: arr,
        goodsCount: goodsCount
      });
    }
  },
  //已经完成订单操作
  alreadOder:function(){
    this.clearColor();
    this.data.isOrder = false;
    var that = this;
    var order=[];
    order = this.data.order;
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
        alreadOderColor: 'active',
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
        alreadOderColor: 'active',
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
        alreadOderColor: 'active',
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
        alreadOderColor: 'active',
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
        alreadOderColor: 'active',
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
  allOrderPage: function () {
    wx.navigateTo({
      url: '../seller_allOrder/seller_allOrder'
    })
  },
  toOrderDetail: function () {
    wx.navigateTo({
      url: '../orderDetail/orderDetails'
    })
  },
});
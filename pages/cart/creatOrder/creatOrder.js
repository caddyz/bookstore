
var utils=require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldcart:[],//购物车结算的商品 
    order:'',//订单
    totalPrice:'',//商品总价
    newAddress: {
      addressId: '2',
      userId: '456',
      isStatus: false,
      addressConsignee: '小李',
      addressMobile: '123456',
      addressProvince: "四川",
      addressCity: "成都",
      addressCounty: "高新区",
      addressDetail: "我不知道"
      },//地址信息
    select: false,
    selectSend:false,
    tihuoWay: '门店自提',
    sendWays:'顺丰',
    sendWay: [{ name:'顺丰'}, {name: '韵达'}, {name: '京东'}, {name: '圆通'}],
      regions:[
      {
        addressId:'1',
        userId:'456',
        addressConsignee:'小李',
        addressMobile:'123456',
        addressProvince:"四川",
        addressCity:"成都",
        addressCounty:"高新区",
        addressDetail:"我不知道"
      },
      {
        addressId: '2',
        userId: '456',
        addressConsignee: '小李',
        addressMobile: '123456',
        addressProvince: "四川",
        addressCity: "成都",
        addressCounty: "高新区",
        addressDetail: "我不知道"
      },
      {
        addressId: '3',
        userId: '456',
        addressConsignee: '小李',
        addressMobile: '123456',
        addressProvince: "四川",
        addressCity: "成都",
        addressCounty: "高新区",
        addressDetail: "我不知道"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var oldcart = JSON.parse(options.oldcart);
    console.log("我接受的数据是：" + oldcart[0].bookName);
    console.log("我接受的总价是：" + options.totalPrice)
    that.setData({
      totalPrice:options.totalPrice
    })
  },
  //界面显示刷新
 onShow(){
var that=this;
that.setData({
  newAddress:this.data.newAddress
})
 },
 //下拉框绑定事件
  bindShowSend() {
    this.setData({
      selectSend: !this.data.selectSend
    })
  },
  //下拉框绑定事件
  mySelectSend(e) {
  
    var send = e.currentTarget.dataset.send
    this.setData({
      sendWays: this.data.sendWay[send].name,
      selectSend: false
    })
  },
  //点击确认生成订单事件触发需要产生的有快递单号，快递方式，收货地址id，订单的编号，下单时间
  // 及商品信息（就是书的id，名字，单价，总价）
  toCreatOrder:function(e){
    // console.log("现在的日期是：" + utils.formatDate(new Date()));
    // console.log("现在的时间是：" + utils.formatTimes(new Date()),);
    
    console.log("我获得的地址信息是：" + this.data.newAddress.addressId );
  let  order={
    
    expressId:'',
    receiveAddressId: this.data.newAddress.addressId,
    userId:'1',
    // bookId:[],
    orderDate: utils.formatDate(new Date()),
    orderTime: utils.formatTimes(new Date()),
    orderStatus:'待发货',
    totalPrice: this.data.totalPrice,
  };
  
//   private Integer orderId;
//   private Integer expressId;
//   private Integer receiveAddressId;
//   private Integer userId;
//   private Integer bookId;
//   private String orderDate;
//   private String orderTime;
//   private String orderStatus;

//   private String imgUrl;
//   private String bookName;
//   private String bookPrice;
//   private String totalPrivce;
//   private String bookNum;
  },
  //用户选择收货地址
  toAddressList:function(){
    wx.navigateTo({
      url: '../../person/addressList/addressList',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

var app=getApp()
var utils=require("../../../utils/util.js");
var pay=require("../../../utils/pay.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldcart:[],//购物车结算的商品 
    newcart:[],//购物车中未结算的商品
    order:'',//订单
    totalPrice:'',//商品总价
    realPayprice:'',//实际支付价格
    newAddress: {},//地址信息
    select: false,
    selectSend:false,
    selectCoupon:false,
    sendWays:'',//货运方式
    sendCost:'',//货运费用
    userCoupon:[],//用户的优惠券
    couponName:'',//优惠券名字
    couponMoney:'',//优惠金额
    couponId:'',//优惠券的id号
    isCoupon:true,//
    expressId:'',
    discount:'',//商品的折扣
    // sendWay: [{ name:'顺丰'}, {name: '韵达'}, {name: '京东'}, {name: '圆通'}],
    sendWay:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var oldcart = JSON.parse(options.oldcart);//选中的商品
    var newcart = JSON.parse(options.newcart);//未选中的商品
    // console.log("我接受的数据是：" + oldcart[0].bookNum);
    // console.log("我接受的总价是：" + options.totalPrice)
    that.setData({
      totalPrice:options.totalPrice,
      oldcart: oldcart,
      newcart: newcart
    })
  
    this.getExpressWay();//获取书店提供的货运方式
    //验证用户是否登录
    if (app.globalData.userInfo != null){
      var userId = app.globalData.userInfo.userId; //如果登录获取用户的id
      that.getuserCoupons();//获取数据库中用户的优惠券
      that.getDefaultReceiveAddress();//获取用户的默认收货地址
    }

  },
  //界面显示刷新
 onShow(){

      var that=this;
      that.setData({
        newAddress:that.data.newAddress
      })
  //  console.log("newAddress:" + that.data.newAddress.addressConsignee)
   that.getRealPayprice();
 },
 //下拉框绑定事件
  bindShowSend() {
    this.setData({
      selectSend: !this.data.selectSend
    })
  },
  //下拉框绑定事件
  mySelectSend(e) {
  var that=this;
    var send = e.currentTarget.dataset.send
    this.setData({
      sendWays: this.data.sendWay[send].expressName,
      sendCost: this.data.sendWay[send].expressCost,
      expressId:this.data.sendWay[send].expressId,
      selectSend: false
    })
    that.getRealPayprice();//实际支付价格的计算
  },


  //2下拉框绑定事件
  bindShowCoupon() {
    this.setData({
      selectCoupon: !this.data.selectCoupon
    })
  },
  //2下拉框绑定事件
  mySelectCoupon(e) {
    var that = this;
    var coupon = e.currentTarget.dataset.coupon
    this.setData({
      couponName: this.data.userCoupon[coupon].couponName,
      couponMoney: this.data.userCoupon[coupon].couponMoney,
      couponId:this.data.userCoupon[coupon].couponId,
      selectCoupon: false
    })
    console.log("couponId=" + that.data.couponId);
    that.getRealPayprice();//实际支付价格的计算
  },


  //点击确认生成订单事件触发需要产生的有快递单号，快递方式，收货地址id，订单的编号，下单时间
  // 及商品信息（就是书的id，名字，单价，总价）
  toCreatOrder:function(e){
    var that = this;
    var realPayPrice = this.data.realPayPrice;//实际支付金额
    if (app.globalData.userInfo!=null){

      var couponId = this.data.couponId;//优惠券id号
   
      let order = {
        expressId: that.data.expressId,//货运方式Id
        receiveAddressId: that.data.newAddress.addressId,//收货地址Id
        userId: app.globalData.userInfo.userId,//用户Id
        carts: that.data.oldcart,//商品
        orderTime: utils.formatTime(new Date()),//下单时间
        orderStatus: 0,//订单状态
        totalPrice: that.data.totalPrice,//订单总价
      };
  //是否有收货地址的验证
      if (order.receiveAddressId == undefined){
      wx.showToast({
        title: '请选择收货地址！',
        duration:2000
      })
      return;
    } 
    var orderId =this.creatOrder(order);//将用户数据提交到数据库中并获取订单号
      console.log("orderId" + orderId);
    }else{
      //用户未登录的下单情况
      let order = {
        expressId: this.data.expressId,//货运方式Id
        receiveAddressId: this.data.newAddress.addressId,//收货地址Id
        userId: app.globalData.userId,//游客Id
        carts: this.data.oldcart,//商品
        orderTime: utils.formatTime(new Date()),//下单时间
        orderStatus: 0,//订单状态
        totalPrice: this.data.totalPrice,//订单总价
      };
      //是否有收货地址的验证
      if (order.receiveAddressId == undefined) {
        wx.showToast({
          title: '请输入收货地址！',
          duration: 2000
        })
        return;
      }
      that.creatOrder(order);//将用户数据提交到数据库中
    }
  },



  //用户选择收货地址
  toAddressList:function(){
    //验证用户是否登录，如果用户登录的话跳向用户的地址管理界面，未登录的话跳向地址添加界面
    if (app.globalData.userInfo != null){
      wx.navigateTo({
        url: '../../person/addressList/addressList?choose='+1,
      })
    }else{
      wx.navigateTo({
        url: '../../person/address/address',
      })
    }
   
  },
 
  //获取用户添加的默认收货地址
  getDefaultReceiveAddress: function () {
    var that = this;
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/selectDefaultReceiveAddress/' + app.globalData.userInfo.userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data

        if (res.data!=null) {
          that.setData({
            newAddress: res.data, //获取用户默认收货地址
          })
        } else {
          that.setData({
            newAddress: that.data.newAddress
          })
        }
        // console.log("我获取的默认收货地址：" + JSON.stringify(that.data.newAddress) )
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

  //获取商家提供的货运方式
  getExpressWay: function () {
    var that = this;
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/getExpressWay', //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data

        if (res.data != null) {
          that.setData({
            sendWay: res.data,//获取商家提供的货运渠道
            //初始化数据
            sendWays: res.data[0].expressName,
            sendCost: res.data[0].expressCost,
            expressId: res.data[0].expressId,
          })
        } else {
          that.setData({
            sendWay: that.data.sendWay
          })
        }
        // console.log("获得初始运费："+that.data.sendCost)//
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




//生成订单后将订单数据提交到后台数据库的方法
  creatOrder: function (order){
  var that=this;
  var order=order;
    // //将用户生成的订单存入数据库
    wx.request({
      url: app.URL + 'bookstore-mall/creatOrder', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(order),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data!=null) {
          // console.log("添加成功！");        
          that.deCartsAlreadyPay();//订单生成成功删除用户购物车中已经结算了的数据
          that.addOrderAddress(that.data.newAddress);//添加订单的收货地址
          wx.showToast({
            title: '下单成功！',
            duration: 2000
          })
          console.log("订单号" + res.data);
          wx.navigateTo({
            url: '../payment/payment?realPayPrice=' + that.data.realPayPrice + '&orderId=' + res.data,
          }) 
        } else {
          wx.showToast({
            title: '下单失败！',
            duration: 2000
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
    });
  },


  //当下单成功后删除缓存中购物车的数据
  deCartsAlreadyPay:function(){
    var that = this;
    var booksId=[];
    var newcart = this.data.newcart;
    var carts=wx.getStorageInfoSync("carts")||[];
    //获取商品的Id
    console.log("newcart" + JSON.stringify(newcart));
    //存入缓存
    carts=newcart;
    wx.setStorage({
      key: 'carts',
      data: carts,
    })
   
  },

  //用户优惠券和折扣查询
  getuserCoupons:function(){
    var that=this;
    var userCoupons=[];
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/getUserCoupon/' + app.globalData.userInfo.userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data.length>0) {
         for(let i=0;i<res.data.length;i++){
          //  console.log("获得的时间：" + res.data[i].couponEnd)
           if (( Date.parse(new Date())) <= res.data[i].couponEnd && (Date.parse(new Date())) >= res.data[i].couponStart) {
            
             if (res.data[i].couponUseStatus == true) {
               userCoupons = userCoupons.concat(res.data[i])//去掉用户不能使用的优惠券
               console.log("userCoupons" + JSON.stringify(userCoupons));
             }
           }

           if (userCoupons.length>0){
             that.setData({
               userCoupon: userCoupons,
               couponName: userCoupons[0].couponName,
               couponMoney: userCoupons[0].couponMoney,
               couponId: userCoupons[0].couponId,
               isCoupon:false
             })
             console.log("成功获取用户优惠券：" + that.data.userCoupon[0].couponName);
           }      
         };     
      
        } else {
          console.log("没有获取用户优惠券：")
        }
        // console.log("我获取的默认收货地址：" + that.data.sendWay)
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

  //修改用户优惠券状态的方法
  updateUserCoupons:function(userId,couponId,couponUseTime){
    var coupon={
      userId: userId,
      couponId: couponId,
      couponUseTime: couponUseTime
    };
    wx.request({
      url: app.URL + 'bookstore-mall/updateUserCoupons', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(coupon),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data == true) {
  
          console.log("成功修改：");
        } else {
          console.log("没有使用成功：")
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


  //将订单的收货地址添加到订单收货地址表
  addOrderAddress: function (address) {
    var that = this;
    var address = address;
    // //将用户生成的订单存入数据库
    wx.request({
      url: app.URL + 'bookstore-mall/addOrderAddress', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(address),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {
         
          wx.showToast({
            title: '下单成功！',
            duration: 2000
          }) 
          return res.data;
        } else {
          wx.showToast({
            title: '下单失败！',
            duration: 2000
          })
          return null;
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    });
  },
 
  //实际支付价格的算法
  getRealPayprice:function(){
    let that=this;
    let price1=0;
    let price2 = 0;
    let discountPrice=0;//订单折扣
    let h=0;
    let k=0;
    let discount=0;
    let oldcart=this.data.oldcart;//选中的商品
    // console.log("商品：" + JSON.stringify(oldcart))
    let totalPrice = that.data.totalPrice;//获得商品的初始总价
    let sendCost = that.data.sendCost;//获得货运的费用
    console.log("获得运费：" + that.data.sendCost);
    let couponMoney = that.data.couponMoney;//优惠券优惠的金额
    
for(let i in oldcart){
  k=k+1;
  if (oldcart[i].discountPrice!=null){
    price1 = price1 + Number(oldcart[i].discountPrice) * Number(oldcart[i].bookNum);//折扣商品价格计算
    discountPrice = discountPrice + Number(oldcart[i].discountPrice)/Number(oldcart[i].bookPrice);
  }else{
    price2 = price2 + Number(oldcart[i].bookPrice) * Number(oldcart[i].bookNum);//非折扣商品价格计算
    h=h+1;
  }
}
    if (discountPrice==0){
      discount='无'; 
    }else{
      discount = Number(((h + discountPrice) / k) * 100).toFixed(2);//计算订单的折扣
    }


    var realPayPrice = Number(price1) + Number(price2) + Number(sendCost) - Number(couponMoney);
    // console.log("实际支付价格：" + realPayPrice + price1 + "sad " + price2);
    realPayPrice = Number(realPayPrice).toFixed(2);//固定小数点的位数
  that.setData({
    realPayPrice: realPayPrice,
    discount: discount
  })
  }

})

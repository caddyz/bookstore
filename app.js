//app.js
var scence=0;
App({
  URL:'http://www.superduck.xyz/',
  orderInfo:[
    {openid:''},
    {spbill_create_ip:''},
    {body:''},
    {detail:''},
    {out_trade_no: ''},
    {total_fee:''},
    {orderNumber:''}],
  userInfo:null,
  userId:null,//游客的id号
  code:null,
  payinfo:null,
  onLaunch: function () {
    let that = this;
    //获取本机的IP地址
    wx.request({
      url: 'http://ip-api.com/json/',
      success(res){
        that.orderInfo.spbill_create_ip = res.data.query
      }
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      success(res) {
        // console.log("code:"+res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: that.URL+'bookstore-mall/getopenid/'+res.code,//传送路径
            success(res) {
              payinfo:res.data,
              that.orderInfo.openid=res.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  
  //当微信小程序进入后台运行时执行的方法
  onHide:function(){
    console.log("我是进入后台执行的方法" + JSON.stringify(this.globalData.userInfo));
    var that = this;
    if (this.globalData.userInfo!=null){
      var carts = wx.getStorageSync("carts")//获取缓存的数据
      console.log("取出的缓存数据：" + JSON.stringify(carts));
      that.insetCart(carts)//将数据存入数据库中
    }
    
  },

onShow:function(){

  console.log("我是后台进入前台执行的方法！");
  //验证用户是否登录
  if (this.globalData.userInfo != null) {
    this.getAllCarts(this.globalData.userInfo.userId);//如果用户登录状态从数据库中获取购物车商品信息
  }else{
    this.globalData.userId = Number(new Date).toString(2, 5);//给一个时间戳
    console.log(this.globalData.userId);
  }
}
,  //将商品存入购物车数据存入数据库的方法
  insetCart: function (carts) {
  var that=this;
    var Carts = carts;
    var userId = this.globalData.userInfo.userId;//获取用户的id
   var url=this.URL;

//将用户的id传输到后台
    wx.request({
      url: url + 'bookstore-mall/insertCartUserId/'+userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data == true) {
          console.log("添加成功！");
          that.insertCarts(Carts);   
        }
      }
    });
  },
  //将用户数据添加到后台的方法
  insertCarts: function (carts) {
    var Carts = carts;
    var url = this.URL;
    console.log("Carts" + JSON.stringify(Carts));
    //将用户数据传输到后台
    wx.request({
      url: url + 'bookstore-mall/insertCart', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(Carts),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data == true) {
          console.log("添加成功！");
          wx.clearStorage("carts");//添加到购物车后清除缓存里的数据
        }
      }
    });
  },
  //从数据库中获取购物车的数据
  getAllCarts: function(userId) {
    var that = this
    var url = this.URL;
  var cart = wx.getStorageSync("carts") || [];
    // //数据库获取初始数据
    wx.request({
      url: url + 'bookstore-mall/selectCart/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {
            //缓存中没有数据而数据库中有
            cart = res.data;
          
          console.log("加入购物车的" + JSON.stringify(cart));
          //存入缓存
          wx.setStorage({
            key: 'carts',
            data: cart,
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

  
  globalData: {
    userInfo: null,
    userId:null,//游客的id
  }
})
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data:{
    imgUrls: [
      //图片的地址
    "http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png"
    ],
    bookId:'',
    indicatorDots: true, //是否显示指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //  滑动动画时长
    list: [],//动态页面
    item:[],//显示所有书
    out:[],//显示折扣
    author:[],//显示一个或多个作者
    minusStatus:'disabled',//预览退出
    isCollected:'',//收藏

  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      // current 传入当前图片路径
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
 

  // 收藏事件
  handleCollection:function(e) {
 
	   var that = this
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
    var userId = app.globalData.userInfo.userId
    // console.log("传入的数据:" + userId)
    // var userId = 2
    var bookId = that.data.bookId

     //判断收藏的状态
    that.isCollector(userId,bookId,function(data){
       if(data==false){
         that.insertCollector(userId,bookId);//添加收藏
         return;
       }
        else{
         that.delCollector(userId,bookId);//取消收藏
         return;
        }
     })
    }
    },

  
  addCar: function (e) {
    //将购物车数据添加到缓存
    var that = this
    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems') || []
    console.log(cartItems)
    //判断购物车缓存中是否已存在该货品
    var exist = cartItems.find(function (ele) {
      return ele.bookId === that.data.bookId
    })
    console.log(exist)
      //如果不存在，传入该货品信息
      cartItems.push({
        bookId: that.data.bookId,
        bookName:that.data.bookName,
        price: that.data.bookPrice,  
      })
    
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "添加购物车",
          icon: "success",
          durantion: 2000
        })
      }
    })


  },





  // 评论
  formSubmit: function (e){
    if (e.detail.value.liuyantext==''){
      wx.showToast({
        title: '请输入留言',
        icon: 'loading',
        duration: 1500
      })
       setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      wx.showToast({
        title: '评论成功',
        icon: 'success',
        duration: 1000
      })
    }
  },


 

  // 立即购买,跳转到购物车结算
  nowBuy() {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传入的数据' + options.bookId)
    var bookId = options.bookId;
    var userId=2;
// 调用查询所有书籍信息
   var that = this;
   wx.request({
     url: app.URL + 'bookstore-mall/' + options.bookId+'/allContext',
     data:{},
     header:{
       'content-type':'application/json'
     },
     success:function(res){
       console.log(res.data)
       that.setData({
          list: res.data, //设置数据
         bookId: options.bookId
        })
      },
      fail: function (err) {
        console.log(err)
     }
    })
    // 查询所有评论
    wx.request({
      url: app.URL + 'bookstore-mall/' + options.bookId + '/allContext/kindAll',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          item: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 查询所有折扣和折扣后的价格
    wx.request({
      url: app.URL + 'bookstore-mall/selectActivity/' + options.bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          out: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 查询所有作者
    wx.request({
      url: app.URL + 'bookstore-mall/selectAllAuthor/' + options.bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          author: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    this.isCollector(userId,bookId,function(data){});
   
  },
  
  //判断数据库中的这本书是否被收藏
  isCollector: function (userId, bookId,callback){
   var that=this;
   wx.request({
     url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/isExit',
     data: {},
     header: {
       'content-type': 'application/json'
     },
     success: function (res) {
       console.log("panduanshoucang :"+res.data)
       console.log(res.data)
       if (res.data == false) {
      console.log("nishshabi")
         callback(false);//返回false说明这本书没有被收藏 
         that.setData({
           isCollected: false
         })

         console.log("is:" + that.data.isCollected);
       }else{
         callback(true);
         that.setData({
           isCollected: true
         })
       }
      
     }
   })
 },
//添加收藏到数据库中的方法
  insertCollector: function (userId,bookId){
  var that = this;
  wx.request({
    url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/kindAdd',
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
      if (res.data == 0) {
        console.log("添加失败！");
      }
      else{
        console.log("添加成功！");
      }
    }
  })
},
//取消收藏的方法
  delCollector: function ( userId,bookId) {
    var that = this;
    wx.request({
      url: app.URL + 'bookstore-mall/delete/' + userId + '/' + bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.status)
        if (res.data.status == true) {
          console.log("取消成功！");
        }
        else {
          console.log("取消收藏失败！");
        }
      }
    })
  }


})


  
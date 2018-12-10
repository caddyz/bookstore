var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data:{
    imgUrls: [
      //图片的地址
    "http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png"
    ],
    indicatorDots: true, //是否显示指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //  滑动动画时长
    list: [],//动态页面
    item:[],//显示所有书
    out:[],//显示折扣
    isCollected: false,//收藏
    minusStatus:'disabled',//预览退出
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
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },


  addCar: function (e) {
    var cartList = this.data.cartList
    console.log(e.target.dataset.goodid);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartList',
      data:'id',
    })
    try {
      wx.setStorageSync('cartList', 'id')
    } catch (e) {
    }
    // 同步获取当前storage的相关信息
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys)
      }
    })
    wx.getStorage({
      key: 'cartList',
      success(res) {
        console.log(res.data)
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
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('传入的数据' + options.bookId)

   var that = this;
   
   wx.request({
     url: 'http://localhost:8080/bookstore-mall/' + options.bookId+'/allContext',
     data:{},
     header:{
       'content-type':'application/json'
     },
     success:function(res){
       console.log(res.data)
       that.setData({
          list: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
     }
    })
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/' + options.bookId + '/allContext/kindAll',
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
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/selectActivity/' + options.bookId,
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

  }


})



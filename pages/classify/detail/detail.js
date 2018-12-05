var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data:{
    imgUrls: [
      //图片的地址
      "http://file2.rrxh5.cc/g2/c1/2017/09/07/1504777332491.png",
      "http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png"
    ],
    indicatorDots: true, //是否显示指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //  滑动动画时长
    list: [],
    isCollected: false,
    // banner
    // 加减框
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
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
  handleCollection() {
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
    wx.setStorage({
      key:'item-text',
      data:'id',
    })
    try {
      console.log('数据缓存成功')
      wx.setStorageSync('item-text', 'id')
    } catch (e) { 

    }
    // 获取缓存
    wx.getStorageInfo({
      success: function (res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
      }
    })
    // 读取缓存
    wx.getStorage({
      key: 'item-text',
      success(res) {
        console.log(res.data)
        console.log('数据读取成功')
      }
    })
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
        console.log(res.currentSize)
        console.log(res.limitSize)
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
  // 加减框
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回
    this.setData({
      num: num
    });
  },
  

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log('传入的数据'+options.bookId)

   var that = this;
   
   wx.request({
     url: 'http://localhost:8080/bookstore-mall/' + options.bookId+'/allContext',
     data:{
       bookName:'bookName',
     },
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



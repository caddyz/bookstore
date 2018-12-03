var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data:{
    book_name:'书名',
    book_sales_price:'金额',
    book_cover_image:'图片',
    book_category:'类型',
    book_profile:'简介',
    author_name:'作者',
    "book_status":"1",
    "id":'0',
    history:[],
    detailObj: {},
    index: null,
    isCollected: false,
    isLike: true,
    // banner
    // 加减框
    // input默认是1
    num: 1,
    // 使用data数据对象设置样式名
    minusStatus: 'disabled',
    imgUrls: [
      //图片的地址
      "http://file2.rrxh5.cc/g2/c1/2017/09/07/1504777332491.png",
      "http://img.zcool.cn/community/014565554b3814000001bf7232251d.jpg@1280w_1l_2o_100sh.png"
    ],
    indicatorDots: true, //是否显示指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //  滑动动画时长

    // 商品详情介绍
    detailImg: [
      // 都是书的图片。
      "http://img4.imgtn.bdimg.com/it/u=3415244797,3645437497&fm=26&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=865111090,4158915163&fm=26&gp=0.jpg"
    ],
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

  // 收藏
  // addLike() {
  //   wx.showToast({
  //     title: '收藏成功',
  //     icon: 'success',
  //     duration: 2000,
  //   });
  //   this.setData({
  //     isLike: !this.data.isLike
  //   });
  // },
  //  加入购物车

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
  handleCollection() {
    let isCollected = !this.data.isCollected
    this.setData({
      isCollected
    })
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    })
    //点击收藏图标后缓存数据到本地
    //把data中的index放到新let出来的index中,因为下面要把index也存进去,要用index来判断你收藏了哪个页面
    let { index } = this.data;

    //首先去看一下缓存的数据
    wx.getStorage({
      key: 'isCollected',
      success: (data) => {
        let obj = data.data;
        //如果有,则刷新,没有则追加
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {

          }
        });
      }
    })

  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 数据起始加载
    let that = this
    util.getSelectClassifyBookByIdSearch(3, function (data) {
      console.log(data);
      that.setData({
        list: data
      })
    })






    //根据本地缓存的数据判读用户是否收藏当前文章
    // let dateilStorage = wx.getStorageSync("isCollected");
    //如果没有收藏
    // if (!detailStorage) {
    //初始化一个空的对象
    //   wx.setStorageSync('isCollected', {});
    // }
    //如果收藏了
    // if (detailStorage[index]) {
    //   this.setData({
    //     isCollected: true
    //   })
    // }
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



Page({
  data: {
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
      // 用maven查出的简介地址,就是往下拉的图片，都是书的图片。
      "http://img0.imgtn.bdimg.com/it/u=4204984068,3896675956&fm=26&gp=0.jpg",
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
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
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
  },/**
   * 加入购物车
   */
  addCar: function (e) {
    console.log(e.target.dataset.cartid);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    })
  }


})



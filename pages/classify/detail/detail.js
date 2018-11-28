var app = getApp()
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
      // 都是书的图片。
      "http://img4.imgtn.bdimg.com/it/u=3415244797,3645437497&fm=26&gp=0.jpg",
      "http://img1.imgtn.bdimg.com/it/u=865111090,4158915163&fm=26&gp=0.jpg"
    ],
  },
  bookdetail:function(){
    wx.request({
      // 输入需要查询的地址
      url: '',
      data:{

      },
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.data)
      }
    })
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
  },

  // 分类数据库查询
  onLoad:function(options){
    var that = this
    var name = options.name
    console.log(name)
    wx.request({
      url: '',//地址
      data:{
        q:name,
        p:1
      },
      header:{
        'content-type':'application/x-www-urlencoded'
      },
      method:'GET',
      success:function(res){
        console.log(res.data.goods_list)
        this.setData({
          categoodlist:res.data.result.goods_list,
        })
      }
    })
  },
  //  nowBuy: function (event) {  //获取cartId
  //   //判断是否登陆,如果未登陆跳到登陆界面，如果登陆就调接口，跳转确认订单界面
  //   var CuserInfo = wx.getStorageSync('CuserInfo');
  //   console.log(CuserInfo.token)
  //   if (!CuserInfo.token) {
  //     //跳转到login
  //     wx.navigateTo({
  //       url: '../login/login?goodsId=' + goodsId + '&specId=' + specId,
  //     })
  //   } else {
  //     var that = this;
  //     request.req(uribuy, {
  //       specId: specId,
  //       count: '1',
  //       saveType: '1',
  //       goodsId: goodsId
  //     }, (err, res) => {
  //       var result = res.data;
  //       console.log(result);
  //       if (result.result == 1) { //获取cartId
  //         //拿着cartId跳转到确认订单界面
  //         wx.navigateTo({   //获取cartId
  //           url: '../orderConfirm/orderConfirm?cartIds=' + result.data[0].cartIds,
  //         })
  //       } else {
  //         that.setData({
  //           tips: res.data.msg
  //         })
  //         console.log(res.data.msg)
  //       }
  //     })
  //   }
  // },


})



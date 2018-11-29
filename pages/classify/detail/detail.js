var app = getApp()
Page({
  data: {
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
    console.log(e.target.dataset.goodid);
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      duration: 2000
    });
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',

    })

  },



  //     加入购物车
  // addCar: function (e) {
  //   var goods = this.data.goods;
  //   goods.isSelect = false;
  //   var count = this.data.goods.count;
  //   var title = this.data.goods.title;
  //   if (title.length > 13) {
  //     goods.title = title.substring(0, 13) + '...';
  //   }
  //   // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
  //   var arr = wx.getStorageSync('cart') || [];
  //   console.log("arr,{}", arr);
  //   if (arr.length > 0) {
  //     // 遍历购物车数组  
  //     for (var j in arr) {
  //       // 判断购物车内的item的id，和事件传递过来的id，是否相等  
  //       if (arr[j].goodsId == goodsId) {
  //         // 相等的话，给count+1（即再次添加入购物车，数量+1）  
  //         arr[j].count = arr[j].count + 1;
  //         // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
  //         try {
  //           wx.setStorageSync('cart', arr)
  //         } catch (e) {
  //           console.log(e)
  //         }
  //         //关闭窗口
  //         wx.showToast({
  //           title: '加入购物车成功！',
  //           icon: 'success',
  //           duration: 2000
  //         });
  //         this.closeDialog();
  //         // 返回（在if内使用return，跳出循环节约运算，节约性能） 
  //         return;
  //       }
  //     }
  //   // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
  //   arr.push(goods);
  //   } else {
  //     arr.push(goods);
  //   }
  //   // 最后，把购物车数据，存放入缓存  
  //   try {
  //     wx.setStorageSync('cart', arr)
  //     // 返回（在if内使用return，跳出循环节约运算，节约性能） 
  //     //关闭窗口
  //     wx.showToast({
  //       title: '加入购物车成功！',
  //       icon: 'success',
  //       duration: 2000
  //     });
  //     this.closeDialog();
  //     return;
  //   } catch (e) {
  //     console.log(e)
  //   }

  // },

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






































  // // 分类数据库查询
  // onLoad:function(options){
  //   var that = this
  //   var name = options.name
  //   console.log(name)
  //   wx.request({
  //     url: '',//地址
  //     data:{
  //       q:name,
  //       p:1
  //     },
  //     header:{
  //       'content-type':'application/x-www-urlencoded'
  //     },
  //     method:'GET',
  //     success:function(res){
  //       console.log(res.data.goods_list)
  //       this.setData({
  //         categoodlist:res.data.result.goods_list,
  //       })
  //     }
  //   })
  // },
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



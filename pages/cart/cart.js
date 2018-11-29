// pages/cart/cart.js
Page({
  data: {
    iscart: false,//是否在购物车中
    selectAllStatus:false,//是否全部选中
    cart: [{
      id: "001",
      imgUrl: "../cart/images/history-21.jpg",
      name: "燃烧的远征",
      price: "65.00",
      statuse:false,
      num:'2'
    },
      {
        id: "002",
        imgUrl: "../cart/images/history-22.jpg",
        name: "人类简史",
        price: "68.00",
        statuse: true,
        num: '1'
      },
      {
        id: "003",
        imgUrl: "../cart/images/history-23.jpg",
        name: "日本现代史",
        price: "86.00",
        statuse: true,
        num: '1'
      },
      {
        id: "004",
        imgUrl: "../cart/images/history-24.jpg",
        name: "十字军的故事",
        price: "119.00",
        statuse: true,
        num: '1'
      },
      {
        id: "005",
        imgUrl: "../cart/images/history-25.jpg",
        name: "丝绸之路",
        price: "69.00",
        statuse: true,
        num: '1'
      },
      {
        id: "006",
        imgUrl: "../cart/images/history-26.jpg",
        name: "宋徽宗",
        price: "86.00",
        statuse: true,
        num: '1'
      },
      {
        id: "007",
        imgUrl: "../cart/images/history-27.jpg",
        name: "万历十五年",
        price: "119.00",
        statuse: true,
        num: '1'
      },
      {
        id: "008",
        imgUrl: "../cart/images/history-28.jpg",
        name: "未来简史",
        price: "69.00",
        statuse: true,
        num: '3'
      },], //数据
    count: 1,   //商品数量默认是1
    totalPrice: 0,    //总金额
    goodsCount: 0, //数量
  },
  //初始加载页面
  onLoad: function (options) {
    // //数据库获取初始数据
    // wx.request({
    //   url: 'http://192.168.10.162:8080/bookstore/cart/', //提交的网络地址
    //   method: "GET",
    //   dataType: "json",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     //--init data
    //     if (res.data!=null) {
    //       this.setData({
    //           cart:res.data
    //       })
    //     } else {
    //      this.setData({
    //        cart:cart
    //      })
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 30000
    //     });
    //   }
    // })
   
  },
  onShow: function () {
    var that = this;
    // 获取缓存李里面的数据并加入购物车
    // var bufferArr = wx.getStorageSync('cart') || [];
    // if(bufferArr.length>0){
    //   arr = this.data.cart.concat(bufferArr);
    // }else{
    //   arr = this.data.cart;
    // }
    
    var arr=this.data.cart;
   var goodsCount=0;
    // var arr =[]
    // 有数据的话，就遍历数据， 总数量
    if (arr.length > 0) {
      for (var i in arr) {
        if(arr[i].statuse){
          goodsCount += Number(arr[i].num);
        }
      }
      // 更新数据
      this.setData({
        iscart: true,
        cart: arr,
        goodsCount: goodsCount
      });
    }
    that.getTotalPrice();  
  },
  //离开界面是执行这个方法
  onHide: function () {
   // 清除数据
    this.setData({
      iscart: false,
      // cart: [], //数据
      totalPrice: 0,    //总金额
      goodsCount: 0 //数量
    });
  },

  //离开本页时需要消除的数据
 onUnload:function(){
   //当页面卸载时清除缓存
  //  wx.clearStorageSync('cart');
 },
  /* 减数 */
  delCount: function (e) {
    console.log(e)
    // 获取购物车该商品的数量
    // [获取设置在该btn的id,即list的index值]
    if (this.data.cart[e.target.id.substring(3)].num <= 1) {
      return;
    }
    // 商品总数量-1
    this.data.goodsCount -= 1;
    // 购物车主体数据对应的项的数量-1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].num = --this.data.cart[e.target.id.substring(3)].num;
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      goodsCount: this.data.goodsCount
    })
    this.getTotalPrice();     
    // // 主体数据重新赋入缓存内
    // try {
    //   wx.setStorageSync('cart', this.data.cart)
    // } catch (e) {
    //   console.log(e)
    // }
  },
  /* 加数 */
  addCount: function (e) {
    // 商品总数量+1
    this.data.goodsCount += 1;
    // 购物车主体数据对应的项的数量+1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].num = ++this.data.cart[e.target.id.substring(3)].num;
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      goodsCount: this.data.goodsCount
    })
    this.getTotalPrice(); 
    // // 主体数据重新赋入缓存内
    // try {
    //   wx.setStorageSync('cart', this.data.cart)
    // } catch (e) {
    //   console.log(e)
    // }
  },
  /* 删除item */
  delGoods: function (e) {
    // 商品总数量  减去  对应删除项的数量
    this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].num;
    // 主体数据的数组移除该项
    this.data.cart.splice(e.target.id.substring(3), 1);
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      goodsCount: this.data.goodsCount
    })
    this.getTotalPrice();   
    // // 主体数据重新赋入缓存内
    // try {
    //   wx.setStorageSync('cart', this.data.cart)
    // } catch (e) {
    //   console.log(e)
    // }
  },
  
  //单选择商品事件
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.cart;                    // 获取购物车列表
    const statuse = carts[index].statuse;         // 获取当前商品的选中状态
    carts[index].statuse = !statuse;              // 改变状态
    //改变商品数量
    if (carts[index].statuse){
      this.data.goodsCount = this.data.goodsCount + Number(this.data.cart[index].num);
    }else{
      this.data.goodsCount = this.data.goodsCount - this.data.cart[index].num;
    }
    this.setData({
      cart: carts,
      goodsCount: this.data.goodsCount
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  
  //全选商品事件
   selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
     let goodsCount=0;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.cart;
    var that=this;

    for (let i = 0; i < carts.length; i++) {
      carts[i].statuse = selectAllStatus;            // 改变所有商品状态
    }
    //统计商品数量
     if (selectAllStatus){
       for (var i in carts) {    
         goodsCount += Number(carts[i].num);
       }
     }
    this.setData({
      selectAllStatus: selectAllStatus,
      cart: carts,
      goodsCount: goodsCount
    });
    this.getTotalPrice();                               // 重新获取总价
  },

//总价计算函数
getTotalPrice() {
  let carts = this.data.cart;                  // 获取购物车列表
  let total = 0;
  let totalNum = 0;
  for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
    if (carts[i].statuse) {                   // 判断选中才会计算价格
      total += carts[i].num * carts[i].price;     // 所有价格加起来
      totalNum += carts[i].num; 
    }
  }
  this.setData({                                // 最后赋值到data中渲染到页面
    cart: carts,
    totalPrice: total.toFixed(2)
    // goodsCount: totalNum.toFixed(2)
  });
},
  //结算函数，生成商品订单并将数据提交到订单界面进行处理
  toSettlement() {

  },
  //商品详细信息介绍界面
  toBookDetail(e){
    // console.log("获得的id是" + e.currentTarget.dataset.id)
    let id = this.data.cart[e.currentTarget.dataset.id].id
    // console.log("获得书的id是"+id)
    wx.navigateTo({
      url: '../detail/detail?id='+id,
    })
  }

})
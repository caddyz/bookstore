// pages/cart/cart.js
Page({
  data: {
    iscart: false,//是否在购物车中
    selectAllStatus:false,//是否全部选中
    cart: [{
      bookId: "001",
      imgUrl: "../cart/images/history-21.jpg",
      BookName: "燃烧的远征",
      BookPrice: "65.00",
      isStatus:false,
      BookNum:'2'
    },
      {
        bookId: "002",
        imgUrl: "../cart/images/history-22.jpg",
        BookName: "人类简史",
        BookPrice: "68.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "003",
        imgUrl: "../cart/images/history-23.jpg",
        BookName: "日本现代史",
        BookPrice: "86.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "004",
        imgUrl: "../cart/images/history-24.jpg",
        BookName: "十字军的故事",
        BookPrice: "119.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "005",
        imgUrl: "../cart/images/history-25.jpg",
        BookName: "丝绸之路",
        BookPrice: "69.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "006",
        imgUrl: "../cart/images/history-26.jpg",
        BookName: "宋徽宗",
        BookPrice: "86.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "007",
        imgUrl: "../cart/images/history-27.jpg",
        BookName: "万历十五年",
        BookPrice: "119.00",
        isStatus: true,
        BookNum: '1'
      },
      {
        bookId: "008",
        imgUrl: "../cart/images/history-28.jpg",
        BookName: "未来简史",
        BookPrice: "69.00",
        isStatus: true,
        BookNum: '3'
      },], //数据
    count: 1,   //商品数量默认是1
    totalPrice: 0,    //总金额
    goodsCount: 0, //数量
  },
  //初始加载页面
  onLoad: function (options) {
    // //数据库获取初始数据
    // wx.request({
    //   url: 'http://192.168.10.110:8080/bookstore-mall/cart', //提交的网络地址
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
        if (arr[i].isStatus){
          goodsCount += Number(arr[i].BookNum);
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
    if (this.data.cart[e.target.id.substring(3)].BookNum <= 1) {
      return;
    }
    // 商品总数量-1
    this.data.goodsCount -= 1;
    // 购物车主体数据对应的项的数量-1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].BookNum = --this.data.cart[e.target.id.substring(3)].BookNum;
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
    this.data.cart[e.target.id.substring(3)].BookNum = ++this.data.cart[e.target.id.substring(3)].BookNum;
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
    this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].BookNum;
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
    const isStatus = carts[index].isStatus;         // 获取当前商品的选中状态
    carts[index].isStatus = !isStatus;              // 改变状态
    //改变商品数量
    if (carts[index].isStatus){
      this.data.goodsCount = this.data.goodsCount + Number(this.data.cart[index].BookNum);
    }else{
      this.data.goodsCount = this.data.goodsCount - this.data.cart[index].BookNum;
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
      carts[i].isStatus = selectAllStatus;            // 改变所有商品状态
    }
    //统计商品数量
     if (selectAllStatus){
       for (var i in carts) {    
         goodsCount += Number(carts[i].BookNum);
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
    if (carts[i].isStatus) {                   // 判断选中才会计算价格
      total += carts[i].BookNum * carts[i].BookPrice;     // 所有价格加起来
      totalNum += carts[i].BookNum; 
    }
  }
  this.setData({                                // 最后赋值到data中渲染到页面
    cart: carts,
    totalPrice: total.toFixed(2)
    // goodsCount: totalNum.toFixed(2)
  });
},
  //结算函数，生成商品订单并将数据提交到订单界面进行处理
  toSettlement:function(e) {
    var that=this;
    let carts = this.data.cart; 
    let newcart=[];
    wx.showModal({
      title: '提示',
      content: '是否结算？',
      success: function (res) {
        if (res.confirm) {
          console.log("确认付钱订单生成")
      
                console.log('我付钱了该生成订单了 并将结算了书本从购车数据库中删除');
                for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
                  if (!carts[i].isStatus) {                   // 判断留下未选中的
                    newcart = newcart.concat(carts[i]);
                  }
              }
         
          // 将数据更新
          that.setData({
            cart:newcart
          });
          console.log("创建订单并将订单数据存入书库！")
          
        } else {
          console.log('弹框后点取消')
          return;
        }
      }
    })
  },
  //商品详细信息介绍界面
  toBookDetail(e){
    // console.log("获得的id是" + e.currentTarget.dataset.id)
    let id = this.data.cart[e.currentTarget.dataset.id].id
    // console.log("获得书的id是"+id)
    wx.navigateTo({
      url: '/pages/classify/detail/detail?id='+id,
    })
  }

})
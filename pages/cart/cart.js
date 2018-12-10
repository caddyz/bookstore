// pages/cart/cart.js
Page({
  data: {
    iscart: false,//是否在购物车中
    selectAllStatus:false,//是否全部选中
    // cart:[],
    cart: [{
      bookId: "001",
      userId:"02",
      imgUrl: "../cart/images/history-21.jpg",
      bookName: "燃烧的远征",
      bookPrice: "65.00",
      isStatus:false,
      bookNum:'2'
    },
      {
        bookId: "002",
        userId: "02",
        imgUrl: "../cart/images/history-22.jpg",
        bookName: "人类简史",
        bookPrice: "68.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "003",
        userId: "02",
        imgUrl: "../cart/images/history-23.jpg",
        bookName: "日本现代史",
        bookPrice: "86.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "004",
        userId: "02",
        imgUrl: "../cart/images/history-24.jpg",
        bookName: "十字军的故事",
        bookPrice: "119.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "005",
        userId: "02",
        imgUrl: "../cart/images/history-25.jpg",
        bookName: "丝绸之路",
        bookPrice: "69.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "006",
        userId: "02",
        imgUrl: "../cart/images/history-26.jpg",
        bookName: "宋徽宗",
        bookPrice: "86.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "007",
        userId: "02",
        imgUrl: "../cart/images/history-27.jpg",
        bookName: "万历十五年",
        bookPrice: "119.00",
        isStatus: true,
        bookNum: '1'
      },
      {
        bookId: "008",
        userId: "02",
        imgUrl: "../cart/images/history-28.jpg",
        bookName: "未来简史",
        bookPrice: "69.00",
        isStatus: true,
        bookNum: '3'
      },], //数据
    count: 1,   //商品数量默认是1
    totalPrice: 0,    //总金额
    goodsCount: 0, //数量
  },
  //初始加载页面
  onLoad: function (options) {
    var that=this
    // //数据库获取初始数据
    wx.request({
      url: 'http://192.168.10.162:8080/bookstore-mall/selectCart/'+1, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data!=null) {
          
          that.setData({
              cart:res.data
          })
          that.onShow();
          console.log(that.data.cart)
        } else {
          that.setData({
           cart:cart
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

  //画面显示
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
          goodsCount += Number(arr[i].bookNum);
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
    console.log("我是页面隐藏时执行的方法");
    var Carts = this.data.cart;
    var that = this
    // //数据库获取初始数据
   
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
    if (this.data.cart[e.target.id.substring(3)].bookNum <= 1) {
      return;
    }
    // 商品总数量-1
    this.data.goodsCount -= 1;
    // 购物车主体数据对应的项的数量-1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].bookNum = --this.data.cart[e.target.id.substring(3)].bookNum;
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
    this.data.cart[e.target.id.substring(3)].bookNum = ++this.data.cart[e.target.id.substring(3)].bookNum;
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
    this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].bookNum;
    // 主体数据的数组移除该项
    this.data.cart.splice(e.target.id.substring(3), 1);
    //将数据库中对应的数据删除

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
      this.data.goodsCount = this.data.goodsCount + Number(this.data.cart[index].bookNum);
    }else{
      this.data.goodsCount = this.data.goodsCount - this.data.cart[index].bookNum;
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
         goodsCount += Number(carts[i].bookNum);
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
      total += carts[i].bookNum * carts[i].bookPrice;     // 所有价格加起来
      totalNum += carts[i].bookNum; 
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
    let newcart=[];//未选中结算的
    let oldcart=[];//选中结算的
	 if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else{
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
                  //将选中的交给定单处理
                  else{
                    oldcart = oldcart.concat(carts[i])
                  }
              }
         
          // 将数据更新
          that.setData({
            cart:newcart
          });
          console.log("创建订单并将订单数据存入书库！");
          //跳转到订单生成界面,将结算的商品传给订单生成界面
        if(oldcart.length==0){
          wx.showToast({
            title: '未选定结算商品！',
            duration:2000
          })
          return;
        }
          that.toCreatOrder(oldcart);
          
        } else {
          console.log('弹框后点取消')
          return;
        }
      }
    })
	}
  },
  //商品详细信息介绍界面
  toBookDetail(e){
    console.log("获得的id是" + e.currentTarget.dataset.id)
    let id = this.data.cart[e.currentTarget.dataset.id].bookId
    console.log("获得书的id是"+id)
    wx.navigateTo({
      url: '/pages/classify/detail/detail?id='+id,
    })
  },
  //将新增的购物车数据存入数据库的方法
  insetCart:function(carts,userId){
    var Carts=carts;
    var userId=userId;
    wx.request({
      url: 'http://192.168.10.162:8080/bookstore-mall/insertCart', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(Carts),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if(res.data){
          console.log("修改成功！")
        }

      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    });
    this.setData({
      iscart: false,
      // cart: [], //数据
      totalPrice: 0,    //总金额
      goodsCount: 0 //数量
    });
  },
  //将购物车中的数据删除的方法
  delCart:function(cartId,userId){
    var cartId = cartId;
    var userId = userId;
    wx.request({
      url: 'http://192.168.10.162:8080/bookstore-mall/delCart/' + cartId + '/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data) {
          console.log("删除成功！")
        }

      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    }); 
  },
  //跳转函数结算成功跳转到订单生成界面
  toCreatOrder:function(oldcart){ 
    let totalPrice=this.data.totalPrice;
    console.log("我发送的数据：" + oldcart[0].bookName);
    wx.navigateTo({
      url: '../cart/creatOrder/creatOrder?oldcart=' + JSON.stringify(oldcart) + '&totalPrice=' + totalPrice,
    })
  }
})
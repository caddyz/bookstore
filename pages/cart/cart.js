// pages/cart/cart.js
var app=getApp()
Page({
  data: {
    iscart: false,//是否在购物车中
    selectAllStatus:false,//是否全部选中
  
    // cart:[],
    cart: [], //数据
    count: 1,   //商品数量默认是1
    totalPrice: 0,    //总金额
    goodsCount: 0, //数量
  },
  //初始加载页面
  onLoad: function (options) {

   var that=this;
    var carts = this.data.cart
    // that.getAllCarts(app.globalData.userInfo.userId);//如果用户登录状态从数据库中获取购物车商品信息
    //验证用户是否登录

  },


  //画面显示
  onShow: function () {
    var that = this;
    var carts=[];
    // this.userOfStatus() //验证用户是否登录显示不同

      // 获取缓存李里面的数据并加入购物车
    var bufferCart = wx.getStorageSync('carts') || [];
    console.log("取出的缓存" + JSON.stringify(bufferCart));
    carts = bufferCart;
    // for (var i = 0; i < bufferCart.length;i++ ){
    //   carts = this.data.cart.concat(bufferCart[i]);
    //   console.log("购物车里的" + JSON.stringify(carts[i]));
    // }
   
    // this.insetCart(bufferCart);//将添加到购物车的数据存入数据库中
   
  that.setData({
    cart:carts
  })
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
    // wx.clearStorageSync('carts')//隐藏页面时将缓存清除
    this.setData({
      cart: [], //清除数据
    })
 
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
    this.getTotalPrice(); //计算总价    
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
    this.getTotalPrice(); //计算总价
 
  },
  /* 删除item */
  delGoods: function (e) {
    var that=this;
    var cartId = that.data.cart[e.target.id.substring(3)].cartId;
    // 如果商品是被选中的状态商品总数量  减去  对应删除项的数量
    if (this.data.cart[e.target.id.substring(3)].isStatus){
      this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].bookNum;
    }
    // 主体数据的数组移除该项
    this.data.cart.splice(e.target.id.substring(3), 1);
    //将数据库中对应的数据删除

    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      goodsCount: this.data.goodsCount
    })
    this.getTotalPrice(); 
    // console.log("cartId:" + cartId)
    that.delCart(cartId,2);//将数据库中用户的购物车数据删除  
    // // 主体数据重新赋入缓存内
   
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

    for (let i = 0; i<carts.length; i++) {
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
    let newcart = [];//未选中结算的
    let oldcart = [];//选中结算的
    console.log("用户账户：" + JSON.stringify(app.globalData.userInfo));
    if (app.globalData.userInfo==null) {
      wx.showModal({
        title: '提示',
        content: '是否登录？',
        success:function(res){
          if (res.confirm) {
            //点击确认登录
            wx.navigateTo({
              url: "/pages/login/login"
            })
                }else{
            wx.showModal({
              title: '提示',
              content: '未登录将无优惠！',
              success: function (res) {
                 if (res.confirm) {
                   wx.navigateTo({
                     url: "/pages/login/login"
                   })
               }else{

        //用户未登录结算
       wx.showModal({
      title: '提示',
      content: '是否结算？',
      success: function (res) {
        if (res.confirm) {     

                for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
                  if (!carts[i].isStatus) {                   // 判断留下未选中的
                    newcart = newcart.concat(carts[i]);
                  }

                  //将选中的交给定单处理
                  else{
                    oldcart = oldcart.concat(carts[i]); //选中结算的商品
                  }

              }
          console.log("创建订单并将订单数据存入书库！");
        //如果用户未选定商品
        if(oldcart.length==0){
          wx.showToast({
            title: '未选定结算商品！',
            duration:2000
          })
          return;
        }
          //跳转到订单生成界面,将结算的商品传给订单生成界面
          that.toCreatOrder(oldcart);

          // 将数据更新
          that.setData({
            cart: newcart
          });


        } else {
          console.log('弹框后点取消')
          return;
        }
      }
    })
               }
             }           
              })
                }
                }
            })       
        }else{

      //用户登录后结算
      wx.showModal({
        title: '提示',
        content: '是否结算？',
        success: function (res) {
          if (res.confirm) {

            for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
              if (!carts[i].isStatus) {                   // 判断留下未选中的
                newcart = newcart.concat(carts[i]);
              }

              //将选中的交给定单处理
              else {
                oldcart = oldcart.concat(carts[i]); //选中结算的商品
              }

            }
            console.log("创建订单并将订单数据存入书库！");
            //如果用户未选定商品
            if (oldcart.length == 0) {
              wx.showToast({
                title: '未选定结算商品！',
                duration: 2000
              })
              return;
            }
            //跳转到订单生成界面,将结算的商品传给订单生成界面
            that.toCreatOrder(oldcart);

            // 将数据更新
            that.setData({
              cart: newcart
            });


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
    // console.log("获得的id是" + e.currentTarget.dataset.id);
    let id = this.data.cart[e.currentTarget.dataset.id].bookId;
    console.log("获得书的id是"+id);
    wx.navigateTo({
      url: '/pages/classify/detail/detail?bookId='+id,
    })
  },

  //将新增的商品存入购物车数据存入数据库的方法
  insetCart:function(carts){
    var Carts=carts;
    var userId=userId;
    wx.request({
      url: app.URL + 'bookstore-mall/insertCart', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(Carts),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if(res.data==true){
          console.log("添加成功！")
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
  //用户将购物车中的数据删除的方法
  delCart:function(cartId,userId){
    var cartId = cartId;
    var userId = userId;
    wx.request({
      url: app.URL + 'bookstore-mall/delCart/' + cartId + '/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data==true) {
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

    console.log("我发送的数据：" + oldcart[0]);
    wx.navigateTo({
      url: '../cart/creatOrder/creatOrder?oldcart=' + JSON.stringify(oldcart) + '&totalPrice=' + totalPrice,
    })
  },
  //从数据库中获取购物车的数据
  getAllCarts: function (userId){
    var that = this
    // //数据库获取初始数据
    wx.request({
      url: app.URL + 'bookstore-mall/selectCart/' + userId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {

          that.setData({
            cart: res.data
          })
          that.onShow();
          console.log(that.data.cart)
        } else {
          that.setData({
            cart: cart
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
  //验证用户是否登录显示不同的
  userOfStatus:function(){
    var that=this;
    //验证用户是否登录
    if (app.globalData.userInfo != null) {
      that.getAllCarts(2);//如果用户登录状态从数据库中获取购物车商品信息
    } else {
      //如果用户没有登录
      var bufferCart = wx.getStorageSync('cart') || [];//直接读取缓存中的数据
      that.setData({
        cart: bufferCart
      });
    }
  }
})
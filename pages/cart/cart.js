// pages/cart/cart.js
Page({
  data: {
    iscart: false,
    cart: [{
      id: "001",
      imgUrl: "../cart/images/history-21.jpg",
      name: "燃烧的远征",
      price: "65.00",
      statuse:true,
      num:'1'
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
        num: '1'
      },], //数据
    count: 1,   //商品数量默认是1
    total: 0,    //总金额
    goodsCount: 0 //数量
  },
  onLoad: function (options) {
	console.log("adf");
		wx.navigateTo({
		url: "/pages/login/login"
    })
  },
  onShow: function () {
    var that = this;
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    // var arr = wx.getStorageSync('cart') || [];
    var arr=that.data.cart
    // 有数据的话，就遍历数据，计算总金额 和 总数量
    if (arr.length > 0) {
      for (var i in arr) {
        if(arr[i].statuse){
          that.data.total += Number(arr[i].price) * Number(arr[i].num);
          that.data.goodsCount += Number(arr[i].num);
        }
      }
      // 更新数据
      this.setData({
        iscart: true,
        cart: arr,
        total: that.data.total,
        goodsCount: that.data.goodsCount
      });
    }
  },
  onHide: function () {
    // 清除数据
    this.setData({
      iscart: false,
      cart: [], //数据
      total: 0,    //总金额
      goodsCount: 0 //数量
    });
  },
  /* 减数 */
  delCount: function (e) {
    console.log(e)
    // 获取购物车该商品的数量
    // [获取设置在该btn的id,即list的index值]
    if (this.data.cart[e.target.id.substring(3)].count <= 1) {
      return;
    }
    // 商品总数量-1
    this.data.goodsCount -= 1;
    // 总价钱 减去 对应项的价钱单价
    this.data.total -= Number(this.data.cart[e.target.id.substring(3)].price);
    // 购物车主体数据对应的项的数量-1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].count = --this.data.cart[e.target.id.substring(3)].count;
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      goodsCount: this.data.goodsCount
    })
    // 主体数据重新赋入缓存内
    try {
      wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
      console.log(e)
    }
  },
  /* 加数 */
  addCount: function (e) {
    // 商品总数量+1
    this.data.goodsCount += 1;
    // 总价钱 加上 对应项的价钱单价
    this.data.total += Number(this.data.cart[e.target.id.substring(3)].price);
    // 购物车主体数据对应的项的数量+1  并赋给主体数据对应的项内
    this.data.cart[e.target.id.substring(3)].count = ++this.data.cart[e.target.id.substring(3)].count;
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      goodsCount: this.data.goodsCount
    })
    // 主体数据重新赋入缓存内
    try {
      wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
      console.log(e)
    }
  },
  /* 删除item */
  delGoods: function (e) {
    // 商品总数量  减去  对应删除项的数量
    this.data.goodsCount = this.data.goodsCount - this.data.cart[e.target.id.substring(3)].count;
    // 总价钱  减去  对应删除项的单价*数量
    this.data.total -= this.data.cart[e.target.id.substring(3)].price * this.data.cart[e.target.id.substring(3)].count;
    // 主体数据的数组移除该项
    this.data.cart.splice(e.target.id.substring(3), 1);
    // 更新data数据对象
    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      goodsCount: this.data.goodsCount
    })
    // 主体数据重新赋入缓存内
    try {
      wx.setStorageSync('cart', this.data.cart)
    } catch (e) {
      console.log(e)
    }
  },
  //结算函数，生成商品订单并将数据提交到订单界面进行处理
  toSettlement(){

  },
  //单选择商品事件
  selectList(e) {
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
    let carts = this.data.carts;                    // 获取购物车列表
    const selected = carts[index].selected;         // 获取当前商品的选中状态
    carts[index].selected = !selected;              // 改变状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();                           // 重新获取总价
  },
  
  //全选商品事件
   selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;    // 是否全选状态
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();                               // 重新获取总价
  },

//总价计算函数
getTotalPrice() {
  let carts = this.data.carts;                  // 获取购物车列表
  let total = 0;
  for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
    if (carts[i].selected) {                   // 判断选中才会计算价格
      total += carts[i].num * carts[i].price;     // 所有价格加起来
    }
  }
  this.setData({                                // 最后赋值到data中渲染到页面
    carts: carts,
    totalPrice: total.toFixed(2)
  });
}
})
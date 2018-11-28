// pages/cart/cart.js
Page({
  data: {
    iscart: false,
    cart: [{
      id: "001",
      imgUrl: "http://img5.imgtn.bdimg.com/it/u=2906541843,1492984080&fm=23&gp=0.jpg",
      name: "女装T恤中长款大码摆裙春夏新款",
      price: "65.00",
      statuse:true
    },
      {
        id: "002",
        imgUrl: "http://img4.imgtn.bdimg.com/it/u=1004404590,1607956492&fm=23&gp=0.jpg",
        name: "火亮春秋季 男青年修身款圆领男士T恤",
        price: "68.00",
        statuse: true
      },
      {
        id: "003",
        imgUrl: "http://img1.imgtn.bdimg.com/it/u=2305064940,3470659889&fm=23&gp=0.jpg",
        name: "新款立体挂脖t恤女短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00",
        statuse: true
      },
      {
        id: "004",
        imgUrl: "http://img4.imgtn.bdimg.com/it/u=3986819380,1610061022&fm=23&gp=0.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "119.00",
        statuse: true
      },
      {
        id: "005",
        imgUrl: "http://img1.imgtn.bdimg.com/it/u=3583238552,3525141111&fm=23&gp=0.jpg",
        name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
        price: "69.00",
        statuse: true
      },
      {
        id: "006",
        imgUrl: "http://img2.imgtn.bdimg.com/it/u=1167272381,3361826143&fm=23&gp=0.jpg",
        name: "新款立体挂脖t恤短袖大码宽松条纹V领上衣显瘦休闲春夏",
        price: "86.00",
        statuse: true
      },
      {
        id: "007",
        imgUrl: "http://img0.imgtn.bdimg.com/it/u=789486313,2033571593&fm=23&gp=0.jpg",
        name: "时尚字母三角露胸t恤女装亮丝大码宽松不规则春夏潮",
        price: "119.00",
        statuse: true
      },
      {
        id: "008",
        imgUrl: "http://img2.imgtn.bdimg.com/it/u=3314044863,3966877419&fm=23&gp=0.jpg",
        name: "男运动上衣春季上新品 上衣流行装青年",
        price: "69.00",
        statuse: true
      },], //数据
    count: 1,   //商品数量默认是1
    total: 0,    //总金额
    goodsCount: 0 //数量
  },
  onLoad: function (options) {

  },
  onShow: function () {
    var that = this;
    // 获取产品展示页保存的缓存数据（购物车的缓存数组，没有数据，则赋予一个空数组）
    // var arr = wx.getStorageSync('cart') || [];
    var arr=that.data.cart
    // 有数据的话，就遍历数据，计算总金额 和 总数量
    if (arr.length > 0) {
      for (var i in arr) {
        that.data.total += Number(arr[i].price) * Number(arr[i].count);
        that.data.goodsCount += Number(arr[i].count);
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

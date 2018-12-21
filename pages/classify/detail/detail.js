var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data:{
    list: [],//动态页面
    item:[],//显示所有书
    out:[],//显示折扣
    Nums:[],//显示库存
    author:[],//显示一个或多个作者
    isCollected:'' ? false : true ,//收藏
    bookId: '',
    userId:'',
    commentContent:'',
     // 评论字符
    searchinput:'',
  },
 


  // 收藏事件
  handleCollection: function (e) {
    var that = this
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    } else {
      var userId = app.globalData.userInfo.userId
      // console.log("传入的数据:" + userId)
      // var userId = 2
      var bookId = that.data.bookId

      //判断收藏的状态
      that.isCollector(userId, bookId, function (data) {//callback返回
        if (data == false) {
          wx.showToast({
            title: "收藏成功",
            icon: "success",
            durantion: 2000
          })
          that.insertCollector(userId, bookId);//添加收藏
          return;
        }
        else {
          wx.showToast({
            title: "取消收藏",
            icon: "none",
            durantion: 2000
          })
          that.delCollector(userId, bookId);//取消收藏
          return;
        }
      })
    }
  },

  
  addCar: function (e) {
    //将购物车数据添加到缓存
    var that = this
    // 默认书本为1
    var bookNum = 1
    //  提取bookId
    var bookId = that.data.bookId
    // console.log("传入的数据:" + bookId)
    var bookName = this.data.list[0].bookName
    // console.log("获取的名字为：" + bookName)
    var bookSalesPrice = this.data.list[0].bookSalesPrice
    // console.log("获取的金额为：" + bookSalesPrice)
    var bookCoverImage = this.data.list[0].bookCoverImage
    // console.log("获取的图片为：" + bookCoverImage)
    var bookStatus = this.data.list[0].bookStatus
    // console.log("获取的状态为：" + bookStatus)
  
    
    if(this.data.out[0] != null){
      var discountPrice = this.data.out[0].discountPrice;
      // console.log("获取的状态为：" + discountPrice)
    }else{
      var discountPrice = null;
      // console.log("获取的状态为：" + discountPrice)
    }

    // 获取缓存中的已添加购物车信息
    var carts = [];
    carts = wx.getStorageSync('carts') || [];
    // console.log(carts)

    if (carts != []) {
      var newcarts = [];
      for (var i in carts) {
        if (bookId != carts[i].bookId) {
          newcarts = newcarts.concat(carts[i]);
        } else {
          wx.showToast({
            title: "购物车已经存在！",
            icon: "success",
            durantion: 2000
          })
        }
      }
      carts = newcarts;
      // console.log("newcarts" + JSON.stringify(newcarts));
    }
    //如果不存在，传入该货品信息
    var newcarts = {
      bookId: bookId,
      bookName: bookName,
      bookPrice: bookSalesPrice,
      imgUrl: bookCoverImage,
      isStatus: true,
      discountPrice: discountPrice,
      bookNum: 1,
    }
    carts = carts.concat(newcarts);
    // console.log("添加的数据：" + JSON.stringify(carts));
    // 加入购物车数据，存入缓存
    wx.setStorage({
      key: 'carts',
      data: carts,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "您已将物品加入购物车",
          icon: "success",
          durantion: 2000
        })
      }
    })
  },
// 获取输入的评论
  handNewComment: function (e) {
    this.setData({
      commentContent: e.detail.value
    })
    },
// 点击事件 判断登陆
  commentAll: function (e) {
    if (app.globalData.userInfo == null) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      }
    // console.log("是什么？:" + this.data.commentContent);.
    // 评论后input框清空
    this.setData({
      searchinput: '',
    })
  },

  // 评论
  formSubmit: function (e){
    var that = this
    var bookId = that.data.bookId
    var userId = app.globalData.userInfo.userId
    var commentContent = this.data.commentContent
    var commentReply = this.data.commentReply

 
    if (commentContent == undefined || commentContent == '' ){
      wx.showToast({
        title: '请输入评论',
        icon: 'loading',
        duration: 1500
      })
       setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
    wx.request({
  url:app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/'+commentContent+'/commentAdd',
      })
      wx.showToast({
        title: '评论成功',
        icon: 'success',
        duration: 1000
      })
    }
    // if(commentContent != undefined && userId == userId && bookId == bookId && commentReply==null){
    //   wx.request({
    //   url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/'+commentReply+'/commentAll',
    //   })
    //   wx.showToast({
    //     title: '追评成功',
    //     icon: 'success',
    //     duration: 1000
    //   })
    // }else{
    //   wx.showToast({
    //     title: '评论以超过限制',
    //     icon: 'loading',
    //     duration: 1500
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('传入的数据' + options.bookId)
    var bookId = options.bookId;
    // var userId=2;
// 调用查询所有书籍信息
   var that = this;
   wx.request({
     url: app.URL + 'bookstore-mall/' + options.bookId+'/allContext',
     data:{},
     header:{
       'content-type':'application/json'
     },
     success:function(res){
      //  console.log(res.data)
    
       that.setData({
          list: res.data, //设置数据
         bookId: options.bookId,
        })
      },
      fail: function (err) {
        console.log(err)
     }
    })
    // 查询所有评论
    wx.request({
      url: app.URL + 'bookstore-mall/' + options.bookId + '/allContext/kindAll',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          item: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 查询所有折扣和折扣后的价格
    wx.request({
      url: app.URL + 'bookstore-mall/selectActivity/' + options.bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          out: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 查询所有作者
    wx.request({
      url: app.URL + 'bookstore-mall/selectAllAuthor/' + options.bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          author: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 显示所有库存
    wx.request({
      url: app.URL + 'bookstore-mall/' + options.bookId + '/selectNum',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          Nums: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 判断收藏状态
    // this.isCollector(userId, bookId, function (isCollector) {
    //   that.setData({
    //     isCollected: isCollected
    //   })
    // });
    
    if (app.globalData.userInfo == null) {
      var userId = 0
    } else {
      var userId = app.globalData.userInfo.userId
    }
    wx.request({
      url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/isExit',
      data: {},
      header: {  
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log("判断收藏 :" + res.data)
        if (res.data == false) {
          that.setData({
            isCollected: true
          })
          // console.log("is:" + that.data.isCollected);
        } else {
          that.setData({
            isCollected: false
          })
          // console.log("this:" + that.data.isCollected);
        }

      }
    })
  },
  

  //判断数据库中的这本书是否被收藏
  isCollector: function (userId, bookId, callback) {
    var that = this;
    var userId = app.globalData.userInfo.userId
    var bookId = bookId
    console.log("bookId:" + bookId)
    wx.request({
      url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/isExit',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //  console.log("判断收藏 :"+res.data)
        if (res.data == false) {
          callback(false);//返回false说明这本书没有被收藏 
          that.setData({
            isCollected: false
          })
          console.log("is:" + that.data.isCollected);
        } else {
          callback(true);
          that.setData({
            isCollected: true
          })
        }

      }
    })
  },
  //添加收藏到数据库中的方法
  insertCollector: function (userId, bookId) {
    var that = this;
    var userId = app.globalData.userInfo.userId
    var bookId = that.data.bookId
    wx.request({
      url: app.URL + 'bookstore-mall/' + userId + '/' + bookId + '/kindAdd',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data == 0) {
          // console.log("添加失败！");
        }
        else {
          // console.log("添加成功！");
        }
      }
    })
  },
  //取消收藏的方法
  delCollector: function (userId, bookId) {
    var that = this;
    var userId = app.globalData.userInfo.userId
    var bookId = that.data.bookId
    wx.request({
      url: app.URL + 'bookstore-mall/delete/' + userId + '/' + bookId,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.status)
        if (res.data.status == true) {
          // console.log("取消成功！");
        }
        else {
          // console.log("取消收藏失败！");
        }
      }
    })
  }


})

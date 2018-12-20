var util = require('../../utils/util.js')
import templates from '../template/bookinfoTemplate'
var app = getApp()
Page({
  data: {
    booksLeft: [],
    booksRight: [],
    curIndex: 0,
  },
  switchRightTab: function (e) {
    let list = this.data.booksLeft;
    let index = e.target.dataset.index;
    let that = this
    var bookCategory = list[index].bookCategory
    // console.log("点击的种类是：" + list[index].bookCategory)
    wx.request({
      url: app.URL + 'bookstore-mall/' + bookCategory + '/allBook',
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          booksRight: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 把点击到的某一项，设为当前index  
    // this.setData({
    //   curIndex: index,
    // })
  },


  // 跳转
  alljump: function (e) {
    // e.target.dateset 来获取属性值
    let bookId = e.currentTarget.dataset.item.bookId
    // console.log("点击的书ID是：" + JSON.stringify(bookId))
    wx.navigateTo({
      url: '/pages/classify/detail/detail?bookId=' + bookId,
    })
  },


  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    // 数据起始加载
    // 查询所有种类
    var that = this;
    wx.request({
      url: app.URL + 'bookstore-mall/selectBook',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          booksLeft: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
    // 查询所有书
    wx.request({
      url: app.URL + 'bookstore-mall/selectAllBook',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          booksRight: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
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


})




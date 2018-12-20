// pages/favorite/favorite.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isScroll: true,
  delBtnWidth: 160,
   list:[],
   mes:[],
   hiddeinfo:false
  },
  /**
   * 收藏跳转
   */
  favoriteSkip:function(e){
    let that = this;
    wx.navigateTo({
      url: '/pages/classify/detail/detail?bookId='
        + that.data.list[e.currentTarget.dataset.index].bookId,
    })
  },
  /**
   * 收藏删除
   */
  deleteBookInfo: function (e) {
    let that = this;
    let listData = that.data.list;
    let index = e.currentTarget.dataset.index;//获取下标
    wx.request({
      url: app.URL + 'bookstore-mall/delete/' + app.globalData.userInfo.userId +'/' + listData[index].bookId,
      header: { 'content-type': 'application/json' },
      success: function (res){
        listData.splice(index, 1);
        that.setData({
          list: listData,
          mes:res.data
        });
        wx.showToast({
          title: that.data.mes.msg,
          icon:'none'
        })
      },
      fail:function(){
        wx.showToast({
          title: '删除失败',
          icon:'none'
        })
      }
    })
    if (that.data.list.length -1 == 0) {
      that.setData({
        hiddeinfo: true
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.URL + 'bookstore-mall/' + app.globalData.userInfo.userId + '/favorite',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        if (res.data.length != 0) {
          for(var i in res.data){
            res.data[i].right = 0
          }
          that.setData({
            list: res.data
          })
        } else {
          that.setData({
            hiddeinfo: true
          })
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goBuy:function(){
    wx.redirectTo({
      url: '../more/more',
    })
  },
  //手指触摸开始
  drawStart: function (e) {
    let that = this;
    //设置开始时停留的触摸点的数组信息  初始为0
    var touch = e.touches[0]

    for (var index in that.data.list) {
      var item = that.data.list[index]
      item.right = 0
    }
    that.setData({
      list: that.data.list,
      startX: touch.clientX,//设置初始时横向的位置
    })

  },
  //手指移动时的事件
  drawMove: function (e) {
    let that = this;
    var touch = e.touches[0]
    var item = that.data.list[e.currentTarget.dataset.index]
    //移动了多少
    var disX = that.data.startX - touch.clientX
    //通过移动的距离来显示隐藏的区域
    if (disX >= 20) {
      if (disX > that.data.delBtnWidth) {
        disX = that.data.delBtnWidth
      }
      item.right = disX
      that.setData({
        isScroll: false,
        list: that.data.list
      })
    } else {
      item.right = 0
      that.setData({
        isScroll: true,
        list: that.data.list
      })
    }
  },
  //移动结束时事件
  drawEnd: function (e) {
    let that = this;
    var item = that.data.list[e.currentTarget.dataset.index]
    //判断移动结束时的时候的水平距离是否能显示隐藏的区域
    if (item.right >= that.data.delBtnWidth / 2) {
      item.right = that.data.delBtnWidth
      that.setData({
        isScroll: true,
        list: that.data.list,
      })
    } else {
      item.right = 0
      that.setData({
        isScroll: true,
        list: that.data.list,
      })
    }
  },
})
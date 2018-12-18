// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    mes: [],
    hiddeinfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: app.URL + 'bookstore-mall/' + app.globalData.userInfo.userId+'/comment',
      success:function(res){
        if(res.data.length != 0){
          that.setData({
            list:res.data
          })
          for (var i in that.data.list) {
            that.data.list[i].flag = false; // 添加新属性
          };
        }else{
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
  // 展开
  commentClick:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index,
      key = 'list['+index+'].flag',
      val = that.data.list[index].flag;
    that.setData({
      [key]: !val
    })
  },
  // 书评删除
  deleteComment:function(e){
    let that = this;
    let listData = that.data.list;
    let index = e.currentTarget.dataset.index;//获取下标
    let d = JSON.stringify(listData[index].books);
    let bookjson = d.substr(1, d.length-2);
    wx.request({
      url: app.URL + 'bookstore-mall/deletecomment/' + app.globalData.userInfo.userId +'/'+JSON.parse(bookjson).bookId,
      header: { 'content-type': 'application/json' },
      success: function (res) {
        listData.splice(index, 1);
        that.setData({
          list: listData,
          mes: res.data
        });
        wx.showToast({
          title: that.data.mes.msg,
          icon: 'none'
        })
      },
      fail: function () {
        wx.showToast({
          title: '链接失败',
          icon: 'none'
        })
      }
    })
    if (that.data.list.length - 1 == 0) {
      that.setData({
        hiddeinfo: true
      })
    }
  },
  //删除追评
  deleteReply:function(e){
    let that = this;
    let listData = that.data.list;
    let index = e.currentTarget.dataset.index;
    let d = JSON.stringify(listData[index].books);
    let bookjson = d.substr(1, d.length - 2);
    wx.request({
      url: app.URL + 'bookstore-mall/deleteReplyComment/' + app.globalData.userInfo.userId + '/' + JSON.parse(bookjson).bookId,
      success(res){
        if(res.data.status === true){
          listData[index].commentReply = null;
          listData[index].commentReplyDatatime = null;
          that.setData({
            list: listData,
            mes: res.data
          })
          wx.showToast({
            title: that.data.mes.msg,
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '删除失败',
            icon: 'none'
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '链接失败',
          icon: 'none'
        })
      }
    })
  }
})
// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      'title':'简介',
      'content':'这是一个微信小程序'
    },{
      'title': '地址',
      'content': '四川'
    },{
      'title': '什么都没有',
      'content': '你好哇！'    
    }],
    selectedFlag: [],
  },
  expandDetail: function (e) {
    let that = this;
    var index = e.currentTarget.dataset.index;//获取当前下标
    var key = "selectedFlag[" + index + "].flag";
    var val = that.data.selectedFlag[index].flag;
      that.setData({
          [key]: !val //控制显示
        });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    for (var i in that.data.list) {
      that.data.list[i].flag = false; // 添加新属性
    };
    that.setData({
      selectedFlag: that.data.list
    });
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
  change: function () {
    let that = this;
    let b = !(that.data.isHide)
    that.setData({
      isHide: b
    })
  }
})
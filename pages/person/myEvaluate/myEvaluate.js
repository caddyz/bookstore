const app = getApp()
Page({
  data:{
    hiddenCon:true,
    list:[],
    orderlist:[]
  },
  //订单评价跳转
  toMyOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  //加载时获取所有的评论信息
  onLoad: function (options){
    let that = this;
    wx.request({
      url: app.URL + 'bookstore-mall/allOrderComment/' + app.globalData.userInfo.userId,
      success(res){
        if (res.data.length != 0){
          that.setData({
            list:res.data
          })
          for (var i in that.data.list) {
            that.data.list[i].flag = false; // 添加分数展开属性
          };
          for (var j in that.data.list) {
            that.data.list[j].scoreflag = false; // 添加内容展开属性
          };
          for (var k in that.data.list) {
            that.data.list[k].detailsflag = false; // 添加详情展开属性
          };
        }else{
          that.setData({
            hiddenCon:false
          })
        }
      },
      fail(){
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      }
    })
  },
  //详情展开
  detailsClick:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index,
      key = 'list[' + index + '].detailsflag',
      val = that.data.list[index].detailsflag;
    that.setData({
      [key]: !val
    })
    wx.request({
      url: app.URL + 'bookstore-mall/getOrderInculdeBooks/' + that.data.list[index].orderId,
      success(res){
        that.setData({
          orderlist:res.data
        })
      }
    })
    // console.log("订单编号:"+that.data.list[index].orderId)
  },
  // 分数展开
  scoreClick: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index,
      key = 'list[' + index + '].scoreflag',
      val = that.data.list[index].scoreflag;
    that.setData({
      [key]: !val
    })
  },
  // 内容展开
  commentClick: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index,
      key = 'list[' + index + '].flag',
      val = that.data.list[index].flag;
    that.setData({
      [key]: !val
    })
  },
  // 评论删除
  deleteComment: function (e) {
    let that = this;
    let listData = that.data.list;
    let index = e.currentTarget.dataset.index;//获取下标
    console.log("index:"+index)
    wx.request({
      url: app.URL + 'bookstore-mall/deleteOrderComment/' + app.globalData.userInfo.userId +'/' + listData[index].orderId,
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
          title: '删除失败',
          icon: 'none'
        })
      }
    })
    if (that.data.list.length - 1 == 0) {
      that.setData({
        hiddenCon: false
      })
    }
  },
  //订单
  orderSkip:function(){

  }
});

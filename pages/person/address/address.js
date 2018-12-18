var app=getApp()
Page({
  data: {
    
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    first:''//判断用户是否是第一次添加收货地址
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  onLoad: function (options){
    var that=this;
    var first = options.first;
    that.setData({
      first: first
    })
  },
  //将新修改的信息添加到数据库进行储存
  saveAddress: function (e) {

    //判断用户是否登录
    if (app.globalData.userInfo != null){
      var receiveAddress = {
        userId: app.globalData.userInfo.userId,
        addressConsignee: e.detail.value.consignee,
        addressMobile: e.detail.value.mobile,
        addressProvince: e.detail.value.addressl[0],
        addressCity: e.detail.value.addressl[1],
        addressCounty: e.detail.value.addressl[2],
        addressDetail: e.detail.value.address,
        addressStatus: this.data.first
      }
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      //改变本地数据
      this.setData({
        region: e.detail.value
      })

      wx.request({
        url: app.URL + 'bookstore-mall/addReceiveAddress', //提交的网络地址
        method: "POST",
        data: JSON.stringify(receiveAddress),
        dataType: "json",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //--init data     
          if (res.data) {
            //数据存入缓存
            // wx.setStorage({
            //   key: "regions",
            //   data: e.detail.value
            // })
            //提示if
            if (res.data == true) {
              wx.showToast({
                title: '提交成功！',
              });
              wx.navigateBack();//返回上一页面
            }

          } else {
            wx.showToast({
              title: '添加失败！',
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
    }else{

      //将用户收货地址进行封装
      var receiveAddress = {
        addressConsignee: e.detail.value.consignee,
        addressMobile: e.detail.value.mobile,
        addressProvince: e.detail.value.addressl[0],
        addressCity: e.detail.value.addressl[1],
        addressCounty: e.detail.value.addressl[2],
        addressDetail: e.detail.value.address
      }
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      //改变本地数据
      this.setData({
        region: e.detail.value
      })
      var newAddress = receiveAddress;
      var pages = getCurrentPages();
      var currPage = pages[pages.length - 1]; //当前页面 
      var prevPage = pages[pages.length - 2]; //上一个页面 
      prevPage.setData({
        newAddress: newAddress,
      }) //给上级页面的变量赋值 
      wx.navigateBack() //返回上级页面  
    }
   
  },
  
  
  //数据重置的方法
   formReset: function () {
    console.log('form发生了reset事件')
  }

})

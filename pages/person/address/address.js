Page({
  data: {
   
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //将新修改的信息添加到数据库进行储存
  saveAddress: function (e) {
    var receiveAddress={
      consignee:e.detail.value.consignee,
      mobile:e.detail.value.mobile,
      province:e.detail.value.addressl[0],
      city:e.detail.value.addressl[1],
      county:e.detail.value.addressl[2],
      details: e.detail.value.address
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //改变本地数据
    this.setData({
      region: e.detail.value
    })
  
    wx.request({
      url: 'http://192.168.10.162:8080/bookstore/address/' + JSON.stringify(receiveAddress), //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        var status = res.data.status;
        if (status == 1) {
          //数据存入缓存
          wx.setStorage({
            key: "regions",
            data: e.detail.value
          })
          //提示
          wx.showToast({
            title: '提交成功！',
          })
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
  },
  
  
  //数据重置的方法
   formReset: function () {
    console.log('form发生了reset事件')
  },
 
})

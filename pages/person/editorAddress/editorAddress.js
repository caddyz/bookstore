Page({
  data: {

    multiIndex: [0, 0, 0],
    // date: '2016-09-01',
    // time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    id:''
  },
  //地址选择器内容发生改变的时候出发的事件
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //将新添加的数据进行储存
  editorAddress: function (e) {
    var that=this
    var editorAddress = {
      id:that.data.id,
      consignee: e.detail.value.consignee,
      mobile: e.detail.value.mobile,
      province: e.detail.value.addressl[0],
      city: e.detail.value.addressl[1],
      county: e.detail.value.addressl[2],
      details: e.detail.value.address
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    //改变本地数据
    this.setData({
      region: e.detail.value
    })
    //数据存入缓存
    wx.setStorage({
      key: "editorRegions",
      data: e.detail.value
    })
    // wx.request({
    //   url: 'http://192.168.10.162:8080/bookstore/address/' + JSON.stringify(editorAddress), //提交的网络地址
    //   method: "GET",
    //   dataType: "json",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     //--init data
    //     var status = res.data.status;
    //     if (status == 1) {
    //       //数据存入缓存
    //       wx.setStorage({
    //         key: "editorRegions",
    //         data: e.detail.value
    //       })
    //       //提示
    //       wx.showToast({
    //         title: '提交成功！',
    //       })
    //     } else {
    //       wx.showToast({
    //         title: '添加失败！',
    //       })
    //     }
    //   },
    //   fail: function () {
    //     // fail
    //     wx.showToast({
    //       title: '网络异常！',
    //       duration: 30000
    //     });
    //   }
    // })
  },


  //数据重置的方法
  formReset: function () {
    console.log('form发生了reset事件')
  },
  onLoad: function (options) {
    console.log("接收到的参数是id=" + options.id);
    //数据时数组的接收方法
    // this.data.list = JSON.parse(options.list);
    this.setData({
      id: options.id
    })
  },
})

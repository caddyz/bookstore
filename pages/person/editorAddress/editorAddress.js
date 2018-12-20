var app=getApp()
var utils=require("../../../utils/util.js");
Page({
  data: {

    multiIndex: [0, 0, 0],
    // date: '2016-09-01',
    // time: '12:01',
    region: ['', '', ''],
    customItem: '全部',
    editorAddress:'',//修改的收货地址
    first:''//判断收货地址的状态
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

    if (!utils.checkPhone(e.detail.value.mobile)) {
      wx.showToast({
        title: '手机号有误！',
      })
      return;
    }
    //进行数据初始化
   var addressConsignee=null;
    var addressMobile = null;
    var addressProvince = null;
    var addressCity = null;
    var addressCounty = null;
    var addressDetail = null;
    if (e.detail.value.consignee != '') { addressConsignee = e.detail.value.consignee};
    if (e.detail.value.mobile != '') { addressMobile = e.detail.value.mobile };
    if (e.detail.value.addressl[0] != '') { addressProvince = e.detail.value.addressl[0] };
    if (e.detail.value.addressl[1] != '') { addressCity = e.detail.value.addressl[1] };
    if (e.detail.value.addressl[2] != '') { addressCounty = e.detail.value.addressl[2] };
    if (e.detail.value.address != '') { addressDetail = e.detail.value.address };
    var editorAddress = {
      addressId: that.data.editorAddress.addressId,
      userId: app.globalData.userInfo.userId,
      addressConsignee: addressConsignee,
      addressMobile: addressMobile,
      addressProvince: addressProvince,
      addressCity: addressCity,
      addressCounty: addressCounty,
      addressDetail: addressDetail,
      addressStatus:that.data.first
    }
  
    //改变本地数据
    this.setData({
      region: e.detail.value
    })
   
    wx.request({
      url: app.URL + 'bookstore-mall/editorReceiveAddress', //提交的网络地址
      method: "POST",
      data: JSON.stringify(editorAddress),
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data) {
      
          //提示
          wx.showToast({
            title: '修改成功！',
          })
          wx.navigateBack();
        } else {
          wx.showToast({
            title: '修改失败！',
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
  onLoad: function (options) {
    var that=this;
    var address = JSON.parse(options.editorAddress)  ;
    var regions = [address.addressProvince, address.addressCity, address.addressCounty];
    console.log("接收的地址是：" + JSON.stringify(address));
    //数据时数组的接收方法
    // that.data.list = JSON.parse(options.list);
    this.setData({
      editorAddress: address,//收货地址的id
      region: regions,
       first: options.first //收货地址的状态
    })
  },
})

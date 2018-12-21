var app=getApp()
var utils=require("../../../utils/util.js");
Page({
  data: {
    
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    first:'',//判断用户是否是第一次添加收货地址
    choose:''
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },


  onLoad: function (options){
    var that=this;
    if (app.globalData.userInfo != null){
      var first = options.first;
      var choose = options.choose
      that.setData({
        first: first,
        choose:choose
      })
    }
 

  },
  //将新修改的信息添加到数据库进行储存
  saveAddress: function (e) {
    if (e.detail.value.consignee==''){
      wx.showToast({
        title: '请输入收货人！',
      })
      return;
    }
    if (e.detail.value.mobile==''){
      wx.showToast({
        title: '请输入手机号！',
      })
      return;
    }
    if (!utils.checkPhone(e.detail.value.mobile))
    {
      wx.showToast({
        title: '手机号有误！',
      })
      return;
    }
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
      var choose= this.data.choose //获得状态
      // console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
            
            if (res.data == true) {
              wx.showToast({
                title: '提交成功！',
              });

              //用户下单时添加的收货地址
              // if (choose== 1) {
              //   // console.log("用户下单时写的收货地址！");
              //   var newAddress = receiveAddress;
              //   // console.log("用户下单时写的收货地址！" + newAddress);
              //   var pages = getCurrentPages();
              //   var currPage = pages[pages.length - 1]; //当前页面 
              //   var prevPage = pages[pages.length - 3]; //上一个页面 
              //   prevPage.setData({
              //     newAddress: newAddress,
              //   }) //给上级页面的变量赋值 
              //   wx.navigateBack({
              //     delta:1//返回下单页面
              //   }) //返回上级页面  
              // }

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
      //用户未登录的收货地址
      //将用户收货地址进行封装
      var receiveAddress = {
        userId: app.globalData.userId,
        addressConsignee: e.detail.value.consignee,
        addressMobile: e.detail.value.mobile,
        addressProvince: e.detail.value.addressl[0],
        addressCity: e.detail.value.addressl[1],
        addressCounty: e.detail.value.addressl[2],
        addressDetail: e.detail.value.address
      }
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
//将用户的收货地址提交到后台数据库
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

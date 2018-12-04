Page({
  /**

   * 页面的初始数据

   */
  
  data: {
    mydata: ['广东省', '广州市', '海珠区'],
    addressList: [],
    messges:"你是个大坏蛋",
    regions:[],
    // regions:[
    //   {
    //     addressId:'1',
    //     userId:'456',
    //     addressConsignee:'小李',
    //     addressMobile:'123456',
    //     addressProvince:"四川",
    //     addressCity:"成都",
    //     addressCounty:"高新区",
    //     addressDetail:"我不知道"
    //   },
    //   {
    //     addressId: '1',
    //     userId: '456',
    //     addressConsignee: '小李',
    //     addressMobile: '123456',
    //     addressProvince: "四川",
    //     addressCity: "成都",
    //     addressCounty: "高新区",
    //     addressDetail: "我不知道"
    //   },
    //   {
    //     addressId: '1',
    //     userId: '456',
    //     addressConsignee: '小李',
    //     addressMobile: '123456',
    //     addressProvince: "四川",
    //     addressCity: "成都",
    //     addressCounty: "高新区",
    //     addressDetail: "我不知道"
    //   }
    // ]
  },
  // 这是页面初次加载的方法
  onLoad: function (options) {
    var that = this;
    // //数据库获取初始数据
    wx.request({
      url: 'http://192.168.10.162:8080/bookstore-mall/selectReceiveAddress/' + 1, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data

        if (res.data != null) {
          that.setData({
            regions: res.data,
          })
        } else {
          that.setData({
            regions: this.data.regions
          })
        }
        console.log(that.data.regions)
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
//默认地址编辑
  editorAddress:function(e){
    var id = e.target.dataset.id
    console.log(e.detail.value)
    console.log('获取的数据id是'+id)
    wx.navigateTo({
      url: '../editorAddress/editorAddress?id='+id,
    })
  },

//添加新地址界面
  addAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   * 当用户离开时将数据存入数据库
   */
  onUnload: function () {
    // wx.request({
    //   url: 'test.java', //提交的网络地址
    //   method: "get",
    //   dataType:"json",
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     console.log(res.data)
    //   }
    // })
    wx.clearStorage("regions")
    wx.clearStorage("editorRegions")
  },
  /**
    * 生命周期函数--监听页面显示
    时间监控并显示数据的改变
    */
  onShow: function () {
    var that = this;
    var region=[];
    var newRegion ={
      id: '3',
      userId: '456',
      consignee: '',
      mobile: '',
      province: '',
      city: '',
      county: '',
      details: ''
  }; 
 
  //新添加的地址
    wx.getStorage({
      key: 'regions',
      success(res) {
        console.log(res.data.addressl)
        console.log(res.data.length)
        if(res.data!=null){
          var index=that.data.regions.length+1;
        newRegion=
          {
            id: index,
            userId: '456',
            consignee: res.data.consignee,
            mobile: res.data.mobile,
            province: res.data.addressl[0],
            city: res.data.addressl[1],
            county: res.data.addressl[2],
            details: res.data.address
          }
          region = that.data.regions.concat(newRegion)
        that.setData({
          regions:region
        })
        }
        
      }
    }) 

    //用户修改地址的更新
    wx.getStorage({
      key: 'editorRegions',
      success(res) {
        console.log(res.data.addressl)
        console.log(res.data.length)
        if (res.data != null) {
          var index = res.data.id;
        
        }

      }
    })   
  },

  /* 删除item */

  delAddress: function (e) {
    var id = e.target.dataset.id
    console.log('获取的数据id是' + id)
   wx.request({
      url: 'test.java', //提交的网络地址
      method: "get",
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
     success: function (res) {
       //--init data
       var status = res.data.status;
       if (status == 1) {
         wx.showToast({
           title: '成功删除！',
         })
       } else {
         wx.showToast({
           title: '删除失败！',
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
 
})
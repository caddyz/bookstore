Page({
  /**

   * 页面的初始数据

   */
  
  data: {
    mydata: ['广东省', '广州市', '海珠区'],
    addressList: [],
    messges:"你是个大坏蛋",
    regions:[
      { id:'1',
        userId:'456',
        consignee:'小李',
        mobile:'123456',
        province:"四川",
        city:"成都",
        county:"高新区",
        details:"我不知道"
      },
      {
        id: '2',
        userId: '456',
        consignee: '小李',
        mobile: '123456',
        province: "四川",
        city: "成都",
        county: "高新区",
        details: "我不"
      }, 
      {
        id: '3',
        userId: '456',
        consignee: '小李',
        mobile: '123456',
        province: "四川",
        city: "成都",
        county: "高新区",
        details: "我不"
      }
    ]
  },
  // 这是页面初次加载的方法
  onLoad: function (options) {
    var that=this;
    var userNmae=that.data.userNmae//用户名字
    //从数据库中获取数据
    wx.request({
      url: '',//后台的连接地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        if (res.data != null) {
          that.setData({
            regions: res.data
          })
        }
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
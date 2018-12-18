var app=getApp()
Page({
  /**

   * 页面的初始数据

   */
  
  data: {
    isAddressList: false,
    mydata: ['广东省', '广州市', '海珠区'],
    addressList: [],
    messges:"你是个大坏蛋",
    regions:[],
    first: false//判断用户是不是第一次添加收货地址
  },
  // 这是页面初次加载的方法
  onLoad: function (options) {
    var that = this;
    //从数据库中获取数据
    that.getReceiveAddress();

  },
//默认地址编辑
  editorAddress:function(e){
    var addressId = e.target.dataset.id
    console.log(e.detail.value)
    console.log('获取的数据a是' + addressId)
    wx.navigateTo({
      url: '../editorAddress/editorAddress?addressId=' + addressId,
    })
  },

//添加新地址界面
  addAddress: function () {
    wx.navigateTo({
      url: '../address/address?first='+this.data.first,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   * 当用户离开时将数据存入数据库
   */
  onUnload: function () {
  
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
    //先从数据库中获取数据
    that.getReceiveAddress();
  
  },
  //修改默认地址状态
  selectList(e) {
    var that=this;
    var oldAddressId='';
    var newAddressId='';
    const index = e.currentTarget.dataset.index;    // 获取data- 传进来的index
   
    console.log("index:"+index);
    let regions = this.data.regions;
    newAddressId = regions[index].addressId;//获取新默认地址的id
    const addressStatus = regions[index].addressStatus;         // 获取当前地址的选中状态
    console.log("addressStatus:" + addressStatus);
    if (!addressStatus) {
          for(let i=0;i<regions.length;i++){
            if (regions[i].addressStatus){
              oldAddressId = regions[i].addressId;
              regions[i].addressStatus = false;
            }         
          };
      regions[index].addressStatus = true; 
    };
    that.updateUserReceiveAddressStatus(app.globalData.userInfo.userId, newAddressId, oldAddressId);//修改数据库中默认地址的状态

    this.setData({
      regions: regions,
    });
  },

  /* 删除收货地址*/
  delAddress: function (e) {
    var that=this;
    var addressId = e.currentTarget.dataset.id;
    console.log('获取的数据addressId是' + addressId)
   wx.request({
     url: app.URL + 'bookstore-mall/delReceiveAddress/' + app.globalData.userInfo.userId + '/' + addressId, //提交的网络地址
      method: "get",
      dataType:"json",
      header: {
        'content-type': 'application/json' // 默认值
      },
     success: function (res) {
       //--init data 
       if (res.data) {
        that.onShow();//页面显示刷新

         wx.showToast({
           title: '成功删除！',
         })
       } else {
         wx.showToast({
           title: '删除失败！',
         })
       }
       that.getReceiveAddress();
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

  //获取用户添加的收货地址
 getReceiveAddress:function(){
   var that = this;
   var userId = app.globalData.userInfo.userId;//用户的Id
   // //数据库获取初始数据
   wx.request({
     url: app.URL + 'bookstore-mall/selectReceiveAddress/' + userId, //提交的网络地址
     method: "GET",
     dataType: "json",
     header: {
       'content-type': 'application/json' // 默认值
     },
     success: function (res) {
       //--init data

       if (res.data.length>0) {
         that.setData({
           regions: res.data,
           first:false
         })
       } else {
         that.setData({
           regions: that.data.regions,
           first:true
         })
       }

       //显示地址界面
       if (that.data.regions.length > 0) {
         that.setData({
           isAddressList: true
         })
       }
       console.log("isAddressList" + that.data.isAddressList)
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


 //还会上级页面并带回数据
  to_confirm: function (e) {
    const index = e.currentTarget.dataset.index //获取页面数据信息
    let regions = this.data.regions; 
    var newAddress = regions[index];
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面 
    var prevPage = pages[pages.length - 2]; //上一个页面 
    prevPage.setData({
      newAddress: newAddress,
    }) //给上级页面的变量赋值 
    wx.navigateBack() //返回上级页面  
  },
  

   //修改用户数据库中默认收货地址的方法
 updateUserReceiveAddressStatus:function(userId,newAddressId,oldAddressId){
      var that=this;
      wx.request({
        url: app.URL + 'bookstore-mall/updateUserReceiveAddressStatus/' + userId + '/' + newAddressId+'/'+oldAddressId, //提交的网络地址
        method: "GET",
        dataType: "json",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          //--init data     
          if (res.data) {
       
            wx.showToast({
              title: '修改成功！',
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
}
})
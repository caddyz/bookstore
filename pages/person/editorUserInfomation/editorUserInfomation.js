// pages/person/editorUserInfomation/editorUserInfomation.js
var app = getApp();
Page({
  data: {
    checkboxItems: [
      { name: 'USA', value: '我已了解并阅读了' },
    ],
    possword:'123456789',
    content: '',
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    items: [
      { name: 'man', value: '男' },
      { name: 'woman', value: '女', checked: 'true' },
      { name: 'bm', value: '保密' }
    ],
    nickName: '',
    sex: '',
    age: '',
    mobile: '',
    email: '',
    signature: '',
  },
  modalTap: function () {
    var that = this;
    wx.showModal({
      title: '免责声明',
      content: that.data.content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 表单
  edituser: function (e) {
    console.log(e.detail.value);
    var that = this;
    var user = e.detail.value;
    var oldPossword = e.detail.value.oldPossword;
    console.log(e.detail.value)
    //原始密码验证
    if (oldPossword == this.data.possword||oldPossword=='') { 
      that.editorUserInfomation(user);//修改数据库中用户的数据
    }
   
  },

  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}

    console.log(this.data.checkboxItems[0].name)
    if (checked.indexOf(this.data.checkboxItems[0].name) !== -1) {
      changed['checkboxItems[0].checked'] = true
    } else {
      changed['checkboxItems[0].checked'] = false
    }
    this.setData(changed)
    console.log(changed)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.loadinfo();
  },
  loadinfo: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res){
        console.log(res.data)
        that.setData({
          nickName: res.data.nickName,
          sex: res.data.sex,
          age: res.data.age,
          mobile: res.data.mobile,
          email: res.data.email,
          signature: res.data.signature,
          region: res.data.region
        })
       
      },
    })
  
  },
  //日期选择器函数
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
 //地址选择器函数
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  
 //修改数据库中用户数据的方法
 editorUserInfomation:function(user){
   var that = this;
   // //数据库获取初始数据
   wx.request({
     url: 'http://localhost:8080/bookstore-mall/editorUserInfomation/', //提交的网络地址
     method: "POST",
     dataType: "json",
     data: JSON.stringify(user),
     header: {
       'content-type': 'application/json' // 默认值
     },
     success: function (res) {
       //--init data
       if (res.data != null) {
         console.log("成功修改用户信息：");
       } else {
         console.log("没有修改用户信息：")
       }
       // console.log("我获取的默认收货地址：" + that.data.sendWay)
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
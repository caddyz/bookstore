// pages/person/editorUserInfomation/editorUserInfomation.js
var utils=require("../../../utils/util.js");
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
    region: ['', '', ''],
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
    var userPassword = app.globalData.userInfo.password;
    var user ={
      userId: app.globalData.userInfo.userId,
      username: e.detail.value.nickName,
      // sex: e.detail.value.sex,
      password: e.detail.value.newPossword,
      birthday: e.detail.value.newDate,
      address: e.detail.value.newAddress[0],
      phone: e.detail.value.tel,
      email: e.detail.value.email,
      signature: e.detail.value.signature,
    };
    var oldPossword = e.detail.value.oldPossword;
    console.log("oldPossword:" + oldPossword + "    userPassword:" + userPassword);
    console.log(user);
    //原始密码验证
    if (Number(oldPossword) == Number(userPassword)) { 
      that.editorUserInfomation(user);//修改数据库中用户的数据
      //修改app中的用户数据
      app.globalData.userInfo.username = user.username;
      app.globalData.userInfo.password=user.password;
      app.globalData.userInfo.birthday=user.birthday;
      app.globalData.userInfo.address=user.address;
      app.globalData.userInfo.phone=user.phone;
      app.globalData.userInfo.email=user.email;
      app.globalData.userInfo.signature=user.signature;
    }else{
      wx.showToast({
        title: '原始密码有误！',
        duration:3000,
      })
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
    var user = app.globalData.userInfo;//获取用户信息
    var address = [app.globalData.userInfo.address,'',''];
    that.setData({
      region: address
    })
        that.setData({
          nickName: user.username,
          sex: '男',
          age: user.age,
          mobile: user.phone,
          email: user.email,
          signature: user.signature,
          region: this.data.region,
          date: utils.formatDate(new Date(user.birthday))
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
     url: 'http://localhost:8080/bookstore-mall/editorUserInfomation', //提交的网络地址
     method: "POST",
     dataType: "json",
     data: JSON.stringify(user),
     header: {
       'content-type': 'application/json' // 默认值
     },
     success: function (res) {
       //--init data
       if (res.data == true) {
         console.log("成功修改用户信息：");
         wx.showToast({
           title: '修改成功！',
           duration: 3000
         })
         wx.navigateBack();
       } else {
         console.log("没有修改用户信息：");
         wx.showToast({
           title: '修改失败！',
           duration:3000
         })
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
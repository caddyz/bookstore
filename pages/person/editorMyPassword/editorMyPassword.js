// pages/person/editorMyPassword/editorMyPassword.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
 submitPassword:function(e){
   var oldPossword = e.detail.value.oldPossword;
   var userPassword=app.globalData.userInfo.password;
   //原始密码验证
   if (oldPossword != '' || null) {
     if (Number(oldPossword) == Number(userPassword)) {

     } else {
       wx.showToast({
         title: '原始密码有误！',
         duration: 3000,
       })
       return;
     }
   } else {
     user.password = app.globalData.userInfo.password;
   }
 }
})
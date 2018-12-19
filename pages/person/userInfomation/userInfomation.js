// pages/userInfomation/userInfomation.js
var utils=require("../../../utils/util.js")
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',//用户信息
    message:"你好我是用户信息界面",
    tempFilePaths: '',
    nickName: '',
    userInfoAvatar: '',
    sex: '',
    age:'23',
    userLevel:'2',
    balance:'123',
    score:'12345',
    mobile:'123456789',
    email:'1234568@163.com',
    signature:'书中自有黄金屋。',
    province: '四川',
    city: '成都',
    county:'',
    sex:'男',
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {

    var that = this;
    var user=app.globalData.userInfo;//获取用户信息
    console.log("user:" + JSON.stringify(user));
    if (user.birthday!=null){
      var birthday = utils.formatDate(new Date(user.birthday));
      // console.log("获得的生日是：" + birthday);
      this.jsGetAge(birthday,function(data){
        // console.log("获得的年纪是："+data);
        that.setData({
          age:data
        })
      })
    }
    that.setData({
      user:user
    })
 
  },
  //用户信息修改跳转函数
  toEditor:function(){
    var that=this
    var user=this.data.user;
    //存入缓存
    wx.setStorage({
      key: "user",
      data: user
    })
    wx.navigateTo({
      url: '../editorUserInfomation/editorUserInfomation',
      success: function(res) {
        
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // JS根据出生日期 得到年龄
//参数strBirthday已经是正确格式的2017-12-12这样的日期字符串  
  jsGetAge:function (strBirthday,callback) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    // console.log("获得的年：" + birthYear);
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = utils.formatDate(new Date());
   var dArr= d.split("-");
    var nowYear = dArr[0];
    // console.log("现在的年：" + nowYear);
    var nowMonth = dArr[1];
    var nowDay = dArr[2];

    if (nowYear == birthYear) {
      returnAge = 0;//同年 则为0岁  
    }
    else {
      var ageDiff = nowYear - birthYear; //年之差  
      if (ageDiff > 0) {
        if (nowMonth == birthMonth) {
          var dayDiff = nowDay - birthDay;//日之差  
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
        else {
          var monthDiff = nowMonth - birthMonth;//月之差  
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          }
          else {
            returnAge = ageDiff;
          }
        }
      }
      else {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
      }
    }
    callback(returnAge) ;//返回周岁年龄  
  }  

})
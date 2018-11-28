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
    var formdata = e.detail.value;
    var oldPossword = e.detail.value.oldPossword;
    console.log(e.detail.value)
    //原始密码验证
    if (oldPossword == this.data.possword||oldPossword=='') {
      wx.request({
        url: 'http://192.168.10.110:8080/ssm/updateUser' + formdata,//提交到后台修改数据库中的数据
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //--init data
          var status = res.data.status;
          if (status == 1) {
            wx.showToast({
              title: '提交成功！',
            })
          } else {
            wx.showToast({
              title: res.data.message,
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
    } else {
      wx.showToast({
        title: '原始密码错误！'
      });
      wx.clearStorage("user");

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
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
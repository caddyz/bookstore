var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    books: [{
      bookId: '',
      bookCategory:[],
      ishaveChild: true,
      children:[
        {
          bookId:'',
          bookName:'',
          image:[],
        }
      ]
    }
    ],
    curNum: 1,
    curIndex: 1
  },



  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNum: id,
      curIndex: index
    })
  },
  // 跳转
  items: function (e) {
    var that = this;
    var bookCategory = e.currentTarget.dataset.bookCategory
    var bookName = e.currentTarget.dataset.bookName
    var bookCoverImage = e.currentTarget.dataset.bookCoverImage
    var bookId = e.currentTarget.dataset.id
    console.log('查询数据 :' + bookId);
    wx.navigateTo({
      url: '/pages/classify/detail/detail?bookId=' + bookId,
    })
  },
 
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
     // 数据起始加载
     console.log("bookId:"+options.bookId)
    var that = this;
    wx.request({
      url: 'http://localhost:8080/bookstore-mall/' + bookId + '/allContext',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Industry: res.data //设置数据
        })
      },
      fail: function (err) {
        console.log(err)
      }
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

  
})

// 图片上传
// wx.chooseImage({
//   count:1,
//   sizeType:['original','compressed'],
//   sourceType:['album','camera'],
//   success:function(res){
//     var tempFilePaths = res.tempFilePaths;
//     wx.uploadFile({
//       url: '',
//       filePath: tempFilePaths[0],
//       name: '',
//       header:{
//         'Context-type':'multipart/form-data',
//         'accept':'application/json',
//         'Authorization':'Bearer',
//       },
//     formData:{
//       'user':'img'
//     },
//       success: function (res) {
//         var data = res.data;
//         console.log('data');
//       },
//       fail: function (res) {
//         console.log('fail');

//       },

//     })
//   }
// })


// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=711692128,4065467151&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3991791447,1631118913&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544419303402&di=b4c643164fec321bd14558965c9db9d3&imgtype=0&src=http%3A%2F%2Fchinadmd.zyexhibition.com%2Fupload%2F5_23qabkdvdx8x3a7xa1xrooxd.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent: 0,
    list:[{
      dec:'张爱玲的倾城往事',
      img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544420158052&di=9fbf20efde999d7233d021c06dd088eb&imgtype=0&src=http%3A%2F%2Fp1.qhimgs4.com%2Ft013dcb6eef3de0345b.jpg',
      src:'https://www.jianshu.com/p/3ffd770e5e69'
    },{
      dec:'海德格尔诗意的世界',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544420285278&di=9f7d5abcd8769b618bd15c0bc6588921&imgtype=0&src=http%3A%2F%2Fwww.kfzimg.com%2FG03%2FM00%2F6B%2FFD%2FpYYBAFXlCDGAO_J9AACKFAHFyZs231_b.jpg',
        src: 'https://www.jianshu.com/p/6ca766682330'
    }]
  },
  //跳转
  findSkip:function(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../find/slideshow/love?src='+that.data.list[index].src,
    })
  },
  //轮播区滑动事件
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播区点击事件
  swiperClick: function (e) {
    wx.navigateTo({
      url: '/pages/find/slideshow/love' + this.data.swiperCurrent,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
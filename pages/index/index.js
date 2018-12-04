//index.js
// 导入utils.js文件
var util = require('../../utils/util.js')
// //导入模板js文件
import templates from '../template/bookinfoTemplate'
//获取应用实例
const app = getApp()
Page({
  data: {
    imgUrls: [
      'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3384185388,3937888800&fm=26&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543818622208&di=44d3a17727672a028860d62a12ba83cd&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Ff603918fa0ec08fa9b707a5353ee3d6d54fbdad6.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543818649675&di=94eea3dec7185bc39c931de75a916080&imgtype=0&src=http%3A%2F%2Fwww.whb.cn%2Fu%2Fcms%2Fwww%2F201803%2F30095624xd1b.jpg',
      'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3313104465,2591523589&fm=200&gp=0.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543818487436&di=2f8462538133f784a63225ca858357c2&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F161009%2F102-161009142Pc96.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    swiperCurrent:0,
    searchLoading: true,
    searchLoadingComplete: false,
    list: [],
    loadingpageNum:1,
    seekValue:null
  },
  // 数据起始加载
  onLoad: function (options) {
    // this.getData();
    let taht = this;
    util.getSearchBook(1,function(data){
      // console.log(data);
      taht.setData({
        list:data
      })
    })
  },
  onPullDownRefresh: function () {
    let that = this;
    wx.showNavigationBarLoading()
    setTimeout(function () {
      that.onLoad()
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 150);
  },
  onReachBottom: function () {
    let that = this;
    that.data.loadingpageNum += 1;
    util.getSearchBook(that.data.loadingpageNum, function (data) {
      console.log("data长度：" + data.length);
      let searchList = [];
      if (data.length!= 0) {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList
        })
      } else {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList,
          searchLoadingComplete: true, //把“没有数据”设为true，显示
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏
        });
      }
    })
  },
  //轮播区事件
  //轮播区滑动事件
  swiperChange:function(e){
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //轮播区点击事件
  swiperClick:function(e){
    wx.navigateTo({
      url: '/pages/index/slideshow/slideshow' + this.data.swiperCurrent,
    })
  },
  //新书更多事件
  moreSkip:function(){
    // console.log(list);
    wx.navigateTo({
      url: '/pages/index/more/more?list='+JSON.stringify(this.data.list),
    })
  },
  //分类区事件
  // 跳转函数
  favoriteSkip:function(){
    wx.navigateTo({
      url: '/pages/index/favorite/favorite',
    })
  },
  commentSkip: function () {
    wx.navigateTo({
      url: '/pages/index/comment/comment',
    })
  },
  messageSkip: function () {
    wx.navigateTo({
      url: '/pages/index/message/message',
    })
  },
  vipSkip: function () {
    wx.navigateTo({
      url: '/pages/index/member/member',
    })
  },
  hotSkip: function () {
    wx.navigateTo({
      url: '/pages/index/hot/hot',
    })
  },
  helpSkip: function () {
    wx.navigateTo({
      url: '/pages/index/help/help',
    })
  },
  
  //搜索区域事件
  homepageSearch:function(e){
    this.data.seekValue = e.detail.value
    wx.navigateTo({
      url: '/pages/index/search/search?seekValue=' + this.data.seekValue,
    })
  },
  //模板点击事件
  itemclick(event) {
    templates.onclick(event)
  }
})

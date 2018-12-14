// pages/search/search.js
var util = require('../../../utils/util.js')
import templates from '../../template/bookinfoTemplate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nothing:false,
    value:'',
    controllerHi: true,
    controllerVo: '请输入作者/书名',
    seekValue:null,
    loadingpageNum: 1,
    searchLoading: false,
    searchLoadingComplete: false,
    list:[],
    serachHistory:[],
    historyCro:true
  },
  //修改默认值
  input:function(){
    this.setData({
      controllerVo:'',
      controllerHi: false, 
      nothing: false,
      searchLoading: false,
      searchLoadingComplete: false,
      seekValue: null,
    })
  },
  //获取input的值
  getValue:function(e){
    this.setData({
      seekValue:e.detail.value
    })
  },
  //将选中的历史绑定到搜索框
  tapSercherStorage:function(e){
    let va = e.currentTarget.dataset.item;
    // console.log(va)
    this.setData({
      value:va
    })
  },
  //清除搜索历史
  clearSearchStorage:function(){
    this.setData({
      serachHistory: []
    })
    wx.setStorageSync("serachHistory", [])
  },
  //搜索
  search:function(){
    let that = this;
    that.setData({
      controllerHi: true
    })
    let keyword = that.data.seekValue;
    let val = that.data.value
    // console.log("获取到的值：" + keyword)
    if((keyword==null||keyword=="")&&(val==null||val=="")){
      wx.showToast({
        title: '你神马都没有输！！！',
        icon:'none'
      })
    }else{
      if(keyword == null){
        keyword = val 
      } 
      if (keyword == ""){
        wx.showToast({
          title: '你神马都没有输！！！',
          icon: 'none'
        })
        return
      }
      util.getKeywordSearch(keyword,1,function(data){
        if(data.length == 0){
          that.setData({
            nothing:true
          })
          return
        }
        if(data.length < 10){
          that.setData({
            searchLoadingComplete: true,
            searchLoading: false,
            nothing: false,
            list:data,
            seekValue: keyword,          
          })
        } else{
          that.setData({
            searchLoadingComplete: false,
            searchLoading: true,
            nothing: false,
            list: data,
            seekValue: keyword,
          })
        }
    })
    }
    if (!that.data.seekValue) {
      return
    }
    let serachHistory = wx.getStorageSync("serachHistory") || [];
    //判断keyword是否在数组中
    if (serachHistory.indexOf(keyword) === -1){
      serachHistory.push(keyword)
    //添加缓存:
      wx.setStorageSync("serachHistory", serachHistory);
    }
    // console.log("serachHistory:" + that.data.serachHistory)
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
    this.setData({
      serachHistory: wx.getStorageSync("serachHistory") || []
    })
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
    let that = this;
    that.data.loadingpageNum += 1;
    util.getKeywordSearch(that.data.seekValue,that.data.loadingpageNum, function (data) {
      let searchList = [];
      if (data.length != 0) {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList
        })
      } else {
        searchList = that.data.list.concat(data);
        that.setData({
          list: searchList,
          nothing: false,
          searchLoadingComplete: true, //把“没有数据”设为true，显示
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏
        });
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  itemclick(event) {
    templates.onclick(event)
  },
})
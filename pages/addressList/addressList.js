Page({
  /**

   * 页面的初始数据

   */

  data: {
    addressList: [],
    messges:"你是个大坏蛋",
    regions:[
      {
        province:"四川",
        city:"成都",
        county:"高新区",
        details:"我不知道的的地方"
      }
    ]
  },


  
//添加新地址界面
  addAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  }
})
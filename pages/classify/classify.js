var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    books: [
      {
        book_id: 1,
        book_name: "言情",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '三体',
              image: "http://tp.yiaedu.com/showimg.php?url=http://uploads.xuexila.com/allimg/1703/867-1F330164643.jpg"
            },
            {
              child_id: 2,
              name: '十二个明天',
              image: "http://img.zcool.cn/community/015da9554971170000019ae9f43459.jpg@2o.jpg"
            },
            {
              child_id: 3,
              name: '风',
              image: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2670795854,3778606258&fm=26&gp=0.jpg"
            },
            {
              child_id: 4,
              name: '虚幻',
              image: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2737924243,3582615236&fm=11&gp=0.jpg"
            }
          ]
      },
      {
        book_id: 2,
        book_name: "玄幻",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '遮天',
              image: "http://img4.imgtn.bdimg.com/it/u=2731848340,1311961800&fm=26&gp=0.jpg"
            },
            {
              child_id: 2,
              name: '海',
              image: "http://img5.imgtn.bdimg.com/it/u=1539976553,73815174&fm=26&gp=0.jpg"
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            },
            {
              child_id: 5,
              name: '',
              image: ""
            },
            {
              child_id: 6,
              name: '',
              image: ""
            },
            {
              child_id: 7,
              name: '',
              image: ""
            },
            {
              child_id: 8,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 3,
        book_name: "都市",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '家乡',
              image: "http://img4.imgtn.bdimg.com/it/u=524600297,1173145445&fm=26&gp=0.jpg"
            },
            {
              child_id: 2,
              name: '我的家',
              image: "http://n.sinaimg.cn/translate/20160923/WdMw-fxwevmh8824713.jpg"
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 4,
        book_name: "科幻",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 5,
        book_name: "竞技",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 6,
        book_name: "军事",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 7,
        book_name: "历史",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 8,
        book_name: "游戏",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 9,
        book_name: "武侠",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 10,
        book_name: "奇幻",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      },
      {
        book_id: 11,
        book_name: "校园",
        ishaveChild: true,
        children:
          [
            {
              child_id: 1,
              name: '',
              image: ""
            },
            {
              child_id: 2,
              name: '',
              image: ""
            },
            {
              child_id: 3,
              name: '',
              image: ""
            },
            {
              child_id: 4,
              name: '',
              image: ""
            }
          ]
      }, {
        book_id: 12,
        book_name: "文化",
        ishaveChild: false,
        children: []
      }
    ],
    curNum: 1,
    curIndex: 0
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
    var id = e.currentTarget.dataset.id
    console.log('id :' + id);
    wx.navigateTo({
      url: '/pages/classify/detail/detail?id=' + id,
    })
  },
 
  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
     // 数据起始加载
    
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


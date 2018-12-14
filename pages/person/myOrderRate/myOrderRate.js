// pages/myOrderRate/myOrderRate.js
var app=getApp();
var utils=require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starSP: 5,
    starFW: 5,
    starWL: 5,
    des: "",
    orderId: "",//订单号
    bookId:"",//商品号
    book:'',//被评价的商品
    evaluation:"好评",//评价等级
    evaluationfu: "好评",//评价等级
    evaluationwl: "好评",//评价等级
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.data.orderId = options.orderId;
    var orderId = options.orderId;//获得订单的id号
    var bookId=options.bookId;//获得商品的id号
    console.log("我获得的订单号：" + orderId+"我获得的商品id号是："+bookId);
    that.setData({
      bookId:bookId,
      orderId:orderId
    })
    that.getBookCommentDetail(orderId,bookId)//从数据库中获取被评价商品的详细信息
  },


  /**
   * 商品评分
   */
  startSPTap(e) {
    var that=this;
    switch (e.currentTarget.dataset.star){
      case'1':
        that.setData({
          evaluation:'差评'
        })
      break;
      case '2':
        that.setData({
          evaluation: '差评'
        })
        break;
      case '3':
        that.setData({
          evaluation: '中评'
        })
        break;
      case '4':
        that.setData({
          evaluation: '中评'
        })
        break;
      case '5':
        that.setData({
          evaluation: '好评'
        })
        break;
        default:
        return;
    }
    this.setData({
      starSP: e.currentTarget.dataset.star
    })
  },
  /**
   * 服务评分
   */
  startFWTap(e) {
    var that = this;
    switch (e.currentTarget.dataset.star) {
      case '1':
        that.setData({
          evaluationfu: '差评'
        })
        break;
      case '2':
        that.setData({
          evaluationfu: '差评'
        })
        break;
      case '3':
        that.setData({
          evaluationfu: '中评'
        })
        break;
      case '4':
        that.setData({
          evaluationfu: '中评'
        })
        break;
      case '5':
        that.setData({
          evaluationfu: '好评'
        })
        break;
      default:
        return;
    }
    this.setData({
      starFW: e.currentTarget.dataset.star
    })
  },
  /**
   * 物流评分
   */
  startWLTap(e) {
    var that = this;
    switch (e.currentTarget.dataset.star) {
      case '1':
        that.setData({
          evaluationwl: '差评'
        })
        break;
      case '2':
        that.setData({
          evaluationwl: '差评'
        })
        break;
      case '3':
        that.setData({
          evaluationwl: '中评'
        })
        break;
      case '4':
        that.setData({
          evaluationwl: '中评'
        })
        break;
      case '5':
        that.setData({
          evaluationwl: '好评'
        })
        break;
      default:
        return;
    }
    this.setData({
      starWL: e.currentTarget.dataset.star
    })
  },
  /**
   * 评价输入
   */
  desInput(e) {
    this.setData({
      des: e.detail.value
    })
  },
  /**
   * 提交评价
   */
  tiJiao() {
    var that = this
    //封装评价表单
    var evalution={
      userId:'2',//用户的id
      orderId:that.data.orderId,//被评价的订单号
      orderCommentContent:that.data.des,//用户的评语
      orderCommentSpScore: that.data.starSP,//商品的评分
      orderCommentFwScore: that.data.starFW,//服务的评分
      orderCommentWlScore: that.data.starWL,//物流的评分
      orderCommentCreatetime: utils.formatTime(new Date)//用户评论的时间
    }
    if (!that.data.des) {
      wx.showToast({
        title: '请输入评价内容',
      })
      return
    }else{
      that.toSubmitEvalution(evalution);//将用户的评价表提交到数据库中
    }
   console.log("用户的评价是："+that.data.des)
  },
  //将用户的评价提交到数据库中的方法

  toSubmitEvaluation:function(evalution){
    var that = this;
    var evalution = evalution;
    console.log("evalution:" + JSON.stringify(evalution) )
    //将用户的评价表提交到数据库中保存起来
    wx.request({
      url: app.URL + 'bookstore-mall/submitEvaluation', //提交的网络地址
      method: "POST",
      dataType: "json",
      data: JSON.stringify(evalution),
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data==true) {
          console.log("添加成功！");
          wx.showToast({
            title: '评价成功~！',
          })
          wx.navigateBack();//评价成功返回上一页
        } else {
          wx.showToast({
            title: '评价失败！',
          })
          console.log("添加失败！");
        }
      },
      fail: function () {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 30000
        });
      }
    });
  },
  //从数据库中获得被评价的商品信息
  getBookCommentDetail:function(orderId,bookId){
    var that = this;
    var orderId = orderId;
    var bookId = bookId;
    //从数据库中获取被评价商品的详细信息
    wx.request({
      url: app.URL + 'bookstore-mall/getBookCommentDetail/' + orderId + '/' + bookId, //提交的网络地址
      method: "GET",
      dataType: "json",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //--init data
        if (res.data != null) {
          console.log("获取成功！");
        that.setData({
          book:res.data             //将获取的数据提取出来
        })
        console.log("我获得的信息是："+JSON.stringify(res.data))
        } else {
         that.setData({
           book:this.data.book
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
    });
  }
})
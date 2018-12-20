const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//获得年月日的方法
const formatDate = date =>{
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
//获得时间的方法
const formatTimes = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}

// 分页查询
function getSearchBook(pageNum, callback) {
  wx.request({
    url: app.URL +'bookstore-mall/' + pageNum + '/find',
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    success: function (res) {
      // 设置服务器响应的状态码为200 200表示成功
      if(res.statusCode===200){
        callback(res.data)
      }
    }
  })
}
// 关键字查询
function getKeywordSearch(keyword, pageNum, callback) {
  wx.request({
    url: app.URL+'bookstore-mall/' + keyword + '/' + pageNum + '/keyword',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}

// 登陆
function getUserSearch(phone, password, callback) {
  wx.request({
    url: app.URL +'bookstore-mall/' + phone + '/' + password + '/findUser',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}

// 书Id和书name 查询到此书
function getSelectClassifyBookIdSearch(bookId,bookName, callback) {
  wx.request({
    url: app.URL +'bookstore-mall/'+bookId +'/'+bookName+'/classifyBookFind',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}

// 书Id获取全部信息
function getSelectClassifyBookByIdSearch(bookId, callback) {
  wx.request({
    url: app.URL +'bookstore-mall/'+ bookId + '/classifyFind',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}
//轮播区连接数据库的方法
function slideshowConnection(themeId,callback){
  wx.request({
    url: app.URL +'bookstore-mall/getAllThemeInfo/'+themeId,
    success(res){
      if (res.statusCode === 200){
        callback(res.data)
      }
    }
  })
}
//获取主题的内容与名称
function getTheme(themeId, callback){
  wx.request({
    url: app.URL + 'bookstore-mall/getBookTheme/' + themeId,
    success(res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}
//获取主题的内容与名称
function updateOrder(orderId, orderStatus) {
  wx.request({
    url: app.URL + 'bookstore-mall/updateOrders/' + orderId + '/' + orderStatus,
    success(res) {
      if (res.data==true) {
       console.log("修改成功")
       wx.navigateBack();
      }
    }
  })
}

//从数据库中获取购物车的数据
function getAllCarts(userId) {
  var that = this
  var isCart = true;
  var cart = wx.getStorageSync("carts") || [];
  console.log("userId=================" + userId);
  // //数据库获取初始数据
  wx.request({
    url: app.URL + 'bookstore-mall/selectCart/' + userId, //提交的网络地址
    method: "GET",
    dataType: "json",
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      //--init data
      if (res.data != null) {
        if (cart.length > 0) {
          //缓存和数据库中都有数据
          for (var i in res.data) { 
            for (var j in cart) {
              console.log("状态isCart1：" + isCart);
              if(res.data[i].bookId==cart[j].bookId){
                isCart=false;
            
              }
            }
            console.log("状态isCart2：" + isCart);
            if(isCart){
              cart = cart.concat(res.data[i]);//没有重复添加进数组
            }else{
              isCart=true;//有重复的数组不添加
            }
              }       
          }

    
        } else {
          //缓存中没有数据而数据库中有
          cart = res.data;
        }
        console.log("加入购物车的" + JSON.stringify(cart));
        //存入缓存
        wx.setStorage({
          key: 'carts',
          data: cart,
        })
       
    },
    fail: function () {
      // fail
      wx.showToast({
        title: '网络异常！',
        duration: 30000
      });
    }
  })
}
//手机号的正则验证
function checkPhone  (phone) {
  console.log("手机号" + phone);
  if (!(/^1[34578]\d{9}$/.test(phone))) {
    return false;
  } else {
    return true;
  }
}

//邮箱的正则验证
function checkEmail (str) {
  var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
	formatTimes: formatTimes,
  formatDate: formatDate,
  formatTime: formatTime,
  getSearchBook: getSearchBook,
  getKeywordSearch: getKeywordSearch,
  getUserSearch: getUserSearch,
  getSelectClassifyBookIdSearch: getSelectClassifyBookIdSearch,
  getSelectClassifyBookByIdSearch: getSelectClassifyBookByIdSearch,
  slideshowConnection: slideshowConnection,
  getTheme: getTheme,
  updateOrder: updateOrder,
  getAllCarts: getAllCarts,
  checkEmail:checkEmail,
 checkPhone:checkPhone 
}

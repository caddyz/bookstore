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
  getTheme: getTheme
}

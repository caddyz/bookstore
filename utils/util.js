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
// 分页查询
function getSearchBook(pageNum, callback) {
  wx.request({
    url: 'http://192.168.10.110:8080/bookstore-mall/' + pageNum + '/find',
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    success: function (res) {
<<<<<<< HEAD
      // 设置服务器响应的状态码为200 200表示成功
      if(res.statusCode===200){
=======
      if (res.statusCode === 200) {
>>>>>>> e4de9045178ee6046237dad845c8f665d191065f
        callback(res.data)
      }
    }
  })
}
// 关键字查询
function getKeywordSearch(keyword, pageNum, callback) {
  wx.request({
<<<<<<< HEAD
    url: 'http://192.168.10.194:8080/bookstore-mall/'+keyword+'/'+pageNum+'/keyword',
    header:{'content-type':'application/json'},
    method:'GET',
    success:function(res){
=======
    url: 'http://192.168.10.110:8080/bookstore-mall/' + keyword + '/' + pageNum + '/keyword',
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
>>>>>>> e4de9045178ee6046237dad845c8f665d191065f
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}
<<<<<<< HEAD
// 登陆
function getUserSearch(phone, password, callback) {
  wx.request({
    url: 'http://192.168.10.110:8080/bookstore-mall/' + phone + '/' + password + '/findUser',
=======
// 书Id查询
function GetSelectClassifyBookByIdSearch(bookId, callback) {
  wx.request({
    url: 'http://192.168.10.110:8080/bookstore-mall' + bookId + 'classifyFind',
>>>>>>> e4de9045178ee6046237dad845c8f665d191065f
    header: { 'content-type': 'application/json' },
    method: 'GET',
    success: function (res) {
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
<<<<<<< HEAD
}  
=======
}









>>>>>>> e4de9045178ee6046237dad845c8f665d191065f
module.exports = {
  formatTime: formatTime,
  getSearchBook: getSearchBook,
  getKeywordSearch: getKeywordSearch,
  getUserSearch: getUserSearch
}

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
function getSearchBook(pageNum,callback){
  let index = (pageNum-1)*10;
  wx.request({
    url: 'http://192.168.2.210:8080/ssm/'+index+'/findBook',
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: 'GET',
    success: function (res) {
      if(res.statusCode===200){
        callback(res.data)
      }
    }
  })
}
// 关键字查询
function getKeywordSearch(keyword,pageNum,callback){
  wx.request({
    url: 'http://192.168.2.210:8080/ssm/'+keyword+'/'+pageNum+'/keyword',
    header:{'content-type':'application/json'},
    method:'GET',
    success:function(res){
      if (res.statusCode === 200) {
        callback(res.data)
      }
    }
  })
}
module.exports = {
  formatTime: formatTime,
  getSearchBook: getSearchBook,
  getKeywordSearch: getKeywordSearch
}

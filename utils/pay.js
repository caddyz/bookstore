const app = getApp()
//orderInfo封装的一个json对象,对象包含body 商品主体信息 detail 商品详细信息 out_trade_no 商品标号 
// total_fee 订单总金额  spbill_create_ip 终端IP  openid 用户标识
function payOreder(orderInfo,callback){
  // console.log("当前时间戳：" + Date.parse(new Date())/1000);
  wx.request({
    url: app.URL+'bookstore-mall/oreder/' + orderInfo.body + '/' + orderInfo.detail + '/'+   
      orderInfo.out_trade_no + '/' + orderInfo.total_fee + '/' + orderInfo.spbill_create_ip + '/'+  
      orderInfo.openid,    //发送路径
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success(res){
      callback(res.data)
    },
    fail(){
      wx.showToast({
        title: '请求失败',
        icon:'none'
      })
    }
  })
}
/*
if (res.data.return_code == 'SUCCESS' && res.data.result_code == 'SUCCESS'){ //判断是否有效
        wx.requestPayment({
          timeStamp: Date.parse(new Date()) / 1000,
          nonceStr: res.data.nonce_str,
          package: res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data.sign,
          success(res){
            callback(res.data)
          },
          fail(){
             wx.showToast({
               title: '支付失败',
               icon:'none'
             })
          }
        })
      }else{
        callback(res.data)
      }
*/
/*
* 退款接口
退款接口的orderInfo需要传以下参数：
1、微信订单号，或者商品订单号  orderNumber
2、商户退款单号 out_refund_no  商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
3、订单金额 total_fee 订单总金额，单位为分，只能为整数
4、退款金额 refund_fee 退款总金额，订单总金额，单位为分，只能为整数
5、退款原因 refund_desc 若商户传入，会在下发给用户的退款消息中体现退款原因
*/
function refund(orderInfo,callback){
  wx.request({
    url: app.URL + 'bookstore-mall/refund/' + orderInfo.orderNumber + '/' + orderInfo.out_refund_no + '/' + orderInfo.total_fee + '/' + orderInfo.refund_fee + '/'+ orderInfo.refund_desc,
    success(res){
      callback(res.data)
    },
    fail(){
      wx.showToast({
        title: '请求失败',
        icon:'none'
      })
    }
  })
}
/*
  查询订单接口
  需要传入微信订单号 或者商品订单号 orderNumber
*/
function orderQuery(orderNumber,callback){
  wx.request({
    url: app.URL + 'bookstore-mall/orderQuery/' + orderNumber,
    success(res) {
      callback(res.data)
    },
    fail() {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
  })
}
/*
  退款查询
  以下参数四选一
  微信订单号  商户订单号  商户退款单号  微信退款单号 refondNumber
*/
function refoundQuery(refondNumber,callback){
  wx.request({
    url: app.URL + 'bookstore-mall/refoundQuery/' + refondNumber,
    success(res) {
      callback(res.data)
    },
    fail() {
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
  })
}
module.exports ={
  payOreder: payOreder,
  refund: refund,
  orderQuery: orderQuery
}
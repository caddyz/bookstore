//orderInfo封装的一个json对象,对象包含body 商品主体信息 detail 商品详细信息 out_trade_no 商品标号 
// total_fee 订单总金额  spbill_create_ip 终端IP  openid 用户标识
function oreder(orderInfo,callback){
  // console.log("当前时间戳：" + Date.parse(new Date())/1000);
  wx.request({
    url: 'http://localhost:8080/bookstore-mall/oreder/' + orderInfo.body + '/' + orderInfo.detail + '/'+   
      orderInfo.out_trade_no + '/' + orderInfo.total_fee + '/' + orderInfo.spbill_create_ip + '/'+  
      orderInfo.openid,    //发送路径
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success(res){
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
          fail(res){
             callback(res.data)
          }
        })
      }else{
        callback(res.data)
      }
    },
    fail(res){
      callback(res.data)
    }
  })
}

module.exports ={
  oreder: oreder
}
var temp = {
  onclick: function (event) {
    // console.log(JSON.stringify(event.currentTarget.dataset.item))
   wx.navigateTo({
     url: '/pages/classify/detail/detail?book='+JSON.stringify(event.currentTarget.dataset.item),
   })
  }
}
//导出，供外部使用
export default temp
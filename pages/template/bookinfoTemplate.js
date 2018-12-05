var temp = {
  onclick: function (event) {
    // console.log("bookId:"+JSON.stringify(event.currentTarget.dataset.item.bookId))
   wx.navigateTo({
     url: '/pages/classify/detail/detail?bookId='
     +JSON.stringify(event.currentTarget.dataset.item.bookId),
   })
  }
}
//导出，供外部使用
export default temp
// pages/order/order.js
var Zan = require('../cart/cart.js');
Page(Object.assign({}, Zan.Tab, {
  data: {
    tab1: {
      list: [{
        id: 0,
        title: '全部'
      }, {
        id: 1,
          title: '下单状态'
      }, {
        id: 2,
        title: '发货状态'
      }, {
        id: 3,
        title: '待收货'
      }, {
        id: 4,
        title: '待评价'
      }],
      selectedId: 0,
      scroll: false,
    },
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      $:{componentId}.selectedId, selectedId
    });
  }
}));

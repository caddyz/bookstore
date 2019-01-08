/**
 * 自定义modal浮层
 * 使用方法：
 * <modal show="{{showModal}}" height='60%' bindcancel="modalCancel" bindconfirm='modalConfirm'>
   <view>你自己需要展示的内容</view>
 </modal>
 
 属性说明：
 show： 控制modal显示与隐藏
 height：modal的高度
 bindcancel：点击取消按钮的回调函数
 bindconfirm：点击确定按钮的回调函数
 
 使用模块：
 场馆 -> 发布 -> 选择使用物品
 */

Component({

  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal
    show: {
      type: Boolean,
      value: false
    },
    //modal的高度
    height: {
      type: String,
      value: '80%'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 输入框参数设置
    inputData: {
      input_value: "",//输入框的初始内容
      value_length: 0,//输入框密码位数
      isNext: true,//是否有下一步的按钮
      get_focus: true,//输入框的聚焦状态
      focus_class: true,//输入框聚焦样式
      value_num: [1, 2, 3, 4, 5, 6],//输入框格子数
      height: "98rpx",//输入框高度
      width: "604rpx",//输入框宽度
      see: false,//是否明文展示
      interval: true,//是否显示间隔格子
      isPay: false,
    },
    paymima: '' //支付密码
  },
  // 当组件输入数字6位数时的自定义函数
 
  onload: function () {
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickMask() {
      // this.setData({show: false})
    },

    valueSix(data) {
      console.log("输入的密码：" + JSON.stringify(data.detail) );
      var that=this;
      that.setData({
        paymima: data.detail
      })
     
    },
    cancel() {
      this.setData({ show: false })
      this.triggerEvent('cancel')
    },

    confirm() {
      this.setData({ show: false })
      this.triggerEvent('confirm',this.data.paymima)
    }
  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showOverlay: false
  },
  onLoad: function () {
  },

  show() {
    this.setData({
      showOverlay: true
    })
  }
})

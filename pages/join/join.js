// pages/join/join.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  wxpay() {
    let that = this;
    let p = {
      uid: wx.getStorageSync('uid'),
      fee: 9900
    }
    wx.request({
      url: 'https://wxb.whwangdoudou.cn/web/lib/wx_xiaochengxu/xpay.php',
      data: p,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        // var res = JSON.parse(res.data.trim());
        console.log(res);
        wx.requestPayment({
          'timeStamp': res.data.pay_info.timeStamp,
          'nonceStr': res.data.pay_info.nonceStr,
          'package': res.data.pay_info.package,
          'signType': 'MD5',
          'paySign': res.data.pay_info.paySign,
          'success': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付成功',
              duration: 3000,
              icon: 'none',
              success() {
                let timer = setTimeout(() => {
                  wx.switchTab({
                    url: '../personal/personal',
                  })
                }, 3000)
              }
            })
          },
          'fail': function (res) {
            console.log(res);
            wx.showToast({
              title: '支付失败，请重新尝试',
              duration: 3000,
              icon: 'none',
              success() {
                let timer = setTimeout(() => {
                  console.log('jump!!!')
                  // wx.switchTab({
                  //   url: '../personal/personal',
                  // })
                }, 3000)
              }
            })
          },
          'complete': function (res) { console.log(res) }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
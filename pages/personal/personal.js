// pages/personal/personal.js
const app = getApp();
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,                              //当前屏幕宽度
    userinfo: null,
    close_toast2: false,
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    // console.log(app.globalData.check_we_app)
    if (app.globalData.check_we_app == false) {
      wx.hideShareMenu()
    }

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
    var that = this;
    var p = {
      m: 'personal',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        userinfo: res.result
      });
      wx.setStorageSync('userinfo', res.result);
    })

    that.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,//图片宽度
    });

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

  },
  submitFormId(e) {
    console.log(e);
    let formId = e.detail.formId;
    let that = this;
    let p = {
      m: 'colform',
      uid: wx.getStorageSync('uid'),
      formId: formId
    };
    getInfo(p).then(res => console.log('success'))
  },
  close_toast2() {
    let that = this;
    that.setData({
      show_toast2: false
    })
  },
  openShare() {
    let that = this;
    that.setData({
      show_toast2: true
    })
  },
  buy() {
    let that = this;
    let p = {
      uid: wx.getStorageSync('uid'),
      fee: 1
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
          'success': function (res) { console.log(res) },
          'fail': function (res) { console.log(res) },
          'complete': function (res) { console.log(res) }
        })
      }
    })
  }
})
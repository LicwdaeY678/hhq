// pages/cash/cash.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cash: null,
    close_toast2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.fetchData();
  },
  fetchData() {
    let that = this;
    let p = {
      m: 'tixian',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        cash: res
      })
    })
  },
  formSubmit(e) {
    console.log(e);
    let that = this;
    let alipay = e.detail.value.alipay;
    let alipay_name = e.detail.value.alipay_name;
    let money = e.detail.value.promotion_can_cash * 100;
    console.log(alipay, alipay_name, money);
    if (alipay && alipay_name && money) {
      let p = {
        m: 'tixian',
        uid: wx.getStorageSync('uid'),
        a: 'cash',
        alipay: alipay,
        alipay_name: alipay_name,
        money: money
      };
      getInfo(p).then(res => {
        if (res.r == -1) {
          wx.showToast({
            title: res.errmsg,
            icon: 'none'
          })
        } else if (res.r == 0) {
          that.fetchData();
          wx.showToast({
            title: res.errmsg,
            icon: 'none'
          })
        }
      })

    } else {
      wx.showToast({
        title: '请重新填写信息',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})
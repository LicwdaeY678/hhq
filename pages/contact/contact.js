// pages/contact/contact.js
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  saveCode() {
    wx.getImageInfo({
      src: '../../image/code.jpg',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
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
})
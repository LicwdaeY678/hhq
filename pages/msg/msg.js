// pages/msg/msg.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    msgList: [],
    close_toast2: false,
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   windowWidth: wx.getSystemInfoSync().windowWidth,
    // });
    // let that=this;
    // let p={
    //   m:'msg_x',
    //   uid:wx.getStorageSync('uid')
    // };
    // getInfo(p).then(res=>{
    //   console.log(res);
    //   that.setData({
    //     msgList:res.result
    //   })
    // })
    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    console.log(app.globalData.check_we_app)
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
    let that = this;
    let p = {
      m: 'msg',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        msgList: res.result
      })
    })
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
    console.log('监听下拉');
    let that = this;
    let p = {
      m: 'msg',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        msgList: res.result
      })
    })
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
})
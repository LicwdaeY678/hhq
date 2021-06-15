// pages/team/member/member.js
//获取应用实例
const app = getApp();
var util = require('../../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: null,
    _member: null,
    keyword: '',
    close_toast2: false,
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let p = {};
    var type = options.type;
    console.log(type);
    if (type == 'count') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: ''
      }
    }
    else if (type == 'vip') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: 'vip'
      }
    }
    else if (type == 'today') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: 'today'
      }
    }
    else if (type == 'yesterday') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: 'yesterday'
      }
    }
    else if (type == 'direct') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: 'direct'
      }
    }
    else if (type == 'direct_sub') {
      p = {
        m: 'team',
        uid: wx.getStorageSync('uid'),
        a: 'member',
        type: 'direct_sub'
      }
    }
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        member: res.result,
        _member: res.result
      })
    })
    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    // console.log(app.globalData.check_we_app)
    if (app.globalData.check_we_app == false) {
      wx.hideShareMenu()
    }
  },
  // 搜索成员
  search() {
    let that = this;
    if (that.data.keyword == '') {
      that.setData({
        member: that.data._member
      })
    }
    else {
      var temp;
      temp = that.data._member.filter(item => {
        return item.username.toLowerCase().indexOf(that.data.keyword.toLowerCase()) >= 0
      });
      that.setData({
        member: temp
      })
    }
  },
  // 保存关键词
  saveword(e) {
    let that = this;
    that.data.keyword = e.detail.value;
    console.log(keyword);
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
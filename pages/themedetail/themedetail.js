// pages/themelist/themelist.js
const app = getApp()
const util = require('../../utils/util.js');
const getInfo = util.getInfo;
const post = util.post;
const coupon_image = util.coupon_image;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:null,
    coupon_image: coupon_image,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let theme_id=options.theme_id;
    console.log(theme_id);
    let p={
      m:'theme',
      a:'detail',
      uid:wx.getStorageSync('uid'),
      theme_id:theme_id
    };
    getInfo(p).then(res=>{
      console.log(res);
      that.setData({
        detail:res
      })
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
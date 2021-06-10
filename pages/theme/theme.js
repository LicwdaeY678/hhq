// pages/theme/theme.js
const app = getApp()
const util = require('../../utils/util.js');
const getInfo = util.getInfo;
const post = util.post;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeList:null,
    page:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let p={
      m:'theme',
      uid:wx.getStorageSync('uid')
    };
    getInfo(p).then(res=>{
      console.log(res);
      that.setData({
        themeList:res.result
      })
    })
  },
  goToList(e){
    let that=this;
    let theme_id=e.currentTarget.dataset.theme_id;
    console.log(theme_id);
    wx.navigateTo({
      url: '../themedetail/themedetail?theme_id='+theme_id,
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
    let that=this;
    that.data.page++;
    let p = {
      m: 'theme',
      uid: wx.getStorageSync('uid'),
      page: that.data.page
    };
    getInfo(p).then(res => {
      that.setData({
        themeList: [...that.data.themeList,...res.result]
      })
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// pages/kefu/kefu.js 
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showpic:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // wx.request({
    //   url: 'https://ad.lovegogo.com.cn/wxxcx/showpic.json',
    //   success(res){
    //     that.setData({
    //       showpic:res.data
    //     },()=>{
    //       console.log(that.data.showpic)
    //     })
    //   }
    // })


    let params = {
      m: 'check_we_app'
    };
    getInfo(params).then(res => {
      console.log(res);
      that.setData({
        showpic: res
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
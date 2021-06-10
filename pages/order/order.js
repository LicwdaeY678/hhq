// pages/order/order.js
const app = getApp();
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({ 

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['全部', '已付款', '已结算', '已失效'],
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    windowWidth: 0,
    order: null,
    orderList: null,
    close_toast2: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let { tabs } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({ stv: this.data.stv })
      this.tabsCount = tabs.length;
    } catch (e) {
    }

    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth,
    });

    let that = this;
    let p = {
      m: 'order',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        orderList: res
      });
      that.setData({
        order: res.result
      });
    })
  },

  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },
  handlerTabTap(e) {
    let that=this;
    let order;
    this._updateSelectedPage(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    console.log(index);
    if(index==0){
      order = that.data.orderList.result;
    }
    else if (index == 1) {
      order = that.data.orderList.result.filter(item => {
        return item.order_status == 0 || item.order_status == 1;
      })
    }
    else if (index == 2) {
      order = that.data.orderList.result.filter(item => {
        return item.order_status == 2
      })
    }
    else if (index == 3) {
      order = that.data.orderList.result.filter(item => {
        return item.order_status == -1
      })
    }
    console.log(order);
    that.setData({
      order:order
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
// pages/perfect/perfect.js
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
var coupon_image = util.coupon_image;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate: [
      { index: '0', id: "11111", title: "精选" },
      { index: '1', id: "18", title: "电器" },
      { index: '2', id: "4", title: "母婴" },
      { index: '3', id: "16", title: "美妆" },
      { index: '4', id: "818", title: "家纺" },
      { index: '5', id: "1451", title: "运动" },
      { index: '6', id: "743", title: "男装" },
      { index: '7', id: "1", title: "美食" },
      { index: '8', id: "1543", title: "手机" },
      { index: '9', id: "1281", title: "鞋包" },
      { index: '10', id: "15", title: "百货" },
      { index: '11', id: "13", title: "水果" },
      { index: '12', id: "12", title: "海淘" }
    ],
    goods: [],
    coupon_image: coupon_image,
    page: 1,
    fid: '11111',
    keyword: '',
    type: '1',
    itemid: 0,
    offset: 0,
    scroll_left: 0,
    close_toast2: false,
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let itemid = options.itemid;
    that.data.itemid = itemid;
    console.log(itemid);
    that.fetchData();
    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    // console.log(app.globalData.check_we_app)
    if (app.globalData.check_we_app == false) {
      wx.hideShareMenu()
    }
  },
  fetchData() {
    let that = this;
    let itemid = that.data.itemid;
    let p = {
      m: 'perfect',
      uid: wx.getStorageSync('uid'),
      itemid: itemid
    };
    getInfo(p).then(res => {
      that.setData({
        goods: res.result
      })
    })
  },
  handle(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    that.data.page = 1;
    that.data.keyword = '';
    console.log(item);
    if (item.index == '0') {
      that.data.type = '1';
      that.fetchData();
    }
    else {
      that.data.type = '2';
      let p = {
        m: 'perfect',
        uid: wx.getStorageSync('uid'),
        fid: item.id
      };
      getInfo(p).then(res => {
        that.setData({
          goods: res.result
        })
      })
    }
    that.setData({
      fid: item.id,
      offset: item.index * 22
    })
  },
  copy_words(e) {
    // 保存输入的关键词
    this.data.keyword = e.detail.value;
  },
  // 点击回车搜索商品
  searchGoods(e) {
    var keyword = e.detail.value;
    this.data.keyword = keyword;
    var that = this;
    this.search();
  },
  // 点击图标按钮搜索商品
  search_btn() {
    this.search();
  },
  // 搜索
  search() {
    var that = this;
    this.data.fid = '';
    this.data.page = 1;
    let p = {
      m: 'index',
      search: that.data.keyword,
      uid: wx.getStorageSync('uid'),
      i: '3'
    };
    getInfo(p).then(res => {
      that.setData({
        goods: res.result,
        fid: ''
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
  goIndex() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底啦~~~');
    let that = this;
    let p = {};
    if (that.data.keyword) {
      if (that.data.type == '1') {
        p = {
          uid: wx.getStorageSync('uid'),
          m: 'index',
          page: ++that.data.page,
          itemid: that.data.itemid,
          search: that.data.keyword ? that.data.keyword : '',
          i: '3'
        }
      }
      else if (that.data.type == '2') {
        p = {
          uid: wx.getStorageSync('uid'),
          m: 'index',
          page: ++that.data.page,
          fid: that.data.fid,
          search: that.data.keyword ? that.data.keyword : '',
          i: '3'
        }
      }
    }
    else {
      if (that.data.type == '1') {
        p = {
          uid: wx.getStorageSync('uid'),
          m: 'perfect',
          page: ++that.data.page,
          itemid: that.data.itemid
        }
      }
      else if (that.data.type == '2') {
        p = {
          uid: wx.getStorageSync('uid'),
          m: 'perfect',
          page: ++that.data.page,
          fid: that.data.fid
        }
      }
    }

    getInfo(p).then(res => {
      that.setData({
        goods: [...that.data.goods, ...res.result]
      })
    })

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
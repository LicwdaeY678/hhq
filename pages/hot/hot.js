// pages/hot/hot.js
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
var coupon_image = util.coupon_image;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { name: '综合', order: '', status: 0 },
      { name: '佣金', order: 'yongjin', status: 0 },
      { name: '销量', order: 'sum', status: 0 },
      { name: '价格', order: 'price', status: 0 }
    ],
    nowTab: '',
    sort: '',
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,
    goods: [],         // 商品列表
    page: 1,        // 当前页码
    fid: '',           // 商品种类
    isEnd: false,
    keyword: '',       // 搜索词
    sort: 'desc',

    goods_item_padding: 3,
    coupon_image: coupon_image,

    show_toast: false,
    close_toast2: false,
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let params = options.type;
    let p = {};
    if (params == 990) {
      p = {
        m: 'index',
        price: '990',
        uid: wx.getStorageSync('uid')
      };
      wx.setNavigationBarTitle({
        title: '9块9包邮'
      });
      that.data.price = '990'
    }
    else if (params == 'lady') {
      p = {
        m: 'index',
        fid: '210',
        uid: wx.getStorageSync('uid')
      };
      wx.setNavigationBarTitle({
        title: '精品女装'
      });
      that.data.keyword = '女装'
    }
    else if (params == 'man') {
      p = {
        m: 'index',
        fid: '743',
        uid: wx.getStorageSync('uid')
      };
      wx.setNavigationBarTitle({
        title: '爆款男装'
      });
      that.data.fid = '743'
    }
    else if (params == 'hitao') {
      p = {
        m: 'index',
        fid: '12',
        uid: wx.getStorageSync('uid')
      };
      wx.setNavigationBarTitle({
        title: '优惠海淘'
      });
      that.data.fid = '12'
    }



    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        goods: res.result
      })
    })



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
      windowWidth: wx.getSystemInfoSync().windowWidth,//图片宽度
    });
    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    // console.log(app.globalData.check_we_app)
    if (app.globalData.check_we_app == false) {
      wx.hideShareMenu()
    }
  },
  _updateSelectedPage(page) {
    let { tabs, stv, activeTab } = this.data;
    activeTab = page;
    this.setData({ activeTab: activeTab })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({ stv: this.data.stv })
  },
  //tab选项卡
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
    //商品排序
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    console.log(this.data.nowTab);
    var that = this;

    let p = {};
    that.data.page = 1;

    if (item.name == '价格') {
      if (item.name == that.data.nowTab.name) {
        if (item.status == 0) {
          item.status = 1;
          that.setData({
            tabs: [
              { name: '综合', order: '', status: 0 },
              { name: '佣金', order: 'yongjin', status: 0 },
              { name: '销量', order: 'sum', status: 0 },
              { name: '价格', order: 'price', status: 1 }
            ]
          })
          that.data.sort = 'desc';
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'desc',
            price: that.data.price ? that.data.price : ''
          }
        }
        else if (item.status == 1) {
          item.status = 2;
          that.setData({
            tabs: [
              { name: '综合', order: '', status: 0 },
              { name: '佣金', order: 'yongjin', status: 0 },
              { name: '销量', order: 'sum', status: 0 },
              { name: '价格', order: 'price', status: 2 }
            ]
          })
          that.data.sort = 'asc';
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'asc',
            price: that.data.price ? that.data.price : ''
          }
        }
        else if (item.status == 2) {
          item.status = 1;
          that.data.sort = 'desc';
          that.setData({
            tabs: [
              { name: '综合', order: '', status: 0 },
              { name: '佣金', order: 'yongjin', status: 0 },
              { name: '销量', order: 'sum', status: 0 },
              { name: '价格', order: 'price', status: 1 }
            ]
          })
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'desc',
            price: that.data.price ? that.data.price : ''
          }
        }
      }
      else {
        that.setData({
          tabs: [
            { name: '综合', order: '', status: 0 },
            { name: '佣金', order: 'yongjin', status: 0 },
            { name: '销量', order: 'sum', status: 0 },
            { name: '价格', order: 'price', status: 0 }
          ]
        });
        p = {
          m: 'index',
          fid: that.data.fid ? that.data.fid : '',
          search: that.data.keyword ? that.data.keyword : '',
          order: item.order,
          uid: wx.getStorageSync('uid'),
          price: that.data.price ? that.data.price : ''
        }
      }
    }
    else {
      that.setData({
        tabs: [
          { name: '综合', order: '', status: 0 },
          { name: '佣金', order: 'yongjin', status: 0 },
          { name: '销量', order: 'sum', status: 0 },
          { name: '价格', order: 'price', status: 0 }
        ]
      });
      that.data.sort = 'desc';
      p = {
        m: 'index',
        order: item.order,
        fid: that.data.fid ? that.data.fid : '',
        sort: 'desc',
        uid: wx.getStorageSync('uid'),
        search: that.data.keyword ? that.data.keyword : '',
        price: that.data.price ? that.data.price : ''
      }
    }
    getInfo(p).then(res => {
      that.setData({
        goods: res.result
      })
    })


    that.setData({
      tabs: that.data.tabs
    });
    that.data.nowTab = item;
    that.setData({
      nowTab: item
    })

  },
  // 触底加载更多
  onReachBottom() {
    console.log(this.data.nowPage);
    var defaultUrl = app.globalData.commonUrl;
    var that = this;
    that.data.page++;
    let p = {
      m: 'index',
      fid: that.data.fid ? that.data.fid : '',
      search: that.data.keyword ? that.data.keyword : '',
      order: that.data.nowTab.order ? that.data.nowTab.order : '',
      uid: wx.getStorageSync('uid'),
      sort: that.data.sort,
      page: that.data.page,
      price: that.data.price ? that.data.price : ''
    };
    getInfo(p).then(res => {
      that.setData({
        goods: [...that.data.goods, ...res.result]
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
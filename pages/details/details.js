// pages/details/details.js
//获取应用实例 
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据 
   */
  data: {
    details: null,
    show_pics: false,
    offset: '42px', //比价组件位置
    _offset: '100%', //收藏组件位置
    flag: false, //是否收藏
    collect: [], //收藏列表
    collect_width: 0, //收藏列表宽度
    collect_right: '42px', //收藏列表位置
    flag2: false, //控制收藏列表显示
    window_width: 0, //窗口宽度
    close_toast2: false,
    parity_goods: null,
    people: [{
        img: '../../image/userpic.png',
        username: 'a1'
      },
      {
        img: '../../image/userpic.png',
        username: 'a2'
      },
      {
        img: '../../image/userpic.png',
        username: 'a3'
      }
    ],
    nowIndex: 0,
    path:'',
    appid:''
  },
  jump_pdd() {
    let that = this;
    let path = encodeURIComponent(that.data.details.we_app_info.page_path);
    let appid = that.data.details.we_app_info.app_id;
    wx.navigateToMiniProgram({
      appId: 'wx859d5916eb5bf9ad',
      path: 'pages/jump/jump?path=' + path + '&appid=' + appid,
      success(res) {
        console.log('跳转成功');
        console.log(appid);
      }
    })
  },
  compare() {
    if (this.data.offset == '100%') {
      this.setData({
        offset: '42px'
      })
    } else if (this.data.offset == '42px') {
      this.setData({
        offset: '100%'
      })
    }
  },
  show_info() {
    wx.showToast({
      title: '比价信息来自于互联网，不支持购买',
      icon: 'none',

    })
  },
  show_collect() {
    if (this.data._offset == '100%') {
      this.setData({
        _offset: '42px'
      })
    } else if (this.data._offset == '42px') {
      this.setData({
        _offset: '100%'
      })
    }

    let that = this;
    that.setData({
      flag2: !that.data.flag2
    });
    that.setData({
      window_width: wx.getSystemInfoSync().windowWidth,
      collect_width: wx.getStorageSync('collect').length * 110
    });
    if (that.data.flag2) {
      if (parseInt(that.data.collect_width) > that.data.window_width) {
        that.setData({
          collect_right: `calc(-100% + ${that.data.window_width - 42}px)`
        })
      } else {
        that.setData({
          collect_right: `calc(-100% + ${that.data.collect.length * 110 + 42}px)`
        })
      }
    } else {
      that.setData({
        collect_right: `42px`
      })
    }

  },
  collect() {
    let that = this;
    let collect = wx.getStorageSync('collect');
    if (!that.data.flag) {
      collect.push(that.data.details)
    } else {
      collect = collect.filter(item => {
        return item.itemid != that.data.details.itemid
      })
    }


    wx.setStorageSync('collect', collect);
    that.setData({
      flag: !that.data.flag,
      collect: wx.getStorageSync('collect')
    });

  },
  goToDetail(e) {
    let itemid = e.currentTarget.dataset.itemid;
    console.log(itemid);
    wx.navigateTo({
      url: '../details/details?itemid=' + itemid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var lastPath = getCurrentPages()[0].route;
    console.log(lastPath);
    var itemid;
    itemid = options.itemid;
    var t;
    t = options.t;
    console.log('t:' + t);
    var that = this;


    if (options.scene) {
      let scene = decodeURIComponent(options.scene);
      scene = scene.split(':');
      t = parseInt(scene[0]);
      itemid = scene[1];
      if (t > 0) {
        app.globalData.t = t;
      }
    }
    app.checkLogin();


    let p = {};
    if (lastPath == 'pages/perfect/perfect') {
      p = {
        m: 'detail',
        uid: wx.getStorageSync('uid'),
        itemid: itemid,
        is_we_app: '1',
        perfect: '1'
      }
    } else {
      if (!t) {
        p = {
          m: 'detail',
          uid: wx.getStorageSync('uid'),
          itemid: itemid,
          is_we_app: '1'
        };
      } else {
        p = {
          m: 'detail',
          uid: t,
          itemid: itemid,
          is_we_app: '1'
        };
      }
    }
    getInfo(p).then(res => {
      if (res.result.parity_goods) {
        let parity_goods = res.result.parity_goods;
        parity_goods = parity_goods.filter(item => {
          return item.price > res.result.price;
        })
        that.setData({
          parity_goods: parity_goods
        })
      }
      console.log(res.result);
      that.setData({
        details: res.result
      }, () => {
        wx.getStorageSync('collect').forEach(item => {
          if (item.itemid == that.data.details.itemid) {
            that.setData({
              flag: true
            })
          }
        })
      });
      let path = encodeURIComponent(that.data.details.we_app_info.page_path);
      let appid = that.data.details.we_app_info.app_id;
      that.setData({
        appid: appid,
        path: path
      })
    });


    if (!wx.getStorageSync('collect')) {
      wx.setStorageSync('collect', [])
    }

    that.setData({
      collect: wx.getStorageSync('collect')
    });


    // let nowIndex = 1;
    // let timer = setInterval(() => {
    //   if (nowIndex >= that.data.people.length) {
    //     nowIndex = 0;
    //   }
    //   that.setData({
    //     nowIndex: nowIndex
    //   });
    //   nowIndex++;
    // }, 10000)



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
  returnback() {
    let pages = getCurrentPages();
    let lastPath = pages[pages.length - 2];
    console.log(lastPath);
    if (!lastPath) {
      wx.switchTab({
        url: '../index/index',
      })
    } else {
      wx.navigateBack()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.details.title,
      path: 'pages/details/details?itemid=' + this.data.details.itemid + '&t=' + wx.getStorageSync('uid'),
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onReachBottom() {
    // this.data.show_pics=true;
    console.log(111);
    this.setData({
      show_pics: true
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
  goToShare(e) {
    let itemid = e.currentTarget.dataset.itemid;
    console.log(itemid);
    wx.navigateTo({
      url: '../share/share?itemid=' + itemid,
    })
  },
  goToJoin(){
    let that=this;
    wx.navigateTo({
      url: '../join/join',
    })
  }
})
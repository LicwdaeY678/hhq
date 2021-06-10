// pages/sign/sign.js
const app = getApp()
const util = require('../../utils/util.js');
const getInfo = util.getInfo;
const post = util.post;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weeks: [
      { name: '周一', day: 1 },
      { name: '周二', day: 2 },
      { name: '周三', day: 3 },
      { name: '周四', day: 4 },
      { name: '周五', day: 5 },
      { name: '周六', day: 6 },
      { name: '周日', day: 0 }
    ],
    nowWeek: '',  //当前星期
    sign: false,  //签到状态
    info: null,  //展示数据
    exchangeList: [
      { img: '../../image/dh_1.jpg', count: 2000, title: '1元现金红包' },
      { img: '../../image/dh_10.jpg', count: 20000, title: '10元现金红包' },
      { img: '../../image/dh_30.jpg', count: 60000, title: '30元现金红包' },
      { img: '../../image/dh_50.jpg', count: 100000, title: '50元现金红包' },
    ],
    count_down: 0,  //倒计时
    open_box: false,   //点击宝箱
    h: '00',
    m: '00',
    s: '00',
    timer: null,
    userinfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let nowWeekKey = new Date().getDay();
    let nowWeek;
    let weeks = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    for (let i in weeks) {
      if (i == nowWeekKey) {
        nowWeek = weeks[i];
      }
    }
    that.data.nowWeek = nowWeek;
    console.log(nowWeek);
    that.setData({
      userinfo: wx.getStorageSync('userinfo')
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
    let that = this;
    that.update();
    let open_box = wx.getStorageSync('open_box');
    // let count_down = wx.getStorageSync('count_down');
    let beginTime = new Date().getTime();
    console.log('beginTime:' + beginTime);
    let endTime = wx.getStorageSync('open_box_end_time');
    // wx.setStorageSync('beginTime', beginTime);
    let time = parseInt((endTime - beginTime) / 1000);

    if (open_box) {
      that.setData({
        open_box: true
      });
      that.countDown(time);
    }
    if (time< 0) {
      // wx.setStorageSync('count_down', 0);
      that.setData({
        open_box: false
      });
      clearInterval(that.timer);
    }
  },
  //更新数据
  update() {
    let that = this;

    let p = {
      m: 'goldcoin',
      uid: wx.getStorageSync('uid')
    };
    post(p).then(res => {
      for (let w in res.result.goldcoin_check) {
        if (w == that.data.nowWeek && res.result.goldcoin_check[w] == 1) {
          that.setData({
            sign: true
          })
        }
      }
      that.setData({
        info: res.result
      })
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  //点击签到
  sign_in() {
    let that = this;
    let p = {
      m: 'goldcoin',
      a: 'everyday',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      if (res.r == 0) {
        that.update();
        wx.showToast({
          title: '签到成功！',
        })
      }
      else {
        wx.showToast({
          title: '签到失败，请稍后再试',
        })
      }
    })
  },
  // 兑换金币
  exchange(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    console.log(item);
    let p = {
      m: 'goldcoin',
      a: 'exchange',
      uid: wx.getStorageSync('uid'),
      goldcoin: item.count
    };
    post(p).then(res => {
      console.log(res);
      if (res.r == 0) {
        that.update();
        wx.showToast({
          title: '兑换成功！',
        });
      }
      else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
      }
    })
  },
  // 开启宝箱
  openBox() {
    let that = this;
    let p = {
      m: 'goldcoin',
      a: 'every4hour',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      if (res.r == 0) {
        wx.showToast({
          title: '签到成功!',
        });
        wx.setStorageSync('open_box', true);
        that.setData({
          open_box: true
        });
        let open_box_start_time = new Date();
        let open_box_end_time = new Date();
        open_box_end_time.setHours(open_box_end_time.getHours()+4);  //设置四个小时之后
        wx.setStorageSync('open_box_end_time', open_box_end_time.getTime());  //将宝箱结束时间存入storage
        that.countDown(14400);
        that.update();
      }
      else {
        wx.showToast({
          title: '签到失败，请稍后再试',
          icon: 'none'
        })
      }
    })

  },
  // 倒计时
  countDown(c) {

    let that = this;
    let count = c;  //倒计时4小时

    clearInterval(that.timer);

    that.timer = setInterval(clock, 1000);

    function clock() {
      // wx.setStorageSync('count_down', count);
      var s = (count % 60) < 10 ? ('0' + count % 60) : count % 60;
      var h = count / 3600 < 10 ? ('0' + parseInt(count / 3600)) : parseInt(count / 3600);
      var m = (count - h * 3600) / 60 < 10 ? ('0' + parseInt((count - h * 3600) / 60)) : parseInt((count - h * 3600) / 60);
      if (s == '00' && h == '00' && m == '00') {
        clearInterval(that.timer);
        that.setData({
          open_box: false
        })
      }
      that.setData({
        count_down: count,
        s: s,
        h: h,
        m: m
      });
      count--;
      // console.log(count+'s');
    }
  },
  scrollToTop(){
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  tap3min(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})
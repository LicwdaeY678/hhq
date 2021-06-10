// var aldstat = require("./utils/ald-stat.js");
var sdk=require('./utils/sdk.js');
//app.js

var util = require('./utils/util.js');
var getInfo = util.getInfo;
var post=util.post;

App({
  onLaunch: function(options) {
    //检查登录
    let that = this;

    var t = options.query.t;
    var ch = options.query.ch;
    this.globalData.t = t;
    this.globalData.ch = ch;
    if (options.path != 'pages/index/index' && options.path != 'pages/details/details') {

      that.checkLogin();
    }

    console.log(options);

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // let params = {
    //   m: 'check_we_app'
    // };
    // getInfo(params).then(res => {
    //   console.log(res);
    //   if (res.result == 0) {
    //     wx.redirectTo({
    //       url: '../../pages/kefu/kefu',
    //     })
    //   }
    // })

    let p = {
      m: 'tixian',
      uid: wx.getStorageSync('uid')
    };
    post(p).then(res => {
      console.log(res);
      let money = res.promotion_can_cash;
      if (money < 10) {
        wx.showToast({
          title: '您的当前余额为' + money + '元，距离可提现还差' + (10 - money) + '元',
          icon: 'none',
          duration: 2500
        })
      }
      else {
        wx.showModal({
          title: '温馨提示',
          content: '您的当前余额已经可以提现了，点击确定前往提现',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.navigateTo({
                url: '../cash/cash',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })


  },
  globalData: {
    isLogin: false, //是否登录
    user: null, //微信获取的用户信息
    userInfo: null, //后台请求回来的用户数据
    commonUrl: 'https://wxb.whwangdoudou.cn/pdd.php', //api地址
    t: '', //推荐人uid
    ch: '' //渠道
  },
  checkLogin() {
    let that = this;
    let ch = that.globalData.ch;
    //检查localstorage里有没有kuaiyong
    let kuaiyong = wx.getStorageSync('kuaiyong');
    if (!kuaiyong) {
      that.wxLogin();
    } else {
      let p = {
        m: 'xlogin',
        kuaiyong: kuaiyong,
        i: '3'
      };
      getInfo(p).then(res => {
        console.log(res);
        if (res.errcode == -1000 && res.r == -1) {
          that.wxLogin();
        } else {
          if (res.check_phone == 0) {
            wx.setStorageSync('uid', res.uid);
            wx.setStorageSync('userinfo', res.info);
            // wx.switchTab({
            //   url: '../index/index',
            // });
          } else if (res.check_phone == 1) {
            if (res.phone_ok == 1) {
              wx.setStorageSync('uid', res.uid);
              wx.setStorageSync('userinfo', res.info);
              // wx.switchTab({
              //   url: '../index/index',
              // });
            } else if (res.phone_ok == 0) {
              wx.setStorageSync('uid', res.uid);
              wx.navigateTo({
                url: '../../pages/phone/phone',
              })
            }
          }
        }
      })
    }
  },
  wxLogin() {
    var that = this;
    var code, encryptedData, iv;
    // 调用微信登录接口获取code
    wx.login({
      success: res => {
        console.log(res);
        code = res.code;
        // 调用getUserInfo获取encryptedData和iv
        wx.getUserInfo({ //getUserInfo流程
          success: function(res2) { //获取userinfo成功
            console.log(res2);
            encryptedData = res2.encryptedData;
            iv = res2.iv;
            // 和后台交互获取session
            that.Login(code, encryptedData, iv);
          },
          fail(e) {
            console.log(e)
          }
        })
      }
    });

  },
  Login(code, encryptedData, iv) {
    var that = this;
    var defaultUrl = that.globalData.commonUrl;
    var t = that.globalData.t;
    var ch = that.globalData.ch;
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    //请求服务器
    let p = {};
    if (!t) {
      if (!ch) {
        p = {
          m: 'xlogin',
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          i: '3'
        }
      } else {
        p = {
          m: 'xlogin',
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          i: '3',
          ch: ch
        }
      }
    } else {
      if (!ch) {
        p = {
          m: 'xlogin',
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          t: t,
          i: '3'
        }
      } else {
        p = {
          m: 'xlogin',
          code: code,
          encryptedData: encryptedData,
          iv: iv,
          t: t,
          i: '3',
          ch: ch
        }
      }
    }
    wx.request({
      url: defaultUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType: 'josn',
      data: p,
      success: function(res) {
        wx.hideToast();
        var data = res.data.trim(); //去除空格
        data = JSON.parse(data); //字符串转json
        console.log(data);
        if (data.check_phone == 0) {
          // 将用户信息存至localstorage
          // wx.setStorageSync('userinfo', res);
          // 将kuaiyong和uid存入storage中
          wx.setStorageSync('kuaiyong', data.kuaiyong);
          wx.setStorageSync('uid', data.uid);
          // wx.switchTab({
          //   url: '../index/index',
          // });
        } else if (data.check_phone == 1) {
          if (data.phone_ok === 0) {
            // 未绑定手机号，跳转至验证手机页面
            wx.showModal({
              title: '温馨提示',
              content: '当前账户尚未绑定手机，是否前往绑定',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: './pages/phone/phone', //前往绑定手机页
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else if (data.phone_ok === 1) {
            // wx.showToast({
            //   title: '登录成功，前往首页!',
            // });
            // 将用户信息存至localstorage
            // wx.setStorageSync('userinfo', res);
            // 将kuaiyong和uid存入storage中
            // wx.switchTab({
            //   url: './pages/index/index',
            // });
          }
          wx.setStorageSync('kuaiyong', data.kuaiyong);
          wx.setStorageSync('uid', data.uid);
        }
      },
      fail: function() {
        console.log('登录失败');
      }
    })
  },
  onShow() {
    // let that=this;
    // let beginTime=new Date().getTime();
    // let endTime = wx.getStorageSync('endTime');
    // let open_box = wx.getStorageSync('open_box');
    // let count_down = wx.getStorageSync('count_down');
    // console.log('beginTime:'+beginTime);
    // wx.setStorageSync('beginTime', beginTime);

    // let time = parseInt((beginTime - endTime) / 2000);
    // console.log(time * 2 + 's');

    // if (open_box){
    //   count_down=count_down-time;
    //   wx.setStorageSync('count_down', count_down);
    // }

  },
  onHide() {
    // let that = this;
    // let endTime = new Date().getTime();
    // console.log('endTime:'+endTime);
    // wx.setStorageSync('endTime', endTime);
  },
  onPageNotFound() {
    console.log('pageNotFound');
    wx.switchTab({
      url: 'pages/index/index',
    })
  }
})
// pages/login/login.js
const app = getApp();
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    that.checkLogin();
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
  checkLogin(){
    let that=this;
    //检查localstorage里有没有kuaiyong
    let kuaiyong=wx.getStorageSync('kuaiyong');
    if(!kuaiyong){
      that.wxLogin();
    }
    else{
      let p={
        m:'xlogin',
        kuaiyong:kuaiyong
      };
      getInfo(p).then(res=>{
        console.log(res);
        if (res.errcode == -1000 && res.r == -1) {
          that.wxLogin();
        }
        else{
          if (res.check_phone == 0){
            wx.setStorageSync('uid', res.uid);
            wx.setStorageSync('userinfo', res.info);
            wx.switchTab({
              url: '../index/index',
            });
          }
          else if(res.check_phone==1){
            if (res.phone_ok == 1) {
              wx.setStorageSync('uid', res.uid);
              wx.setStorageSync('userinfo', res.info);
              wx.switchTab({
                url: '../index/index',
              });
            }
            else if (res.phone_ok == 0){
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
        wx.getUserInfo({//getUserInfo流程
          success: function (res2) {//获取userinfo成功
            console.log(res2);
            encryptedData = res2.encryptedData;
            iv = res2.iv;
            // 和后台交互获取session
            that.Login(code, encryptedData, iv);
          },
          fail(e){
            console.log(e)
          }
        })
      }
    });

  },
  Login(code, encryptedData, iv) {
    var that = this;
    var defaultUrl = app.globalData.commonUrl;
    wx.showToast({
      title: '正在登录...',
      icon: 'loading',
      duration: 10000
    });
    //请求服务器
    wx.request({
      url: defaultUrl,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      dataType:'josn',
      data: {
        m: 'xlogin',
        code: code,
        encryptedData: encryptedData,
        iv: iv
      },
      success: function (res) {
        wx.hideToast();
        var data=res.data.trim();   //去除空格
        data=JSON.parse(data);      //字符串转json
        console.log(data);
        if (data.check_phone == 0) {
          // 将用户信息存至localstorage
          // wx.setStorageSync('userinfo', res);
          // 将kuaiyong和uid存入storage中
          wx.setStorageSync('kuaiyong', data.kuaiyong);
          wx.setStorageSync('uid', data.uid);
          wx.switchTab({
            url: '../index/index',
          });
        }
        else if (data.check_phone == 1) {
          if (data.phone_ok === 0) {
            // 未绑定手机号，跳转至验证手机页面
            wx.showModal({
              title: '温馨提示',
              content: '当前账户尚未绑定手机，是否前往绑定',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.navigateTo({
                    url: '../phone/phone',       //前往绑定手机页
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          }
          else if (data.phone_ok === 1) {
            // wx.showToast({
            //   title: '登录成功，前往首页!',
            // });
            // 将用户信息存至localstorage
            // wx.setStorageSync('userinfo', res);
            // 将kuaiyong和uid存入storage中
            wx.switchTab({
              url: '../index/index',
            });
          }
          wx.setStorageSync('kuaiyong', data.kuaiyong);
          wx.setStorageSync('uid', data.uid);
        }
      },
      fail: function () {
        console.log('登录失败');
      }
    })
  }
})
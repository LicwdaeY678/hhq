// pages/phone/phone.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',                    //手机号码
    phone_is_true: false,        //手机号格式是否正确
    code_is_send: false,         //验证码是否被点击
    code_txt: '发送验证码'        //验证码文字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //将input里的手机号保存在data中
  save_phone(e) {
    this.data.phone = e.detail.value;
  },
  //点击请求验证码
  send_code() {
    //请求验证码前，先验证手机号格式是否正确
    this.reg_phone();
    var that = this;
    var defaultUrl = app.globalData.commonUrl;
    if (this.data.code_is_send === false && this.data.phone_is_true===true) {
      var that = this;
      //请求验证码
      wx.request({
        url: defaultUrl ,
        method:'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data:{
          m:'send_code',
          phone:that.data.phone
        },
        success(res){
          console.log(res);
          if(res.data.r===0){
            console.log('验证码发送成功');
            wx.showToast({
              title: '验证码发送成功，请注意查收'
            });
            that.setData({
              code_is_send: true
            });
            var time = 10;
            var timer = null;
            timer = setInterval(function () {
              if (time > 0) {
                that.setData({
                  code_txt: time-- + 'S后可发送'
                })
              }
              else {
                clearInterval(timer);
                that.setData({
                  code_txt: '发送验证码',
                  code_is_send: false
                });
              }
            }, 1000)
          }
          else{
            console.log('验证码发送失败');
            wx.showToast({
              title: '验证码发送失败，请稍后再试',
              icon: 'none'
            });
          }
        }
      })
    }
  },
  //验证手机号格式
  reg_phone() {
    var phone = this.data.phone;
    var reg = /^1(3|5|7|8|9)\d{9}$/;
    if (!reg.test(phone)) {
      console.log('验证失败');
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      });
      console.log(phone);
      this.data.phone_is_true = false;
    }
    else {
      this.data.phone_is_true = true;
    }
  },
  //提交手机号和验证码
  formSubmit(e) {
    var that = this;
    var defaultUrl = app.globalData.commonUrl;
    var uid=wx.getStorageSync('uid');
    
    //若手机号格式错，则不提交后台
    if (this.data.phone_is_true === true) {
      // 手机号和验证码提交后台验证
      wx.request({
        url: defaultUrl,
        data: {
          m: 'check_code',
          code: e.detail.value.code,
          phone:e.detail.value.phone,
          uid: uid
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          if(res.r===0){
            // 状态码r=0则验证成功
            wx.showToast({
              title: '验证成功',
              icon: 'none'
            });
            //验证成功，返回index页面
            wx.navigateTo({
              url: '../index/index',
            });
            app.globalData.isLogin = true;
          }
          else{
            wx.showToast({
              title: '验证码错误',
              icon: 'none'
            });
          }
        }
      })
    }
    else {
      wx.showToast({
        title: '请重新填写信息',
        icon: 'none'
      })
    }
    console.log(e);
  }
})
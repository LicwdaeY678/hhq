// pages/invite/invite.js
const app = getApp();
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // imgUrls:[
    //   '../../image/invite-01.png',
    //   '../../image/invite-02.png',
    //   '../../image/invite-03.png'
    // ]
    imgUrls: [
      '../../image/invite.jpg',
      '../../image/invite.jpg',
      '../../image/invite.jpg'
    ],
    close_toast2: false,
    picurl: '',
    check_we_app: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let p = {
      m: 'xinvite',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      let picurl = res.result;
      // picurl=picurl.replace(/\r\n/g,'');
      that.setData({
        picurl: picurl
      })
    });
    this.setData({
      check_we_app: app.globalData.check_we_app,
    })
    console.log(app.globalData.check_we_app)
    if (app.globalData.check_we_app == false) {
      wx.hideShareMenu()
    }
  },
  saveImg() {
    let that = this;
    console.log(2333);
    wx.downloadFile({
      url: that.data.picurl,
      success: function (res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log(res);
            let p = {
              m: 'xinvite',
              uid: wx.getStorageSync('uid'),
              a: 'del'
            };
            getInfo(p).then(res => {
              console.log(res)
            });

            wx.showModal({
              title: '温馨提示',
              content: '商城海报已保存至相册，可进入朋友圈分享',
              confirmText: '查看教程',
              cancelText: '知道了',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '../invite_poster/invite_poster',
                  })

                } else if (res.cancel) {
                  console.log('知道了');
                }
              }
            })
          }
        })
      },
      fail(res) {
        console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '拼多多自购省钱，分享赚钱，加入惠花券准没错',
      path: 'pages/index/index?t=' + wx.getStorageSync('uid'),
      imageUrl: '../../image/fenxiang.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
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
  goToPoster() {
    wx.navigateTo({
      url: '../invite_poster/invite_poster',
    })
  }
})
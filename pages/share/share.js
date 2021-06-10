// pages/detail/detail.js
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
var post = util.post;
Page({

  /** 
   * 页面的初始数据 
   */
  data: {
    details: {},
    windowWidth: 0,
    images: [],


    currentPageUrl: '',
    currentItemId: 0,
    num: 1,

    text_area_height: 120,
    text_area_padding_bottom: 30,
    text_area_txt: '【限时特价全国包邮】【好棉袜5双10双装】袜子男士秋冬中筒袜短袜黑白商务纯色棉袜子四季吸汗防臭运动袜短袜长袜\n原价7.8元\n券后价5.8元\n下单地址: http://url.cn/51P1eoY',

    coupon_image: "data:image/png;base64,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",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前窗口宽度
    var res = wx.getSystemInfoSync();
    this.setData({
      windowWidth: res.windowWidth
    });





    //获取当前URL
    wx.showShareMenu({
      withShareTicket: false
    });
    // this.data.currentPageUrl = getCurrentPages()[1].route;
    // console.log(getCurrentPages());

    // console.log(options);
    this.data.currentItemId = options.itemid;


    //获取当前ID的详细数据
    var defaultUrl = app.globalData.commonUrl;
    var that = this;
    wx.showLoading({
      title: '拼命加载中',
      mask: true,
      success() {
        wx.request({
          url: defaultUrl,
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          data: {
            m: 'detail',
            itemid: that.data.currentItemId,
            a:'share',
            uid:wx.getStorageSync('uid')
          },
          success: function (res) {
            console.log(res.data);
            var txt = res.data.result.content;
            var t = txt.replace(/\\n/g, ' \n');
            //对图片数组进行清洗
            var images = [];
            for (let i in res.data.result.images) {
              if (i == 0) {
                images.push({
                  selected: true,
                  id: i, 
                  image: res.data.result.images[i]
                })
              }
              else {
                images.push({
                  selected: false,
                  id: i,
                  image: res.data.result.images[i]
                })
              }
            };
            // var i=t.indexOf('原价');
            // t=t.substr(0,i);
            that.setData({
              details: res.data.result,
              txt: t,
              images: images
            });
            wx.hideLoading();
          }
        })
      }
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
  /***********add by yanyingjie 2018-03-27 begin*************/
  // 查看大图
  onTapScale(e) {
    var that = this;
    console.log(e);
    var img = e.currentTarget.dataset.item.image;
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  // 购买、复制到剪贴板
  onTapBuy() {
    var that = this;
    //筛选出选中的图片
    var selectedImg = [];
    that.data.images.forEach(item => {
      if (item.selected == true) {
        selectedImg.push(item);
      }
    })
    // 判断选中的数量是否为空
    if (selectedImg.length == 0) {
      wx.showToast({
        title: '当前没有选中图片，请重新选择！',
        icon:'none'
      })
    }
    else {
      //复制分享
      wx.setClipboardData({
        data: that.data.details.content,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
              wx.showModal({
                title: '温馨提示',
                content: '点击确定保存文案和选中的图片到相册，可手动分享到朋友圈哦',
                confirmText: '确定',
                cancelText: '取消',
                success: function (res) {
                  if (res.confirm) {
                    console.log('用户点击确定');
                    //保存选中的图片到本地
                    selectedImg.forEach(item => {
                      setTimeout(function () {
                        wx.downloadFile({
                          url: item.image,
                          success: function (res) {
                            console.log(res)
                            wx.saveImageToPhotosAlbum({
                              filePath: res.tempFilePath,
                              success: function (res) {
                                console.log(res)
                              }
                            })
                          }
                        })
                      }, 30);
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消');
                  }
                }
              })
            }
          })
        }
      })
    }
  },
  // 分享到微信
  shareToWx() {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    let that=this;
    that.copyTxt();
  },
  // 分享到朋友圈
  shareToFriends() {
    var that = this;
    that.copyTxt();
    //保存选中的图片到本地
    this.data.images.forEach(item => {
      if (item.selected === true) {
        wx.downloadFile({
          url: item.image,
          success: function (res) {
            console.log(res)
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log(res);
                let p={
                  m:'detail',
                  a:'share_del',
                  uid:wx.getStorageSync('uid'),
                  itemid: that.data.currentItemId
                };
                post(p).then(res=>{
                  console.log(res);
                });

                wx.showModal({
                  title: '温馨提示',
                  content: '商品文案复制成功，文案图片已自动生成并保存到您的相册，可进入朋友圈分享',
                  confirmText: '查看教程',
                  cancelText: '知道了',
                  success: function (res) {
                    if (res.confirm) {
                      wx.navigateTo({
                        url: '../goods_poster/goods_poster',
                      })
                      
                    } else if (res.cancel) {
                      console.log('知道了');
                    }
                  }
                })

              }
            })
          }
        })
      }
    })
  },
  //转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.details.title,
      path: 'pages/details/details?itemid=' + this.data.currentItemId + '&t=' + wx.getStorageSync('uid'),
      imageUrl:this.data.details.picurl,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // 取消勾选
  onTapSelect(e) {
    var index = e.currentTarget.dataset.item.id;
    if(index!=0){
      this.data.images[index].selected = false;
    }
    
    var images = this.data.images;
    this.setData({
      images: images
    });
    this.count();
    console.log(this.data.images);
  },
  // 勾选
  onTapCancelSelect(e) {
    // var index = e.currentTarget.dataset.item.id;
    // this.data.images[index].selected = true;
    // var images = this.data.images;
    // this.setData({
    //   images: images
    // });
    // this.count();
    // console.log(this.data.images);
  },
  //计算选中的数量
  count() {
    var arr = this.data.images.filter(item => {
      return item.selected == true
    });
    this.setData({
      num: arr.length
    });
  },
  // 复制文案
  copyTxt() {
    wx.setClipboardData({
      data: this.data.details.content,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '文案复制成功',
              icon: 'success',
              duration: 1200
            })
          }
        })
      }
    })
  },
  goToPoster() {
    wx.navigateTo({
      url: '../goods_poster/goods_poster',
    })
  }
})



 /***********add by yanyingjie 2018-03-27 end*************/
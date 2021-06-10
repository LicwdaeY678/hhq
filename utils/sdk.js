//post请求

const url = 'https://weapp.whwangdoudou.cn/weapp.php';

const post = (url, params) => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success网络请求成功
        if (res.statusCode != 200) {
          reject({
            error: '服务器忙，请稍后重试',
            code: 500
          });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) {
        reject({
          error: '网络错误',
          code: 0
        });
      }
    })
  })
}

const user = {
  submitSysInfo(p) {
    let scene = decodeURIComponent(p.scene);
    let device_info = JSON.stringify(p.device_info);
    scene = scene.split(':');
    let uid = scene[0];
    let weappid = scene[1];
    wx.setStorageSync('sdk_uid', uid);
    wx.setStorageSync('sdk_weappid', weappid);
    let timeStamp = parseInt(new Date().getTime() / 1000);
    let params = {
      m: 'start',
      uid: uid,
      weappid: weappid,
      device_info: device_info,
      time: timeStamp
    }
    post(url, params);
  },
  submitUserInfo(p) {
    if (wx.getStorageSync('sdk_uid') && wx.getStorageSync('sdk_weappid')) {
      let params = {
        m: 'userinfo',
        uid: wx.getStorageSync('sdk_uid'),
        weappid: wx.getStorageSync('sdk_weappid'),
        userinfo: JSON.stringify(p)
      }
      post(url, params)
    }

  },
  submitEvent(p) {
    if (wx.getStorageSync('sdk_uid') && wx.getStorageSync('sdk_weappid')) {
      let params = {
        m: 'invoke',
        uid: wx.getStorageSync('sdk_uid'),
        weappid: wx.getStorageSync('sdk_weappid'),
        type: p.type,
        content: p.content
      }
      post(url, params)
    }

  },
}

module.exports = {
  user: user
}
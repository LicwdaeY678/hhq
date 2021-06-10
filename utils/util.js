
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const coupon_image = "data:image/png;base64,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";

const getInfo = data => {
  return new Promise(function (resolve, reject) {
    wx.showToast({
      title: '拼命加载中',
      icon: 'loading',
      success() {
        //网络请求
        wx.request({
          url: 'https://wxb.whwangdoudou.cn/pdd.php',
          data: data,
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            // success网络请求成功
            if (res.statusCode != 200) {
              reject({ error: '服务器忙，请稍后重试', code: 500 });
              return;
            }
            resolve(res.data);
            wx.hideToast();
          },
          fail: function (res) {
            reject({ error: '网络错误', code: 0 });
          }
        })
      }
    })
  })
}

const post = data => {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'https://wxb.whwangdoudou.cn/pdd.php',
      data: data,
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // success网络请求成功
        if (res.statusCode != 200) {
          reject({ error: '服务器忙，请稍后重试', code: 500 });
          return;
        }
        resolve(res.data);
      },
      fail: function (res) {
        reject({ error: '网络错误', code: 0 });
      }
    })
  })
}





module.exports = {
  formatTime: formatTime,
  getInfo: post,
  post:post,
  coupon_image: coupon_image
}

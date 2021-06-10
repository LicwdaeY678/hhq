// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    person: [
      { name: '帅哥', img: '../../image/pic/sgc.png' },
      { name: '美女', img: '../../image/pic/mnc.png' },
      { name: '宝妈', img: '../../image/pic/nmc.png' },
    ],
    nowPerson: '帅哥',
    job: ['学生党', '初入职场', '资深工作党', '其他'],
    nowJob: '学生党',
    age: ['00后', '90后', '80后', '其他'],
    nowAge: '00后',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choosePerson(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    console.log(item);
    that.setData({
      nowPerson: item.name
    })
  },
  chooseJob(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    console.log(item);
    that.setData({
      nowJob: item
    })
  },
  chooseAge(e) {
    let that = this;
    let item = e.currentTarget.dataset.item;
    console.log(item);
    that.setData({
      nowAge: item
    })
  },
  confirmChoose() {
    let that = this;
    console.log(that.data.nowPerson, ',', that.data.nowJob, ',', that.data.nowAge);
    // wx.switchTab({
    //   url: '../index/index',
    // })
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
  showGuide() {
    let that = this;
    that.setData({
      flag: true
    })
  }
})
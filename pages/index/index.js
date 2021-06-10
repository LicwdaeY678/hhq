//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
var getInfo = util.getInfo;
var post = util.post;
var coupon_image = util.coupon_image;
var sdk = require('../../utils/sdk.js');
Page({
  /*data: {
    motto: '亲爱的小菲',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs' 
    })
  },*/
  data: {
    background: [{
        image: "../../image/slide1.png"
      },
      {
        image: "../../image/slide2.png"
      },
      {
        image: "../../image/slide3.png"
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,

    windowWidth: 0,

    // tabs: ['综合', '佣金', '销量', '价格'],
    tabs: [{
        name: '综合',
        order: '',
        status: 0
      },
      {
        name: '佣金',
        order: 'yongjin',
        status: 0
      },
      {
        name: '销量',
        order: 'sum',
        status: 0
      },
      {
        name: '价格',
        order: 'price',
        status: 0
      }
    ],
    nowTab: '',
    sort: '',
    stv: {
      windowWidth: 0,
      lineWidth: 0,
      offset: 0,
      tStart: false
    },
    activeTab: 0,

    category: [
      [{
          id: "18",
          title: "电器",
          image: "../../image/electric.png"
        },
        {
          id: "4",
          title: "母婴",
          image: "../../image/baby.png"
        },
        {
          id: "16",
          title: "美妆",
          image: "../../image/beauty.png"
        },
        {
          id: "818",
          title: "家纺",
          image: "../../image/house.png"
        },
        {
          id: "1451",
          title: "运动",
          image: "../../image/bras.png"
        },
        {
          id: "743",
          title: "男装",
          image: "../../image/man.png"
        }
      ],
      [

        {
          id: "1",
          title: "美食",
          image: "../../image/food.png"
        },
        {
          id: "1543",
          title: "手机",
          image: "../../image/digit.png"
        },
        {
          id: "1281",
          title: "鞋包",
          image: "../../image/shoes.png"
        },
        {
          id: "210",
          title: "女装",
          image: "../../image/lady.png"
        },
        {
          id: "13",
          title: "水果",
          image: "../../image/fruit.png"
        },
        {
          id: "12",
          title: "海淘",
          image: "../../image/haitao.png"
        }
      ]
    ],

    goods: [], // 商品列表
    page: 1, // 当前页码
    fid: '', // 商品种类
    isEnd: false,
    keyword: '', // 搜索词
    sort: 'desc',

    goods_item_padding: 3,
    coupon_image: coupon_image,

    show_toast: false,
    show_toast2: false,
    show_toast3: false,

    _fid: 0,
    ad_flag: 0, //是否显示广告页
    ad_info: null, //广告数据


    flag: false, //显示用户选择
    person: [{
        name: '美女',
        img: 'https://wxb.whwangdoudou.cn/mp/img/pic/mnc.png'
      },
      {
        name: '帅哥',
        img: 'https://wxb.whwangdoudou.cn/mp/img/pic/sgc.png'
      },
      {
        name: '宝妈',
        img: 'https://wxb.whwangdoudou.cn/mp/img/pic/nmc.png'
      }
    ],
    nowPerson: '美女',
    job: ['学生党', '初入职场', '资深工作党', '其他'],
    nowJob: '学生党',
    age: ['00后', '90后', '80后', '其他'],
    nowAge: '00后',

    hb_flag: false, //显示新人红包
    m: '00',
    s: '00',
    _timer: null, 
    clock_flag1: false,
    clock_flag2: false,
    qd_flag:false,
    date:'',
  },
  onShow(e) {
    console.log('onShow');
    let that=this;
    let date=new Date();
    that.setData({
      date:date
    })
  },
  onLoad: function(options) {
    if (options.scene) {
      let scene = parseInt(decodeURIComponent(options.scene));
      console.log('scene:' + scene);
      if (scene > 0) {
        app.globalData.t = scene;
      }
    }
    app.checkLogin();


    // 1.获取设备信息
    if (options.scene) {
      let data1 = {
        scene: options.scene,
        device_info: wx.getSystemInfoSync()
      }
      sdk.user.submitSysInfo(data1);
    }

    // 2.获取用户信息
    // let userinfo = wx.getUserInfo();
    let userinfo=wx.getStorageSync('userinfo');
    if (userinfo != undefined) {
      sdk.user.submitUserInfo(userinfo);
    }
    console.log(userinfo);


    //3.收集自定义事件信息
    let data2 = {
      type: 'look',
      content: '180s'
    }
    sdk.user.submitEvent(data2);





    var that = this;
    if (!wx.getStorageSync('uid')) {
      wx.hideTabBar();
      that.setData({
        show_toast3: true
      })
    } else {
      let params = {
        m: 'cold',
        uid: wx.getStorageSync('uid'),
        a: 'check'
      };

      getInfo(params).then(res => {
        console.log(res);
        if (res.has_detail == 0) {
          wx.hideTabBar();
          that.setData({
            show_toast3: true
          })
        }
      })
    }




    try {
      let {
        tabs
      } = this.data;
      var res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.stv.lineWidth = this.windowWidth / this.data.tabs.length;
      this.data.stv.windowWidth = res.windowWidth;
      this.setData({
        stv: this.data.stv
      })
      this.tabsCount = tabs.length;
    } catch (e) {}
    this.setData({
      windowWidth: wx.getSystemInfoSync().windowWidth, //图片宽度
    });

    if (!wx.getStorageSync('count')) {
      wx.setStorageSync('count', 1);
    } else {
      wx.setStorageSync('count', wx.getStorageSync('count') + 1);
    }

    // 请求页面加载默认展示的数据
    var defaultUrl = app.globalData.commonUrl;

    var p = {
      m: 'index',
      uid: wx.getStorageSync('uid') ? wx.getStorageSync('uid') : '1',
      i: '3'
    }
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        goods: res.result
      }, () => {

      });
      if (wx.getStorageSync('count') <= 5) {
        wx.showToast({
          title: '点击客服按钮，可领取两元现金红包',
          icon: 'none',
          duration: 3000,
          mask: true
        });
        var info = wx.getSystemInfoSync().system.toLowerCase();
        console.log(info);
        if (/^ios/.test(info)) {
          console.log('it is ios');
        } else if (/^android/.test(info)) {
          console.log('it is android');
          that.setData({
            show_toast: true
          })
        }
      }
    });

    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    date = y + '' + m + '' + d;
    if (date != wx.getStorageSync('date')) {
      that.setData({
        clock_flag1: true
      })
      that.countDown(180);
    } 
    else {
      that.setData({
        clock_flag1: false
      })
    }

    if (date != wx.getStorageSync('_date')) {
      that.setData({
        qd_flag: true
      })
      that.countDown(180);
    }
    else {
      that.setData({
        qd_flag: false
      })
    }

  },
  _updateSelectedPage(page) {
    let {
      tabs,
      stv,
      activeTab
    } = this.data;
    activeTab = page;
    this.setData({
      activeTab: activeTab
    })
    stv.offset = stv.windowWidth * activeTab;
    this.setData({
      stv: this.data.stv
    })
  },
  //tab选项卡
  handlerTabTap(e) {
    this._updateSelectedPage(e.currentTarget.dataset.index);
    //商品排序
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    console.log(this.data.nowTab);
    var that = this;

    let p = {};
    that.data.page = 1;

    if (item.name == '价格') {
      if (item.name == that.data.nowTab.name) {
        if (item.status == 0) {
          item.status = 1;
          that.setData({
            tabs: [{
                name: '综合',
                order: '',
                status: 0
              },
              {
                name: '佣金',
                order: 'yongjin',
                status: 0
              },
              {
                name: '销量',
                order: 'sum',
                status: 0
              },
              {
                name: '价格',
                order: 'price',
                status: 1
              }
            ]
          })
          that.data.sort = 'desc';
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'desc',
            i: '3'
          }
        } else if (item.status == 1) {
          item.status = 2;
          that.setData({
            tabs: [{
                name: '综合',
                order: '',
                status: 0
              },
              {
                name: '佣金',
                order: 'yongjin',
                status: 0
              },
              {
                name: '销量',
                order: 'sum',
                status: 0
              },
              {
                name: '价格',
                order: 'price',
                status: 2
              }
            ]
          })
          that.data.sort = 'asc';
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'asc',
            i: '3'
          }
        } else if (item.status == 2) {
          item.status = 1;
          that.data.sort = 'desc';
          that.setData({
            tabs: [{
                name: '综合',
                order: '',
                status: 0
              },
              {
                name: '佣金',
                order: 'yongjin',
                status: 0
              },
              {
                name: '销量',
                order: 'sum',
                status: 0
              },
              {
                name: '价格',
                order: 'price',
                status: 1
              }
            ]
          })
          p = {
            m: 'index',
            fid: that.data.fid ? that.data.fid : '',
            search: that.data.keyword ? that.data.keyword : '',
            order: item.order,
            uid: wx.getStorageSync('uid'),
            sort: 'desc',
            i: '3'
          }
        }
      } else {
        that.setData({
          tabs: [{
              name: '综合',
              order: '',
              status: 0
            },
            {
              name: '佣金',
              order: 'yongjin',
              status: 0
            },
            {
              name: '销量',
              order: 'sum',
              status: 0
            },
            {
              name: '价格',
              order: 'price',
              status: 0
            }
          ]
        });
        p = {
          m: 'index',
          fid: that.data.fid ? that.data.fid : '',
          search: that.data.keyword ? that.data.keyword : '',
          order: item.order,
          uid: wx.getStorageSync('uid'),
          i: '3'
        }
      }
    } else {
      that.setData({
        tabs: [{
            name: '综合',
            order: '',
            status: 0
          },
          {
            name: '佣金',
            order: 'yongjin',
            status: 0
          },
          {
            name: '销量',
            order: 'sum',
            status: 0
          },
          {
            name: '价格',
            order: 'price',
            status: 0
          }
        ]
      });
      that.data.sort = 'desc';
      p = {
        m: 'index',
        order: item.order,
        fid: that.data.fid ? that.data.fid : '',
        sort: 'desc',
        uid: wx.getStorageSync('uid'),
        search: that.data.keyword ? that.data.keyword : '',
        i: '3'
      }
    }
    getInfo(p).then(res => {
      that.setData({
        goods: res.result
      })
    })


    that.setData({
      tabs: that.data.tabs
    });
    that.data.nowTab = item;
    that.setData({
      nowTab: item
    })

  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * item点击事件
   */
  onIpItemClick: function(event) {
    console.log(event);
    var id = event.currentTarget.dataset.item.id;
    var curIndex = 0;
    for (var i = 0; i < this.data.ips.length; i++) {
      if (id == this.data.ips[i].id) {
        this.data.ips[i].isSelect = true;
        curIndex = i;
      } else {
        this.data.ips[i].isSelect = false;
      }
    }

    this.setData({
      ips: this.data.ips,
    });
  },

  // 触底加载更多
  onReachBottom() {
    console.log(this.data.nowPage);
    var defaultUrl = app.globalData.commonUrl;
    var that = this;
    that.data.page++;
    let p = {
      m: 'index',
      fid: that.data.fid ? that.data.fid : '',
      search: that.data.keyword ? that.data.keyword : '',
      order: that.data.nowTab.order ? that.data.nowTab.order : '',
      uid: wx.getStorageSync('uid'),
      sort: that.data.sort,
      page: that.data.page,
      i: '3'
    };
    getInfo(p).then(res => {
      that.setData({
        goods: [...that.data.goods, ...res.result]
      })
    })
  },
  // 选择分类
  chooseCategory(e) {
    this.setData({
      tabs: [{
          name: '综合',
          order: '',
          status: 0
        },
        {
          name: '佣金',
          order: 'yongjin',
          status: 0
        },
        {
          name: '销量',
          order: 'sum',
          status: 0
        },
        {
          name: '价格',
          order: 'price',
          status: 0
        }
      ]
    });
    this._updateSelectedPage(0);
    var fid = e.currentTarget.dataset.id;
    this.data.fid = fid;
    this.data.page = 1;
    this.data.keyword = '';
    var that = this;
    console.log(fid);
    let p = {};
    p = {
      m: 'index',
      fid: fid,
      uid: wx.getStorageSync('uid'),
      i: '3'
    }


    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        goods: res.result,
        _fid: fid
      })
    })
  },
  copy_words(e) {
    // 保存输入的关键词
    this.data.keyword = e.detail.value;
  },
  // 点击回车搜索商品
  searchGoods(e) {
    var keyword = e.detail.value;
    this.data.keyword = keyword;
    var that = this;
    this.search();
  },
  // 点击图标按钮搜索商品
  search_btn() {
    this.search();
  },
  // 搜索
  search() {
    var that = this;
    this.data.fid = '';
    this.data.page = 1;
    let p = {
      m: 'index',
      search: that.data.keyword,
      uid: wx.getStorageSync('uid'),
      i: '3'
    };
    getInfo(p).then(res => {
      that.setData({
        goods: res.result
      })
    })
  },
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '惠花券',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  close_toast() {
    let that = this;
    that.setData({
      show_toast: false
    })
  },
  close_toast2() {
    let that = this;
    that.setData({
      show_toast2: false
    })
  },
  openShare() {
    // wx.hideTabBar();
    let that = this;
    that.setData({
      show_toast2: true
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
    post(p).then(res => {})
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
    let p = {
      uid: wx.getStorageSync('uid'),
      m: 'cold',
      type: that.data.nowPerson,
      profession: that.data.nowJob,
      population: that.data.nowAge
    };
    getInfo(p).then(res => {
      console.log(res);
      that.setData({
        show_toast3: false,
        hb_flag: true
      });
      wx.showTabBar();
    })
  },
  showGuide() {
    let that = this;
    that.setData({
      flag: true
    })
  },
  // 点击tabbar事件 
  onTabItemTap() {
    console.log('tapTabbar');
    // wx.showTabBar();
    let that = this;
    let p = {
      m: 'index',
      uid: wx.getStorageSync('uid'),
      i: '3'
    };
    getInfo(p).then(res => {
      that.setData({
        goods: res.result,
        page: '1',
        fid: '',
        keyword: '',
        _fid: 0,
        nowTab: '',
        tabs: [{
            name: '综合',
            order: '',
            status: 0
          },
          {
            name: '佣金',
            order: 'yongjin',
            status: 0
          },
          {
            name: '销量',
            order: 'sum',
            status: 0
          },
          {
            name: '价格',
            order: 'price',
            status: 0
          }
        ],
        activeTab: 0,
        'stv.offset': 0,
        sort: ''
      })
    })
  },
  //领取新人红包
  getGift() {
    let that = this;
    let p = {
      m: 'goldcoin',
      a: 'new_super',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      console.log(res);
      if (res.r == 0) {
        this.setData({
          hb_flag: false
        });
        wx.showToast({
          title: '新人红包领取成功！',
          icon: 'none'
        })
      }

    })
  },
  // 倒计时
  countDown(c) {

    let that = this;
    let count = c; //倒计时3分钟

    clearInterval(that._timer);

    that._timer = setInterval(clock, 1000);

    function clock() {
      wx.setStorageSync('_count_down', count);
      var s = (count % 60) < 10 ? ('0' + count % 60) : count % 60;
      var h = count / 3600 < 10 ? ('0' + parseInt(count / 3600)) : parseInt(count / 3600);
      var m = (count - h * 3600) / 60 < 10 ? ('0' + parseInt((count - h * 3600) / 60)) : parseInt((count - h * 3600) / 60);
      if (count == 0) {
        clearInterval(that._timer);
        that.setData({
          clock_flag1: false,
          clock_flag2: true
        })
      }
      that.setData({
        s: s,
        m: m
      });
      count--;
    }
  },
  //浏览三分钟奖励
  tapclock() {
    let that = this;
    let p = {
      m: 'goldcoin',
      a: 'everyday3min',
      uid: wx.getStorageSync('uid')
    };
    getInfo(p).then(res => {
      if (res.r == 0) {
        wx.showToast({
          title: '领取成功！',
        });
        that.setData({
          clock_flag2: false
        });
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        date = y + '' + m + '' + d;
        wx.setStorageSync('date', date);
      } else {
        wx.showToast({
          title: '领取失败，请稍后再试',
          icon: 'none'
        })
      }
    })
  },
  goToSign(){
    let that=this;
    that.setData({
      qd_flag:false
    });
    wx.navigateTo({
      url: '../sign/sign',
    });
    that.tap_qd_flag();
  },
  close_qd(){
    let that = this;
    that.setData({
      qd_flag: false
    });
    that.tap_qd_flag();
  },
  tap_qd_flag(){
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    date = y + '' + m + '' + d;
    wx.setStorageSync('_date', date);
  },
  bindGetUserInfo(e){
    console.log(e);
  }
})
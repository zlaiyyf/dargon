// pages/Sign/Sign.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    //导航tab
    Tablist: ['两办通知', '其它通知', '本科教学', '研究生教学', '科技信息', '社科信息'],
    TabCur: 0,
    scrollLeft: 0,
    //load
    loadhide: false,
    isLoad: true,
    // 文章
    essay_list: [{
      'essay_id': 1,
      'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
      'essay_time': '2019-12-04'
    }, {
      'essay_id': 2,
      'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
      'essay_time': '2019-12-04'
    }, {
      'essay_id': 3,
      'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
      'essay_time': '2019-12-04'
    }, {
      'essay_id': 4,
      'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
      'essay_time': '2019-12-04'
    }]

  },

  // tag
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // essayTab
  bindscrolltolower: function (e) {
    // 加载
    this.setData({
      // loadhide:true,
      isLoad: true
    })
    
    var old_list = this.data.essay_list
    var new_list = [{
        'essay_id': 5,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 6,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 7,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 8,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 9,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 10,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 11,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 12,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 13,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }, {
        'essay_id': 14,
        'essay_ab_title': '科技处：关于山西省科技计划项目全年常态化...',
        'essay_time': '2019-12-04'
      }

    ]
    var now_list = old_list.concat(new_list)
    this.setData({
      essay_list: now_list
    })
    setTimeout(function () {
      this.setData({
        // loadhide:true,
        isLoad: false
      })
    },10000) 

    console.log('xxx')


  },
  // load
  isLoading(e) {
    this.setData({
      isLoad: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getCurrentPages())
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

  onShareAppMessage: function () {
    return {
      title: '在山大必备的平台-龙城山大plus',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }

})
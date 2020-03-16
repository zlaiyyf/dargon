// pages/my_curriculum/curriculum.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    but_stu:false,
    back_show: true,
    error_tip: "",
    api_url: app.globalData.g_url,
    im_url: app.globalData.g_imurl,
    land_account: app.globalData.g_username,
    land_password: app.globalData.g_password,
    yzm: '',
    cookies: {},
    rad: 0,
    cur_list: app.globalData.g_cur.g_cur_list,
    mes: app.globalData.g_cur.g_mes
  },
  // 登录获取
  but_land: function (e) {
    setTimeout(function () {
      return
     }, 1000) 
     if (this.data.yzm.length !=4){
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1500
      })
       return

     }
    
    wx.request({
      url: this.data.api_url + 'v1/login',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        openid: 'code',
        key: 'key',
        account: app.globalData.g_username,
        password: app.globalData.g_password,
        yzm: this.data.yzm,
        'cookies': JSON.stringify(this.data.cookies)
      },
      success: res => {
        if (res.data.code == 200) {
          this.setData({
            error_tip: '获取中。。。',
            but_stu:true
          })
          // this.setData({
         
          // })
          wx.request({
            url: this.data.api_url + 'v1/cur',
            method: 'POST',
            header: {
              "Content-Type": "application/json"
            },
            data: {
              openid: 'code',
              key: 'key',
              account: app.globalData.g_username,
              'cookies': JSON.stringify(res.data.cookies)
            },
            success: res => {

              var data = res.data.data;
              console.log('cur/' + data.dir + '/' + data['image'][0])
              var cur = {}
              var cur_list = {}
              cur_list['0'] = this.data.im_url + 'cur/' + data.dir + '/' + data.usesname + '/' + data['image'][0] + '.png'
              cur_list['1'] = this.data.im_url + 'cur/' + data.dir + '/' + data.usesname + '/' + data['image'][1] +
                '.png'
              this.setData({
                cur_list: cur_list,
                mes: data['mes'],
                error_tip: '',
                modalName: ''
              })
              cur['g_cur_list'] = cur_list
              cur['g_mes'] = data['mes']
              app.Revise_data('g_cur', JSON.stringify(cur))
              // console.log(cur)
              this.setData({
                but_stu:false
              })
            }
          })
          
        } else if (res.data.code == 1113) {
          console.log(res.data.message)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
          this.but_imag()
        } else {
          app.Find_use_err()
        }
      }
    })

  },
  // 预览图片
  preview: function (event) {
    // console.log( this.data.cur_list[this.data.rad])
    var current = this.data.cur_list[this.data.rad]
    var urls = []
    urls[0] = this.data.cur_list['0']
    urls[1] = this.data.cur_list['1']
    // let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 选择图片格式
  bindchange: function (e) {
    this.setData({
      rad: e.detail.value
    })
  },
  // 更新图片
  bindtap_updata: function (e) {
    this.setData({
      modalName: 'Modal',
    })
    this.but_imag()
  },

  hideModal: function (e) {
    this.setData({
      modalName: ""
    })
  },
  but_fix: function (e) {
    this.but_land()
  },
  but_imag: function (e) {
    wx.request({
      url: app.globalData.g_url + 'v1/jwcode',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        key: 'key'
      },
      success: res => {
        // console.log(res)
        this.data.image = res.data.data.image;
        this.setData({
          image: res.data.data.image,
        })
        this.data.cookies = res.data.cookies;
        // console.log(this.data.cookies)
      }
    })
  },
  // 验证码输入
  bindinput_yzm: function (e) {
    this.data.yzm = e.detail.value
  },
  // 明天提醒我
  btu_remind: function (e) {
    console.log('明天提醒我')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page_length = getCurrentPages().length
    console.log(page_length)
    if (page_length == 1) {
      this.setData({
        back_show: false
      })
    }
    this.setData({
      cur_list: app.globalData.g_cur.g_cur_list,
      mes: app.globalData.g_cur.g_mes
    })
      // console.log(app.globalData.g_cur.g_cur_list)
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

    // console.log(app.globalData.g_cur)

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
  //预览图片，放大预览

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '我的课表',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }
})
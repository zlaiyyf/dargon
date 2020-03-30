// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_bind: false,
    land_account: app.globalData.g_username,
    land_password: app.globalData.g_password,
    logining: false,
    password_look: true,
    input_password: '',
    input_account: '',
    input_yzm: '',
    image: '',
    cookies: {}
  },

  showQrcode() {
    wx.previewImage({
      urls: ['https://im.zlaiyyf.cn/bd/zan.png'],
      current: 'https://im.zlaiyyf.cn/bd/zan.png' // 当前显示图片的http链接      
    })
  },
  // 登录
  but_land: function (e) {
    if (this.data.input_account.length ==0){
      wx.showToast({
        title: '未输入账号',
        icon: 'none',
        duration: 1500
      })
       return

     }
     if (this.data.input_password.length ==0){
      wx.showToast({
        title: '未输入密码',
        icon: 'none',
        duration: 1500
      })
       return

     }
    if (this.data.input_yzm.length ==0){
      wx.showToast({
        title: '未输入验证码',
        icon: 'none',
        duration: 1500
      })
       return

     }
    
    setTimeout(function () {
      return
     }, 1000) 
    wx.request({
      url: app.globalData.g_url+'v1/login',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        openid: 'code',
        key: 'key',
        account: this.data.input_account,
        password: this.data.input_password,
        yzm: this.data.input_yzm,
        'cookies': JSON.stringify(this.data.cookies)
      },
      success: res => {
        if (res.data.code == 200) {
          // console.log(this.data.input_account,this.data.input_password)
          app.Revise_data('g_username', this.data.input_account)
          app.Revise_data('g_password', this.data.input_password)
          this.data.land_account = app.globalData.g_username,
            this.data.land_password = app.globalData.g_password
          this.setData({
            logining: !this.data.logining,
            land_account:this.data.input_account,
            land_password:this.data.input_password
          })
          this.land_xs()
        } else if (res.data.code == 1113) {
          console.log(res.data.message)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
          this.but_imag()
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 1500
          })
          this.but_imag()
        }
      }
    })

  },
  // 切换登录界面
  tz_land: function (e) {
    this.setData({
      logining: !this.data.logining,
    })
  },
  // 用户登录之后显示信息
  land_xs: function (e) {
    this.setData({
      is_bind: true,

    })
  },
  kefu: function (e) {

  },
  // 换验证码
  but_imag: function (e) {
    // console.log('换验证码')
    wx.request({

      url: app.globalData.g_url+'v1/jwcode',
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
  // 点击查看输入密码
  bp_password_look: function (e) {
    this.setData({
      password_look: !this.data.password_look,
    })
  },
  // 输入密码
  bindinput_password: function (e) {
    this.data.input_password = e.detail.value
  },
  bindinput_account: function (e) {
    this.data.input_account = e.detail.value
    // console.log(this.data.input_account)
  },
  bindinput_yzm: function (e) {
    this.data.input_yzm = e.detail.value
    // console.log(this.data.input_yzm)
  },

  bind_question: function (e) {
    this.setData({
      modalName: 'help'
    })
    // console.log('question')
  },

  bind_look_password: function (e) {
    this.setData({
      modalName: 'look_password'
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (this.data.land_account){
        this.tz_land()
        this.land_xs()
      }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.but_imag()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(app.globalData.g_username)
    // console.log(this.data.land_account, 'land_account')
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
    return {
      title: '你在山大必备的小助手-龙城山大plus',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})
// pages/exam_room/exam_room.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    api_url: app.globalData.g_url,
    im_url: app.globalData.g_imurl,
    define_dis: false,
    image: '',
    yzm: '',
    error: '',
    url: ''
  },
  // 换验证码
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

      }
    })
  },
    // 登录获取
    but_land: function (e) {
      setTimeout(function () {
        return
       }, 1000) 
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
            wx.request({
              url: this.data.api_url + 'v1/examroom',
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
                // console.log(res)
                var data=res.data.data
                console.log(data)
                this.setData({
                  url:this.data.im_url+'er/' + data.dir + '/' + data.usesname + '/' + data.image + '.png'
                })
                // this.data.url + 
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
  but_define: function (e) {
this.but_land()

    // this.setData({
    //   define_dis: true,
    //   error: ''
    // })

    // this.setData({
    //   define_dis: false,
    //   error: '',
    //   url: ''
    // })
  },
  bindinput_yzm: function (e) {
    this.data.yzm=e.detail.value
    // console.log(e.detail.value)
  },
  preview: function (e) {
    var currentUrl = e.currentTarget.dataset.index
    // console.log(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.but_imag()
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
    return {
      title: '我的考场',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }
  }
})
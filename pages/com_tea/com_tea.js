// pages/com_tea/com_tea.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api_url: app.globalData.g_url,
    im_url: app.globalData.g_imurl,
    // 0未评教
    com_tea_data: [
    ],
    modalName: '',
    image: '',
    yzm:''

  },

 
  com_tea_but: function (e) {
    this.but_imag()

    this.setData({
      modalName: 'Modal'
    })
  },
  bindinput_yzm:function(e){
    this.data.yzm=e.detail.value
  },
  hideModal: function (e) {
    this.setData({
      modalName: ''
    })
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

      }
    })
  },
  //提交
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
        // 获取信息
        if (res.data.code == 200) {
          this.setData({
            modalName:''
          })
          wx.request({
            url: this.data.api_url + 'v1/comtea',
            method: 'POST',
            header: {
              "Content-Type": "application/json"
            },
            data: {
              openid: 'code',
              key: 'key',
              'type':1,
              account: app.globalData.g_username,
              'cookies': JSON.stringify(res.data.cookies)
            },
            success: res => {
              var data=res.data.data
              if (res.data.code==200){

                // console.log(data)
                this.setData({
                  com_tea_data:data.tea
                })
              }else{
                this.setData({
                  com_tea_data:[]
                })

              }

              // this.data.url + 
            }
          })
        } else if (res.data.code == 1113) {
          // console.log(res.data.message)
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
  // 登录获取
  but_land1: function (e) {
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
        console.log(res.data)
        // 获取信息
        if (res.data.code == 200) {
          this.setData({
            modalName1:''    
          })
          wx.request({
            
            url: this.data.api_url + 'v1/comtea',
            method: 'POST',
            header: {
              "Content-Type": "application/json"
            },
            data: {
              openid: 'code',
              key: 'key',
              account: app.globalData.g_username,
              'type':'0',
              'cookies': JSON.stringify(res.data.cookies)
            },
            success: res => {
              console.log(res.data)
              var data=res.data.data
              if (res.data.code==200){
                this.setData({
                  com_tea_data:data.tea
                })
                // 把信息打印处理
              }else{
                this.setData({
                  com_tea_data:[]
                })

              }
            }
          })
        } else if (res.data.code == 1113) {
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
  but_fix: function (e) {
    if (this.data.yzm.length==4){
      
      this.but_land()
    }else{
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      })
    }
   
 

  },

  but_fix1:function(e){
    // console.log(this.data.yzm.length)
    if (this.data.yzm.length==4){
      
      this.but_land1()
    }else{
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 1500
      })
    }
    
   

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取验证码
    this.but_imag()
    this.setData({
      modalName1:'Modal'
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
    return {
      title: '一键评教-为你喜欢的老师打分',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }
})
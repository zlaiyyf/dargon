//app.js
App({
  // get openid
  Get_openid: function () {
    wx.login({
      success: res => {
        // console.log(res.code)
        // 发送 res.code 到后台换取 openId, key, unionId
        wx.request({
          url: this.globalData.g_url + 'v1/wxlogin',
          method: 'POST',
          header: {
            "Content-Type": "application/json"
          },
          data: {
            code: res.code,
          },
          success: res => {
            if (res.data.code == 200) {

              this.globalData.g_openid = res.data.openid
              // cokies
              this.globalData.key = res.data.key

            } else {
              // 请求失败
            }

          }
        })
      }
    })

  },
  // 修改缓存和全局变量
  Revise_data: function (key, value) {
    
    if (key=='g_cur'){
      this.globalData[key]=JSON.parse(value)
    }else(
      this.globalData[key] = value
    )
    // console.log(key,value)
    wx.setStorage({
      key: key,
      data: value
    })
  },


  // 发现本地出错跳转登录
  Find_use_err: function () {
    wx.showModal({
      title: '本地账号密码错误',
      confirmText: '确定',
      content: '请重新登录绑定',
      success: function (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/user/user'
          })
        } else if (res.cancel) {
          return;
        }
      }
    })

  },

  // 获取全部缓存并修改全局变量

  Get_data: function () {
    try {
      var value = wx.getStorageSync('g_username')
      if (value) {
        this.globalData.g_username = value
      }
    } catch (e) {
      console.log('getStorageSyn出错')
      // Do something when catch error
    }

    try {
      var value = wx.getStorageSync('g_password')
      if (value) {
        this.globalData.g_password = value
      }
    } catch (e) {
      console.log('getStorageSyn出错')
      // Do something when catch error
    }
    try {
      var value = wx.getStorageSync('g_cur')
      if (value) {
        var value=JSON.parse(value)
       this.globalData.g_cur=value}
    } catch (e) {
      console.log('getStorageSyn出错')
      // Do something when catch error
    }

  },
  onLaunch: function () {
    // 获取openid
    this.Get_openid()
    // // 
    // 获取一下缓存
    this.Get_data()
    // 系统信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  // 
  globalData: {
    g_cookies_eff: '',
    g_cookies: '{}',
    g_key: '',
    // 
    g_openid: '',

    g_url: 'https://zlaiyyf.cn/',
    g_imurl: 'https://im.zlaiyyf.cn/',
    g_username: '',
    g_password: '',
    g_cur: {
      g_cur_list: {
        0: '',
        1: ''
      },
      g_mes: ['']
    }
  }
})
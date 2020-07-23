// pages/grade/grade.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    but_stu: false,
    api_url: app.globalData.g_url,
    im_url: app.globalData.g_imurl,
    image: '',
    back_show: true,
    // sj原始成绩有效成绩zfx——flag主修辅修
    sj: 1,
    zfx_flag: 0,
    term_flag: 1,

    term_dict: {
      'key': [
        ['2019-2020学年', '2018-2019学年', '2017-2018学年', '2016-2017学年', '2015-2016学年', '2014-2015学年'],
        ['第二学期', '第一学期']
      ],
      'value': [
        ['2019', '2018', '2017', '2016', '2015', '2014'],
        ['1', '0']
      ]
    },
    term_index: [0, 0],
    yzm: '',
    error: '',

    grade_data: {
      image: [],
      mes: [],
    },
    mes_list: [
      '修读课程环节数',
      '学分',
      '获得学分',
      '获得绩点',
      '获得学分绩点',
      '获得平均学分绩点'
    ]
  },


  term_MultiChange: function (e) {
    this.setData({
      term_index: e.detail.value
    })
  },
  // 入学以来 和 学年学期
  term_bindchange: function (e) {
    this.setData({
      term_flag: e.detail.value
    })
    console.log(this.data.term_flag)
    // this.data.term_flag = e.detail.value

  },

  // 选择原始成绩 有效成绩
  form_bindchange: function (e) {
    this.data.sj = e.detail.value

  },
  // 选择 主修 辅修
  zfx_bindchange: function (e) {
    this.data.zfx_flag = e.detail.value
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
        // console.log(res.data.data.image)
        this.data.image = res.data.data.image;
        this.setData({
          image: res.data.data.image,
        })
        this.data.cookies = res.data.cookies;

      }
    })
  },
  // 输入验证码
  bindinput_yzm: function (e) {
    // 输入验证码
    this.data.yzm = e.detail.value
    // console.log(this.data.yzm)
  },


  but_define: function (e) {

    setTimeout(function () {
      return
    }, 2000)
    if (this.data.yzm.length != 4) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1500
      })
      return
    }

    var post_data = {
      btn_search: "%BC%EC%CB%F7",
      shownocomputjd: "1",
      zxf: "0",
      hidparam_xh: "",
      SJ: this.data.sj,
      zfx_flag: this.data.zfx_flag
    }
    if (this.data.term_flag == 1) {
      // 学年学期
      post_data['SelXNXQ'] = 2
      post_data['sel_xn'] = this.data.term_dict.value[0][this.data.term_index[0]]
      post_data['sel_xq'] = this.data.term_dict.value[1][this.data.term_index[1]]
    } else {
      post_data['SelXNXQ'] = 0
    }
    // console.log(post_data)
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
        console.log(this.data.yzm)
        // 获取信息
        if (res.data.code == 200) {

          this.setData({
            but_stu: true
          })

          wx.request({

            url: this.data.api_url + 'v1/grade',
            method: 'POST',
            header: {
              "Content-Type": "application/json"
            },
            data: {
              openid: 'code',
              key: 'key',
              account: app.globalData.g_username,
              postdata: JSON.stringify(post_data),
              cookies: JSON.stringify(res.data.cookies)
            },
            success: res => {
              // console.log(res.data)
              var data = res.data.data
              console.log(data.mes)

              if (res.data.code == 200) {
                var grade_data = {
                  image: data.image,
                  mes: data.mes,
                }

                this.setData({
                  grade_data: grade_data,
                  imurl: this.data.im_url + 'gd/',
                  dir: data.dir + '/',
                  username: data.usesname + '/',
                })

                // 把信息打印处理
              } else {
                this.binderror()
                wx.showToast({
                  title: '没有当前查询条件下的成绩',
                  icon: 'none',
                  duration: 1500
                })

              }
              this.setData({
                but_stu: false
              })
              this.but_imag()
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


    // var grade_image = [{
    //   'name': 'vsdvfsfvsec',
    //   'url': 'http://bkjwsxu.cn:5000/static/kebiao/zhaoliang0.png'
    // }, {
    //   'name': 'vsdvfsfvsec',
    //   'url': 'http://bkjwsxu.cn:5000/static/kebiao/zhaoliang1.png'
    // }]
    // this.data.grade_data.image = grade_image
    // this.data.grade_data.mes = [56, 142.5, 138.5, 153.0, 339.25, 2.38]
    // this.setData({
    //   grade_data: this.data.grade_data
    // })
    // console.log(this.data.grade_data)
  },
  // 图片加载失败
  binderror: function (e) {
    console.log('加载失败')
    console.log(e)
    var grade_data = {
      image: [],
      mes: [],
    }
    this.setData({
      grade_data: grade_data,
    })
  },
  preview: function (e) {
    let currentUrl = e.currentTarget.dataset.index
    // console.log(currentUrl)
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
    // console.log('预览')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page_length = getCurrentPages().length
    // console.log(page_length)
    if (page_length == 1) {
      this.setData({
        back_show: false
      })
    }
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
      title: '我的成绩',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }
})
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      icon: 'circlefill',
      color: 'red',
      name: '我的课表',
      url: "/pages/my_curriculum/curriculum"
    }, {
      icon: 'group_fill',
      color: 'orange',
      name: '蹭课',
      url: "/pages/other_curriculum/curriculum"
    }, {
      icon: 'rankfill',
      color: 'yellow',
      name: '成绩',
      url: "/pages/grade/grade"
    }, {
      icon: 'likefill',
      color: 'pink',
      name: '评教',
      url: "/pages/com_tea/com_tea"
    }, {
      icon: 'commandfill',
      color: 'cyan',
      name: '考场',
      url: "/pages/exam_room/exam_room"
    }, {
      icon: 'shopfill',
      color: 'blue',
      name: '自习室',
      url: "/pages/study_room/study_room"
    }, {
      icon: 'discoverfill',
      color: 'purple',
      name: '绩点计算器',
      url: "/pages/grade_calculator/grade_calculator"
    }, {
      icon: 'newshotfill',
      color: 'mauve',
      name: '校历校车',
      url: "/pages/school_cal/school_cal"
    }, {
      icon: 'radioboxfill',
      color: 'red',
      name: '网课答案'
    }, {
      icon: 'colorlens',
      color: 'mauve',
      name: '免挂头像',
      url:  "/pages/log/log",
    }, {
      icon: 'brandfill',
      color: 'pink',
      name: '更新日志',
      url:  "/pages/log/log",

      
    }, {
      icon: 'lightfill',
      color: 'orange',
      name: '关联小程序',
      url:   "/pages/about/about",

    }],
  
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/image/bg/index.png'
    }, {
      id: 1,
      type: 'image',
      url: '/image/bg/index.png',
    }, {
      id: 3,
      type: 'image',
      url: '/image/bg/index.png',
    }]

  },
  cardSwiper:function(){
// console.log('csc')
  },
  bind_sw:function(e){
    var index=e.currentTarget.dataset.index  
    console.log(index)
    wx.navigateTo({
      url: '/pages/about/about',

    })
  
  },

  //caidang
  bindViewTap: function(e) {
    
    var index=e.currentTarget.dataset.index
    if (index==8){
      wx.navigateToMiniProgram({
        appId: 'wx93c6ff99177729b7',
        path: '',
        extraData: {
          from: ''
        },
        envVersion: '',
        success(res) {
          // 打开其他小程序成功同步触发
          wx.showToast({
            title: ''
          })
        }
      })
         return
    }else if (index==9){
      wx.navigateToMiniProgram({
        appId: 'wx9f4525d552f0debc',
        path: '',
        extraData: {
          from: ''
        },
        envVersion: '',
        success(res) {
          // 打开其他小程序成功同步触发
          wx.showToast({
            title: ''
          })
        }
      })
      return
    }
    var icon=this.data.iconList[index]
    wx.navigateTo({
      url: icon.url,
      success: function(res) {
      },
      fail: function(res) {    
      },
      complete: function(res) {
      },
     })
  
  },




  bind:function(){
    console.log('cd')
    wx.navigateTo({
      url: '/pages/Sign/Sign',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
        },
        someEvent: function (data) {
          console.log(data)
        }
  
  },
      fail: res  => {
         console.log(res)
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
  onLoad: function () {

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: function () {
    return {
      title: '在山大必备小助手-龙城山大plus',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }
})

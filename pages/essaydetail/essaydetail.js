// pages/essaydetail/essaydetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:app.globalData.g_url,

    back_show:true,
    InputBottom: 0,
    essay_title: '',
    essay_content: '',
    id:'',
    sort:''

  },
  catchindex: function(e) {
   
    console.log(e)
    wx.switchTab({
      url: '/pages/index/index',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page_length = getCurrentPages().length
    console.log(page_length)

    if (page_length === 1) {
      this.setData({
        back_show: false
      })
    }
  //  var eaaay_list = this.data.essay_list
  //  this.setData({
  //    'essay_title':(eaaay_list[options.sort][options.id]).essay_title,
  //    'essay_content':(eaaay_list[options.sort][options.id]).essay_content
  //  })
    console.log(options.id,options.sort)
    this.data.id=options.id
    this.data.sort=options.sort
    wx.request({
      url: app.globalData.g_url + 'v1/tails',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        key: 'key',
        openid:'2',
        id:this.data.id,
        sort:this.data.sort,
      },
      success: res => {
        // console.log(res.data)
        var code = res.data.code;
        var data=res.data.data
        if (code==200){
          // var _next=data.fin
          // var _sort=data.sort
          // var _next_num=data.next_num
          // var new_list=data.essay_list
          // console.log(new_list)
            this.setData({
     'essay_title':data.title,
     'essay_content':data.content
   })
        }else{
          wx.showToast({
            title: '发生错误',
            icon: 'none',
            duration: 1500
          })
        }
   

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    console.log(options)
    var that = this;　　 // 设置菜单中的转发按钮触发转发事件时的转发内容

    var shareObj = {
      title: that.data.essay_title, // 默认是小程序的名称(可以写slogan等)
      path: '/pages/essaydetail/essaydetail?sort='+that.data.sort+'&id='+that.data.id, // 默认是当前页面，必须是以‘/’开头的完整路径
      imageUrl: '', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG，不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
      success: function(res) {　　　　　　 // 转发成功之后的回调

        if (res.errMsg == 'shareAppMessage:ok') {}
      },
      fail: function(res) {　　　　　　 // 转发失败之后的回调

        if (res.errMsg == 'shareAppMessage:fail cancel') {　　
          console.log("用户取消转发")　　　　　　 // 用户取消转发
        } else if (res.errMsg == 'shareAppMessage:fail') {　　　　
          console.log("用户取消转发")　　　　　　　 // 转发失败，其中 detail message 为详细失败信息
        }
      },

    };

    // 来自页面内的按钮的转发　


    return shareObj;
  }
})
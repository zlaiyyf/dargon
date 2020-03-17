// pages/essaydetail/essaydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    essay_title: '关于表彰2019年度“十佳教学标兵”“师德师风十佳标兵”“十佳青年教师”“教学先进个人”“师德师风先进个人”“先进青年教师”的决定',
    essay_content: `校内各单位：\n第二届全国青年运动会（以下简称“二青会”）是在新中国成立70周年之际举办的一次体育盛会，也是我省第一次举办的全国大型运动会。为确保我校安全、高效完成志愿服务工作，展现山大学子青春风采，结合学校工作实际，制定了志愿者工作方案。现将有关事项通知如下。\n一、各相关院系要成立二青会志愿服务专项工作组，并结合学生志愿服务及对接岗位，指定带队老师1-2名及志愿者骨干若干名。工作组及带队老师、学生骨干名单加盖党委公章后，于7月3日（星期三）下午18:00前报送校团委，电子版同时发送至tuanwei@sxu.edu.cn。\n二、各相关院系要切实提高政治站位，高度重视二青会志愿服务工作，认真落实安全稳定第一责任，明确任务分工，特别是要抓好志愿者的安全教育和管理工作，明确带队老师和志愿者骨干的工作要求，制定突发事件应急处置预案，保障志愿者在校期间的安全。同时，积极协助志愿者做好假期留宿工作，不得以任何理由拒绝志愿者的留宿申请。\n三、校团委、后勤管理处、计划财务处、校医院、体育学院等相关部门要对照任务分工，提前做好工作布置，做好志愿者的工作对接、上岗培训、组织管理、留宿安排、用餐及饮用水服务、志愿者之家建设、经费保障、医疗服务等工作，确保志愿服务高效运行。\n四、为便于工作通知及信息交流，学校建立二青会志愿服务微信工作群，群名称为：山大二青会工作群，群二维码（如下图）。下一步，有关二青会志愿服务的最新信息将在工作群发布。请各院系工作组组长、带队老师和志愿者骨干尽快加入。\n群二维码：\n\n特此通知\n \n附件：1.山西大学第二届全国青年运动会志愿者工作方案\n2.山西大学二青会志愿服务工作组及志愿者骨干名单汇总表（参考格式）\n3.各院系二青会志愿者名单及服务时间、岗位分配情况\n \n \n    党委办公室\n     2019年7月2日
`
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var a = wx.getLaunchOptionsSync()
    console.log(a)
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
      path: '/pages/essaydetail/essaydetail', // 默认是当前页面，必须是以‘/’开头的完整路径
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
// pages/grade_calculator/grade_calculator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back_show:true,


    result_show:false,
    course_dict: {
      id: '',
      name: '',
      score: '',
      grade: '',
      make_up: false
    },
    total_list: [{
        id: '',
        name: '',
        score: '',
        grade: '',
        make_up: false
      },

    ]
  },
  class_grade: function (e) {
    if (e < 60) {
      return 0.0;
    } else if (60 <= e && e <= 64) {
      return 1.0;
    } else if (65 <= e && e <= 69) {
      return 1.5;
    } else if (70 <= e && e <= 74) {
      return 2.0;
    } else if (75 <= e && e <= 79) {
      return 2.5;
    } else if (80 <= e && e <= 84) {
      return 3.0;
    } else if (85 <= e && e <= 89) {
      return 3.5;
    } else if (90 <= e && e <= 94) {
      return 4.0;
    } else if (95 <= e && e <= 100) {
      return 4.5;
    } else {
      return 0
    }
  },
  bindtap_infofill(e) {
    console.log('e')
    this.setData({
      modalName: 'Modal'
    })
  },
  hideModal(e) {
 
    this.setData({
      modalName: null
    })
  },
  formSubmit: function (e) {
    var that = this
    var course_list = this.data.total_list
    var total_class_num = course_list.length
    var total_to_grade = 0
    var total_grade = 0
    var toatal_study_grade = 0
    var total_jidain = 0
    var total_make_up = 0
    var data_right = course_list.some(function (value, index, self) {
      if (typeof value.score == "undefined" || value.score == null || value.score == "") {
        wx.showToast({
          title: '分数不能为空',
          icon: 'none',
          duration: 1500,
          mask: false
        })
        return true
      } else if (value.score * 1 > 100 || value.score * 1 < 0) {
        wx.showToast({
          title: '分数应该为百分制',
          icon: 'none',
          duration: 1500,
          mask: false
        })
        return true
      } else if (value.grade * 1 <= 0) {
        wx.showToast({
          title: '学分要大于0',
          icon: 'none',
          duration: 1500,
          mask: false
        })
        return true
      } else if (typeof value.grade == "undefined" || value.grade == null || value.grade == "") {
        wx.showToast({
          title: '学分不能为空',
          icon: 'none',
          duration: 1500,
          mask: false
        })
        return true
      }
      // console.log(that.class_grade(value.score));
    })
    if (data_right) {
      return
    }
    course_list.forEach(function (value, index, self) {
      total_grade += (value.grade * 1)
      total_to_grade += (value.grade * 1)
      // total_score+=(value.score*1)
      var jidain = 0
      if (value.make_up && value.score*1 >= 60) {
        jidain = 1
      } else {
        jidain = that.class_grade(value.score*1)
      }
      total_jidain += jidain
      toatal_study_grade += jidain * value.grade
      if (jidain == 0 || value.grade * 1 == 0) {
        total_make_up += 1
        total_grade -= (value.grade * 1)
        wx.showToast({
          title: '有科目未通过考试',
          icon: 'none',
          duration: 1500,
          mask: false
        })
      }
      // console.log(that.class_grade(value.score));
    })
    that.setData({
      result_show:true,
      total_class_num: total_class_num,
      pass_class_num: total_class_num - total_make_up,
      total_grade: Math.floor(total_grade* 1000) / 1000 ,
      total_jidain: total_jidain,
      // Math.floor(total_grade* 100) / 100 // 输出结果为 15.77
      toatal_study_grade: Math.floor(toatal_study_grade* 1000) / 1000,
      arv_study_grade: (toatal_study_grade / total_to_grade).toFixed(2),
    })
    // console.log(total_class_num,total_score,total_grade,total_class_grade,totai_make_up)
  },

  formReset: function (e) {
    wx.showModal({
      title: '清空内容',
      content: '清空之后无法恢复，是否确定',
      showCancel: true,//是否显示取消按钮
      cancelText:"否",//默认是“取消”
      cancelColor:'#ff0000',//取消文字的颜色
      confirmText:"是",//默认是“确定”
      confirmColor: '#0081ff',//确定文字的颜色
      success:res => {
         if (res.cancel) {
          this.setData({
            result_show:false,
            total_list: this.data.total_list
          })
         } else {
          var course = new Array
          var course_dict = {
            id: '',
            name: '',
            score: '',
            grade: '',
            make_up: false
          }
          
          course.push(course_dict)
          // console.log(this.data.total_list)
          this.setData({
            result_show:false,
            total_list: course
          })
          // console.log(e)
         }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
   })

    
  },
  bindinput_name: function (e) {
    var index = e.currentTarget.dataset.index
    var name_value = e.detail.value
    var total_list = this.data.total_list
    total_list[index].name = name_value
    this.setData({
      'total_list': total_list,
    })
  },
  bindinput_grade: function (e) {
    var index = e.currentTarget.dataset.index
    var grade_value = e.detail.value
    var total_list = this.data.total_list
    total_list[index].grade = grade_value
    this.setData({
      'total_list': total_list,
    })
  },
  bindinput_score: function (e) {
    var index = e.currentTarget.dataset.index
    var grade_score = e.detail.value
    // console.log(grade_score)
    var total_list = this.data.total_list
    total_list[index].score = grade_score
    this.setData({
      'total_list': total_list,
    })
  },
  bindchange_Make_up: function (e) {
    var index = e.currentTarget.dataset.index
    // var grade_score=e.detail.value
    // console.log(grade_score)
    var total_list = this.data.total_list
    total_list[index].make_up = !total_list[index].make_up
    this.setData({
      'total_list': total_list,
    })
  },
  bindtap_add: function (e) {
    var index = e.currentTarget.dataset.index
    var total_list = new Array()
    total_list = this.data.total_list
    var course = {
      id: '',
      name: '',
      score: '',
      grade: '',
      make_up: false
    }

    total_list.splice(index + 1, 0, course)
    this.setData({
      'total_list': total_list,
    })
  },
  bindtap_close: function (e) {
    var index = e.currentTarget.dataset.index
    var total_list = new Array()
    total_list = this.data.total_list
    var course = this.data.course_dict
    total_list.splice(index, 1)
    this.setData({
      'total_list': total_list,
    })
  },
  // bindtap_infofill: function (e) {
    
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page_length=getCurrentPages().length
    console.log(page_length)
    if (page_length==1){
      this.setData({
        back_show : false
      })
    }
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
      title: '适合山西大学本科-学分绩点计算',
      path: '/pages/grade_calculator/grade_calculator',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }
})
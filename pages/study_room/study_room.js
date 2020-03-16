// pages/study_room/study_room.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    api_url: app.globalData.g_url,

    xq_js_index: [0, 0],
    xq_js_dict: {
      'key': [
        ['坞城', '大东关'],
        ['理科楼', '主楼', '文瀛楼', '政管楼', '文科楼', '教科楼', '外语旧楼', '研究生院楼', '商学楼', '物电楼', '计数楼', '哲学楼', '化学楼', '生科楼', '环资楼', '美术楼', '音乐楼', '外语新楼', '文体馆', '图书馆', '保卫部', '办公1楼', '专家楼', '档案馆', '校医院', '后勤处', '体育实验楼', '大型科学仪器中心', '鸿猷体育场', '工会', '南操', '南操网球场', '北操网球场', '排球场', '游泳馆', '体育馆', '科技楼', '校外', '令德羽毛球场', '会议中心'],
      ],
      'value': [
        [1, 2],
        ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142']
      ]
    },
    zc_xq_index: [0, 0, 0],
    zc_xq_dict: {
      'key': [
        ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周', '第23周', '第24周', '第25周', '第26周'],
        ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
        ['第1小节', '第2小节', '第3小节', '第4小节', '第5小节', '第6小节', '第7小节', '第8小节', '第9小节', '第10小节', '第11小节', '第12小节', '第13小节', '第14小节']
      ],
      'value': [
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26'],
        ['1', '2', '3', '4', '5', '6', '7'],
        ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14']
      ]
    },
    zxs_data: [],
    but_define: false
    // {'value': ['', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216'], 'key': ['', '主教学楼', '综合楼', '工学楼', '软件楼', '实验楼', '成教楼', '土木馆', '物理楼', '动力实训', '土木工程实验中心', '建筑工程实训中心', '排球场', '篮球场', '田径场', '柔力球场', '软件学院考场']}
    // {'value': ['', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142'], 'key': ['', '理科楼', '主楼', '文瀛楼', '政管楼', '文科楼', '教科楼', '外语旧楼', '研究生院楼', '商学楼', '物电楼', '计数楼', '哲学楼', '化学楼', '生科楼', '环资楼', '美术楼', '音乐楼', '外语新楼', '文体馆', '图书馆', '保卫部', '办公1楼', '专家楼', '档案馆', '校医院', '后勤处', '体育实验楼', '大型科学仪器中心', '鸿猷体育场', '工会', '南操', '南操网球场', '北操网球场', '排球场', '游泳馆', '体育馆', '科技楼', '校外', '令德羽毛球场', '会议中心']}

  },
  but_define: function (e) {
    this.setData({
      but_define:true
      
    })
    var zc_xq_dict=this.data.zc_xq_dict
    var zc_xq_index=this.data.zc_xq_index
    var zc=zc_xq_dict.value[0][zc_xq_index[0]]
    var xqs=zc_xq_dict.value[1][zc_xq_index[1]]
    var jc=zc_xq_dict.value[2][zc_xq_index[2]]
    var xq_js_dict=this.data.xq_js_dict
    var xq_js_index=this.data.xq_js_index
    var js=xq_js_dict.value[1][xq_js_index[1]]
     wx.request({
      url: this.data.api_url + 'v1/stu', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        key: 'key',
        openid: 'openid',
        zc:zc,
        xqs:xqs,
        jc:jc,
        js:js
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success :res=> {
       
        this.setData({
          zxs_data: res.data.data.room,
          
        })

      },
      complete:res=>{
        console.log('cscs')
        this.setData({
          but_define:false  
        })
      }
    })

  
  },

  xq_js_MultiChange: function (e) {
    console.log(e)
    this.setData({
      xq_js_index: e.detail.value
    })
  },
  xq_js_ColumnChange: function (e) {
    // console.log(e)
    let data = {
      xq_js_dict: this.data.xq_js_dict,
      xq_js_index: this.data.xq_js_index
    };
    data.xq_js_index[e.detail.column] = e.detail.value;
    // console.log(e.detail.column)
    switch (e.detail.column) {
      case 0:
        switch (data.xq_js_index[0]) {
          case 0:
            data.xq_js_dict.key[1] = ['理科楼', '主楼', '文瀛楼', '政管楼', '文科楼', '教科楼', '外语旧楼', '研究生院楼', '商学楼', '物电楼', '计数楼', '哲学楼', '化学楼', '生科楼', '环资楼', '美术楼', '音乐楼', '外语新楼', '文体馆', '图书馆', '保卫部', '办公1楼', '专家楼', '档案馆', '校医院', '后勤处', '体育实验楼', '大型科学仪器中心', '鸿猷体育场', '工会', '南操', '南操网球场', '北操网球场', '排球场', '游泳馆', '体育馆', '科技楼', '校外', '令德羽毛球场', '会议中心'];
            data.xq_js_dict.value[1] = ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '121', '122', '123', '124', '125', '126', '127', '128', '129', '130', '132', '133', '134', '135', '136', '137', '138', '139', '140', '141', '142'];
            break;
          case 1:
            data.xq_js_dict.key[1] = ['主教学楼', '综合楼', '工学楼', '软件楼', '实验楼', '成教楼', '土木馆', '物理楼', '动力实训', '土木工程实验中心', '建筑工程实训中心', '排球场', '篮球场', '田径场', '柔力球场', '软件学院考场'];
            data.xq_js_dict.value[1] = ['201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216'];
            break;
        }
        data.xq_js_index[1] = 0;
        break;
      case 1:
        break
    }
    // console.log(data)
    this.setData(data);

  },


  zc_xq_MultiChange: function (e) {
    console.log(e)
    this.setData({
      zc_xq_index: e.detail.value
    })
  },
  //   zc_xq_ColumnChange:function(e){
  // console.log(e)
  // let data = {
  //   zc_xq_dict: this.data.zc_xq_dict,
  //   zc_xq_index: this.data.zc_xq_index
  // };
  // data.zc_xq_index[e.detail.column] = e.detail.value;
  // // console.log(e.detail.column)

  //   this.setData(data);

  //   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})
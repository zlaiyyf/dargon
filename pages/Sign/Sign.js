// pages/Sign/Sign.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    url:app.globalData.g_url,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    //导航tab
    Tablist: ['两办通知', '其它通知', '本科教学', '研究生教学', '科技信息', '社科信息'],
    TabCur: 0,
    scrollLeft: 0,
    //load
    loadhide: false,
    isLoad: true,
    // 文章 科技处：关于山西省科技计划项目全年常态化...
    essay_list: {'_list':[{
   
      'essay_id': 1,
      'essay_ab_title': '测试测试测试',
      'essay_time': '19-12-04'
    }],
    'next':true,
    'next_num':1,
    'sort':''

  },
   essay_list_1713: {'_list':[],
  'next':true,
  'next_num':1,

  'sort':1713
},
    essay_list_1734: {'_list':[],
    'next':true,
    'next_num':1,

    'sort':1734
  },
    essay_list_1735: {'_list':[],
    'next':true,
    'next_num':1,
    'sort':1735
  },
    essay_list_1736: {'_list':[],
    'next':true,
    'sort':1736,
    'next_num':1
  },
    essay_list_1737:  {'_list':[],
    'next':true,
    'sort':1737,
    'next_num':1
  },
    essay_list_1754:  {'_list':[],
    'next':true,
    'sort':1754,
    'next_num':1
  },
  },

  // tag
  tabSelect(e) {
    if (e.length==0){
      // console.log('没有')
      var id =this.data.id
    }else{
      // console.log('tag')
      var id =e.currentTarget.dataset.id
      this.data.id=id
    }
   
    this.setData({
      TabCur: id,
      scrollLeft: (id - 1) * 60
    })
    if (id==0){
    this.setData({
      essay_list:this.data.essay_list_1713
    })
    }else if(id==1){
      this.setData({
        essay_list:this.data.essay_list_1734
      })
    }else if (id==2){
      this.setData({
        essay_list:this.data.essay_list_1735
      })
    }else if (id==3){
      this.setData({
        essay_list:this.data.essay_list_1736
      })
    }else if (id==4){
      this.setData({
        essay_list:this.data.essay_list_1754
      })
    }else if (id==5){
      this.setData({
        essay_list:this.data.essay_list_1737
      })
    }
    if (this.data.essay_list._list.length==0){
       this.bindscrolltolower('')
    }
  },
  // essayTab
  bindscrolltolower: function (e) {
    // 加载
    // this.setData({
    //   // loadhide:true,
    //   isLoad: true
    // })
    if (!this.data.essay_list.next){
      return
    }
    var old_list = this.data.essay_list
    var sort=old_list.sort
    var next_num=old_list.next_num
    wx.request({
      url: app.globalData.g_url + 'v1/essay',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        key: 'key',
        openid:'2',
        page:next_num,
        sort:sort,
        num:10
      },
      success: res => {
        // console.log(res.data)
        var code = res.data.code;
        var data=res.data.data
        if (code==200){
          var _next=data.fin
          var _sort=data.sort
          var _next_num=data.next_num
          var new_list=data.essay_list
          // console.log(new_list)
          if (_sort=='1713'){
            
            var __list=this.data.essay_list_1713._list
            __list.push.apply(__list,new_list)
            // console.log(__list)
            this.data.essay_list_1713.next=_next
            this.data.essay_list_1713.next_num=_next_num
          }else if(_sort=='1734'){
            var __list=this.data.essay_list_1734._list
            __list.push.apply(__list,new_list)
            this.data.essay_list_1734._list.concat(new_list),
            this.data.essay_list_1734.next=_next
            this.data.essay_list_1734.next_num=_next_num
          }else if(_sort=='1735'){
            var __list=this.data.essay_list_1735._list
            __list.push.apply(__list,new_list)
            this.data.essay_list_1735._list.concat(new_list),
            this.data.essay_list_1735.next=_next
            this.data.essay_list_1735.next_num=_next_num
          }else if(_sort=='1736'){
            var __list=this.data.essay_list_1736._list
            __list.push.apply(__list,new_list)
            this.data.essay_list_1736._list.concat(new_list),
            this.data.essay_list_1736.next=_next
            this.data.essay_list_1736.next_num=_next_num
          }else if(_sort=='1754'){
            var __list=this.data.essay_list_1754._list
            __list.push.apply(__list,new_list)
            this.data.essay_list_1754._list.concat(new_list),
            this.data.essay_list_1754.next=_next
            this.data.essay_list_1754.next_num=_next_num
          }else if(_sort=='1737'){
            var __list=this.data.essay_list_1737._list
            __list.push.apply(__list,new_list)
            this.data.essay_list_1737._list.concat(new_list),
            this.data.essay_list_1737.next=_next
            this.data.essay_list_1737.next_num=_next_num
          }
          this.tabSelect('')
        }else{
          wx.showToast({
            title: '发生错误',
            icon: 'none',
            duration: 1500
          })
        }
   

      }
    })
    // var new_list = [

    // ]
    // var now_list = old_list.concat(new_list)
    // this.setData({
    //   essay_list: now_list
    // })
    // setTimeout(function () {
    //   this.setData({
    //     // loadhide:true,
    //     isLoad: false
    //   })
    // },10000) 

    // console.log('xxx')


  },
  // load
  isLoading(e) {
    this.setData({
      isLoad: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      essay_list:this.data.essay_list_1713
    })
    this.bindscrolltolower()
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

  onShareAppMessage: function () {
    return {
      title: '在山大必备的平台-龙城山大plus',
      path: '/pages/index/index',
      // imageUrl: 'http://static.e-mallchina.com/pic/product/brand/detail/hgds.jpg'//自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
    }

  }

})
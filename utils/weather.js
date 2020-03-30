// utils/weltearh.js
const app = getApp();
Component({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
xqs_name:''
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      wx.request({
        url: app.globalData.g_url + 'v1/wea',
        method: 'POST',
        header: {
          "Content-Type": "application/json"
        },
        data: {
          key: 'key',
          openid:'2',
     
        },
        success: res => {
          // console.log(res.data)
          var code = res.data.code;
          var data=res.data.data
          if (code==200){
            var xqs=data.xqs
            var zc=data.zc
            var to=data.to
            var tor =data.tor
            var xqs_name=''
            if(xqs==0){
               xqs_name='星期一'
            }else if (xqs==1){
              xqs_name='星期二'
            }else if (xqs==2){
              xqs_name='星期三'
            }else if (xqs==3){
              xqs_name='星期四'
            }else if (xqs==4){
              xqs_name='星期五'
            }else if (xqs==5){
              xqs_name='星期六'
            }else if (xqs==6){
              xqs_name='星期日'
            }
              this.setData({
                xqs_name:xqs_name,
                zc:zc,
                to:to,
                tor:tor
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
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function() {
    // 在组件实例进入页面节点树时执行
    wx.request({
      url: app.globalData.g_url + 'v1/wea',
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      data: {
        key: 'key',
        openid:'2',
   
      },
      success: res => {
        console.log(res.data)
        var code = res.data.code;
        var data=res.data.data
        console.log(data)
        if (code==200){
          var xqs=data.xqs
          var zc=data.zc
          var to=data.to
          var tor =data.tor
          var xqs_name=''
          console.log(xqs,zc)
          if(xqs==0){
             xqs_name='星期一'
          }else if (xqs==1){
            xqs_name='星期二'
          }else if (xqs==2){
            xqs_name='星期三'
          }else if (xqs==3){
            xqs_name='星期四'
          }else if (xqs==4){
            xqs_name='星期五'
          }else if (xqs==5){
            xqs_name='星期六'
          }else if (xqs==6){
            xqs_name='星期日'
          }
            this.setData({
              xqs_name:xqs_name,
              zc:zc,
              to:to,
              tor:tor
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
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

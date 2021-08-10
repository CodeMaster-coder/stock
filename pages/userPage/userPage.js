// pages/userPage/userPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headImage:'https://i.loli.net/2021/07/24/YMUpxJRHDNFEvkW.png',
    nickName:'用户昵称',
    selfStockList:[ ],
  id_code:'',
  loginBtnShow:true,
  tradeSignalColor:'#FF6347',
  tradeSignalColor1:'#66cd7d',
  loadingShow:false,
  currentItem: null,
  },
  resgiOrLogin(){
    let that = this;
    wx.getUserProfile({
      desc: '用于完善客户信息',
      success: function(res){
        // console.log(res)
        let user = res.userInfo;
        console.log(user)
        that.setData({
          headImage:user.avatarUrl,
          nickName:user.nickName,
          loginBtnShow:false,
        })
        let encryptedData = res.encryptedData;
        let iv = res.iv;
        wx.login({
          success: function(res){
            let code = res.code 
            // console.log(code)             
            if(code){
              wx.request({
                url:'https://www.zqzqsmile.xyz/stockUserinfo/login',
                method:'POST',
                header:{'content-type': 'application/x-www-form-urlencoded'},
                data:{
                  demo:'checkstatus',
                  code:code
                },
                success: function(res){
                  // console.log(res.data[0])
                  let userinfo = res.data
                  // console.log(userinfo)
                  if(userinfo == 'noinfo'){
                        wx.login({
                          success: function(res){
                            let code = res.code              
                            if(code){
                              wx.request({
                                url: 'https://www.zqzqsmile.xyz/stockUserinfo/login',
                                method:'POST',
                                header:{'content-type': 'application/JSON'},
                                data:{
                                  code: code,
                                  demo:'register',
                                  encryptedData: encryptedData,
                                  iv: iv,
                                },
                                success: function(res){
                                  if(res.data.status == true){
                                    wx.showToast({
                                      title: '注册已完成',
                                      icon: 'none',
                                      duration: 1000
                                    })
                                    wx.setStorageSync('userinfo', user)
                                  }
                                }
                              })
                            }
                            }})
                  }
                  else{
                    console.log(res.data[0])
                    let userinfo = res.data[0]
                    wx.setStorageSync('userinfo', userinfo)
                    that.setData({
                      loadingShow:true
                    })
                    wx.login({
                      success: function(res){
                        let code = res.code 
                        if(code){
                    wx.request({
                      url: 'https://www.zqzqsmile.xyz/stock/login',
                      method:'POST',
                      header:{'content-type': 'application/JSON'},
                      data:{
                        code: 'user_stock_info',
                        id_code:code
                      },
                      success: function(res){
                        console.log(res.data)
                        let selfStockList = res.data
                        that.setData({
                          selfStockList:selfStockList,
                          loadingShow:false
                        })
                      }
                    })}}})
                 }
                }
              })
            }
      }
    })
      }
    })
},
exit(){
  let that =this
  that.setData({
    headImage:'https://i.loli.net/2021/07/24/YMUpxJRHDNFEvkW.png',
    nickName:'用户昵称',
    loginBtnShow:true,
    selfStockList:[ ],
  })
  wx.removeStorageSync('userinfo')
},
detailAndDelete(e){
  var index = e.currentTarget.dataset.index;
  // console.log("index: "+index)
  this.setData({
    currentItem:index
  })
  // console.log(this.data.currentItem)
},
btnHide(){
  if(this.data.currentItem != null)
  this.setData({
    currentItem:''
  })
  // console.log(this.data.currentItem)
},
delStretagy(){
  let that = this;
  let id = that.data.currentItem;
  let selfStockList = that.data.selfStockList;
  let stockId = selfStockList[id].id;
  wx.showModal({
    title:'删除自选策略确认框',
    content:'确定删除当前策略？',
    success:function(res){
      if(res.confirm){
        wx.request({
          url: 'https://www.zqzqsmile.xyz/stock/login',
          data:{
            code:'user_dele_stock_info',
            id:stockId
          },
          method:'POST',
          header: {
           'content-type': 'application/json' // 默认值
          },
          success:function(res){
            console.log(res.data)
            if(res.data.info == '自选股票及策略删除成功'){
              wx.showToast({
                title: '策略删除完成',
                icon: 'none',
                duration: 2000
              })
              selfStockList.splice(id,1)
              that.setData({
                selfStockList:selfStockList
              })
            }
            else{
              wx.showToast({
                title: '系统异常',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      }
    }
  })
},
refreshBtn(){
  let user = wx.getStorageSync('userinfo');
  let that = this;
  // console.log(user)
  if(user == ''){
    wx.showToast({
      title: '请先登录/注册！',
      icon: 'none',
      duration: 2000
    })
  }
  else{
    that.setData({
      loadingShow:true
    })
    wx.login({
      success(res){
        let id_code = res.code;
        console.log(id_code)
        if(id_code){
          wx.request({
            url: 'https://www.zqzqsmile.xyz/stock/login',
            method:'POST',
            header:{'content-type': 'application/JSON'},
            data:{
              code:'user_stock_info',
              id_code:id_code
            },
            success: function(res){
              console.log(res.data)
              let selfStockList = res.data
              that.setData({
                selfStockList:selfStockList,
                loadingShow:false
              })
            }
          })
        }
      }
    })
  }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = wx.getStorageSync('userinfo');
    let that = this;
    // console.log(user)
    if(user == ''){
      that.setData({
        selfStockList:'',
        headImage:'https://i.loli.net/2021/07/24/YMUpxJRHDNFEvkW.png',
        nickName:'用户昵称',
      })
    }
    else{
      that.setData({
        headImage:user.avatarUrl,
        nickName:user.nickName,
        loginBtnShow:false,
        loadingShow:true
      })
      wx.login({
        success(res){
          let id_code = res.code;
          console.log(id_code)
          if(id_code){
            wx.request({
              url: 'https://www.zqzqsmile.xyz/stock/login',
              method:'POST',
              header:{'content-type': 'application/JSON'},
              data:{
                code:'user_stock_info',
                id_code:id_code
              },
              success: function(res){
                console.log(res.data)
                let selfStockList = res.data
                that.setData({
                  selfStockList:selfStockList,
                  loadingShow:false
                })
              }
            })
          }
        }
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

  }
})

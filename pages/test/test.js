// pages/userPage/userPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose_items:[
      '推荐', '猜您喜欢', '热销爆款', '品质订制', '有机馆', '环球美食'
      
    ],
    current_item: 0,
  },
/**
 * 动态地给左侧导航栏添加点击变色样式
 */
 
  clicked:function(e){
    var that= this;
    let cuu=e.currentTarget.dataset.key;//获取index值
    console.log(cuu);
    that.setData({
      current_item: cuu
    })
  },
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

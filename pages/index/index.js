// pages/strategyTest/strategyTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namelist:['兆易创新','士兰微','水晶光电','三安光电','四维图新',
    '中兴通讯','烽火通信','中际旭创','长盈精密','亨通光电','东山精密','信维通信',
    '横店影视','中文传媒','分众传媒','中国电影','中文在线','完美世界','跨境通','谊兄弟',
    '贵州茅台','五粮液','泸州老窖','洋河股份','水井坊','沱牌舍得','老白干酒','山西汾酒','口子窖','古井贡酒'
              ],
    chosennamelist:[],
    stocknameshow:true,
    chosenname:''
  },
  inputstockname:function(e){
    var value = e.detail.value;
    var that = this;
    var namelist = that.data.namelist;
    if (value == '') {
      that.setData({
        stocknameshow: false,
      })
    }else {
     
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        console.log(e.detail.cursor)
        var namearr = [];
        for (var i = 0; i < namelist.length; i++) {
          if (namelist[i].indexOf(value) >= 0) {
            namearr.push(namelist[i]);
          }
        }
        that.setData({
          stocknameshow: true,
          chosennamelist: namearr
        });
      }
    }
    console.log(that.data.chosennamelist)
    // console.log(value)
  },

  includenamelist:function(res){
    console.log(res.currentTarget.dataset.index);
    var index = res.currentTarget.dataset.index
    var that = this;
    that.setData({
      chosenname: that.data.chosennamelist[index],
      viewShowed1ABT: false,
    });
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
// pages/strategyTest/strategyTest.js
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    namelist:[ ],
    codelist:['2344','247637','65984','845748','6374','8475','893579','78463'],
    chosennamelist:[],
    stocknameshow:false,
    chosenname:'',
    stockcodeshow: false,
    chosencodelist:[],
    chosencode:'',
    chosenstrategy:'选择买入策略',
    strategyoptionshow:false,
    strategylist:['均线与均线'],
    // strategylist:['均线与均线','收盘价与均线','MACD','JKD'],
    chosensoldstrategy:'选择卖出策略',
    strategysoldoptionshow:false,
    purchaseshortshow:false,
    soldshortshow:false,
    purchaseshorttime:'',
    purchaselongtime:'',
    soldshorttime:'',
    soldlongtime:'',
    today:'',
    testSartTime:'',
    testEndTime:'',
    initialFund:'',
    detectFrequency:'',
    tradeFreq:'',
    font_color:'#808080',
    soldfont_color:'#808080',
    stocklist:'',
    inputChange:false,
    loadingShow:false
  },
  inputstockname:function(e){
    var value = e.detail.value;
    var that = this;
    var namelist = that.data.namelist;
    let stocklist = that.data.stocklist
    // console.log(that.data.stocklist)
    if (value == '') {
      that.setData({
        stocknameshow: false,
        
      })
    }else {
      if(value != that.data.chosenname){
        that.setData({
          chosencode:'',
          stockcodeshow: false,
        })
      
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        // console.log(e.detail.cursor)
        var namearr = [];
        // console.log(that.data.stocklist)
        stocklist.forEach(function(i) {
          let stockname = i.st_name
          let stockspell = i.cnspell
          if (stockname.indexOf(value) >= 0 || stockspell.indexOf(value) >= 0 ) {
            namearr.push(stockname);
          }
        })
        if(namearr.length > 0){
        that.setData({
          stocknameshow: true,
          chosennamelist: namearr
        });
      }
      }}
    }
    // console.log(that.data.chosennamelist)
    // console.log(value)
  },

  includenamelist:function(res){
    
    var index = res.currentTarget.dataset.index
    // console.log(index)
    var that = this;
    let stocklist = that.data.stocklist
    let chosenname = that.data.chosennamelist[index]
    let stockindex = stocklist.findIndex(item => item.st_name === chosenname)
    // console.log(stockindex)
    let stockcode = stocklist[stockindex].ts_code
    // console.log(stockcode)
    if( that.data.chosenname != ''){
    if(chosenname != that.data.chosenname){
      this.setData({
        inputChange:true,
        chosenname: that.data.chosennamelist[index],
        stocknameshow: false,
        chosencode:stockcode,
      })
    }else{
      this.setData({
        chosenname: that.data.chosennamelist[index],
        stocknameshow: false,
        chosencode:stockcode,
      })
    }
  }
    else{
      that.setData({
        chosenname: that.data.chosennamelist[index],
        stocknameshow: false,
        chosencode:stockcode,
      })
    }
  },

  inputstockcode:function(e){
    var value = e.detail.value;
    var that = this;
    var codelist = that.data.codelist;
    let stocklist = that.data.stocklist
    if (value == '') {
      that.setData({
        stockcodeshow: false,
      })
    }else {
     if(value != that.data.chosencode){
      that.setData({
        chosenname:'',
        stocknameshow: false,
      })
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置
        // console.log(e.detail.cursor)
        var codearr = [];
        stocklist.forEach(function(i) {
          let stockcode = i.ts_code
          if (stockcode.indexOf(value) >= 0 ) {
            codearr.push(stockcode);
          }
        })

        that.setData({
          stockcodeshow: true,
          chosencodelist: codearr
        });
      }}
    }
    // console.log(that.data.chosencodelist)
    // console.log(value)
  },
  includecodelist:function(res){
    var index = res.currentTarget.dataset.index
    var that = this;
    let stocklist = that.data.stocklist
    let chosencode = that.data.chosencodelist[index]
    let stockindex = stocklist.findIndex(item => item.ts_code === chosencode)
    let stockname = stocklist[stockindex].st_name
    if( that.data.chosencode != ''){
      if(chosencode != that.data.chosencode){
        this.setData({
          inputChange:true,
          chosencode: that.data.chosencodelist[index],
          stockcodeshow: false,
          chosenname:stockname,
        })
      }else{
        this.setData({
          chosencode: that.data.chosencodelist[index],
          stockcodeshow: false,
          chosenname:stockname,
        })
      }
    }
      else{
        that.setData({
          chosencode: that.data.chosencodelist[index],
          stockcodeshow: false,
          chosenname:stockname,
        })
      }
  },
  strategyoptions(e){
    this.setData({
      chosenstrategy:'',
      strategyoptionshow:true
    })
  },
  chosenstategyname(res){
    var index = res.currentTarget.dataset.index
    var that = this;
    if(that.data.strategylist[index] != that.data.chosenstrategy){
      that.setData({
        inputChange:true
      })
    }
    that.setData({
      chosenstrategy: that.data.strategylist[index],
      strategyoptionshow:false,
        font_color:'#00004a'
    });
    // console.log(that.data.chosenstrategy)
    if(that.data.chosenstrategy == '均线与均线'){
      that.setData({
        purchaseshortshow:true
      })
    }
  },
  inputpurchaseshort(e){
    if(e.detail.value != this.data.purchaseshorttime){
      this.setData({
        inputChange:true
      })}
    this.setData({purchaseshorttime:e.detail.value})
  },
  inputpurchaselong(e){
    if(e.detail.value != this.data.purchaselongtime){
      this.setData({
        inputChange:true
      })}
    this.setData({purchaselongtime:e.detail.value})
  },
  soldstrategyoptions(e){
    this.setData({
      chosensoldstrategy:'',
      strategysoldoptionshow:true
    })
  },
  chosensoldstategyname(res){
    var index = res.currentTarget.dataset.index
    var that = this;
    if(that.data.strategylist[index] != that.data.chosensoldstrategy){
      that.setData({
        inputChange:true
      })}
    that.setData({
      chosensoldstrategy:that.data.strategylist[index],
      strategysoldoptionshow:false,
      soldfont_color:'#00004a'
    });
    if(that.data.chosensoldstrategy == '均线与均线'){
      that.setData({
        soldshortshow:true
      })
    }
  },
  inputshortlong(e){
    if(e.detail.value != this.data.soldshorttime){
      this.setData({
        inputChange:true
      })}
    this.setData({soldshorttime:e.detail.value})
  },
  inputsoldlong(e){
    if(e.detail.value != this.data.soldlongtime){
      this.setData({
        inputChange:true
      })}
    this.setData({soldlongtime:e.detail.value})
  },
  chosestarttime(e){
    if(e.detail.value != this.data.testSartTime){
      this.setData({
        inputChange:true
      })}
    this.setData({testSartTime:e.detail.value})
  },
  choseendtime(e){
    if(e.detail.value != this.data.testEndTime){
      this.setData({
        inputChange:true
      })}
    this.setData({testEndTime:e.detail.value})
  },
  inputInitialFund(e){
    if(e.detail.value != this.data.initialFund){
      this.setData({
        inputChange:true
      })}
    this.setData({initialFund:e.detail.value})
  },
  inputDetectFrequency(e){
    if(e.detail.value != this.data.detectFrequency){
      this.setData({
        inputChange:true
      })}
      // console.log(this.data.detectFrequency)
    this.setData({detectFrequency:e.detail.value})

      // console.log(this.data.inputChange)

      // console.log(e.detail.value)
  },

  strategyChecked(){
    if(this.data.chosenname == '' || this.data.chosencode == ''){
      wx.showToast({
        title: '请选择股票/基金！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.chosenstrategy == '选择买入策略'){
      wx.showToast({
        title: '请选择买入策略！！！',
        icon: 'none',
        duration: 2000
      })

    }
    else if(this.data.chosensoldstrategy == '选择卖出策略'){
      wx.showToast({
        title: '请选择卖出策略！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.purchaseshorttime == ''){
      wx.showToast({
        title: '请输入买入短期均线！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.purchaselongtime == ''){
      wx.showToast({
        title: '请输入买入长期均线！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.soldshorttime == ''){
      wx.showToast({
        title: '请输入卖出短期均线！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.soldlongtime == ''){
      wx.showToast({
        title: '请输入卖出长期均线！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.testSartTime == ''){
      wx.showToast({
        title: '请选择回测起始时间！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.testEndTime == ''){
      wx.showToast({
        title: '请选择回测结束时间！！！',
        icon: 'none',
        duration: 2000
      })
    }
    
    else if(this.data.initialFund == ''){
      wx.showToast({
        title: '请输入初始资金！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.detectFrequency == ''){
      wx.showToast({
        title: '请输入交易检测周期！！！',
        icon: 'none',
        duration: 2000
      })
    }
    else if(this.data.inputChange){
      this.setData({
        tradeFreq:'',
        tradeCost:'',
        winFreq:'',
        loseFre:'',
        leftFund:'',
        profitRate:'',
        longHoldFund:'',
        longHoldRate:'',
        inputChange:false
      })
      console.log('参数已齐')
      let that=this
      that.setData({
        loadingShow:true
      })
      wx.request({
        url: 'https://www.zqzqsmile.xyz/stock/login',
        data:{
          code:'stock_simulate',
          ts_code:that.data.chosencode,
          st_name:that.data.chosenname,
          simu_start_date:that.data.testSartTime,
          simu_end_date:that.data.testEndTime,
          simu_money:that.data.initialFund,
          freq:that.data.detectFrequency,
          purchase_strategy:that.data.chosenstrategy,
          sell_strategy:that.data.chosensoldstrategy,
          pur_str_p1:that.data.purchaseshorttime,
          pur_str_p2:that.data.purchaselongtime,
          sell_str_p1:that.data.soldshorttime,
          sell_str_p2:that.data.soldlongtime
        },
        method:'POST',
         header:{'content-type': 'application/json'},
         success:function(res){
           let simures = res.data[0]
          //  console.log(simures)
           that.setData({
            loadingShow:false,
            tradeFreq:simures.trade_num,
            tradeCost:simures.trade_cost,
            winFreq:simures.win_num,
            loseFre:simures.lose_num,
            leftFund:simures.simu_money,
            profitRate:simures.profit_rate,
            longHoldFund:simures.get_money1,
            longHoldRate:simures.profit_rate1
           })
         }
      })
        }
  },
  strategyAdd: utils.throttle(function (ev){
    let that =this;
    let ts_code=that.data.chosencode
    let ts_name=that.data.chosenname
    let freq=that.data.detectFrequency
    let purchase_strategy=that.data.chosenstrategy
    let sell_strategy=that.data.chosensoldstrategy
    let pur_str_p1=that.data.purchaseshorttime
    let pur_str_p2=that.data.purchaselongtime
    let sell_str_p1=that.data.soldshorttime
    let sell_str_p2=that.data.soldlongtime
    let user = wx.getStorageSync('userinfo');
        if(user == ''){
                wx.showToast({
                  title: '请先登录/注册！！！',
                  icon: 'none',
                  duration: 2000
                })
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/userPage/userPage',
                  })
                }, 1000);
              }
            else if(ts_code != '' & ts_name != '' & freq != '' & purchase_strategy != '' & sell_strategy != '' & 
            pur_str_p1 != '' & pur_str_p2 != '' & sell_str_p1 != '' & sell_str_p2 != ''){
              wx.login({
                success: function(res){
                  let code = res.code 
                  console.log(code) 
                  if(code){
              wx.request({
                url:'https://www.zqzqsmile.xyz/stock/login',
                method:'POST',
                header:{'content-type': 'application/JSON'},
                data:{
                  code:'user_add_stock_info',
                  id_code:code,
                  ts_code:ts_code,
                  st_name:ts_name,
                  freq:freq,
                  purchase_strategy:purchase_strategy,
                  sell_strategy:sell_strategy,
                  pur_str_p1:pur_str_p1,
                  pur_str_p2:pur_str_p2,
                  sell_str_p1:sell_str_p1,
                  sell_str_p2:sell_str_p2,
                  choice_status:'yes'
                },
                success:function(res){
                  if(res.data.info == "自选股票及策略添加成功"){
                    wx.showToast({
                      title: '自选策略添加成功！！！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                  else{
                    wx.showToast({
                      title: '由于网络原因，自选策略添加失败！！！',
                      icon: 'none',
                      duration: 2000
                    })
                  }
                }     
              })}}})
            }
            else{
              wx.showToast({
                title: '策略参数不能为空！！！',
                icon: 'none',
                duration: 2000
              })
            }



  }),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    let today =  Y + '-'  + M+ '-' + D
    let that = this
    this.setData({
      today:today
    })
    wx.request({
      url: 'https://www.zqzqsmile.xyz/stock/login',
      data:{
        code:'stock_name',
      },
      method:'POST',
      header:{'content-type': 'application/json'},
      success:function(res){
        let stocklist = res.data;
        
        that.setData({
          stocklist:stocklist
        })
        // console.log(that.data.stocklist)
      }
      
    })
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
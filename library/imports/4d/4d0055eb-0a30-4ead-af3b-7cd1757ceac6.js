"use strict";
cc._RF.push(module, '4d005XrCjBOra87fNF1fOrG', 'ReliveViewCtrl');
// Script/common/ReliveViewCtrl.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import dataStatistics from '../dataStatistics/dataStatistics';
cc.Class({
  "extends": cc.Component,
  properties: {
    Score: cc.Label,
    TimeTex: cc.Label,
    m_cost_numlabel: cc.Label,
    TimeNum: null,
    skipBtn: cc.Node,
    //跳过按键
    m_cost_pic: cc.Sprite,
    //game
    m_bg: cc.Node,
    m_share_relive: cc.Node,
    m_btn_share: cc.Button,
    m_sp_all_gold: cc.Sprite,
    m_l_all_gold: cc.Label
  },
  start: function start() {
    this.node.zindex = 100; //设置z轴的位置

    this.TimeNum = 10;
    this.TimeTex.string = this.TimeNum;
    this.timeOut = false; // this.callbackobj = null;

    this.m_cost_num = window.RELIVE_COST_NUM; //设置节点的分辨率

    var size = cc.winSize;
    this.m_bg.width = size.width;
    this.m_bg.height = size.height;
    var self = this;
    cc.loader.loadRes(window.RELIVE_COST_PIC_PATH, cc.SpriteFrame, function (err, spriteFrame) {
      if (err) {
        cc.error(err.message || err);
        return;
      }

      self.m_cost_pic.spriteFrame = spriteFrame;
      self.m_sp_all_gold.spriteFrame = spriteFrame;
    });
    this.m_cost_numlabel.string = 'x' + window.RELIVE_COST_NUM;
    this.m_l_all_gold.string = ':' + window.INIT_GAME_SAVE_DATA.gold_num;

    if (window.isWeChatPlatform) {
      // dataStatistics.getGameConfigByAppkey(res => {
      //     console.log(res);
      //     let share = res.data.data.share;
      //     self.setShareReliveShow(share);
      // });
      self.setShareReliveShow(window.SHARE_RELIVE);
    }
  },
  setShareReliveShow: function setShareReliveShow(boo) {
    if (boo == 0) {
      this.m_share_relive.active = false;
    } else {
      this.m_share_relive.active = true;
    }
  },
  setCallBackObj: function setCallBackObj(obj) {
    this.callbackobj = obj;
  },
  //分享视图显示
  ShowView: function ShowView(IsShow) {
    this.node.active = IsShow;

    if (IsShow === true && this.callbackobj && this.callbackobj.shareObj) {
      if (this.callbackobj.shareObj.is_share_relive) {
        this.m_btn_share.interactable = false;
      } else {
        this.m_btn_share.interactable = true;
      }
    }

    if (IsShow === false) {
      // this.unschedule(this.DeleteTimeNum, this);
      this.node.destroy();
    }
  },
  //10秒倒计时 选择时间
  CountDownClick: function CountDownClick(time) {
    this.schedule(this.DeleteTimeNum, 1, time, 0, true);
  },
  DeleteTimeNum: function DeleteTimeNum() {
    this.TimeNum -= 1;
    this.TimeTex.string = this.TimeNum; //倒计时完成

    if (this.TimeNum <= -1) {
      this.TimeTex.string = 0;
      this.ShowView(false);

      if (this.callbackobj != null) {
        this.callbackobj.onSkipCallBack();
      }
    }
  },
  //点击分享 游戏继续
  CoinBtnClick: function CoinBtnClick() {
    if (this.callbackobj != null) {
      var relive = this.callbackobj.onCostRelive(this.m_cost_num);

      if (relive) {
        this.ShowView(false);
      }
    }
  },
  setScoreLabel: function setScoreLabel(score) {
    this.Score.string = score + "";
  },
  setCostNumLabel: function setCostNumLabel(costnum) {
    this.m_cost_numlabel.string = "x" + costnum;
    this.m_cost_num = parseInt(costnum);
  },
  //点击分享 游戏继续
  ShareBtnClick: function ShareBtnClick() {
    this.unschedule(this.DeleteTimeNum);

    if (!window.wx) {
      // console.log("=================不是微信平台===========");
      return;
    }

    var self = this;

    if (this.callbackobj != null) {
      var shareObj = this.callbackobj.shareObj;

      _Data["default"].share(EChannelPrefix.resurrection, "", null, function (res) {
        if (res.shareTickets) {
          if (shareObj.success) shareObj.success(res);
          self.ShowView(false);
        } else {
          Utils.showTipsText("分享失败，请分享到群", null, 0, 0, 80);
        }
      }, function () {
        if (shareObj.fail) shareObj.fail();
      }, function () {
        if (shareObj.complete) shareObj.complete();
      });
    }
  },
  //点击跳过 直接游戏结束
  cancelBtnClick: function cancelBtnClick() {
    // console.log("cancelBtnClick");
    this.unschedule(this.DeleteTimeNum);
    this.ShowView(false);

    if (this.callbackobj != null) {
      this.callbackobj.onSkipCallBack();
    }
  }
});

cc._RF.pop();
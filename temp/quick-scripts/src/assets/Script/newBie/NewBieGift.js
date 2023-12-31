"use strict";
cc._RF.push(module, 'ff138Fh57NHHqstEbjYQe72', 'NewBieGift');
// Script/newBie/NewBieGift.js

"use strict";

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

var GetTimeString = function GetTimeString() {
  var data = new Date();
  var time = data.getFullYear() + "/" + (data.getMonth() + 1) + "/" + data.getDate(); // var time = data.toLocaleDateString();

  var arr = time.split("/");
  return [time, arr];
};

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_newpanel: cc.Node,
    m_n_newpanel_success: cc.Node,
    m_btn_getreward: cc.Button,
    m_l_desc: cc.Label
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false; // EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateData, this);

    EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    this.updateData();
  },
  // update (dt) {},
  onEnable: function onEnable() {},
  onDisable: function onDisable() {},
  onDestroy: function onDestroy() {
    // EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
    EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
  },
  onshowback: function onshowback(time) {
    if (this._onshowback) {
      this._onshowback = false;

      if (this.m_n_newpanel_success.active) {
        this.m_n_newpanel_success.active = false;
      }
    }
  },
  autoShowRewardPage: function autoShowRewardPage() {
    // 上次领取的时间
    var state = this.getState();

    if (state == 1) {
      if (!window.firststart) {
        this.onBtnNewBieClick();
        window.firststart = true;
      }
    }
  },
  getState: function getState() {
    var state = 1;
    var getTime = window.INIT_GAME_SAVE_DATA.login_time; // console.log("getstate",getTime)

    if (getTime && getTime != 'null' && getTime != '') {
      var getArr = getTime.split("/");
      var temp = GetTimeString();
      var curTime = temp[0],
          curArr = temp[1]; // console.log(getArr, temp[1])

      state = this.judgeTime(getArr, curArr);
    }

    return state;
  },
  judgeTime: function judgeTime(t_a1, t_a2) {
    if (parseInt(t_a1[0]) < parseInt(t_a2[0])) return 1;
    if (parseInt(t_a1[0]) > parseInt(t_a2[0])) return -1;
    if (parseInt(t_a1[1]) < parseInt(t_a2[1])) return 1;
    if (parseInt(t_a1[1]) > parseInt(t_a2[1])) return -1;
    var res = 0;
    if (parseInt(t_a1[2]) < parseInt(t_a2[2])) res = 1;else if (parseInt(t_a1[2]) > parseInt(t_a2[2])) res = -1;
    return res;
  },
  updateData: function updateData() {
    // let state = window.INIT_GAME_SAVE_DATA.award_list % 10;
    // let tt = this.m_btn_getreward.node.getChildByName("l_newbconfirm");
    this.autoShowRewardPage();
    var state = this.getState();

    if (state == 1) {
      this.m_btn_getreward.interactable = true;
      this.m_l_desc.string = "每天可领一次";
    } else {
      this.m_btn_getreward.interactable = false;
      this.m_l_desc.string = "每天可领一次(已领取)";
    }
  },
  onBtnNewBieClick: function onBtnNewBieClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = true; // let tt = this.m_btn_getreward.node.getChildByName("l_newbconfirm");

    var state = this.getState();

    if (state == 1) {
      this.m_btn_getreward.interactable = true;
      this.m_l_desc.string = "每天可领一次";
    } else {
      this.m_btn_getreward.interactable = false;
      this.m_l_desc.string = "每天可领一次(已领取)";
    }
  },
  onBackBtnClick: function onBackBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false;
  },
  onRewardBackBtnClick: function onRewardBackBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = false;
  },
  onBtnGetRewardClick: function onBtnGetRewardClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.m_n_newpanel.active = false;
    this.m_n_newpanel_success.active = true;
    var temp = GetTimeString();
    var curTime = temp[0];
    this._onshowback = true;
    window.INIT_GAME_SAVE_DATA.login_time = curTime;
    window.INIT_GAME_SAVE_DATA.tool[0] += 1;
    window.INIT_GAME_SAVE_DATA.gold_num += 10;
    this.updateData();
    if (window.GAME_MENU) window.GAME_MENU.updateGold();
  },
  onShareBtnClick: function onShareBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    var self = this;
    ShareSdk.shareAppMessage({
      title: "炸弹，金币每天领，快来领取吧",
      imageUrl: window.tempFileURL[0],
      success: function success(res) {
        // cc.director.loadScene(window.GAME_SCENE_NAME);
        self.m_n_sharenode.active = true;
      },
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  }
});

cc._RF.pop();
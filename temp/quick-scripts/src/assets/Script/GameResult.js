"use strict";
cc._RF.push(module, '837bfcDQspAUrwybQW0KLaf', 'GameResult');
// Script/GameResult.js

"use strict";

var RankList = require("RankList");

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_fail: cc.Node,
    m_sp_titlef: cc.Node,
    m_btn_again: cc.Node,
    m_btn_share: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  showVictory: function showVictory(score) {},
  showFail: function showFail(num, score, monster_num) {
    this._score = score;
    this._monster_num = monster_num;
    this.node.active = true;
    this.m_n_fail.active = true;
    this.m_n_fail.y = -cc.winSize.height / 2;
    this.m_n_fail.runAction(cc.sequence(cc.moveTo(0.5, 0, 0).easing(cc.easeIn(3.0)), cc.callFunc(function () {})));
    this.m_sp_titlef.stopAllActions();
    this.m_sp_titlef.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 10), cc.moveBy(0.5, 0, -10))));
    this.m_btn_again.active = true;
    this.m_btn_share.active = true;
    RankList.showGameResultList();
  },
  onBackToMenu: function onBackToMenu() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.MENU_SCENE_NAME);
  },
  onAgainPlay: function onAgainPlay() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  onResultShare: function onResultShare() {
    var text = "\u5B9D\u5B9D\u8981\u54ED\u6655\u5728\u5C71\u4E0A\u4E86\uFF0C\u5FEB\u6765\u5E2E\u5E2E\u5B83\uFF01";
    ShareSdk.shareAppMessage({
      title: text,
      imageUrl: window.tempFileURL[2],
      success: function success(res) {},
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  } // onEnable(){
  // },
  // update (dt) {},

});

cc._RF.pop();

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameResult.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lUmVzdWx0LmpzIl0sIm5hbWVzIjpbIlJhbmtMaXN0IiwicmVxdWlyZSIsIlV0aWxzIiwiU2hhcmVTZGsiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fbl9mYWlsIiwiTm9kZSIsIm1fc3BfdGl0bGVmIiwibV9idG5fYWdhaW4iLCJtX2J0bl9zaGFyZSIsInN0YXJ0Iiwic2hvd1ZpY3RvcnkiLCJzY29yZSIsInNob3dGYWlsIiwibnVtIiwibW9uc3Rlcl9udW0iLCJfc2NvcmUiLCJfbW9uc3Rlcl9udW0iLCJub2RlIiwiYWN0aXZlIiwieSIsIndpblNpemUiLCJoZWlnaHQiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsIm1vdmVUbyIsImVhc2luZyIsImVhc2VJbiIsImNhbGxGdW5jIiwic3RvcEFsbEFjdGlvbnMiLCJyZXBlYXRGb3JldmVyIiwibW92ZUJ5Iiwic2hvd0dhbWVSZXN1bHRMaXN0Iiwib25CYWNrVG9NZW51IiwiU2V0U291bmRFZmZlY3QiLCJ3aW5kb3ciLCJCVVRUT05fQ0xJQ0tfTVVTSUMiLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsIk1FTlVfU0NFTkVfTkFNRSIsIm9uQWdhaW5QbGF5IiwiR0FNRV9TQ0VORV9OQU1FIiwib25SZXN1bHRTaGFyZSIsInRleHQiLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImVyciIsImNvbXBsYXRlIiwibXNnIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFFBQVEsR0FBR0MsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHRCxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQSxJQUFJRSxRQUFRLEdBQUdGLE9BQU8sQ0FBQyxVQUFELENBQXRCOztBQUNBRyxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNM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QyxHQUFHLEVBQUksQ0FFWixDQVJvQjtBQVNyQkMsTUFBQUEsUUFBUSxFQUFFLGtCQUFBQyxHQUFHLEVBQUksQ0FFaEI7QUFYb0IsS0FBekI7QUFhSCxHQS9ESSxDQWlFTDtBQUVBO0FBRUE7O0FBckVLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSYW5rTGlzdCA9IHJlcXVpcmUoXCJSYW5rTGlzdFwiKTtcbnZhciBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcbnZhciBTaGFyZVNkayA9IHJlcXVpcmUoXCJTaGFyZVNka1wiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1fbl9mYWlsOiBjYy5Ob2RlLFxuICAgICAgICBtX3NwX3RpdGxlZjogY2MuTm9kZSxcbiAgICAgICAgbV9idG5fYWdhaW46IGNjLk5vZGUsXG4gICAgICAgIG1fYnRuX3NoYXJlOiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIHNob3dWaWN0b3J5KHNjb3JlKSB7XG5cbiAgICB9LFxuXG4gICAgc2hvd0ZhaWwobnVtLCBzY29yZSwgbW9uc3Rlcl9udW0pIHtcbiAgICAgICAgdGhpcy5fc2NvcmUgPSBzY29yZTtcbiAgICAgICAgdGhpcy5fbW9uc3Rlcl9udW0gPSBtb25zdGVyX251bTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9uX2ZhaWwuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fZmFpbC55ID0gLWNjLndpblNpemUuaGVpZ2h0IC8gMjtcbiAgICAgICAgdGhpcy5tX25fZmFpbC5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MubW92ZVRvKDAuNSwgMCwgMCkuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuXG4gICAgICAgIH0pKSk7XG4gICAgICAgIHRoaXMubV9zcF90aXRsZWYuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tX3NwX3RpdGxlZi5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5tb3ZlQnkoMC41LCAwLCAxMCksIGNjLm1vdmVCeSgwLjUsIDAsIC0xMCkpKSk7XG4gICAgICAgIHRoaXMubV9idG5fYWdhaW4uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX2J0bl9zaGFyZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBSYW5rTGlzdC5zaG93R2FtZVJlc3VsdExpc3QoKTtcbiAgICB9LFxuXG4gICAgb25CYWNrVG9NZW51KCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuXG4gICAgb25BZ2FpblBsYXkoKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHdpbmRvdy5HQU1FX1NDRU5FX05BTUUpO1xuICAgIH0sXG5cbiAgICBvblJlc3VsdFNoYXJlKCkge1xuICAgICAgICBsZXQgdGV4dCA9IGDlrp3lrp3opoHlk63mmZXlnKjlsbHkuIrkuobvvIzlv6vmnaXluK7luK7lroPvvIFgO1xuICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdGl0bGU6IHRleHQsXG4gICAgICAgICAgICBpbWFnZVVybDogd2luZG93LnRlbXBGaWxlVVJMWzJdLFxuICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PiB7XG5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGF0ZTogbXNnID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8vIG9uRW5hYmxlKCl7XG5cbiAgICAvLyB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
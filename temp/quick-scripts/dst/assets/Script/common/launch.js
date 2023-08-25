
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/launch.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '258ccpxWURAypXp2UAOUMHy', 'launch');
// Script/common/launch.js

"use strict";

// import Data from './Common_Data';
var ShareSdk = require("ShareSdk");

var Utils = require("Utils");

var RankList = require('RankList');

cc.Class({
  "extends": cc.Component,
  properties: {
    m_sp_rank_mask: cc.Node,
    display: cc.Sprite,
    //刷新排行榜显示的sprite
    rankCloseBtn: cc.Node,
    //返回主视图按钮
    playGameBtn: cc.Node,
    //开始游戏按钮
    groudGameBtn: cc.Node //查看群排行按钮

  },
  start: function start() {
    // this.isGroudBtn = true;
    this.tex = new cc.Texture2D();
    this.display.node.active = false;
    this.m_sp_rank_mask.active = false;
    this.isShow = false;
    EVENT_LISTENER.on(window.GAME_RANK_LISTENER, this.rankUpdate, this);
    this.isshowtrue = true;
    this.rankUpdate();
  },
  onEnable: function onEnable() {
    this.rankUpdate();
  },
  onDisable: function onDisable() {
    window.SHOW_RES = null;
  },
  onDestroy: function onDestroy() {
    EVENT_LISTENER.off(window.GAME_RANK_LISTENER, this);
  },
  rankUpdate: function rankUpdate() {
    if (window.SHOW_RES && window.SHOW_RES.query.group) {
      this.ShowGroudRankClick({
        query: window.SHOW_RES.query,
        shareTicket: window.SHOW_RES.shareTicket
      });
      if (this.isshowtrue) window.SHOW_RES = null;
    }
  },
  //查看好友排行按键事件
  onClick: function onClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.rankCloseBtn.active = true;
    this.groudGameBtn.active = true;
    this.isShow = true;
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(false); // console.log("点击，发消息给子域");

    this.display.node.active = this.isShow;
    this.m_sp_rank_mask.active = this.isShow; // var masScoreStr = window.INIT_GAME_SAVE_DATA.top_level;
    // RankList.setScore(masScoreStr,
    //     (info) => {
    //         console.log("保存游戏信息成功！", info);
    //     },
    //     () => {
    //         console.log("保存游戏信息失败！");
    //     },
    //     (info) => {
    //         console.log("保存游戏信息已完成！", info);
    //     }
    // );

    RankList.showFriendList();
  },
  //查看群排行按键事件
  onGroudBtnClick: function onGroudBtnClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1); // Data.share(EChannelPrefix.grouprank, "group=2");

    ShareSdk.shareAppMessage({
      title: "我已经消灭了N个怪兽了，你呢？快来看看排名",
      imageUrl: window.tempFileURL[1],
      query: "group=2",
      success: function success(res) {},
      fail: function fail(err) {},
      complate: function complate(msg) {}
    });
  },
  //返回主视图事件
  onCloseClick: function onCloseClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    this.isShow = false;
    this.display.node.active = false;
    this.m_sp_rank_mask.active = this.isShow;
    this.playGameBtn.active = false;
    this.groudGameBtn.active = false;
    this.rankCloseBtn.active = false;
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(true);
  },
  //开始游戏按键
  onPlayGameClick: function onPlayGameClick() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1); // console.log("===============onPlayGameClick================");

    this.isShow = false;
    cc.director.loadScene(window.GAME_SCENE_NAME);
  },
  //刷新排行榜显示
  _updaetSubDomainCanvas: function _updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }

    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  },
  update: function update(dt) {
    // this.ShowGroudRankClick();
    if (typeof wx != "undefined") this._updaetSubDomainCanvas();
  },
  ShowGroudRankClick: function ShowGroudRankClick(event) {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    if (window.GAME_MENU) window.GAME_MENU.showAdBanner(false);

    if (event.query && event.shareTicket) {
      // console.log("=============ShowGroudRankClick================");
      // var masScoreStr = window.INIT_GAME_SAVE_DATA.top;
      // RankList.setScore(masScoreStr,
      //     (info) => {
      //         console.log("保存游戏信息成功！", info);
      //     },
      //     () => {
      //         console.log("保存游戏信息失败！");
      //     },
      //     (info) => {
      //         console.log("保存游戏信息已完成！", info);
      //     }
      // );
      RankList.showGroupList(event.shareTicket);
      this.isShow = true;
      this.display.node.active = this.isShow;
      this.m_sp_rank_mask.active = this.isShow;
      this.rankCloseBtn.active = true;
      this.playGameBtn.active = false;
      this.groudGameBtn.active = false;
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXGxhdW5jaC5qcyJdLCJuYW1lcyI6WyJTaGFyZVNkayIsInJlcXVpcmUiLCJVdGlscyIsIlJhbmtMaXN0IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX3NwX3JhbmtfbWFzayIsIk5vZGUiLCJkaXNwbGF5IiwiU3ByaXRlIiwicmFua0Nsb3NlQnRuIiwicGxheUdhbWVCdG4iLCJncm91ZEdhbWVCdG4iLCJzdGFydCIsInRleCIsIlRleHR1cmUyRCIsIm5vZGUiLCJhY3RpdmUiLCJpc1Nob3ciLCJFVkVOVF9MSVNURU5FUiIsIm9uIiwid2luZG93IiwiR0FNRV9SQU5LX0xJU1RFTkVSIiwicmFua1VwZGF0ZSIsImlzc2hvd3RydWUiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsIlNIT1dfUkVTIiwib25EZXN0cm95Iiwib2ZmIiwicXVlcnkiLCJncm91cCIsIlNob3dHcm91ZFJhbmtDbGljayIsInNoYXJlVGlja2V0Iiwib25DbGljayIsIlNldFNvdW5kRWZmZWN0IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiR0FNRV9NRU5VIiwic2hvd0FkQmFubmVyIiwic2hvd0ZyaWVuZExpc3QiLCJvbkdyb3VkQnRuQ2xpY2siLCJzaGFyZUFwcE1lc3NhZ2UiLCJ0aXRsZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImVyciIsImNvbXBsYXRlIiwibXNnIiwib25DbG9zZUNsaWNrIiwib25QbGF5R2FtZUNsaWNrIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJHQU1FX1NDRU5FX05BTUUiLCJfdXBkYWV0U3ViRG9tYWluQ2FudmFzIiwiaW5pdFdpdGhFbGVtZW50Iiwic2hhcmVkQ2FudmFzIiwiaGFuZGxlTG9hZGVkVGV4dHVyZSIsInNwcml0ZUZyYW1lIiwiU3ByaXRlRnJhbWUiLCJ1cGRhdGUiLCJkdCIsInd4IiwiZXZlbnQiLCJzaG93R3JvdXBMaXN0Il0s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QUFzQztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBaEMsTUFBQUEsUUFBUSxDQUFDaUUsYUFBVCxDQUF1QkQsS0FBSyxDQUFDaEMsV0FBN0I7QUFDQSxXQUFLZixNQUFMLEdBQWMsSUFBZDtBQUNBLFdBQUtWLE9BQUwsQ0FBYVEsSUFBYixDQUFrQkMsTUFBbEIsR0FBMkIsS0FBS0MsTUFBaEM7QUFDQSxXQUFLWixjQUFMLENBQW9CVyxNQUFwQixHQUE2QixLQUFLQyxNQUFsQztBQUNBLFdBQUtSLFlBQUwsQ0FBa0JPLE1BQWxCLEdBQTJCLElBQTNCO0FBQ0EsV0FBS04sV0FBTCxDQUFpQk0sTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxXQUFLTCxZQUFMLENBQWtCSyxNQUFsQixHQUEyQixLQUEzQjtBQUNIO0FBQ0o7QUF0SkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IERhdGEgZnJvbSAnLi9Db21tb25fRGF0YSc7XG52YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG52YXIgUmFua0xpc3QgPSByZXF1aXJlKCdSYW5rTGlzdCcpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9zcF9yYW5rX21hc2s6IGNjLk5vZGUsXG4gICAgICAgIGRpc3BsYXk6IGNjLlNwcml0ZSwgICAgICAgIC8v5Yi35paw5o6S6KGM5qac5pi+56S655qEc3ByaXRlXG4gICAgICAgIHJhbmtDbG9zZUJ0bjogY2MuTm9kZSwgICAgIC8v6L+U5Zue5Li76KeG5Zu+5oyJ6ZKuXG4gICAgICAgIHBsYXlHYW1lQnRuOiBjYy5Ob2RlLCAgICAgIC8v5byA5aeL5ri45oiP5oyJ6ZKuXG4gICAgICAgIGdyb3VkR2FtZUJ0bjogY2MuTm9kZSwgICAgIC8v5p+l55yL576k5o6S6KGM5oyJ6ZKuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvLyB0aGlzLmlzR3JvdWRCdG4gPSB0cnVlO1xuXG4gICAgICAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX3NwX3JhbmtfbWFzay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfUkFOS19MSVNURU5FUiwgdGhpcy5yYW5rVXBkYXRlLCB0aGlzKTtcbiAgICAgICAgdGhpcy5pc3Nob3d0cnVlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yYW5rVXBkYXRlKCk7XG4gICAgfSxcblxuICAgIG9uRW5hYmxlKCkge1xuICAgICAgICB0aGlzLnJhbmtVcGRhdGUoKTtcbiAgICB9LFxuXG5cbiAgICBvbkRpc2FibGUoKSB7XG4gICAgICAgIHdpbmRvdy5TSE9XX1JFUyA9IG51bGw7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub2ZmKHdpbmRvdy5HQU1FX1JBTktfTElTVEVORVIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICByYW5rVXBkYXRlKCkge1xuICAgICAgICBpZiAod2luZG93LlNIT1dfUkVTICYmIHdpbmRvdy5TSE9XX1JFUy5xdWVyeS5ncm91cCkge1xuICAgICAgICAgICAgdGhpcy5TaG93R3JvdWRSYW5rQ2xpY2soeyBxdWVyeTogd2luZG93LlNIT1dfUkVTLnF1ZXJ5LCBzaGFyZVRpY2tldDogd2luZG93LlNIT1dfUkVTLnNoYXJlVGlja2V0IH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNzaG93dHJ1ZSlcbiAgICAgICAgICAgICAgICB3aW5kb3cuU0hPV19SRVMgPSBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5p+l55yL5aW95Y+L5o6S6KGM5oyJ6ZSu5LqL5Lu2XG4gICAgb25DbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmdyb3VkR2FtZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAgIGlmKHdpbmRvdy5HQU1FX01FTlUpIHdpbmRvdy5HQU1FX01FTlUuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCLngrnlh7vvvIzlj5Hmtojmga/nu5nlrZDln59cIik7XG4gICAgICAgIHRoaXMuZGlzcGxheS5ub2RlLmFjdGl2ZSA9IHRoaXMuaXNTaG93O1xuICAgICAgICB0aGlzLm1fc3BfcmFua19tYXNrLmFjdGl2ZSA9IHRoaXMuaXNTaG93O1xuICAgICAgICAvLyB2YXIgbWFzU2NvcmVTdHIgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWw7XG4gICAgICAgIC8vIFJhbmtMaXN0LnNldFNjb3JlKG1hc1Njb3JlU3RyLFxuICAgICAgICAvLyAgICAgKGluZm8pID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+aIkOWKn++8gVwiLCBpbmZvKTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICAoKSA9PiB7XG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLkv53lrZjmuLjmiI/kv6Hmga/lpLHotKXvvIFcIik7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgKGluZm8pID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+W3suWujOaIkO+8gVwiLCBpbmZvKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gKTtcblxuICAgICAgICBSYW5rTGlzdC5zaG93RnJpZW5kTGlzdCgpO1xuICAgIH0sXG4gICAgLy/mn6XnnIvnvqTmjpLooYzmjInplK7kuovku7ZcbiAgICBvbkdyb3VkQnRuQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgLy8gRGF0YS5zaGFyZShFQ2hhbm5lbFByZWZpeC5ncm91cHJhbmssIFwiZ3JvdXA9MlwiKTtcbiAgICAgICAgU2hhcmVTZGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIuaIkeW3sue7j+a2iOeBreS6hk7kuKrmgKrlhb3kuobvvIzkvaDlkaLvvJ/lv6vmnaXnnIvnnIvmjpLlkI1cIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgICAgICBxdWVyeTogXCJncm91cD0yXCIsXG4gICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsYXRlOiBtc2cgPT4ge1xuXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy/ov5Tlm57kuLvop4blm77kuovku7ZcbiAgICBvbkNsb3NlQ2xpY2soKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgdGhpcy5pc1Nob3cgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNwbGF5Lm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9yYW5rX21hc2suYWN0aXZlID0gdGhpcy5pc1Nob3c7XG4gICAgICAgIHRoaXMucGxheUdhbWVCdG4uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ3JvdWRHYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYod2luZG93LkdBTUVfTUVOVSkgd2luZG93LkdBTUVfTUVOVS5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgfSxcbiAgICAvL+W8gOWni+a4uOaIj+aMiemUrlxuICAgIG9uUGxheUdhbWVDbGljaygpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PT09PT09PT09PW9uUGxheUdhbWVDbGljaz09PT09PT09PT09PT09PT1cIik7XG4gICAgICAgIHRoaXMuaXNTaG93ID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuR0FNRV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuICAgIC8v5Yi35paw5o6S6KGM5qac5pi+56S6XG4gICAgX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4LmluaXRXaXRoRWxlbWVudChzaGFyZWRDYW52YXMpO1xuICAgICAgICB0aGlzLnRleC5oYW5kbGVMb2FkZWRUZXh0dXJlKCk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5zcHJpdGVGcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0aGlzLnRleCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZShkdCkge1xuICAgICAgICAvLyB0aGlzLlNob3dHcm91ZFJhbmtDbGljaygpO1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpO1xuICAgIH0sXG5cblxuICAgIFNob3dHcm91ZFJhbmtDbGljayhldmVudCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmKHdpbmRvdy5HQU1FX01FTlUpIHdpbmRvdy5HQU1FX01FTlUuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgaWYgKGV2ZW50LnF1ZXJ5ICYmIGV2ZW50LnNoYXJlVGlja2V0KSB7XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT09PT09PVNob3dHcm91ZFJhbmtDbGljaz09PT09PT09PT09PT09PT1cIik7XG4gICAgICAgICAgICAvLyB2YXIgbWFzU2NvcmVTdHIgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3A7XG4gICAgICAgICAgICAvLyBSYW5rTGlzdC5zZXRTY29yZShtYXNTY29yZVN0cixcbiAgICAgICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+aIkOWKn++8gVwiLCBpbmZvKTtcbiAgICAgICAgICAgIC8vICAgICB9LFxuICAgICAgICAgICAgLy8gICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCLkv53lrZjmuLjmiI/kv6Hmga/lpLHotKXvvIFcIik7XG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+W3suWujOaIkO+8gVwiLCBpbmZvKTtcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyApO1xuICAgICAgICAgICAgUmFua0xpc3Quc2hvd0dyb3VwTGlzdChldmVudC5zaGFyZVRpY2tldCk7XG4gICAgICAgICAgICB0aGlzLmlzU2hvdyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSB0aGlzLmlzU2hvdztcbiAgICAgICAgICAgIHRoaXMubV9zcF9yYW5rX21hc2suYWN0aXZlID0gdGhpcy5pc1Nob3c7XG4gICAgICAgICAgICB0aGlzLnJhbmtDbG9zZUJ0bi5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5wbGF5R2FtZUJ0bi5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZ3JvdWRHYW1lQnRuLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxufSk7Il19
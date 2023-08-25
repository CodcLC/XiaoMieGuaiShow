"use strict";
cc._RF.push(module, '167feF+j91EO55DYgd2LPJO', 'GameEndRank');
// Script/common/GameEndRank.js

"use strict";

var RankList = require('RankList');

cc.Class({
  "extends": cc.Component,
  properties: {
    display: cc.Sprite
  },
  start: function start() {
    this.tex = new cc.Texture2D(); // var masScoreStr = window.INIT_GAME_SAVE_DATA.top_score;
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
  },
  _updaetSubDomainCanvas: function _updaetSubDomainCanvas() {
    if (!this.tex) {
      return;
    }

    this.tex.initWithElement(sharedCanvas);
    this.tex.handleLoadedTexture();
    this.display.spriteFrame = new cc.SpriteFrame(this.tex);
  },
  update: function update() {
    if (typeof wx != "undefined") this._updaetSubDomainCanvas();
  }
});

cc._RF.pop();
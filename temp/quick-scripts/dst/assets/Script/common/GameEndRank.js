
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/GameEndRank.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXEdhbWVFbmRSYW5rLmpzIl0sIm5hbWVzIjpbIlJhbmtMaXN0IiwicmVxdWlyZSIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiZGlzcGxheSIsIlNwcml0ZSIsInN0YXJ0IiwidGV4IiwiVGV4dHVyZTJEIiwiX3VwZGFldFN1YkRvbWFpbkNhbnZhcyIsImluaXRXaXRoRWxlbWVudCIsInNoYXJlZENhbnZhcyIsImhhbmRsZUxvYWRlZFRleHR1cmUiLCJzcHJpdGVGcmFtZSIsIlNwcml0ZUZyYW1lIiwidXBkYXRlIiwid3giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsUUFBUSxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLE9BQU8sRUFBRUosRUFBRSxDQUFDSztBQURKLEdBSFA7QUFPTEMsRUFBQUEsS0FQSyxtQkFPRztBQUVKLFNBQUtDLEdBQUwsR0FBVyxJQUFJUCxFQUFFLENBQUNRLFNBQVAsRUFBWCxDQUZJLENBR0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0F0Qkk7QUF3QkxDLEVBQUFBLHNCQXhCSyxvQ0F3Qm9CO0FBQ3JCLFFBQUksQ0FBQyxLQUFLRixHQUFWLEVBQWU7QUFDWDtBQUNIOztBQUNELFNBQUtBLEdBQUwsQ0FBU0csZUFBVCxDQUF5QkMsWUFBekI7QUFDQSxTQUFLSixHQUFMLENBQVNLLG1CQUFUO0FBQ0EsU0FBS1IsT0FBTCxDQUFhUyxXQUFiLEdBQTJCLElBQUliLEVBQUUsQ0FBQ2MsV0FBUCxDQUFtQixLQUFLUCxHQUF4QixDQUEzQjtBQUNILEdBL0JJO0FBaUNMUSxFQUFBQSxNQWpDSyxvQkFpQ0k7QUFDTCxRQUFJLE9BQVFDLEVBQVIsSUFBZSxXQUFuQixFQUNJLEtBQUtQLHNCQUFMO0FBRVA7QUFyQ0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJhbmtMaXN0ID0gcmVxdWlyZSgnUmFua0xpc3QnKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGRpc3BsYXk6IGNjLlNwcml0ZSxcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy50ZXggPSBuZXcgY2MuVGV4dHVyZTJEKCk7XG4gICAgICAgIC8vIHZhciBtYXNTY29yZVN0ciA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZTtcbiAgICAgICAgLy8gUmFua0xpc3Quc2V0U2NvcmUobWFzU2NvcmVTdHIsXG4gICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2Y5ri45oiP5L+h5oGv5oiQ5Yqf77yBXCIsIGluZm8pO1xuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgICgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIuS/neWtmOa4uOaIj+S/oeaBr+Wksei0pe+8gVwiKTtcbiAgICAgICAgLy8gICAgIH0sXG4gICAgICAgIC8vICAgICAoaW5mbykgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwi5L+d5a2Y5ri45oiP5L+h5oGv5bey5a6M5oiQ77yBXCIsIGluZm8pO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyApO1xuICAgIH0sXG5cbiAgICBfdXBkYWV0U3ViRG9tYWluQ2FudmFzKCkge1xuICAgICAgICBpZiAoIXRoaXMudGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXguaW5pdFdpdGhFbGVtZW50KHNoYXJlZENhbnZhcyk7XG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICAgIHRoaXMuX3VwZGFldFN1YkRvbWFpbkNhbnZhcygpO1xuXG4gICAgfVxuXG59KTtcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/RockItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80ebb/V4PBKUao1TiZ5JV+M', 'RockItem');
// Script/item/RockItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_partice: cc.ParticleSystem
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  resetSytem: function resetSytem() {
    this.m_partice.resetSystem();
  } // update (dt) {},

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxSb2NrSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fcGFydGljZSIsIlBhcnRpY2xlU3lzdGVtIiwic3RhcnQiLCJyZXNldFN5dGVtIiwicmVzZXRTeXN0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUVKLEVBQUUsQ0FBQ0s7QUFETixHQUhQO0FBT0w7QUFFQTtBQUVBQyxFQUFBQSxLQVhLLG1CQVdJLENBRVIsQ0FiSTtBQWVMQyxFQUFBQSxVQWZLLHdCQWVPO0FBQ1IsU0FBS0gsU0FBTCxDQUFlSSxXQUFmO0FBQ0gsR0FqQkksQ0FrQkw7O0FBbEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbV9wYXJ0aWNlOiBjYy5QYXJ0aWNsZVN5c3RlbSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9LFxuXG4gICAgcmVzZXRTeXRlbSgpe1xuICAgICAgICB0aGlzLm1fcGFydGljZS5yZXNldFN5c3RlbSgpO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
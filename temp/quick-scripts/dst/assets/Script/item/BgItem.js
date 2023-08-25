
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BgItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '36677ltfcNFbZGeI09kkTxO', 'BgItem');
// Script/item/BgItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_bgday: cc.Node,
    m_n_bgnight: cc.Node
  },
  start: function start() {
    var myDate = new Date(); //获取系统当前时间

    var hours = myDate.getHours();
    this.m_n_bgday.active = hours >= 8 && hours <= 18;
    this.m_n_bgnight.active = hours < 8 || hours > 18;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxCZ0l0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX25fYmdkYXkiLCJOb2RlIiwibV9uX2JnbmlnaHQiLCJzdGFydCIsIm15RGF0ZSIsIkRhdGUiLCJob3VycyIsImdldEhvdXJzIiwiYWN0aXZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFFSixFQUFFLENBQUNLLElBRE47QUFFUkMsSUFBQUEsV0FBVyxFQUFFTixFQUFFLENBQUNLO0FBRlIsR0FIUDtBQVNMRSxFQUFBQSxLQVRLLG1CQVNHO0FBQ0osUUFBSUMsTUFBTSxHQUFHLElBQUlDLElBQUosRUFBYixDQURJLENBQ29COztBQUN4QixRQUFJQyxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0csUUFBUCxFQUFaO0FBQ0EsU0FBS1AsU0FBTCxDQUFlUSxNQUFmLEdBQXdCRixLQUFLLElBQUksQ0FBVCxJQUFjQSxLQUFLLElBQUksRUFBL0M7QUFDQSxTQUFLSixXQUFMLENBQWlCTSxNQUFqQixHQUEwQkYsS0FBSyxHQUFHLENBQVIsSUFBYUEsS0FBSyxHQUFHLEVBQS9DO0FBQ0gsR0FkSSxDQWdCTDs7QUFoQkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtX25fYmdkYXk6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9iZ25pZ2h0OiBjYy5Ob2RlLFxuICAgIH0sXG5cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgbXlEYXRlID0gbmV3IERhdGUoKTsvL+iOt+WPluezu+e7n+W9k+WJjeaXtumXtFxuICAgICAgICBsZXQgaG91cnMgPSBteURhdGUuZ2V0SG91cnMoKTtcbiAgICAgICAgdGhpcy5tX25fYmdkYXkuYWN0aXZlID0gaG91cnMgPj0gOCAmJiBob3VycyA8PSAxODtcbiAgICAgICAgdGhpcy5tX25fYmduaWdodC5hY3RpdmUgPSBob3VycyA8IDggfHwgaG91cnMgPiAxODtcbiAgICB9LFxuXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
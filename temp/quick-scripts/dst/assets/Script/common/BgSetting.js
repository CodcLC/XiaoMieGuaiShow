
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/BgSetting.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '49ca5JK7uVAzoTD1isE+1TU', 'BgSetting');
// Script/common/BgSetting.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  start: function start() {
    var size = cc.winSize;
    var content = this.node.getContentSize();
    this.node.scaleX = size.width / content.width;
    this.node.scaleY = size.height / content.height; // this.node.position = cc.v2(0,0);

    window.adapt_scaleX = this.node.scaleX;
    window.adapt_scaleY = this.node.scaleY;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXEJnU2V0dGluZy5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsInN0YXJ0Iiwic2l6ZSIsIndpblNpemUiLCJjb250ZW50Iiwibm9kZSIsImdldENvbnRlbnRTaXplIiwic2NhbGVYIiwid2lkdGgiLCJzY2FsZVkiLCJoZWlnaHQiLCJ3aW5kb3ciLCJhZGFwdF9zY2FsZVgiLCJhZGFwdF9zY2FsZVkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBTUxDLEVBQUFBLEtBTkssbUJBTUU7QUFDSCxRQUFJQyxJQUFJLEdBQUdMLEVBQUUsQ0FBQ00sT0FBZDtBQUNBLFFBQUlDLE9BQU8sR0FBRyxLQUFLQyxJQUFMLENBQVVDLGNBQVYsRUFBZDtBQUNBLFNBQUtELElBQUwsQ0FBVUUsTUFBVixHQUFtQkwsSUFBSSxDQUFDTSxLQUFMLEdBQWFKLE9BQU8sQ0FBQ0ksS0FBeEM7QUFDQSxTQUFLSCxJQUFMLENBQVVJLE1BQVYsR0FBbUJQLElBQUksQ0FBQ1EsTUFBTCxHQUFjTixPQUFPLENBQUNNLE1BQXpDLENBSkcsQ0FLSDs7QUFDQUMsSUFBQUEsTUFBTSxDQUFDQyxZQUFQLEdBQXNCLEtBQUtQLElBQUwsQ0FBVUUsTUFBaEM7QUFDQUksSUFBQUEsTUFBTSxDQUFDRSxZQUFQLEdBQXNCLEtBQUtSLElBQUwsQ0FBVUksTUFBaEM7QUFDSDtBQWRJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICB9LFxuXG4gICAgc3RhcnQoKXtcbiAgICAgICAgbGV0IHNpemUgPSBjYy53aW5TaXplXG4gICAgICAgIGxldCBjb250ZW50ID0gdGhpcy5ub2RlLmdldENvbnRlbnRTaXplKCk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBzaXplLndpZHRoIC8gY29udGVudC53aWR0aDtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHNpemUuaGVpZ2h0IC8gY29udGVudC5oZWlnaHQ7XG4gICAgICAgIC8vIHRoaXMubm9kZS5wb3NpdGlvbiA9IGNjLnYyKDAsMCk7XG4gICAgICAgIHdpbmRvdy5hZGFwdF9zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xuICAgICAgICB3aW5kb3cuYWRhcHRfc2NhbGVZID0gdGhpcy5ub2RlLnNjYWxlWTtcbiAgICB9LFxufSk7XG4iXX0=
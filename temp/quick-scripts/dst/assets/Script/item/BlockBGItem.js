
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BlockBGItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1f50fDEmn1NhKZ+3jOght5I', 'BlockBGItem');
// Script/item/BlockBGItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_bright: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  setBrightVisible: function setBrightVisible(boo, color) {
    this.m_n_bright.active = boo;

    if (color) {
      this.m_n_bright.color = cc.Color.WHITE.fromHEX(color);
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxCbG9ja0JHSXRlbS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fbl9icmlnaHQiLCJOb2RlIiwib25Mb2FkIiwic3RhcnQiLCJzZXRCcmlnaHRWaXNpYmxlIiwiYm9vIiwiY29sb3IiLCJhY3RpdmUiLCJDb2xvciIsIldISVRFIiwiZnJvbUhFWCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBRVJDLElBQUFBLFVBQVUsRUFBRUosRUFBRSxDQUFDSztBQUZQLEdBSFA7QUFRTDtBQUVBQyxFQUFBQSxNQVZLLG9CQVVJLENBRVIsQ0FaSTtBQWNMQyxFQUFBQSxLQWRLLG1CQWNHLENBRVAsQ0FoQkk7QUFrQkxDLEVBQUFBLGdCQWxCSyw0QkFrQllDLEdBbEJaLEVBa0JpQkMsS0FsQmpCLEVBa0J3QjtBQUN6QixTQUFLTixVQUFMLENBQWdCTyxNQUFoQixHQUF5QkYsR0FBekI7O0FBQ0EsUUFBR0MsS0FBSCxFQUFTO0FBQ0wsV0FBS04sVUFBTCxDQUFnQk0sS0FBaEIsR0FBd0JWLEVBQUUsQ0FBQ1ksS0FBSCxDQUFTQyxLQUFULENBQWVDLE9BQWYsQ0FBdUJKLEtBQXZCLENBQXhCO0FBQ0g7QUFDSixHQXZCSSxDQXdCTDs7QUF4QkssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIG1fbl9icmlnaHQ6IGNjLk5vZGUsXG4gICAgfSxcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuXG4gICAgfSxcblxuICAgIHN0YXJ0KCkge1xuXG4gICAgfSxcblxuICAgIHNldEJyaWdodFZpc2libGUoYm9vLCBjb2xvcikge1xuICAgICAgICB0aGlzLm1fbl9icmlnaHQuYWN0aXZlID0gYm9vO1xuICAgICAgICBpZihjb2xvcil7XG4gICAgICAgICAgICB0aGlzLm1fbl9icmlnaHQuY29sb3IgPSBjYy5Db2xvci5XSElURS5mcm9tSEVYKGNvbG9yKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
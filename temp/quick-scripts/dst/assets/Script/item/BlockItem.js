
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BlockItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e7b1eTTmSVB34RRUkqvGDNv', 'BlockItem');
// Script/item/BlockItem.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
cc.Class({
  "extends": cc.Component,
  properties: {
    _hp: 0,
    _type: 0,
    _tag: 0,
    m_sp_strong: cc.Node,
    m_sp_hurt: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  initType: function initType(type, tag) {
    this._type = type;
    this._tag = tag;

    if (window.BLOCKLIST[type][tag]) {
      this._hp = window.BLOCKLIST[type][tag].hp;
    }

    this.node.scale = 1;
    this.node.opacity = 255;
    this._tostrong = false;
    this.m_sp_strong.active = false;
    this.m_sp_hurt.active = false;
  },
  showHurt: function showHurt(hurt) {
    if (this._type == 1) {
      this.m_sp_hurt.active = true;
      this.m_sp_hurt.getComponent(cc.Sprite).spriteFrame = hurt;
    }
  },
  setSpriteFrame: function setSpriteFrame(sf) {
    this.node.getComponent(cc.Sprite).spriteFrame = sf;
  },
  getHp: function getHp() {
    return this._hp;
  },
  getTag: function getTag() {
    return this._tag;
  },
  addStrong: function addStrong() {
    var _this = this;

    if (this._tostrong) return false;
    this._tostrong = true;
    this._hp = this._hp + this._hp;
    this.m_sp_strong.scale = 0;
    this.m_sp_strong.active = true;
    this.m_sp_strong.stopAllActions();
    this.m_sp_strong.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1).easing(cc.easeIn(2.0)), cc.callFunc(function () {
      _this.m_sp_strong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1.0, 1.0))));
    })));
    return true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxCbG9ja0l0ZW0uanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJfaHAiLCJfdHlwZSIsIl90YWciLCJtX3NwX3N0cm9uZyIsIk5vZGUiLCJtX3NwX2h1cnQiLCJvbkxvYWQiLCJzdGFydCIsImluaXRUeXBlIiwidHlwZSIsInRhZyIsIndpbmRvdyIsIkJMT0NLTElTVCIsImhwIiwibm9kZSIsInNjYWxlIiwib3BhY2l0eSIsIl90b3N0cm9uZyIsImFjdGl2ZSIsInNob3dIdXJ0IiwiaHVydCIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsInNwcml0ZUZyYW1lIiwic2V0U3ByaXRlRnJhbWUiLCJzZiIsImdldEhwIiwiZ2V0VGFnIiwiYWRkU3Ryb25nIiwic3RvcEFsbEFjdGlvbnMiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInNjYWxlVG8iLCJlYXNpbmciLCJlYXNlSW4iLCJjYWxsRnVuYyIsInJlcGVhdEZvcmV2ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxHQUFHLEVBQUUsQ0FERztBQUVSQyxJQUFBQSxLQUFLLEVBQUUsQ0FGQztBQUdSQyxJQUFBQSxJQUFJLEVBQUUsQ0FIRTtBQUlSQyxJQUFBQSxXQUFXLEVBQUVQLEVBQUUsQ0FBQ1EsSUFKUjtBQUtSQyxJQUFBQSxTQUFTLEVBQUVULEVBQUUsQ0FBQ1E7QUFMTixHQUhQO0FBV0w7QUFFQUUsRUFBQUEsTUFiSyxvQkFhSSxDQUVSLENBZkk7QUFpQkxDLEVBQUFBLEtBakJLLG1CQWlCRyxDQUVQLENBbkJJO0FBcUJMQyxFQUFBQSxRQXJCSyxvQkFxQklDLElBckJKLEVBcUJVQyxHQXJCVixFQXFCZTtBQUNoQixTQUFLVCxLQUFMLEdBQWFRLElBQWI7QUFDQSxTQUFLUCxJQUFMLEdBQVlRLEdBQVo7O0FBQ0EsUUFBSUMsTUFBTSxDQUFDQyxTQUFQLENBQWlCSCxJQUFqQixFQUF1QkMsR0FBdkIsQ0FBSixFQUFpQztBQUM3QixXQUFLVixHQUFMLEdBQVdXLE1BQU0sQ0FBQ0MsU0FBUCxDQUFpQkgsSUFBakIsRUFBdUJDLEdBQXZCLEVBQTRCRyxFQUF2QztBQUNIOztBQUNELFNBQUtDLElBQUwsQ0FBVUMsS0FBVixHQUFrQixDQUFsQjtBQUNBLFNBQUtELElBQUwsQ0FBVUUsT0FBVixHQUFvQixHQUFwQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxTQUFLZCxXQUFMLENBQWlCZSxNQUFqQixHQUEwQixLQUExQjtBQUNBLFNBQUtiLFNBQUwsQ0FBZWEsTUFBZixHQUF3QixLQUF4QjtBQUNILEdBaENJO0FBa0NMQyxFQUFBQSxRQWxDSyxvQkFrQ0lDLElBbENKLEVBa0NVO0FBQ1gsUUFBSSxLQUFLbkIsS0FBTCxJQUFjLENBQWxCLEVBQXFCO0FBQ2pCLFdBQUtJLFNBQUwsQ0FBZWEsTUFBZixHQUF3QixJQUF4QjtBQUNBLFdBQUtiLFNBQUwsQ0FBZWdCLFlBQWYsQ0FBNEJ6QixFQUFFLENBQUMwQixNQUEvQixFQUF1Q0MsV0FBdkMsR0FBcURILElBQXJEO0FBQ0g7QUFDSixHQXZDSTtBQXlDTEksRUFBQUEsY0F6Q0ssMEJBeUNVQyxFQXpDVixFQXlDYztBQUNmLFNBQUtYLElBQUwsQ0FBVU8sWUFBVixDQUF1QnpCLEVBQUUsQ0FBQzBCLE1BQTFCLEVBQWtDQyxXQUFsQyxHQUFnREUsRUFBaEQ7QUFDSCxHQTNDSTtBQTZDTEMsRUFBQUEsS0E3Q0ssbUJBNkNHO0FBQ0osV0FBTyxLQUFLMUIsR0FBWjtBQUNILEdBL0NJO0FBaURMMkIsRUFBQUEsTUFqREssb0JBaURJO0FBQ0wsV0FBTyxLQUFLekIsSUFBWjtBQUNILEdBbkRJO0FBcURMMEIsRUFBQUEsU0FyREssdUJBcURPO0FBQUE7O0FBQ1IsUUFBSSxLQUFLWCxTQUFULEVBQW9CLE9BQU8sS0FBUDtBQUNwQixTQUFLQSxTQUFMLEdBQWlCLElBQWpCO0FBQ0EsU0FBS2pCLEdBQUwsR0FBVyxLQUFLQSxHQUFMLEdBQVcsS0FBS0EsR0FBM0I7QUFDQSxTQUFLRyxXQUFMLENBQWlCWSxLQUFqQixHQUF5QixDQUF6QjtBQUNBLFNBQUtaLFdBQUwsQ0FBaUJlLE1BQWpCLEdBQTBCLElBQTFCO0FBQ0EsU0FBS2YsV0FBTCxDQUFpQjBCLGNBQWpCO0FBQ0EsU0FBSzFCLFdBQUwsQ0FBaUIyQixTQUFqQixDQUEyQmxDLEVBQUUsQ0FBQ21DLFFBQUgsQ0FBWW5DLEVBQUUsQ0FBQ29DLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCQyxNQUF0QixDQUE2QnJDLEVBQUUsQ0FBQ3NDLE1BQUgsQ0FBVSxHQUFWLENBQTdCLENBQVosRUFBMER0QyxFQUFFLENBQUN1QyxRQUFILENBQVksWUFBTTtBQUNuRyxNQUFBLEtBQUksQ0FBQ2hDLFdBQUwsQ0FBaUIyQixTQUFqQixDQUEyQmxDLEVBQUUsQ0FBQ3dDLGFBQUgsQ0FBaUJ4QyxFQUFFLENBQUNtQyxRQUFILENBQVluQyxFQUFFLENBQUNvQyxPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixDQUFaLEVBQXVDcEMsRUFBRSxDQUFDb0MsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsQ0FBdkMsQ0FBakIsQ0FBM0I7QUFDSCxLQUZvRixDQUExRCxDQUEzQjtBQUdBLFdBQU8sSUFBUDtBQUNILEdBaEVJLENBaUVMOztBQWpFSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBfaHA6IDAsXG4gICAgICAgIF90eXBlOiAwLFxuICAgICAgICBfdGFnOiAwLFxuICAgICAgICBtX3NwX3N0cm9uZzogY2MuTm9kZSxcbiAgICAgICAgbV9zcF9odXJ0OiBjYy5Ob2RlLFxuICAgIH0sXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCgpIHtcblxuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcblxuICAgIH0sXG5cbiAgICBpbml0VHlwZSh0eXBlLCB0YWcpIHtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3RhZyA9IHRhZztcbiAgICAgICAgaWYgKHdpbmRvdy5CTE9DS0xJU1RbdHlwZV1bdGFnXSkge1xuICAgICAgICAgICAgdGhpcy5faHAgPSB3aW5kb3cuQkxPQ0tMSVNUW3R5cGVdW3RhZ10uaHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIHRoaXMuX3Rvc3Ryb25nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9zcF9odXJ0LmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93SHVydChodXJ0KSB7XG4gICAgICAgIGlmICh0aGlzLl90eXBlID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9odXJ0LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fc3BfaHVydC5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IGh1cnQ7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3ByaXRlRnJhbWUoc2YpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc2Y7XG4gICAgfSxcblxuICAgIGdldEhwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfSxcblxuICAgIGdldFRhZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZztcbiAgICB9LFxuXG4gICAgYWRkU3Ryb25nKCkge1xuICAgICAgICBpZiAodGhpcy5fdG9zdHJvbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5fdG9zdHJvbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLl9ocCA9IHRoaXMuX2hwICsgdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuc2NhbGUgPSAwO1xuICAgICAgICB0aGlzLm1fc3Bfc3Ryb25nLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9zcF9zdHJvbmcuc3RvcEFsbEFjdGlvbnMoKTtcbiAgICAgICAgdGhpcy5tX3NwX3N0cm9uZy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDEsIDEpLmVhc2luZyhjYy5lYXNlSW4oMi4wKSksIGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdHJvbmcucnVuQWN0aW9uKGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjUsIDAuOSwgMC45KSwgY2Muc2NhbGVUbygwLjUsIDEuMCwgMS4wKSkpKTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcbn0pO1xuIl19
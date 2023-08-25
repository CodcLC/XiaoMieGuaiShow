
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/SkinPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d7b7KFR5ZEOL77nMnw9U+A', 'SkinPanel');
// Script/item/SkinPanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinPanel = /** @class */ (function (_super) {
    __extends(SkinPanel, _super);
    function SkinPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_content = null;
        _this.m_pre_skinitem = null;
        _this["m_star0"] = null;
        _this["m_star1"] = null;
        _this["m_star2"] = null;
        _this["m_star3"] = null;
        _this["m_star4"] = null;
        _this.m_n_list = [];
        return _this;
        // update (dt) {}
    }
    SkinPanel.prototype.start = function () {
        EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateData, this);
    };
    SkinPanel.prototype.initData = function () {
        var data = window.SKIN_CONFIG;
        for (var i = 0; i < data.length; i++) {
            var node = cc.instantiate(this.m_pre_skinitem);
            node.parent = this.m_n_content;
            node.getComponent('SkinItem').updateData(i, data[i], this['m_star' + i]);
            this.m_n_list.push(node);
        }
    };
    SkinPanel.prototype.updateData = function () {
        var data = window.SKIN_CONFIG;
        for (var i = 0; i < data.length; i++) {
            var node = this.m_n_list[i];
            node.getComponent('SkinItem').updateData(i, data[i], this['m_star' + i]);
        }
    };
    SkinPanel.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
    };
    SkinPanel.prototype.onClose = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], SkinPanel.prototype, "m_n_content", void 0);
    __decorate([
        property(cc.Prefab)
    ], SkinPanel.prototype, "m_pre_skinitem", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star0", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], SkinPanel.prototype, "m_star4", void 0);
    SkinPanel = __decorate([
        ccclass
    ], SkinPanel);
    return SkinPanel;
}(cc.Component));
exports.default = SkinPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxTa2luUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSzVDO0lBQXVDLDZCQUFZO0lBQW5EO1FBQUEscUVBbURDO1FBaERHLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRzVCLG9CQUFjLEdBQWMsSUFBSSxDQUFDO1FBR2pDLE1BQUMsU0FBUyxDQUFDLEdBQW1CLElBQUksQ0FBQztRQUVuQyxNQUFDLFNBQVMsQ0FBQyxHQUFtQixJQUFJLENBQUM7UUFFbkMsTUFBQyxTQUFTLENBQUMsR0FBbUIsSUFBSSxDQUFDO1FBRW5DLE1BQUMsU0FBUyxDQUFDLEdBQW1CLElBQUksQ0FBQztRQUVuQyxNQUFDLFNBQVMsQ0FBQyxHQUFtQixJQUFJLENBQUM7UUFFM0IsY0FBUSxHQUFRLEVBQUUsQ0FBQzs7UUErQjNCLGlCQUFpQjtJQUNyQixDQUFDO0lBOUJHLHlCQUFLLEdBQUw7UUFDSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCw0QkFBUSxHQUFSO1FBQ0ksSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDL0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsOEJBQVUsR0FBVjtRQUNJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM1RTtJQUNMLENBQUM7SUFFRCw2QkFBUyxHQUFUO1FBQ0ksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELDJCQUFPLEdBQVA7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQTlDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cURBQ2E7SUFHakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDeEIsU0FBUyxTQUF5QjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUN4QixTQUFTLFNBQXlCO0lBRW5DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7NEJBQ3hCLFNBQVMsU0FBeUI7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzs0QkFDeEIsU0FBUyxTQUF5QjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDOzRCQUN4QixTQUFTLFNBQXlCO0lBakJsQixTQUFTO1FBRDdCLE9BQU87T0FDYSxTQUFTLENBbUQ3QjtJQUFELGdCQUFDO0NBbkRELEFBbURDLENBbkRzQyxFQUFFLENBQUMsU0FBUyxHQW1EbEQ7a0JBbkRvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNraW5QYW5lbCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtX25fY29udGVudDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIG1fcHJlX3NraW5pdGVtOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFtcIm1fc3RhcjBcIl06IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgW1wibV9zdGFyMVwiXTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgICBbXCJtX3N0YXIyXCJdOiBjYy5TcHJpdGVGcmFtZSA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICAgIFtcIm1fc3RhcjNcIl06IGNjLlNwcml0ZUZyYW1lID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gICAgW1wibV9zdGFyNFwiXTogY2MuU3ByaXRlRnJhbWUgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtX25fbGlzdDogYW55ID0gW107XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzLnVwZGF0ZURhdGEsIHRoaXMpO1xuICAgIH1cblxuICAgIGluaXREYXRhKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJRztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfc2tpbml0ZW0pO1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSB0aGlzLm1fbl9jb250ZW50O1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1NraW5JdGVtJykudXBkYXRlRGF0YShpLCBkYXRhW2ldLCB0aGlzWydtX3N0YXInICsgaV0pO1xuICAgICAgICAgICAgdGhpcy5tX25fbGlzdC5wdXNoKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YSgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuU0tJTl9DT05GSUc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLm1fbl9saXN0W2ldO1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoJ1NraW5JdGVtJykudXBkYXRlRGF0YShpLCBkYXRhW2ldLCB0aGlzWydtX3N0YXInICsgaV0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
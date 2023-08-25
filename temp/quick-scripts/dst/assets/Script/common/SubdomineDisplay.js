
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/SubdomineDisplay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '041f3phw99Aorsmk3RdL7bG', 'SubdomineDisplay');
// Script/common/SubdomineDisplay.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SubdomineDisplay = /** @class */ (function (_super) {
    __extends(SubdomineDisplay, _super);
    function SubdomineDisplay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubdomineDisplay.prototype.start = function () {
        this.display = this.node.getComponent(cc.Sprite);
        this.tex = new cc.Texture2D();
        this.display.node.active = true;
        var self = this;
        this.schedule(function () {
            self._updateSubDomainCanvas();
        }, 1);
    };
    SubdomineDisplay.prototype._updateSubDomainCanvas = function () {
        if (!this.node.active)
            return;
        if (typeof (wx) == "undefined")
            return;
        if (!this.tex) {
            return;
        }
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    };
    // update() {
    // }
    SubdomineDisplay.prototype.onDestroy = function () {
        this.unscheduleAllCallbacks();
    };
    SubdomineDisplay = __decorate([
        ccclass
    ], SubdomineDisplay);
    return SubdomineDisplay;
}(cc.Component));
exports.default = SubdomineDisplay;
;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFN1YmRvbWluZURpc3BsYXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNNLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThDLG9DQUFZO0lBQTFEOztJQWlDQSxDQUFDO0lBNUJHLGdDQUFLLEdBQUw7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDVixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUNqQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBRUQsaURBQXNCLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFDOUIsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksV0FBVztZQUMxQixPQUFPO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWCxPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsYUFBYTtJQUViLElBQUk7SUFDSixvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQWhDZ0IsZ0JBQWdCO1FBRHBDLE9BQU87T0FDYSxnQkFBZ0IsQ0FpQ3BDO0lBQUQsdUJBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQzZDLEVBQUUsQ0FBQyxTQUFTLEdBaUN6RDtrQkFqQ29CLGdCQUFnQjtBQWlDcEMsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN1YmRvbWluZURpc3BsYXkgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJpdmF0ZSBkaXNwbGF5OiBjYy5TcHJpdGU7XG4gICAgcHJpdmF0ZSB0ZXg6IGNjLlRleHR1cmUyRDtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLmRpc3BsYXkgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XG4gICAgICAgIHRoaXMudGV4ID0gbmV3IGNjLlRleHR1cmUyRCgpO1xuICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5fdXBkYXRlU3ViRG9tYWluQ2FudmFzKClcbiAgICAgICAgfSwgMSk7XG4gICAgfVxuXG4gICAgX3VwZGF0ZVN1YkRvbWFpbkNhbnZhcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSA9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMudGV4KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXguaW5pdFdpdGhFbGVtZW50KHNoYXJlZENhbnZhcyk7XG4gICAgICAgIHRoaXMudGV4LmhhbmRsZUxvYWRlZFRleHR1cmUoKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnNwcml0ZUZyYW1lID0gbmV3IGNjLlNwcml0ZUZyYW1lKHRoaXMudGV4KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUoKSB7XG5cbiAgICAvLyB9XG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcbiAgICB9XG59OyJdfQ==
"use strict";
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
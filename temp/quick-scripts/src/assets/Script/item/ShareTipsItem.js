"use strict";
cc._RF.push(module, '1f2f9a3C/VEPKUtTZG0WhFn', 'ShareTipsItem');
// Script/item/ShareTipsItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ShareTipsItem = /** @class */ (function (_super) {
    __extends(ShareTipsItem, _super);
    function ShareTipsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    ShareTipsItem.prototype.start = function () {
    };
    ShareTipsItem.prototype.onClose = function () {
        this.node.destroy();
    };
    ShareTipsItem = __decorate([
        ccclass
    ], ShareTipsItem);
    return ShareTipsItem;
}(cc.Component));
exports.default = ShareTipsItem;

cc._RF.pop();
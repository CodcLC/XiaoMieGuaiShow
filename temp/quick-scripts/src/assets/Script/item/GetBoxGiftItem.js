"use strict";
cc._RF.push(module, '30339KHDKlNjZMtkkI4Lrhs', 'GetBoxGiftItem');
// Script/item/GetBoxGiftItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ShareSdk = require("../common/ShareSdk");
var Utils = require("../common/Utils");
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GetBoxGiftItem = /** @class */ (function (_super) {
    __extends(GetBoxGiftItem, _super);
    function GetBoxGiftItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_n_freebtn = null;
        _this.m_n_sharebtn = null;
        _this.m_n_box = null;
        _this._onshowback = false;
        _this._callback = null;
        return _this;
        // update (dt) {}
    }
    GetBoxGiftItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    GetBoxGiftItem.prototype.showView = function (callback) {
        this._callback = callback;
        this.m_n_freebtn.active = !window.BOX_SHARE;
        this.m_n_sharebtn.active = window.BOX_SHARE;
        this.m_n_box.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
    };
    GetBoxGiftItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    GetBoxGiftItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onFreeGet();
            }
            else {
                Common_CommonUtil_1.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    GetBoxGiftItem.prototype.onClose = function () {
        if (this._callback) {
            this._callback();
            this._callback = null;
        }
        this.node.active = false;
    };
    GetBoxGiftItem.prototype.onFreeGet = function () {
        // Utils.showGetItem();
        var numlist = [1, 20];
        var index = 0;
        var ran = Utils.random(0, 1500);
        index = ran > 750 ? 0 : 1;
        Utils.showGetItem(numlist[index], index, null, 0, 0);
        if (index == 0) {
            window.INIT_GAME_SAVE_DATA.tool[0] += numlist[index];
        }
        else {
            window.INIT_GAME_SAVE_DATA.gold_num += numlist[index];
        }
        if (window.GAME_CONTROL) {
            window.GAME_CONTROL.BoxReward(index);
        }
        this.onClose();
    };
    GetBoxGiftItem.prototype.onShareGet = function () {
        this._onshowback = true;
        ShareSdk.shareAppMessage({
            title: "我就看着你，直到你打开宝箱为止",
            imageUrl: window.tempFileURL[3],
        });
    };
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_freebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_sharebtn", void 0);
    __decorate([
        property(cc.Node)
    ], GetBoxGiftItem.prototype, "m_n_box", void 0);
    GetBoxGiftItem = __decorate([
        ccclass
    ], GetBoxGiftItem);
    return GetBoxGiftItem;
}(cc.Component));
exports.default = GetBoxGiftItem;

cc._RF.pop();
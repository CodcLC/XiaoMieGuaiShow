
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/GetBoxGiftItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxHZXRCb3hHaWZ0SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQWdEO0FBQ2hELHVDQUEwQztBQUMxQyxpRUFBNEQ7QUFDdEQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFJNUM7SUFBNEMsa0NBQVk7SUFBeEQ7UUFBQSxxRUF3RUM7UUFyRUcsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFHNUIsa0JBQVksR0FBWSxJQUFJLENBQUM7UUFHN0IsYUFBTyxHQUFZLElBQUksQ0FBQztRQUNoQixpQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixlQUFTLEdBQVEsSUFBSSxDQUFDOztRQTREOUIsaUJBQWlCO0lBQ3JCLENBQUM7SUE1REcsOEJBQUssR0FBTDtRQUNJLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxpQ0FBUSxHQUFSLFVBQVMsUUFBUTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckksQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSxjQUFjLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxJQUFJO1FBQ1gsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtpQkFBTTtnQkFDSCwyQkFBaUIsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBRUQsZ0NBQU8sR0FBUDtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNoQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDekI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFDSSx1QkFBdUI7UUFDdkIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JELElBQUksS0FBSyxJQUFJLENBQUMsRUFBRTtZQUNaLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtZQUNyQixNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsbUNBQVUsR0FBVjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLFFBQVEsQ0FBQyxlQUFlLENBQUM7WUFDckIsS0FBSyxFQUFFLGlCQUFpQjtZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7U0FDbEMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQW5FRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3VEQUNVO0lBRzVCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0RBQ1c7SUFHN0I7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDTTtJQVRQLGNBQWM7UUFEbEMsT0FBTztPQUNhLGNBQWMsQ0F3RWxDO0lBQUQscUJBQUM7Q0F4RUQsQUF3RUMsQ0F4RTJDLEVBQUUsQ0FBQyxTQUFTLEdBd0V2RDtrQkF4RW9CLGNBQWMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhcmVTZGsgPSByZXF1aXJlKCcuLi9jb21tb24vU2hhcmVTZGsnKTtcbmltcG9ydCBVdGlscyA9IHJlcXVpcmUoJy4uL2NvbW1vbi9VdGlscycpO1xuaW1wb3J0IENvbW1vbl9Db21tb25VdGlsIGZyb20gJy4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbCc7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldEJveEdpZnRJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9mcmVlYnRuOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9zaGFyZWJ0bjogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtX25fYm94OiBjYy5Ob2RlID0gbnVsbDtcbiAgICBwcml2YXRlIF9vbnNob3diYWNrOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfY2FsbGJhY2s6IGFueSA9IG51bGw7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMub25zaG93YmFjaywgdGhpcyk7XG4gICAgfVxuXG4gICAgc2hvd1ZpZXcoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5tX25fZnJlZWJ0bi5hY3RpdmUgPSAhd2luZG93LkJPWF9TSEFSRTtcbiAgICAgICAgdGhpcy5tX25fc2hhcmVidG4uYWN0aXZlID0gd2luZG93LkJPWF9TSEFSRTtcbiAgICAgICAgdGhpcy5tX25fYm94LnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oMC4xLCAtMTApLCBjYy5yb3RhdGVUbygwLjEsIDEwKSksIDMpLCBjYy5yb3RhdGVUbygwLjEsIDApKSk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25zaG93YmFjayh0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9vbnNob3diYWNrKSB7XG4gICAgICAgICAgICBpZiAodGltZSA+PSB3aW5kb3cuU0hBUkVfVElNRSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25GcmVlR2V0KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbW1vbl9Db21tb25VdGlsLnNob3dTaGFyZUZhaWxUaXBzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrKCk7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFjayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRnJlZUdldCgpIHtcbiAgICAgICAgLy8gVXRpbHMuc2hvd0dldEl0ZW0oKTtcbiAgICAgICAgbGV0IG51bWxpc3QgPSBbMSwgMjBdO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgcmFuID0gVXRpbHMucmFuZG9tKDAsIDE1MDApO1xuICAgICAgICBpbmRleCA9IHJhbiA+IDc1MCA/IDAgOiAxO1xuICAgICAgICBVdGlscy5zaG93R2V0SXRlbShudW1saXN0W2luZGV4XSwgaW5kZXgsIG51bGwsIDAsIDApO1xuICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9vbFswXSArPSBudW1saXN0W2luZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtICs9IG51bWxpc3RbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuR0FNRV9DT05UUk9MKSB7XG4gICAgICAgICAgICB3aW5kb3cuR0FNRV9DT05UUk9MLkJveFJld2FyZChpbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgfVxuXG4gICAgb25TaGFyZUdldCgpIHtcbiAgICAgICAgdGhpcy5fb25zaG93YmFjayA9IHRydWU7XG4gICAgICAgIFNoYXJlU2RrLnNoYXJlQXBwTWVzc2FnZSh7XG4gICAgICAgICAgICB0aXRsZTogXCLmiJHlsLHnnIvnnYDkvaDvvIznm7TliLDkvaDmiZPlvIDlrp3nrrHkuLrmraJcIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbM10sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
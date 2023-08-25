
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/SkinItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '8d8bfr8qONJh5sm29g/5CCH', 'SkinItem');
// Script/item/SkinItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var ShareSdk = require("../common/ShareSdk");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SkinItem = /** @class */ (function (_super) {
    __extends(SkinItem, _super);
    function SkinItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_l_goldlabel = null;
        _this.m_sp_blockstyle = null;
        _this.m_n_isready = null;
        _this.m_btn_suitup = null;
        _this.m_l_sharetext = null;
        _this._data = null;
        _this._state = 0;
        _this._index = 0;
        _this._onshowback = false;
        return _this;
    }
    SkinItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    SkinItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    SkinItem.prototype.updateData = function (index, data, sframe) {
        this._index = index;
        this._data = data;
        var state = window.INIT_GAME_SAVE_DATA.skin[index];
        this._state = state ? state : 0;
        this.m_sp_blockstyle.spriteFrame = sframe;
        this.m_n_isready.active = this._state >= 2;
        this.m_btn_suitup.node.active = this._state < 2;
        this.m_l_goldlabel.string = data.price;
        if (this._state == 0) { //未获得
            if (data.way == 1 && window.SKIN_SHARE) { //分享获得且开关开启
                this.m_l_sharetext.node.active = true;
                this.m_l_goldlabel.node.parent.active = false;
                this.m_btn_suitup.interactable = true;
            }
            else {
                this.m_l_sharetext.node.active = false;
                this.m_l_goldlabel.node.parent.active = true;
                this.m_btn_suitup.interactable = window.INIT_GAME_SAVE_DATA.gold_num >= data.price;
            }
            this.m_btn_suitup.node.y = -145;
        }
        else if (this._state == 1) {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
            this.m_btn_suitup.interactable = true;
            this.m_btn_suitup.node.y = -74;
        }
        else {
            this.m_l_sharetext.node.active = false;
            this.m_l_goldlabel.node.parent.active = false;
        }
    };
    SkinItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            if (time >= window.SHARE_TIME) {
                this.onSuitUp();
            }
            else {
                Common_CommonUtil_1.default.showShareFailTips();
            }
            this._onshowback = false;
        }
    };
    SkinItem.prototype.onSuitUp = function () {
        if (!this.m_btn_suitup.interactable)
            return;
        var skin_config = window.INIT_GAME_SAVE_DATA.skin;
        for (var i = 0; i < skin_config.length; i++) {
            if (skin_config[i] == 2) {
                window.INIT_GAME_SAVE_DATA.skin[i] = 1;
                window.INIT_GAME_SAVE_DATA.skin[this._index] = 2;
                break;
            }
        }
        if (this._state == 0) {
            if (this._data.way == 0 || !window.SKIN_SHARE) {
                window.INIT_GAME_SAVE_DATA.gold_num -= this._data.price;
                EVENT_LISTENER.fire(window.GAME_UPDATE_DATA);
            }
            else {
                this._onshowback = true;
                ShareSdk.shareAppMessage({
                    title: "获得了一个怪兽皮肤，快来看看吧",
                    imageUrl: window.tempFileURL[1],
                });
            }
        }
        // console.log(window.INIT_GAME_SAVE_DATA.skin)
        EVENT_LISTENER.fire(window.GAME_SAVE_HANDLER);
    };
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_goldlabel", void 0);
    __decorate([
        property(cc.Sprite)
    ], SkinItem.prototype, "m_sp_blockstyle", void 0);
    __decorate([
        property(cc.Node)
    ], SkinItem.prototype, "m_n_isready", void 0);
    __decorate([
        property(cc.Button)
    ], SkinItem.prototype, "m_btn_suitup", void 0);
    __decorate([
        property(cc.Label)
    ], SkinItem.prototype, "m_l_sharetext", void 0);
    SkinItem = __decorate([
        ccclass
    ], SkinItem);
    return SkinItem;
}(cc.Component));
exports.default = SkinItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxTa2luSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTREO0FBQzVELDZDQUFnRDtBQUMxQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUk1QztJQUFzQyw0QkFBWTtJQUFsRDtRQUFBLHFFQWtHQztRQS9GRyxtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxpQkFBVyxHQUFZLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFjLElBQUksQ0FBQztRQUcvQixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUV2QixXQUFLLEdBQVEsSUFBSSxDQUFDO1FBQ2xCLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsWUFBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixpQkFBVyxHQUFZLEtBQUssQ0FBQzs7SUE4RXpDLENBQUM7SUE1RUcsd0JBQUssR0FBTDtRQUNJLGNBQWMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsS0FBYSxFQUFFLElBQVMsRUFBRSxNQUFNO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMs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Q0FsR0QsQUFrR0MsQ0FsR3FDLEVBQUUsQ0FBQyxTQUFTLEdBa0dqRDtrQkFsR29CLFFBQVEiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uX0NvbW1vblV0aWwgZnJvbSBcIi4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbFwiO1xuaW1wb3J0IFNoYXJlU2RrID0gcmVxdWlyZSgnLi4vY29tbW9uL1NoYXJlU2RrJyk7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNraW5JdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfZ29sZGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG1fc3BfYmxvY2tzdHlsZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9pc3JlYWR5OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gICAgbV9idG5fc3VpdHVwOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIG1fbF9zaGFyZXRleHQ6IGNjLkxhYmVsID0gbnVsbDtcblxuICAgIHByaXZhdGUgX2RhdGE6IGFueSA9IG51bGw7XG4gICAgcHJpdmF0ZSBfc3RhdGU6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfaW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBfb25zaG93YmFjazogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5PTl9TSE9XX0JBQ0ssIHRoaXMub25zaG93YmFjaywgdGhpcyk7XG4gICAgfVxuXG4gICAgb25EZXN0cm95KCkge1xuICAgICAgICBFVkVOVF9MSVNURU5FUi5vZmYod2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcyk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGF0YShpbmRleDogbnVtYmVyLCBkYXRhOiBhbnksIHNmcmFtZSkge1xuICAgICAgICB0aGlzLl9pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICAgICAgbGV0IHN0YXRlID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbltpbmRleF07XG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGUgPyBzdGF0ZSA6IDA7XG4gICAgICAgIHRoaXMubV9zcF9ibG9ja3N0eWxlLnNwcml0ZUZyYW1lID0gc2ZyYW1lO1xuICAgICAgICB0aGlzLm1fbl9pc3JlYWR5LmFjdGl2ZSA9IHRoaXMuX3N0YXRlID49IDI7XG4gICAgICAgIHRoaXMubV9idG5fc3VpdHVwLm5vZGUuYWN0aXZlID0gdGhpcy5fc3RhdGUgPCAyO1xuICAgICAgICB0aGlzLm1fbF9nb2xkbGFiZWwuc3RyaW5nID0gZGF0YS5wcmljZTtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09IDApIHsvL+acquiOt+W+l1xuICAgICAgICAgICAgaWYgKGRhdGEud2F5ID09IDEgJiYgd2luZG93LlNLSU5fU0hBUkUpIHsgLy/liIbkuqvojrflvpfkuJTlvIDlhbPlvIDlkK9cbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9nb2xkbGFiZWwubm9kZS5wYXJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5nb2xkX251bSA+PSBkYXRhLnByaWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX2J0bl9zdWl0dXAubm9kZS55ID0gLTE0NTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9zdGF0ZSA9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9idG5fc3VpdHVwLmludGVyYWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fYnRuX3N1aXR1cC5ub2RlLnkgPSAtNzQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fbF9zaGFyZXRleHQubm9kZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9sX2dvbGRsYWJlbC5ub2RlLnBhcmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uc2hvd2JhY2sodGltZSkge1xuICAgICAgICBpZiAodGhpcy5fb25zaG93YmFjaykge1xuICAgICAgICAgICAgaWYgKHRpbWUgPj0gd2luZG93LlNIQVJFX1RJTUUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3VpdFVwKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIENvbW1vbl9Db21tb25VdGlsLnNob3dTaGFyZUZhaWxUaXBzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblN1aXRVcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm1fYnRuX3N1aXR1cC5pbnRlcmFjdGFibGUpIHJldHVybjtcbiAgICAgICAgbGV0IHNraW5fY29uZmlnID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBza2luX2NvbmZpZy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHNraW5fY29uZmlnW2ldID09IDIpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5za2luW2ldID0gMTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS5za2luW3RoaXMuX2luZGV4XSA9IDI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kYXRhLndheSA9PSAwIHx8ICF3aW5kb3cuU0tJTl9TSEFSRSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtIC09IHRoaXMuX2RhdGEucHJpY2U7XG4gICAgICAgICAgICAgICAgRVZFTlRfTElTVEVORVIuZmlyZSh3aW5kb3cuR0FNRV9VUERBVEVfREFUQSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLojrflvpfkuobkuIDkuKrmgKrlhb3nmq7ogqTvvIzlv6vmnaXnnIvnnIvlkKdcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVcmw6IHdpbmRvdy50ZW1wRmlsZVVSTFsxXSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnNraW4pXG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLmZpcmUod2luZG93LkdBTUVfU0FWRV9IQU5ETEVSKTtcbiAgICB9XG5cbn1cbiJdfQ==
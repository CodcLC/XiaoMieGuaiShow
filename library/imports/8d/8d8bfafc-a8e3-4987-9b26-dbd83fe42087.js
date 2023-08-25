"use strict";
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
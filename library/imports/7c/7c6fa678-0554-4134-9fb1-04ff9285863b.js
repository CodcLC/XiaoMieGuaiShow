"use strict";
cc._RF.push(module, '7c6faZ4BVRBNJ+xBP+ShYY7', 'StepViewItem');
// Script/item/StepViewItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Common_CommonUtil_1 = require("../common/Common_CommonUtil");
var Utils = require("../common/Utils");
var ShareSDk = require("../common/ShareSdk");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StepViewItem = /** @class */ (function (_super) {
    __extends(StepViewItem, _super);
    function StepViewItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // onLoad () {}
        _this._callback = null;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_starlist = [];
        _this.m_n_bg = null;
        _this.m_l_steptitle = null;
        _this.m_spa_list = null;
        _this._stepname = "";
        _this._onshowback = false;
        return _this;
        // update (dt) {}
    }
    StepViewItem.prototype.start = function () {
        EVENT_LISTENER.on(window.ON_SHOW_BACK, this.onshowback, this);
    };
    StepViewItem.prototype.onDestroy = function () {
        EVENT_LISTENER.off(window.ON_SHOW_BACK, this);
    };
    StepViewItem.prototype.setCloseCallback = function (callback) {
        this._callback = callback;
    };
    StepViewItem.prototype.onClose = function () {
        if (this._callback)
            this._callback();
        this.node.active = false;
    };
    StepViewItem.prototype.onshowback = function (time) {
        if (this._onshowback) {
            this._onshowback = false;
            this.onClose();
        }
    };
    /**
     * 显示获得段位信息
     * @param lv 等级
     */
    StepViewItem.prototype.showStep = function (lv) {
        var _this = this;
        var num = this.updateData(lv);
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = false;
        }
        this.m_sp_stepicon.node.getComponent(cc.Animation).play('playstep');
        this.m_sp_stepname.node.getComponent(cc.Animation).play('playstep');
        this.scheduleOnce(function () {
            Common_CommonUtil_1.default.shakeScreen(_this.m_n_bg);
        }, 0.4);
        var _loop_1 = function (i) {
            this_1.m_n_starlist[i].active = true;
            this_1.m_n_starlist[i].scale = 0;
            this_1.scheduleOnce(function () {
                _this.m_n_starlist[i].runAction(cc.sequence(cc.scaleTo(0.2, 1.4, 1.4).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));
                Utils.SetSoundEffect(window.GET_GOLD, false, 1);
            }, 0.54 + (i + 1) * 0.3);
        };
        var this_1 = this;
        for (var i = 0; i < num; i++) {
            _loop_1(i);
        }
    };
    StepViewItem.prototype.updateData = function (lv) {
        if (lv === void 0) { lv = 0; }
        var index = Math.floor(lv / 10);
        var stepdata = window.STEP_CONFIG[index - 1];
        var num = 0;
        if (stepdata) {
            num = stepdata.star;
            this._stepname = stepdata.desc;
            this.m_l_steptitle.string = cc.js.formatStr("完成%d关 段位提升", lv);
            this.m_sp_stepicon.spriteFrame = this.m_spa_list.getSpriteFrame(stepdata.icon_path);
            this.m_sp_stepname.spriteFrame = this.m_spa_list.getSpriteFrame(stepdata.desc_path);
        }
        return num;
    };
    StepViewItem.prototype.setShowBtnVisible = function (boo) {
        for (var i = 0; i < this.m_n_starlist.length; i++) {
            this.m_n_starlist[i].active = boo;
        }
        this.m_sp_stepicon.node.active = boo;
        this.m_sp_stepname.node.active = boo;
    };
    StepViewItem.prototype.onShareStep = function () {
        this._onshowback = true;
        ShareSDk.shareAppMessage({
            title: "消除段位升级到【" + this._stepname + "】,一起来见证吧",
            imageUrl: window.tempFileURL[1],
        });
    };
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], StepViewItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property([cc.Node])
    ], StepViewItem.prototype, "m_n_starlist", void 0);
    __decorate([
        property(cc.Node)
    ], StepViewItem.prototype, "m_n_bg", void 0);
    __decorate([
        property(cc.Label)
    ], StepViewItem.prototype, "m_l_steptitle", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], StepViewItem.prototype, "m_spa_list", void 0);
    StepViewItem = __decorate([
        ccclass
    ], StepViewItem);
    return StepViewItem;
}(cc.Component));
exports.default = StepViewItem;

cc._RF.pop();
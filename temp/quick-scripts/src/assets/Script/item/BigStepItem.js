"use strict";
cc._RF.push(module, 'be69aicp1VM956W/yG6BxJU', 'BigStepItem');
// Script/item/BigStepItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BigStepItem = /** @class */ (function (_super) {
    __extends(BigStepItem, _super);
    function BigStepItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_sp_stepicon = null;
        _this.m_sp_stepname = null;
        _this.m_n_lock = null;
        _this.m_l_condition = null;
        _this.m_n_starlist = [];
        return _this;
        // update (dt) {}
    }
    BigStepItem.prototype.start = function () {
    };
    BigStepItem.prototype.updateData = function (data, spframe, spframe1, curlv, color) {
        if (color === void 0) { color = 0; }
        var colorlist = ['#33ABEE', '#33EEEE', '#33EE94', '#BAE789'];
        if (data) {
            this.node.color = cc.Color.WHITE.fromHEX(colorlist[color]);
            this.m_sp_stepicon.spriteFrame = spframe;
            this.m_sp_stepname.spriteFrame = spframe1;
            for (var i = 0; i < this.m_n_starlist.length; i++) {
                this.m_n_starlist[i].active = i < data.star;
            }
            this.m_n_lock.active = data.lv > curlv;
            if (data.lv > curlv) {
                this.m_l_condition.node.y = -33;
                this.m_l_condition.string = cc.js.formatStr("需通关%d关", data.lv);
            }
            else {
                this.m_l_condition.node.y = 0;
                this.m_l_condition.string = "已获得";
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], BigStepItem.prototype, "m_sp_stepname", void 0);
    __decorate([
        property(cc.Node)
    ], BigStepItem.prototype, "m_n_lock", void 0);
    __decorate([
        property(cc.Label)
    ], BigStepItem.prototype, "m_l_condition", void 0);
    __decorate([
        property([cc.Node])
    ], BigStepItem.prototype, "m_n_starlist", void 0);
    BigStepItem = __decorate([
        ccclass
    ], BigStepItem);
    return BigStepItem;
}(cc.Component));
exports.default = BigStepItem;

cc._RF.pop();
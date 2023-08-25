"use strict";
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
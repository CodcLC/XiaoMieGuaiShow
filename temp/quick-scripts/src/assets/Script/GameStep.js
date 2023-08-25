"use strict";
cc._RF.push(module, 'cf803qligpD3LYrN7Q/987O', 'GameStep');
// Script/GameStep.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Utils = require("./common/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameStep = /** @class */ (function (_super) {
    __extends(GameStep, _super);
    function GameStep() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.m_spa_list = null;
        _this.m_n_bigstepcontent = null;
        _this.m_sp_mystepicon = null;
        _this.m_sp_mystepname = null;
        _this.m_n_mystarlist = [];
        _this.m_pre_bigstep = null;
        _this.m_nodepoll = null;
        return _this;
        // update (dt) {}
    }
    /**当前最后排名数 */
    GameStep.prototype.start = function () {
        var len = window.STEP_CONFIG.length;
        this.m_n_bigstepcontent.height = len * 115 + (len - 1) * 20;
        var k = 0;
        for (var i = len - 1; i >= 0; i--) {
            var node = cc.instantiate(this.m_pre_bigstep);
            node.x = 0;
            node.y = -62 - (len - i - 1) * (node.height + 20);
            this.m_n_bigstepcontent.addChild(node);
            var data = window.STEP_CONFIG[i];
            var index = k % 4;
            node.getComponent("BigStepItem").updateData(data, this.m_spa_list.getSpriteFrame(data.icon_path), this.m_spa_list.getSpriteFrame(data.desc_path), window.INIT_GAME_SAVE_DATA.top_level, index);
            k++;
        }
        this.m_n_bigstepcontent.parent.parent.getComponent(cc.ScrollView).scrollToOffset(cc.v2(0, this.m_n_bigstepcontent.height));
        this.initMyData();
    };
    GameStep.prototype.onToggleClick = function (event) {
    };
    GameStep.prototype.initMyData = function () {
        var curlv = window.INIT_GAME_SAVE_DATA.top_level;
        var data = this.getMyStepData(curlv);
        if (data) {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame(data.icon_path);
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame(data.desc_path);
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i < data.star;
            }
            // this.m_n_mybigstep.getComponent("BigStepItem").updateData(data, this.m_spa_list.getSpriteFrame(data.icon_path), curlv);
        }
        else {
            this.m_sp_mystepicon.spriteFrame = this.m_spa_list.getSpriteFrame("stepicon6");
            this.m_sp_mystepname.spriteFrame = this.m_spa_list.getSpriteFrame("stepname6");
            for (var i = 0; i < this.m_n_mystarlist.length; i++) {
                this.m_n_mystarlist[i].active = i <= 0;
            }
            // this.m_n_mybigstep.getComponent("BigStepItem").updateData(window.STEP_CONFIG[0], this.m_spa_list.getSpriteFrame("stepicon1"), curlv);
        }
    };
    GameStep.prototype.onBackHome = function () {
        Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
        cc.director.loadScene(window.MENU_SCENE_NAME);
    };
    /**
     * @description 根据等级获取我的段位数据
     * @author 吴建奋
     * @param {number} lv 等级
     * @memberof GameStep
     */
    GameStep.prototype.getMyStepData = function (lv) {
        var index = Math.floor(lv / 10);
        if (index <= 0) {
            return null;
        }
        else {
            if (index > window.STEP_CONFIG.length)
                index = window.STEP_CONFIG.length;
            return window.STEP_CONFIG[index - 1];
        }
    };
    GameStep.prototype.onDestroy = function () {
        if (this.m_nodepoll) {
            this.m_nodepoll.clear();
        }
    };
    __decorate([
        property(cc.SpriteAtlas)
    ], GameStep.prototype, "m_spa_list", void 0);
    __decorate([
        property(cc.Node)
    ], GameStep.prototype, "m_n_bigstepcontent", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepicon", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameStep.prototype, "m_sp_mystepname", void 0);
    __decorate([
        property([cc.Node])
    ], GameStep.prototype, "m_n_mystarlist", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameStep.prototype, "m_pre_bigstep", void 0);
    GameStep = __decorate([
        ccclass
    ], GameStep);
    return GameStep;
}(cc.Component));
exports.default = GameStep;

cc._RF.pop();
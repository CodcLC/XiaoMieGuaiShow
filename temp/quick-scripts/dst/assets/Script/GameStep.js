
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameStep.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lU3RlcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esc0NBQXlDO0FBRW5DLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXNDLDRCQUFZO0lBQWxEO1FBQUEscUVBbUdDO1FBaEdHLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUlsQyx3QkFBa0IsR0FBWSxJQUFJLENBQUM7UUFHbkMscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFHbEMscUJBQWUsR0FBYyxJQUFJLENBQUM7UUFHbEMsb0JBQWMsR0FBYyxFQUFFLENBQUM7UUFHL0IsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFFeEIsZ0JBQVUsR0FBRyxJQUFJLENBQUM7O1FBNkUxQixpQkFBaUI7SUFDckIsQ0FBQztJQTdFRyxhQUFhO0lBS2Isd0JBQUssR0FBTDtRQUVJLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0IsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFD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QyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osT0FBTyxJQUFJLENBQUM7U0FDZjthQUFNO1lBQ0gsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNO2dCQUNqQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDdEMsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN4QztJQUNMLENBQUM7SUFFRCw0QkFBUyxHQUFUO1FBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBOUZEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0RBQ1M7SUFJbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzt3REFDaUI7SUFHbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztxREFDYztJQUdsQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FEQUNjO0lBR2xDO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO29EQUNXO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7bURBQ1k7SUFuQmYsUUFBUTtRQUQ1QixPQUFPO09BQ2EsUUFBUSxDQW1HNUI7SUFBRCxlQUFDO0NBbkdELEFBbUdDLENBbkdxQyxFQUFFLENBQUMsU0FBUyxHQW1HakQ7a0JBbkdvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgVXRpbHMgPSByZXF1aXJlKFwiLi9jb21tb24vVXRpbHNcIik7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5kZWNsYXJlIHZhciB3aW5kb3c6IGFueTtcbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RlcCBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXG4gICAgbV9zcGFfbGlzdDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xuXG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBtX25fYmlnc3RlcGNvbnRlbnQ6IGNjLk5vZGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX215c3RlcGljb246IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIG1fc3BfbXlzdGVwbmFtZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShbY2MuTm9kZV0pXG4gICAgbV9uX215c3Rhcmxpc3Q6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgICBtX3ByZV9iaWdzdGVwOiBjYy5QcmVmYWIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBtX25vZGVwb2xsID0gbnVsbDtcbiAgICAvKirlvZPliY3mnIDlkI7mjpLlkI3mlbAgKi9cblxuXG5cblxuICAgIHN0YXJ0KCkge1xuXG4gICAgICAgIGxldCBsZW4gPSB3aW5kb3cuU1RFUF9DT05GSUcubGVuZ3RoO1xuICAgICAgICB0aGlzLm1fbl9iaWdzdGVwY29udGVudC5oZWlnaHQgPSBsZW4gKiAxMTUgKyAobGVuIC0gMSkgKiAyMDtcbiAgICAgICAgbGV0IGsgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tX3ByZV9iaWdzdGVwKTtcbiAgICAgICAgICAgIG5vZGUueCA9IDA7XG4gICAgICAgICAgICBub2RlLnkgPSAtNjIgLSAobGVuIC0gaSAtIDEpICogKG5vZGUuaGVpZ2h0ICsgMjApO1xuICAgICAgICAgICAgdGhpcy5tX25fYmlnc3RlcGNvbnRlbnQuYWRkQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TVEVQX0NPTkZJR1tpXTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGsgJSA0O1xuICAgICAgICAgICAgbm9kZS5nZXRDb21wb25lbnQoXCJCaWdTdGVwSXRlbVwiKS51cGRhdGVEYXRhKGRhdGEsIHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShkYXRhLmljb25fcGF0aCksIHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShkYXRhLmRlc2NfcGF0aCksIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9sZXZlbCwgaW5kZXgpO1xuICAgICAgICAgICAgaysrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9uX2JpZ3N0ZXBjb250ZW50LnBhcmVudC5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLlNjcm9sbFZpZXcpLnNjcm9sbFRvT2Zmc2V0KGNjLnYyKDAsIHRoaXMubV9uX2JpZ3N0ZXBjb250ZW50LmhlaWdodCkpO1xuICAgICAgICB0aGlzLmluaXRNeURhdGEoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVG9nZ2xlQ2xpY2soZXZlbnQpIHtcblxuICAgIH1cblxuICAgIGluaXRNeURhdGEoKSB7XG4gICAgICAgIGxldCBjdXJsdiA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9sZXZlbDtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmdldE15U3RlcERhdGEoY3VybHYpO1xuICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5tX3NwX215c3RlcGljb24uc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoZGF0YS5pY29uX3BhdGgpO1xuICAgICAgICAgICAgdGhpcy5tX3NwX215c3RlcG5hbWUuc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoZGF0YS5kZXNjX3BhdGgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9teXN0YXJsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbXlzdGFybGlzdFtpXS5hY3RpdmUgPSBpIDwgZGF0YS5zdGFyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhpcy5tX25fbXliaWdzdGVwLmdldENvbXBvbmVudChcIkJpZ1N0ZXBJdGVtXCIpLnVwZGF0ZURhdGEoZGF0YSwgdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKGRhdGEuaWNvbl9wYXRoKSwgY3VybHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tX3NwX215c3RlcGljb24uc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoXCJzdGVwaWNvbjZcIik7XG4gICAgICAgICAgICB0aGlzLm1fc3BfbXlzdGVwbmFtZS5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShcInN0ZXBuYW1lNlwiKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fbXlzdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX215c3Rhcmxpc3RbaV0uYWN0aXZlID0gaSA8PSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdGhpcy5tX25fbXliaWdzdGVwLmdldENvbXBvbmVudChcIkJpZ1N0ZXBJdGVtXCIpLnVwZGF0ZURhdGEod2luZG93LlNURVBfQ09ORklHWzBdLCB0aGlzLm1fc3BhX2xpc3QuZ2V0U3ByaXRlRnJhbWUoXCJzdGVwaWNvbjFcIiksIGN1cmx2KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgb25CYWNrSG9tZSgpIHtcbiAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkJVVFRPTl9DTElDS19NVVNJQywgZmFsc2UsIDEpO1xuICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUod2luZG93Lk1FTlVfU0NFTkVfTkFNRSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOagueaNruetiee6p+iOt+WPluaIkeeahOauteS9jeaVsOaNrlxuICAgICAqIEBhdXRob3Ig5ZC05bu65aWLXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGx2IOetiee6p1xuICAgICAqIEBtZW1iZXJvZiBHYW1lU3RlcFxuICAgICAqL1xuICAgIGdldE15U3RlcERhdGEobHY6IG51bWJlcikge1xuICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKGx2IC8gMTApO1xuICAgICAgICBpZiAoaW5kZXggPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiB3aW5kb3cuU1RFUF9DT05GSUcubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGluZGV4ID0gd2luZG93LlNURVBfQ09ORklHLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuU1RFUF9DT05GSUdbaW5kZXggLSAxXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMubV9ub2RlcG9sbCkge1xuICAgICAgICAgICAgdGhpcy5tX25vZGVwb2xsLmNsZWFyKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
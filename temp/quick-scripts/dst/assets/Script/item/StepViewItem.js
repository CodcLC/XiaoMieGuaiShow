
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/StepViewItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxTdGVwVmlld0l0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUE0RDtBQUM1RCx1Q0FBMEM7QUFDMUMsNkNBQWdEO0FBQzFDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBSTVDO0lBQTBDLGdDQUFZO0lBQXREO1FBQUEscUVBdUdDO1FBdEdHLGVBQWU7UUFDUCxlQUFTLEdBQUcsSUFBSSxDQUFDO1FBR3pCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBR2hDLGtCQUFZLEdBQWMsRUFBRSxDQUFDO1FBRzdCLFlBQU0sR0FBWSxJQUFJLENBQUM7UUFHdkIsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFHL0IsZ0JBQVUsR0FBbUIsSUFBSSxDQUFDO1FBRTFCLGVBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixpQkFBVyxHQUFZLEtBQUssQ0FBQzs7UUErRXJDLGlCQUFpQjtJQUNyQixDQUFDO0lBL0VHLDRCQUFLLEdBQUw7UUFDSSxjQUFjLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLGNBQWMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLFFBQVE7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVELDhCQUFPLEdBQVA7UUFDSSxJQUFJLElBQUksQ0FBQyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFH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LENBQUMsS0FBSyxDQUFDO3VEQUNZO0lBRy9CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7b0RBQ1M7SUFwQmpCLFlBQVk7UUFEaEMsT0FBTztPQUNhLFlBQVksQ0F1R2hDO0lBQUQsbUJBQUM7Q0F2R0QsQUF1R0MsQ0F2R3lDLEVBQUUsQ0FBQyxTQUFTLEdBdUdyRDtrQkF2R29CLFlBQVkiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tbW9uX0NvbW1vblV0aWwgZnJvbSBcIi4uL2NvbW1vbi9Db21tb25fQ29tbW9uVXRpbFwiO1xuaW1wb3J0IFV0aWxzID0gcmVxdWlyZShcIi4uL2NvbW1vbi9VdGlsc1wiKTtcbmltcG9ydCBTaGFyZVNEayA9IHJlcXVpcmUoXCIuLi9jb21tb24vU2hhcmVTZGtcIik7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuZGVjbGFyZSB2YXIgd2luZG93OiBhbnk7XG5kZWNsYXJlIHZhciBFVkVOVF9MSVNURU5FUjogYW55O1xuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZXBWaWV3SXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgLy8gb25Mb2FkICgpIHt9XG4gICAgcHJpdmF0ZSBfY2FsbGJhY2sgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX3N0ZXBpY29uOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcbiAgICBtX3NwX3N0ZXBuYW1lOiBjYy5TcHJpdGUgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFtjYy5Ob2RlXSlcbiAgICBtX25fc3Rhcmxpc3Q6IGNjLk5vZGVbXSA9IFtdO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgbV9uX2JnOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfc3RlcHRpdGxlOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlQXRsYXMpXG4gICAgbV9zcGFfbGlzdDogY2MuU3ByaXRlQXRsYXMgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfc3RlcG5hbWUgPSBcIlwiO1xuICAgIHByaXZhdGUgX29uc2hvd2JhY2s6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBzdGFydCgpIHtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93Lk9OX1NIT1dfQkFDSywgdGhpcy5vbnNob3diYWNrLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbkRlc3Ryb3koKSB7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9mZih3aW5kb3cuT05fU0hPV19CQUNLLCB0aGlzKTtcbiAgICB9XG5cbiAgICBzZXRDbG9zZUNhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgb25DbG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB0aGlzLl9jYWxsYmFjaygpO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25zaG93YmFjayh0aW1lKSB7XG4gICAgICAgIGlmICh0aGlzLl9vbnNob3diYWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOaYvuekuuiOt+W+l+auteS9jeS/oeaBr1xuICAgICAqIEBwYXJhbSBsdiDnrYnnuqdcbiAgICAgKi9cbiAgICBzaG93U3RlcChsdjogbnVtYmVyKSB7XG4gICAgICAgIGxldCBudW0gPSB0aGlzLnVwZGF0ZURhdGEobHYpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX3N0YXJsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9zdGFybGlzdFtpXS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fc3Bfc3RlcGljb24ubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdwbGF5c3RlcCcpO1xuICAgICAgICB0aGlzLm1fc3Bfc3RlcG5hbWUubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCdwbGF5c3RlcCcpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBDb21tb25fQ29tbW9uVXRpbC5zaGFrZVNjcmVlbih0aGlzLm1fbl9iZyk7XG4gICAgICAgIH0sIDAuNCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3N0YXJsaXN0W2ldLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9zdGFybGlzdFtpXS5zY2FsZSA9IDA7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fc3Rhcmxpc3RbaV0ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjQsIDEuNCkuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICB9LCAwLjU0ICsgKGkgKyAxKSAqIDAuMyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVEYXRhKGx2OiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihsdiAvIDEwKTtcbiAgICAgICAgbGV0IHN0ZXBkYXRhID0gd2luZG93LlNURVBfQ09ORklHW2luZGV4IC0gMV07XG4gICAgICAgIGxldCBudW0gPSAwO1xuICAgICAgICBpZiAoc3RlcGRhdGEpIHtcbiAgICAgICAgICAgIG51bSA9IHN0ZXBkYXRhLnN0YXI7XG4gICAgICAgICAgICB0aGlzLl9zdGVwbmFtZSA9IHN0ZXBkYXRhLmRlc2M7XG4gICAgICAgICAgICB0aGlzLm1fbF9zdGVwdGl0bGUuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwi5a6M5oiQJWTlhbMg5q615L2N5o+Q5Y2HXCIsIGx2KTtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdGVwaWNvbi5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcGFfbGlzdC5nZXRTcHJpdGVGcmFtZShzdGVwZGF0YS5pY29uX3BhdGgpO1xuICAgICAgICAgICAgdGhpcy5tX3NwX3N0ZXBuYW1lLnNwcml0ZUZyYW1lID0gdGhpcy5tX3NwYV9saXN0LmdldFNwcml0ZUZyYW1lKHN0ZXBkYXRhLmRlc2NfcGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICB9XG5cbiAgICBzZXRTaG93QnRuVmlzaWJsZShib28pIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9zdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tX25fc3Rhcmxpc3RbaV0uYWN0aXZlID0gYm9vO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9zcF9zdGVwaWNvbi5ub2RlLmFjdGl2ZSA9IGJvbztcbiAgICAgICAgdGhpcy5tX3NwX3N0ZXBuYW1lLm5vZGUuYWN0aXZlID0gYm9vO1xuICAgIH1cblxuICAgIG9uU2hhcmVTdGVwKCkge1xuICAgICAgICB0aGlzLl9vbnNob3diYWNrID0gdHJ1ZTtcbiAgICAgICAgU2hhcmVTRGsuc2hhcmVBcHBNZXNzYWdlKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIua2iOmZpOauteS9jeWNh+e6p+WIsOOAkFwiICsgdGhpcy5fc3RlcG5hbWUgKyBcIuOAkSzkuIDotbfmnaXop4Hor4HlkKdcIixcbiAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=
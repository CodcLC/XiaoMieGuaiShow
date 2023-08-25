
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/BigStepItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxCaWdTdGVwSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ00sSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUEyQ0M7UUF2Q0csbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFHaEMsY0FBUSxHQUFZLElBQUksQ0FBQztRQUd6QixtQkFBYSxHQUFhLElBQUksQ0FBQztRQUcvQixrQkFBWSxHQUFjLEVBQUUsQ0FBQzs7UUEwQjdCLGlCQUFpQjtJQUNyQixDQUFDO0lBekJHLDJCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFpQjtRQUFqQixzQkFBQSxFQUFBLFNBQWlCO1FBQ3hELElBQUksU0FBUyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxJQUFJLEVBQUU7WUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQztZQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQy9DO1lBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssRUFBRTtnQkFDakIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUNyQztTQUNKO0lBQ0wsQ0FBQztJQXBDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3NEQUNZO0lBR2hDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ1k7SUFHaEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDTztJQUd6QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNZO0lBRy9CO1FBREMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO3FEQUNTO0lBaEJaLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0EyQy9CO0lBQUQsa0JBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBMkNwRDtrQkEzQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCaWdTdGVwSXRlbSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbV9zcF9zdGVwaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gICAgbV9zcF9zdGVwbmFtZTogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIG1fbl9sb2NrOiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBtX2xfY29uZGl0aW9uOiBjYy5MYWJlbCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoW2NjLk5vZGVdKVxuICAgIG1fbl9zdGFybGlzdDogY2MuTm9kZVtdID0gW107XG5cbiAgICBzdGFydCgpIHtcblxuICAgIH1cblxuICAgIHVwZGF0ZURhdGEoZGF0YSwgc3BmcmFtZSwgc3BmcmFtZTEsIGN1cmx2LCBjb2xvcjogbnVtYmVyID0gMCkge1xuICAgICAgICBsZXQgY29sb3JsaXN0ID0gWycjMzNBQkVFJywgJyMzM0VFRUUnLCAnIzMzRUU5NCcsICcjQkFFNzg5J107XG4gICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURS5mcm9tSEVYKGNvbG9ybGlzdFtjb2xvcl0pO1xuICAgICAgICAgICAgdGhpcy5tX3NwX3N0ZXBpY29uLnNwcml0ZUZyYW1lID0gc3BmcmFtZTtcbiAgICAgICAgICAgIHRoaXMubV9zcF9zdGVwbmFtZS5zcHJpdGVGcmFtZSA9IHNwZnJhbWUxO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm1fbl9zdGFybGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3N0YXJsaXN0W2ldLmFjdGl2ZSA9IGkgPCBkYXRhLnN0YXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9sb2NrLmFjdGl2ZSA9IGRhdGEubHYgPiBjdXJsdjtcbiAgICAgICAgICAgIGlmIChkYXRhLmx2ID4gY3VybHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbF9jb25kaXRpb24ubm9kZS55ID0gLTMzO1xuICAgICAgICAgICAgICAgIHRoaXMubV9sX2NvbmRpdGlvbi5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCLpnIDpgJrlhbMlZOWFs1wiLCBkYXRhLmx2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2xfY29uZGl0aW9uLm5vZGUueSA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5tX2xfY29uZGl0aW9uLnN0cmluZyA9IFwi5bey6I635b6XXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19
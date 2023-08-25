
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/PlatformCom.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80373H/aPBOV7m+lx9Wa0iH', 'PlatformCom');
// Script/common/PlatformCom.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
// var Utils = require("Utils");
// var ShareSdk = require("ShareSdk");
cc.Class({
  "extends": cc.Component,
  properties: {// foo: {
    //     // ATTRIBUTES:
    //     default: null,        // The default value will be used only when the component attaching
    //                           // to a node for the first time
    //     type: cc.SpriteFrame, // optional, default is typeof default
    //     serializable: true,   // optional, default is true
    // },
    // bar: {
    //     get () {
    //         return this._bar;
    //     },
    //     set (value) {
    //         this._bar = value;
    //     }
    // },
    // m_rqcode: cc.Node,
    // m_maskbg: cc.Node,
    // m_tips: cc.Node,
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.node.zindex = 100; //设置z轴的位置

    var size = cc.view.getVisibleSize(); // this.m_maskbg.width = size.width;
    // this.m_maskbg.height = size.height;

    this.m_callbackobj = null;
  },
  start: function start() {},
  onImageBtnClick: function onImageBtnClick() {
    // this.m_rqcode.active = !this.m_rqcode.active;
    wx.previewImage({
      urls: ['https://h5game.gametall.com/chatgame/cocos_games_res/images/codeImage.jpg']
    });
  },
  onSaveImageBtnClick: function onSaveImageBtnClick() {
    if (window.isWeChatPlatform) {
      var self = this;
      wx.saveImageToPhotosAlbum({
        filePath: cc.url.raw('resources/common/saveImage.d2e1c.jpg'),
        success: function success(res) {
          self.showTipsView("二维码已保存成功");
        },
        fail: function fail(res) {
          wx.openSetting({
            authSetting: 'scope.writePhotosAlbum',
            success: function success() {// console.log("======openSetting success=============");
            },
            fail: function fail() {// console.log("======openSetting fail=============");
            }
          });
        }
      });
    }
  },
  onCloseBtnClick: function onCloseBtnClick() {
    this.m_rqcode.active = false;
  },
  hideTipsView: function hideTipsView() {
    this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = '';
    this.m_tips.active = false;
  },
  showTipsView: function showTipsView(text) {
    this.m_tips.getChildByName("TipsTex").getComponent(cc.Label).string = text;
    this.m_tips.active = true;
  } // update (dt) {},

});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFBsYXRmb3JtQ29tLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwibm9kZSIsInppbmRleCIsInNpemUiLCJ2aWV3IiwiZ2V0VmlzaWJsZVNpemUiLCJtX2NhbGxiYWNrb2JqIiwic3RhcnQiLCJvbkltYWdlQnRuQ2xpY2siLCJ3eCIsInByZXZpZXdJbWFnZSIsInVybHMiLCJvblNhdmVJbWFnZUJ0bkNsaWNrIiwid2luZG93IiwiaXNXZUNoYXRQbGF0Zm9ybSIsInNlbGYiLCJzYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtIiwiZmlsZVBhdGgiLCJ1cmwiLCJyYXciLCJzdWNjZXNzIiwicmVzIiwic2hvd1RpcHNWaWV3IiwiZmFpbCIsIm9wZW5TZXR0aW5nIiwiYXV0aFNldHRpbmciLCJvbkNsb3NlQnRuQ2xpY2siLCJtX3JxY29kZSIsImFjdGl2ZSIsImhpZGVUaXBzVmlldyIsIm1fdGlwcyIsImdldENoaWxkQnlOYW1lIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLENBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbEJRLEdBSFA7QUF3Qkw7QUFFQUMsRUFBQUEsTUExQkssb0JBMEJJO0FBQ0wsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLEdBQW5CLENBREssQ0FDc0I7O0FBQzNCLFFBQUlDLElBQUksR0FBR1AsRUFBRSxDQUFDUSxJQUFILENBQVFDLGNBQVIsRUFBWCxDQUZLLENBR0w7QUFDQTs7QUFDQSxTQUFLQyxhQUFMLEdBQXFCLElBQXJCO0FBQ0gsR0FoQ0k7QUFrQ0xDLEVBQUFBLEtBbENLLG1CQWtDRyxDQUVQLENBcENJO0FBc0NMQyxFQUFBQSxlQXRDSyw2QkFzQ2E7QUFDZDtBQUNBQyxJQUFBQSxFQUFFLENBQUNDLFlBQUgsQ0FBZ0I7QUFDWkMsTUFBQUEsSUFBSSxFQUFDLENBQUMsMkVBQUQ7QUFETyxLQUFoQjtBQUdILEdBM0NJO0FBNkNMQyxFQUFBQSxtQkE3Q0ssaUNBNkNpQjtBQUNsQixRQUFJQyxNQUFNLENBQUNDLGdCQUFYLEVBQTZCO0FBQ3pCLFVBQUlDLElBQUksR0FBRyxJQUFYO0FBQ0FOLE1BQUFBLEVBQUUsQ0FBQ08sc0JBQUgsQ0FBMEI7QUFDdEJDLFFBQUFBLFFBQVEsRUFBRXJCLEVBQUUsQ0FBQ3NCLEdBQUgsQ0FBT0MsR0FBUCxDQUFXLHNDQUFYLENBRFk7QUFFdEJDLFFBQUFBLE9BRnNCLG1CQUVkQyxHQUZjLEVBRVQ7QUFDVE4sVUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCLFVBQWxCO0FBQ0gsU0FKcUI7QUFLdEJDLFFBQUFBLElBTHNCLGdCQUtqQkYsR0FMaUIsRUFLWjtBQUNOWixVQUFBQSxFQUFFLENBQUNlLFdBQUgsQ0FBZTtBQUNYQyxZQUFBQSxXQUFXLEVBQUUsd0JBREY7QUFFWEwsWUFBQUEsT0FGVyxxQkFFRCxDQUNOO0FBQ0gsYUFKVTtBQUtYRyxZQUFBQSxJQUxXLGtCQUtKLENBQ0g7QUFDSDtBQVBVLFdBQWY7QUFTSDtBQWZxQixPQUExQjtBQWlCSDtBQUNKLEdBbEVJO0FBb0VMRyxFQUFBQSxlQXBFSyw2QkFvRWE7QUFDZCxTQUFLQyxRQUFMLENBQWNDLE1BQWQsR0FBdUIsS0FBdkI7QUFDSCxHQXRFSTtBQXdFTEMsRUFBQUEsWUFBWSxFQUFFLHdCQUFZO0FBQ3RCLFNBQUtDLE1BQUwsQ0FBWUMsY0FBWixDQUEyQixTQUEzQixFQUFzQ0MsWUFBdEMsQ0FBbURwQyxFQUFFLENBQUNxQyxLQUF0RCxFQUE2REMsTUFBN0QsR0FBc0UsRUFBdEU7QUFDQSxTQUFLSixNQUFMLENBQVlGLE1BQVosR0FBcUIsS0FBckI7QUFDSCxHQTNFSTtBQTZFTE4sRUFBQUEsWUFBWSxFQUFFLHNCQUFVYSxJQUFWLEVBQWdCO0FBQzFCLFNBQUtMLE1BQUwsQ0FBWUMsY0FBWixDQUEyQixTQUEzQixFQUFzQ0MsWUFBdEMsQ0FBbURwQyxFQUFFLENBQUNxQyxLQUF0RCxFQUE2REMsTUFBN0QsR0FBc0VDLElBQXRFO0FBQ0EsU0FBS0wsTUFBTCxDQUFZRixNQUFaLEdBQXFCLElBQXJCO0FBQ0gsR0FoRkksQ0FrRkw7O0FBbEZLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyB2YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG4vLyB2YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgIC8vIEFUVFJJQlVURVM6XG4gICAgICAgIC8vICAgICBkZWZhdWx0OiBudWxsLCAgICAgICAgLy8gVGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB1c2VkIG9ubHkgd2hlbiB0aGUgY29tcG9uZW50IGF0dGFjaGluZ1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbm9kZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgLy8gICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICAgc2VyaWFsaXphYmxlOiB0cnVlLCAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gYmFyOiB7XG4gICAgICAgIC8vICAgICBnZXQgKCkge1xuICAgICAgICAvLyAgICAgICAgIHJldHVybiB0aGlzLl9iYXI7XG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc2V0ICh2YWx1ZSkge1xuICAgICAgICAvLyAgICAgICAgIHRoaXMuX2JhciA9IHZhbHVlO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyBtX3JxY29kZTogY2MuTm9kZSxcbiAgICAgICAgLy8gbV9tYXNrYmc6IGNjLk5vZGUsXG4gICAgICAgIC8vIG1fdGlwczogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS56aW5kZXggPSAxMDA7ICAgIC8v6K6+572ueui9tOeahOS9jee9rlxuICAgICAgICB2YXIgc2l6ZSA9IGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKVxuICAgICAgICAvLyB0aGlzLm1fbWFza2JnLndpZHRoID0gc2l6ZS53aWR0aDtcbiAgICAgICAgLy8gdGhpcy5tX21hc2tiZy5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgdGhpcy5tX2NhbGxiYWNrb2JqID0gbnVsbDtcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG5cbiAgICB9LFxuXG4gICAgb25JbWFnZUJ0bkNsaWNrKCkge1xuICAgICAgICAvLyB0aGlzLm1fcnFjb2RlLmFjdGl2ZSA9ICF0aGlzLm1fcnFjb2RlLmFjdGl2ZTtcbiAgICAgICAgd3gucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgIHVybHM6WydodHRwczovL2g1Z2FtZS5nYW1ldGFsbC5jb20vY2hhdGdhbWUvY29jb3NfZ2FtZXNfcmVzL2ltYWdlcy9jb2RlSW1hZ2UuanBnJ10sXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uU2F2ZUltYWdlQnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh3aW5kb3cuaXNXZUNoYXRQbGF0Zm9ybSkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgd3guc2F2ZUltYWdlVG9QaG90b3NBbGJ1bSh7XG4gICAgICAgICAgICAgICAgZmlsZVBhdGg6IGNjLnVybC5yYXcoJ3Jlc291cmNlcy9jb21tb24vc2F2ZUltYWdlLmQyZTFjLmpwZycpLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd1RpcHNWaWV3KFwi5LqM57u056CB5bey5L+d5a2Y5oiQ5YqfXCIpXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsKHJlcykge1xuICAgICAgICAgICAgICAgICAgICB3eC5vcGVuU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRoU2V0dGluZzogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIj09PT09PW9wZW5TZXR0aW5nIHN1Y2Nlc3M9PT09PT09PT09PT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT1vcGVuU2V0dGluZyBmYWlsPT09PT09PT09PT09PVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25DbG9zZUJ0bkNsaWNrKCkge1xuICAgICAgICB0aGlzLm1fcnFjb2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBoaWRlVGlwc1ZpZXc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tX3RpcHMuZ2V0Q2hpbGRCeU5hbWUoXCJUaXBzVGV4XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gJyc7XG4gICAgICAgIHRoaXMubV90aXBzLmFjdGl2ZSA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICBzaG93VGlwc1ZpZXc6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgIHRoaXMubV90aXBzLmdldENoaWxkQnlOYW1lKFwiVGlwc1RleFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHRleHQ7XG4gICAgICAgIHRoaXMubV90aXBzLmFjdGl2ZSA9IHRydWU7XG4gICAgfSxcblxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxufSk7XG4iXX0=
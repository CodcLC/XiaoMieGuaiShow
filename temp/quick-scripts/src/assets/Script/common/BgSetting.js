"use strict";
cc._RF.push(module, '49ca5JK7uVAzoTD1isE+1TU', 'BgSetting');
// Script/common/BgSetting.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  start: function start() {
    var size = cc.winSize;
    var content = this.node.getContentSize();
    this.node.scaleX = size.width / content.width;
    this.node.scaleY = size.height / content.height; // this.node.position = cc.v2(0,0);

    window.adapt_scaleX = this.node.scaleX;
    window.adapt_scaleY = this.node.scaleY;
  }
});

cc._RF.pop();
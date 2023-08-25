"use strict";
cc._RF.push(module, '1f50fDEmn1NhKZ+3jOght5I', 'BlockBGItem');
// Script/item/BlockBGItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_bright: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  setBrightVisible: function setBrightVisible(boo, color) {
    this.m_n_bright.active = boo;

    if (color) {
      this.m_n_bright.color = cc.Color.WHITE.fromHEX(color);
    }
  } // update (dt) {},

});

cc._RF.pop();
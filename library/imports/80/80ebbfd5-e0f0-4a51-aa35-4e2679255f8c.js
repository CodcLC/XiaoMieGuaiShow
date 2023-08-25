"use strict";
cc._RF.push(module, '80ebb/V4PBKUao1TiZ5JV+M', 'RockItem');
// Script/item/RockItem.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_partice: cc.ParticleSystem
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {},
  resetSytem: function resetSytem() {
    this.m_partice.resetSystem();
  } // update (dt) {},

});

cc._RF.pop();
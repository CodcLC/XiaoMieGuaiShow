"use strict";
cc._RF.push(module, 'e7b1eTTmSVB34RRUkqvGDNv', 'BlockItem');
// Script/item/BlockItem.js

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
cc.Class({
  "extends": cc.Component,
  properties: {
    _hp: 0,
    _type: 0,
    _tag: 0,
    m_sp_strong: cc.Node,
    m_sp_hurt: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {},
  start: function start() {},
  initType: function initType(type, tag) {
    this._type = type;
    this._tag = tag;

    if (window.BLOCKLIST[type][tag]) {
      this._hp = window.BLOCKLIST[type][tag].hp;
    }

    this.node.scale = 1;
    this.node.opacity = 255;
    this._tostrong = false;
    this.m_sp_strong.active = false;
    this.m_sp_hurt.active = false;
  },
  showHurt: function showHurt(hurt) {
    if (this._type == 1) {
      this.m_sp_hurt.active = true;
      this.m_sp_hurt.getComponent(cc.Sprite).spriteFrame = hurt;
    }
  },
  setSpriteFrame: function setSpriteFrame(sf) {
    this.node.getComponent(cc.Sprite).spriteFrame = sf;
  },
  getHp: function getHp() {
    return this._hp;
  },
  getTag: function getTag() {
    return this._tag;
  },
  addStrong: function addStrong() {
    var _this = this;

    if (this._tostrong) return false;
    this._tostrong = true;
    this._hp = this._hp + this._hp;
    this.m_sp_strong.scale = 0;
    this.m_sp_strong.active = true;
    this.m_sp_strong.stopAllActions();
    this.m_sp_strong.runAction(cc.sequence(cc.scaleTo(0.5, 1, 1).easing(cc.easeIn(2.0)), cc.callFunc(function () {
      _this.m_sp_strong.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 0.9, 0.9), cc.scaleTo(0.5, 1.0, 1.0))));
    })));
    return true;
  } // update (dt) {},

});

cc._RF.pop();

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/item/MonsterItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd58clmrdZOZpvuvyzBbabD', 'MonsterItem');
// Script/item/MonsterItem.js

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
var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    _mon_id: 0,
    _hp: 0,
    m_n_talk: cc.Node,
    m_l_talk: cc.Label,
    m_n_bloodmask: cc.Node,
    m_sp_blood: cc.Node,
    m_l_blood: cc.Label,
    m_n_behit: cc.Node,
    m_n_stand: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {// this.m_n_talk.active = false;
  },
  initType: function initType(monsterid, hp, level) {
    this._mon_id = monsterid;
    this._hp = hp;
    this._all_hp = hp;
    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this.m_sp_blood.width;
    this._noangry = true;
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");

    if (typeof window.MONSTER_CONFIG[monsterid] != "undefined") {
      this.node.scale = window.MONSTER_CONFIG[monsterid].scale;

      if (level % 5 == 0) {
        this.node.scale = window.MONSTER_CONFIG[monsterid].scale + 0.8;
      }

      this.m_n_bloodmask.parent.y = window.MONSTER_CONFIG[monsterid].bloodheight + 10; // console.log(this.m_n_bloodmask.parent.y);
    }
  },
  reduceHp: function reduceHp(hp) {
    this._hp -= hp;
    if (this._hp < 0) this._hp = 0;
    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
    return this._hp;
  },
  addHp: function addHp(hp) {
    this._hp += hp;

    if (this._hp > this._all_hp) {
      this._all_hp = this._hp;
    }

    this.m_l_blood.string = this._hp;
    this.m_n_bloodmask.width = this._hp / this._all_hp * this.m_sp_blood.width;
    return this._hp;
  },
  playBeHitEffect: function playBeHitEffect() {
    this.m_n_behit.getComponent(cc.Animation).play("behit_effect");
  },
  playBeHit: function playBeHit() {
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "hit");
    this.playBeHitEffect();
  },
  playBeHapply: function playBeHapply() {
    var suff = "move";

    if (this._mon_id == 0) {
      suff = "stand";
    }

    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + suff);
  },
  beHitFinish: function beHitFinish() {
    this.node.getComponent(cc.Animation).play("monster" + this._mon_id + "stand");
  },
  playNormal: function playNormal() {
    this.talkNormal();
  },
  playAttack: function playAttack() {
    this.playBeHapply();
    this.talkAttack();
  },
  playDead: function playDead() {
    this.node.runAction(cc.fadeOut(3.0));
    this.m_n_stand.runAction(cc.fadeOut(3.0));
    this.schedule(function () {
      // 这里的 this 指向 component
      this.playBeHit();
    }, 0.3, 2, 0);
    this.talkFail();
    return 3000;
  },
  playStartTalk: function playStartTalk() {
    this.playBeHapply();
    this.talkStart();
    this.m_n_stand.opacity = 100;
  },
  playMonsterVictory: function playMonsterVictory() {
    this.playBeHapply();
    this.talkVictory();
  },
  playHappyTalk: function playHappyTalk() {
    this.talkHappy();
    this.playBeHapply();
  },
  playAngry: function playAngry() {
    if (this._noangry) {
      this.talkAngry();
      this._noangry = false;
    }
  },
  talkHappy: function talkHappy(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].happy_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].happy_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkStart: function talkStart(id) {
    // console.log("talkStart", id, this._mon_id);
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].start_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].start_talk[id]; // console.log("talktext", talktext);

      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkAngry: function talkAngry(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].angry_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].angry_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkFail: function talkFail(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].fail_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].fail_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkVictory: function talkVictory(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].victoy_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].victoy_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkNormal: function talkNormal(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].normal_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].normal_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
  },
  talkAttack: function talkAttack(id) {
    if (window.MONSTER_CONFIG[this._mon_id]) {
      this.m_n_talk.active = true;

      if (typeof id != 'number') {
        id = Utils.random(0, window.MONSTER_CONFIG[this._mon_id].attack_talk.length);
      }

      var talktext = window.MONSTER_CONFIG[this._mon_id].attack_talk[id];
      this.m_l_talk.string = talktext;
      this.m_n_talk.getComponent(cc.Animation).play('bubbleanim');
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxpdGVtXFxNb25zdGVySXRlbS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIl9tb25faWQiLCJfaHAiLCJtX25fdGFsayIsIk5vZGUiLCJtX2xfdGFsayIsIkxhYmVsIiwibV9uX2Jsb29kbWFzayIsIm1fc3BfYmxvb2QiLCJtX2xfYmxvb2QiLCJtX25fYmVoaXQiLCJtX25fc3RhbmQiLCJzdGFydCIsImluaXRUeXBlIiwibW9uc3RlcmlkIiwiaHAiLCJsZXZlbCIsIl9hbGxfaHAiLCJzdHJpbmciLCJ3aWR0aCIsIl9ub2FuZ3J5Iiwibm9kZSIsImdldENvbXBvbmVudCIsIkFuaW1hdGlvbiIsInBsYXkiLCJ3aW5kb3ciLCJNT05TVEVSX0NPTkZJRyIsInNjYWxlIiwicGFyZW50IiwieSIsImJsb29kaGVpZ2h0IiwicmVkdWNlSHAiLCJhZGRIcCIsInBsYXlCZUhpdEVmZmVjdCIsInBsYXlCZUhpdCIsInBsYXlCZUhhcHBseSIsInN1ZmYiLCJiZUhpdEZpbmlzaCIsInBsYXlOb3JtYWwiLCJ0YWxrTm9ybWFsIiwicGxheUF0dGFjayIsInRhbGtBdHRhY2siLCJwbGF5RGVhZCIsInJ1bkFjdGlvbiIsImZhZGVPdXQiLCJzY2hlZHVsZSIsInRhbGtGYWlsIiwicGxheVN0YXJ0VGFsayIsInRhbGtTdGFydCIsIm9wYWNpdHkiLCJwbGF5TW9uc3RlclZpY3RvcnkiLCJ0YWxrVmljdG9yeSIsInBsYXlIYXBweVRhbGsiLCJ0YWxrSGFwcHkiLCJwbGF5QW5ncnkiLCJ0YWxrQW5ncnkiLCJpZCIsImFjdGl2ZSIsInJhbmRvbSIsImhhcHB5X3RhbGsiLCJsZW5ndGgiLCJ0YWxrdGV4dCIsInN0YXJ0X3RhbGsiLCJhbmdyeV90YWxrIiwiZmFpbF90YWxrIiwidmljdG95X3RhbGsiLCJub3JtYWxfdGFsayIsImF0dGFja190YWxrIl0sIm1hcHBpbmdzIjoiOzs7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Q0FBOEMsWUFBOUM7QUFDSDtBQUNKLEdBL01JLENBZ05MOztBQWhOSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xuY2MuQ2xhc3Moe1xuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgX21vbl9pZDogMCxcbiAgICAgICAgX2hwOiAwLFxuICAgICAgICBtX25fdGFsazogY2MuTm9kZSxcbiAgICAgICAgbV9sX3RhbGs6IGNjLkxhYmVsLFxuICAgICAgICBtX25fYmxvb2RtYXNrOiBjYy5Ob2RlLFxuICAgICAgICBtX3NwX2Jsb29kOiBjYy5Ob2RlLFxuICAgICAgICBtX2xfYmxvb2Q6IGNjLkxhYmVsLFxuICAgICAgICBtX25fYmVoaXQ6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9zdGFuZDogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICAvLyBvbkxvYWQgKCkge30sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgLy8gdGhpcy5tX25fdGFsay5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgaW5pdFR5cGUobW9uc3RlcmlkLCBocCwgbGV2ZWwpIHtcbiAgICAgICAgdGhpcy5fbW9uX2lkID0gbW9uc3RlcmlkO1xuICAgICAgICB0aGlzLl9ocCA9IGhwO1xuICAgICAgICB0aGlzLl9hbGxfaHAgPSBocDtcbiAgICAgICAgdGhpcy5tX2xfYmxvb2Quc3RyaW5nID0gdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9uX2Jsb29kbWFzay53aWR0aCA9IHRoaXMubV9zcF9ibG9vZC53aWR0aDtcbiAgICAgICAgdGhpcy5fbm9hbmdyeSA9IHRydWU7XG4gICAgICAgIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KFwibW9uc3RlclwiICsgdGhpcy5fbW9uX2lkICsgXCJzdGFuZFwiKTtcbiAgICAgICAgaWYgKHR5cGVvZiAod2luZG93Lk1PTlNURVJfQ09ORklHW21vbnN0ZXJpZF0pICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1ttb25zdGVyaWRdLnNjYWxlO1xuICAgICAgICAgICAgaWYgKGxldmVsICUgNSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gd2luZG93Lk1PTlNURVJfQ09ORklHW21vbnN0ZXJpZF0uc2NhbGUgKyAwLjg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9ibG9vZG1hc2sucGFyZW50LnkgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbbW9uc3RlcmlkXS5ibG9vZGhlaWdodCArIDEwO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5tX25fYmxvb2RtYXNrLnBhcmVudC55KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZWR1Y2VIcChocCkge1xuICAgICAgICB0aGlzLl9ocCAtPSBocDtcbiAgICAgICAgaWYgKHRoaXMuX2hwIDwgMCkgdGhpcy5faHAgPSAwO1xuICAgICAgICB0aGlzLm1fbF9ibG9vZC5zdHJpbmcgPSB0aGlzLl9ocDtcbiAgICAgICAgdGhpcy5tX25fYmxvb2RtYXNrLndpZHRoID0gdGhpcy5faHAgLyB0aGlzLl9hbGxfaHAgKiB0aGlzLm1fc3BfYmxvb2Qud2lkdGg7XG4gICAgICAgIHJldHVybiB0aGlzLl9ocDtcbiAgICB9LFxuXG4gICAgYWRkSHAoaHApIHtcbiAgICAgICAgdGhpcy5faHAgKz0gaHA7XG4gICAgICAgIGlmICh0aGlzLl9ocCA+IHRoaXMuX2FsbF9ocCkge1xuICAgICAgICAgICAgdGhpcy5fYWxsX2hwID0gdGhpcy5faHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tX2xfYmxvb2Quc3RyaW5nID0gdGhpcy5faHA7XG4gICAgICAgIHRoaXMubV9uX2Jsb29kbWFzay53aWR0aCA9IHRoaXMuX2hwIC8gdGhpcy5fYWxsX2hwICogdGhpcy5tX3NwX2Jsb29kLndpZHRoO1xuICAgICAgICByZXR1cm4gdGhpcy5faHA7XG4gICAgfSxcblxuICAgIHBsYXlCZUhpdEVmZmVjdCgpIHtcbiAgICAgICAgdGhpcy5tX25fYmVoaXQuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJlaGl0X2VmZmVjdFwiKTtcbiAgICB9LFxuXG4gICAgcGxheUJlSGl0KCkge1xuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcIm1vbnN0ZXJcIiArIHRoaXMuX21vbl9pZCArIFwiaGl0XCIpO1xuICAgICAgICB0aGlzLnBsYXlCZUhpdEVmZmVjdCgpO1xuICAgIH0sXG5cbiAgICBwbGF5QmVIYXBwbHkoKSB7XG4gICAgICAgIGxldCBzdWZmID0gXCJtb3ZlXCI7XG4gICAgICAgIGlmICh0aGlzLl9tb25faWQgPT0gMCkge1xuICAgICAgICAgICAgc3VmZiA9IFwic3RhbmRcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcIm1vbnN0ZXJcIiArIHRoaXMuX21vbl9pZCArIHN1ZmYpO1xuICAgIH0sXG5cbiAgICBiZUhpdEZpbmlzaCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoXCJtb25zdGVyXCIgKyB0aGlzLl9tb25faWQgKyBcInN0YW5kXCIpO1xuICAgIH0sXG5cbiAgICBwbGF5Tm9ybWFsKCkge1xuICAgICAgICB0aGlzLnRhbGtOb3JtYWwoKTtcbiAgICB9LFxuXG4gICAgcGxheUF0dGFjaygpIHtcbiAgICAgICAgdGhpcy5wbGF5QmVIYXBwbHkoKTtcbiAgICAgICAgdGhpcy50YWxrQXR0YWNrKCk7XG4gICAgfSxcblxuICAgIHBsYXlEZWFkKCkge1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLmZhZGVPdXQoMy4wKSk7XG4gICAgICAgIHRoaXMubV9uX3N0YW5kLnJ1bkFjdGlvbihjYy5mYWRlT3V0KDMuMCkpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIOi/memHjOeahCB0aGlzIOaMh+WQkSBjb21wb25lbnRcbiAgICAgICAgICAgIHRoaXMucGxheUJlSGl0KCk7XG4gICAgICAgIH0sIDAuMywgMiwgMCk7XG4gICAgICAgIHRoaXMudGFsa0ZhaWwoKTtcbiAgICAgICAgcmV0dXJuIDMwMDA7XG4gICAgfSxcblxuICAgIHBsYXlTdGFydFRhbGsoKSB7XG4gICAgICAgIHRoaXMucGxheUJlSGFwcGx5KCk7XG4gICAgICAgIHRoaXMudGFsa1N0YXJ0KCk7XG4gICAgICAgIHRoaXMubV9uX3N0YW5kLm9wYWNpdHkgPSAxMDA7XG4gICAgfSxcblxuICAgIHBsYXlNb25zdGVyVmljdG9yeSgpIHtcbiAgICAgICAgdGhpcy5wbGF5QmVIYXBwbHkoKTtcbiAgICAgICAgdGhpcy50YWxrVmljdG9yeSgpO1xuICAgIH0sXG5cbiAgICBwbGF5SGFwcHlUYWxrKCkge1xuICAgICAgICB0aGlzLnRhbGtIYXBweSgpO1xuICAgICAgICB0aGlzLnBsYXlCZUhhcHBseSgpO1xuICAgIH0sXG5cbiAgICBwbGF5QW5ncnkoKSB7XG4gICAgICAgIGlmICh0aGlzLl9ub2FuZ3J5KSB7XG4gICAgICAgICAgICB0aGlzLnRhbGtBbmdyeSgpO1xuICAgICAgICAgICAgdGhpcy5fbm9hbmdyeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtIYXBweShpZCkge1xuICAgICAgICBpZiAod2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0pIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGlkKSAhPSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGlkID0gVXRpbHMucmFuZG9tKDAsIHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmhhcHB5X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmhhcHB5X3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtTdGFydChpZCkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRhbGtTdGFydFwiLCBpZCwgdGhpcy5fbW9uX2lkKTtcbiAgICAgICAgaWYgKHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIChpZCkgIT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpZCA9IFV0aWxzLnJhbmRvbSgwLCB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5zdGFydF90YWxrLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGFsa3RleHQgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5zdGFydF90YWxrW2lkXTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidGFsa3RleHRcIiwgdGFsa3RleHQpO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtBbmdyeShpZCkge1xuICAgICAgICBpZiAod2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0pIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKGlkKSAhPSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgIGlkID0gVXRpbHMucmFuZG9tKDAsIHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmFuZ3J5X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmFuZ3J5X3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtGYWlsKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0uZmFpbF90YWxrLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGFsa3RleHQgPSB3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXS5mYWlsX3RhbGtbaWRdO1xuICAgICAgICAgICAgdGhpcy5tX2xfdGFsay5zdHJpbmcgPSB0YWxrdGV4dDtcbiAgICAgICAgICAgIHRoaXMubV9uX3RhbGsuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheSgnYnViYmxlYW5pbScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRhbGtWaWN0b3J5KGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0udmljdG95X3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLnZpY3RveV90YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0YWxrTm9ybWFsKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0ubm9ybWFsX3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLm5vcm1hbF90YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0YWxrQXR0YWNrKGlkKSB7XG4gICAgICAgIGlmICh3aW5kb3cuTU9OU1RFUl9DT05GSUdbdGhpcy5fbW9uX2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tX25fdGFsay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiAoaWQpICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBVdGlscy5yYW5kb20oMCwgd2luZG93Lk1PTlNURVJfQ09ORklHW3RoaXMuX21vbl9pZF0uYXR0YWNrX3RhbGsubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCB0YWxrdGV4dCA9IHdpbmRvdy5NT05TVEVSX0NPTkZJR1t0aGlzLl9tb25faWRdLmF0dGFja190YWxrW2lkXTtcbiAgICAgICAgICAgIHRoaXMubV9sX3RhbGsuc3RyaW5nID0gdGFsa3RleHQ7XG4gICAgICAgICAgICB0aGlzLm1fbl90YWxrLmdldENvbXBvbmVudChjYy5BbmltYXRpb24pLnBsYXkoJ2J1YmJsZWFuaW0nKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gdXBkYXRlIChkdCkge30sXG59KTtcbiJdfQ==
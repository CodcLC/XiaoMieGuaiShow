
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameMain.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e108aAONHJBsKqEpmBpBRLe', 'GameMain');
// Script/GameMain.js

"use strict";

var Utils = require("Utils");

var ShareSdk = require("ShareSdk");

var RankList = require("RankList");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_gamenode: cc.Node,
    m_n_bg_panel: cc.Node,
    m_pre_blockbg: cc.Prefab,
    m_pre_light: cc.Prefab,
    m_pre_boomeffect: cc.Prefab,
    m_pre_boom: cc.Prefab,
    m_l_boomnum: cc.Label,
    m_l_score: cc.Label,
    m_sp_monster: cc.Sprite,
    m_l_level: cc.Label,
    m_n_result_panel: cc.Node,
    m_btn_tool2: cc.Node,
    m_n_guidemask: cc.Node,
    m_n_tooluse: cc.Node,
    m_n_showtime: {
      type: cc.Node,
      "default": []
    },
    m_spf_gold: cc.SpriteFrame,
    m_n_askpanel: cc.Node,
    m_n_boss: cc.Node,
    m_spriteAtlas: cc.SpriteAtlas,
    m_n_bglist: cc.Node,
    m_l_gold: cc.Label,
    m_pre_rock: cc.Prefab,
    m_n_kuai: {
      type: cc.Node,
      "default": []
    },
    m_n_displaycheck: cc.Node,
    m_n_displayrank: cc.Node,
    m_n_stepview: cc.Node,
    m_n_reliveview: cc.Node,
    m_n_video: cc.Node,
    m_n_lookvideo: cc.Node,
    m_n_luckyvideo: cc.Node,
    m_n_doublevideo: cc.Node,
    m_n_doublescore: cc.Node,
    m_n_sharegift: cc.Node,
    m_n_skinpanel: cc.Node,
    m_n_guidenode: cc.Node,
    m_l_asktype: cc.Label,
    m_n_guidefiger: cc.Node
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.GAME_CONTROL = this;
    Utils.setDesignResolution();
  },
  onDestroy: function onDestroy() {
    this.m_block_pool.clear();
    this.m_light_pool.clear();
    window.GAME_CONTROL = null;

    if (this.m_bannerad) {
      this.m_bannerad.destroy();
      this.m_bannerad = null;
    }

    EVENT_LISTENER.off(window.GAME_UPDATE_DATA, this);
    EVENT_LISTENER.off(window.GAME_SAVE_HANDLER, this);
  },
  start: function start() {
    if (window.firstGame) window.firstGame = false;
    this.createMap();
    this.initData();
    this.initMonster(this.m_cur_level);
    this.showAdBanner(false);
    this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    EVENT_LISTENER.on(window.GAME_UPDATE_DATA, this.updateGold, this);
    EVENT_LISTENER.on(window.GAME_SAVE_HANDLER, this.updateSkin, this);
  },
  initData: function initData() {
    var _this = this;

    this.m_n_skinpanel.getComponent("SkinPanel").initData();
    this.m_n_displaycheck.active = true;
    this.m_n_displayrank.active = false;
    this.m_n_lookvideo.active = false;
    this.m_n_doublescore.active = false;
    this.m_gamestate = 0;
    this.m_cur_score = 0;
    this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
    this.m_normal_talktime = 4; //怪物说话间隔

    this.m_normal_curtime = -1;
    this.m_target_block = [];
    this.m_mapblink = false;
    this.m_touch_boom = false;
    this._relivenum = 0;
    this._videonum = 0;
    this._killnum = 0;
    this.m_l_score.string = this.m_cur_score;
    this.m_doublescore = 1; // this.m_l_solidernum.string = "X" + this.m_solidernum;

    this.m_l_level.string = "LV." + this.m_cur_level;
    this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
    this._isdeleting = false; //判断是否正在消除的依据

    this._isbless = false; //是否已经恩赐过

    this.m_block_pool = new cc.NodePool();
    this.m_light_pool = new cc.NodePool();
    this.updateToolsNum();
    this.schedule(function () {
      this.m_btn_tool2.runAction(cc.sequence(cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
      this.m_n_video.runAction(cc.sequence(cc.delayTime(1.0), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
      this.m_n_doublevideo.runAction(cc.sequence(cc.delayTime(2.0), cc.repeat(cc.sequence(cc.rotateTo(0.1, -10), cc.rotateTo(0.1, 10)), 3), cc.rotateTo(0.1, 0)));
    }, 5);
    this._configlist = this.m_n_kuai[0].getComponent("ShapeItem").getTheConfig();
    RankList.checkWillSurpass(this.m_cur_score);
    var rand = Utils.random(0, 1000);
    this.m_n_luckyvideo.active = rand <= 500 && this.m_cur_level > 1;

    if (this.m_n_luckyvideo.active) {
      //第一关不出现
      this.m_n_luckyvideo.scale = 0;
      this.m_n_luckyvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

      if (window.SKIN_SHARE) {
        var node = cc.find("btn_cancel", this.m_n_luckyvideo);
        node.y = -570;
        this.scheduleOnce(function () {
          node.y = -514;
          if (_this.m_n_luckyvideo.active && !_this.showAdb) _this.showAdBanner(true);
        }, 1.8);
      }
    }
  },
  hideGuide: function hideGuide() {
    if (this.m_cur_level == 1) {
      this.m_n_guidenode.active = false;
      this.m_n_guidefiger.stopAllActions();
      this.m_n_guidefiger.active = false;
      window.GUIDE_LEVEL = 1;
      cc.sys.localStorage.setItem('guideinfo', '1');
    }
  },
  showGuide: function showGuide() {
    var _this2 = this;

    if (!this._tempguide) {
      this._tempguide = true;
    } else {
      return;
    }

    var typeindex = 0;
    var indexlist = window.INIT_GAME_SAVE_DATA.skin;

    for (var i = 0; i < indexlist.length; i++) {
      if (indexlist[i] >= 2) {
        typeindex = i;
        break;
      }
    }

    var data = window.SKIN_CONFIG[typeindex];
    this.m_n_guidenode.active = true;
    this.m_n_guidefiger.active = true;
    this.m_n_guidefiger.position = this.m_n_kuai[1].position;
    this.m_n_guidefiger.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
      _this2.m_n_guidefiger.position = _this2.m_n_kuai[1].position;
    }), cc.moveTo(1.0, this.m_n_kuai[1].x, this.m_n_kuai[1].y + 350))));
    var index = this.m_n_kuai[0].getComponent("ShapeItem").getCurColorIndex();
    var blockindex = [];
    blockindex[46] = 1;
    blockindex[52] = 1;
    blockindex[53] = 1;
    blockindex[58] = 1;

    for (var _i = 43; _i < 61; _i++) {
      if (blockindex[_i]) {// this.m_maparray[i].getComponent("BlockBGItem").setBrightVisible(true, '#000000');
      } else {
        var node = new cc.Node("colorSpr");
        node.colorIndex = index;
        node.colorName = data.name;
        var sprite = node.addComponent(cc.Sprite);
        console.log(data.name, index);
        sprite.spriteFrame = this.m_spriteAtlas.getSpriteFrame(data.name + index);
        node.position = cc.Vec2.ZERO;
        node.parent = this.m_maparray[_i];
        this.m_maparray[_i].isHaveFK = true;
      }
    }
  },
  onKeepGoing: function onKeepGoing() {
    this.m_n_luckyvideo.active = false;
    this.showAdBanner(false);
  },
  touchEnd: function touchEnd(event) {
    if (this.m_gamestate == 0 && this.m_touch_boom) {
      this.m_gamestate = 2;
      var vec = event.touch.getLocation();
      vec = this.m_n_gamenode.convertToNodeSpace(vec);
      var index = this.backIndexofList(vec);

      if (index >= 0) {
        if (!this.m_maparray[index].isHaveFK) {
          this.m_maparray[index].isHaveFK = true;
          var node = cc.instantiate(this.m_pre_boom);
          node.parent = this.m_maparray[index];
          window.INIT_GAME_SAVE_DATA.tool[0] -= 1;
          this.updateToolsNum();
          this.doBoomAction(this.m_maparray[index].position, index);
        }
      }

      this.m_n_guidemask.active = !this.m_mapblink;
      this.m_touch_boom = !this.m_mapblink;
      this.setMapBlink(!this.m_mapblink);
      this.m_gamestate = 0;

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");

        if (shapeitem.checkIsLose()) {
          this.m_n_kuai[i].opacity = 125;
        } else {
          this.m_n_kuai[i].opacity = 255;
        }
      }
    }
  },
  doBoomAction: function doBoomAction(pos, index) {
    var _this3 = this;

    var FKNode = this.m_maparray[index].getChildByName("colorSpr"); //这个假方块变大并且渐隐掉

    FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
    this.m_maparray[index].isHaveFK = null;
    this.scheduleOnce(function () {
      var node = cc.instantiate(_this3.m_pre_boomeffect);
      node.parent = _this3.m_n_gamenode;
      node.position = pos;
      node.y -= 100;
      node.zIndex = 1 << 8;
      node.getComponent(cc.Animation).play("bombeffect");
      Utils.SetSoundEffect(window.BOOM_EFFECT, false, 1);
    }, 0.4);
    var list = this.getBoomIndexList(index);
    console.log(list);
    var count = 0;
    var actionAry = [];
    actionAry.push(cc.delayTime(0.4));

    for (var i = 0; i < list.length; i++) {
      var oneList = list[i];

      for (var j = 0; j < oneList.length; j++) {
        var xIndex = oneList[j];

        if (this.m_maparray[xIndex].isHaveFK) {
          actionAry.push(cc.callFunc(function () {
            var xIndex = arguments[1][0];
            var count = arguments[1][1];
            var score = this.getAddScoreCal(count);
            Utils.showHurtText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 20, null, null, null, true);
            this.updateScore(score);
          }, this, [xIndex, count]));
          actionAry.push(cc.callFunc(function () {
            var xIndex = arguments[1];
            this.m_maparray[xIndex].isHaveFK = null;
            var FKNode = this.m_maparray[xIndex].getChildByName("colorSpr");

            if (!FKNode) {
              return; //防止没有这个方块的时候
            }

            this.attackMonster(FKNode.colorIndex, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y); //这个假方块变大并且渐隐掉

            FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
          }, this, xIndex));
          count++;
        }
      }

      actionAry.push(cc.delayTime(0.3));
    }

    if (actionAry.length > 0) {
      // Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      actionAry.push(cc.callFunc(function () {
        this._isdeleting = false;
        this.checkIsLose();
      }, this));
      this._isdeleting = true;
      var action = cc.sequence(actionAry);
      this.node.runAction(action);
    }
  },

  /**
   * 根据炸弹下标获取范围引爆范围
   * @param {炸弹下标} index 
   */
  getBoomIndexList: function getBoomIndexList(index) {
    return window.boomrange[index];
  },
  bombFinish: function bombFinish() {},

  /**
   * 获取可以放置的方格 3个
   */
  getCanDropBlocks: function getCanDropBlocks() {
    var canDroplsit = [0, 0, 0];

    for (var k = this._configlist.length - 1; k >= 1; k--) {
      //一个个格子放试一下能不能放
      for (var i = 0; i < this.m_maparray.length; i++) {
        var frameNode = this.m_maparray[i];
        var srcPos = cc.v2(frameNode.x, frameNode.y);
        var count = 1;

        if (!frameNode.isHaveFK) {
          //这里做是否可以放的判断
          var children = this._configlist[k];

          for (var j = 1; j < children.length; j++) {
            var len = 52; //碰撞距离

            var childPos = srcPos.add(cc.v2(children[j].x, children[j].y)); //碰撞检测

            for (var s = 0; s < this.m_maparray.length; s++) {
              var tFrameNode = this.m_maparray[s];
              var dis = cc.v2(tFrameNode.x, tFrameNode.y).sub(childPos).mag();

              if (dis <= len && !tFrameNode.isHaveFK) {
                count++; //可以放就要累加计数
              }
            }
          } //如果数量相等就说明这个方块在这个格子是可以放下的


          if (count == children.length) {
            canDroplsit.push(k);
            break;
          }
        }
      }
    }

    if (canDroplsit.length > 3) {
      var arr = Utils.getRandomSDiff(0, canDroplsit.length - 1, 3);
      return [canDroplsit[arr[0]], canDroplsit[arr[1]], canDroplsit[arr[2]]];
    } else {
      return [canDroplsit[0], canDroplsit[1], canDroplsit[2]];
    }
  },
  backIndexofList: function backIndexofList(pos) {
    for (var i = 0; i < window.INDEX_TO_POINT.length; i++) {
      if (pos.sub(cc.v2(window.INDEX_TO_POINT[i][0], window.INDEX_TO_POINT[i][1])).mag() <= 50) {
        return i;
      }
    }

    return -1;
  },
  updateToolsNum: function updateToolsNum() {
    this.m_boomnum = window.INIT_GAME_SAVE_DATA.tool[0];
    this.m_l_boomnum.string = "x" + this.m_boomnum;
    this.setAddVisible(this.m_btn_tool2, this.m_boomnum);
    this.updateGold();
  },
  updateGold: function updateGold() {
    this.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
  },
  updateSkin: function updateSkin() {
    console.log('updateskin');
    var data_index = 0;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      data_index = this.m_n_kuai[i].getComponent("ShapeItem").updateIndex(true);
    }

    var data = window.SKIN_CONFIG[data_index];

    for (var j = 0; j < this.m_maparray.length; j++) {
      var FKNode = this.m_maparray[j].getChildByName("colorSpr");

      if (FKNode) {
        FKNode.getComponent(cc.Sprite).spriteFrame = this.m_spriteAtlas.getSpriteFrame(data.name + FKNode.colorIndex);
      }
    }
  },
  setAddVisible: function setAddVisible(node, num) {
    var addbtn = cc.find("sp_add", node);
    addbtn.active = num <= 0;
  },
  updateScore: function updateScore(score) {
    this.m_cur_score += score;
    this.m_l_score.string = this.m_cur_score;
    if (!this.m_n_result_panel.active) RankList.checkWillSurpass(this.m_cur_score);

    if (this.m_cur_score > window.INIT_GAME_SAVE_DATA.top_score) {
      window.INIT_GAME_SAVE_DATA.top_score = this.m_cur_score;
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    }
  },
  createMap: function createMap() {
    this.m_maparray = [];
    var frameList = [];

    for (var index = 0; index < window.INDEX_TO_POINT.length; index++) {
      var node = cc.instantiate(this.m_pre_blockbg);
      node.x = window.INDEX_TO_POINT[index][0];
      node.y = window.INDEX_TO_POINT[index][1];
      node.parent = this.m_n_bglist;
      node.FKIndex = index;
      frameList.push(node);
    }

    this.m_maparray = frameList;
  },
  //创建糖果
  initMonster: function initMonster(level) {
    var self = this;
    var lv = level % 100;
    if (lv <= 0) lv += 1;
    var data = window.MAP_CONFIG[lv - 1];
    this.m_sp_monster.node.getComponent("MonsterItem").initType(data.mon_id, data.mon_hp, level); // this.m_sp_monster.node.color = window.MON_COLOR[data.color];

    this.m_sp_monster.node.active = true;
    this.m_sp_monster.node.opacity = 255;
    this.m_sp_monster.node.y = 300;
    var y = 0;
    this.m_sp_monster.node.getComponent("MonsterItem").playStartTalk();

    if (data.mon_id == 0) {
      // this.m_sp_monster.node.y = -10;
      y = -10;
    } else {// this.m_sp_monster.node.y = 0;
    }

    this.m_sp_monster.node.runAction(cc.moveTo(0.4, 0, y).easing(cc.easeIn(3.0)));

    if (level % 5 == 0) {
      this.m_n_boss.active = true;
      this.m_n_boss.opacity = 50;
      this.m_n_boss.scale = 2.5;
      var offset = 10;
      var deltaTime = 0.02;
      this.m_n_boss.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.8, 1.0).easing(cc.easeBackIn(3.0)), cc.fadeTo(0.8, 255)), cc.moveBy(deltaTime, cc.v2(offset * 2, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 4)), cc.moveBy(deltaTime, cc.v2(offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 4)), cc.moveBy(deltaTime, cc.v2(0, offset * 2)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime * 2, cc.v2(-offset * 2, 0)), cc.moveBy(deltaTime, cc.v2(offset, 0)), cc.moveBy(deltaTime, cc.v2(0, offset)), cc.moveBy(deltaTime * 2, cc.v2(0, -offset * 2)), cc.moveBy(deltaTime, cc.v2(0, offset)), cc.fadeOut(1.5)));
    }
  },
  //加分，参数是消除的总数,isDropAdd是是否是放下的单纯加分
  addScore: function addScore(XCCount, isDropAdd) {
    var addScoreCount = this.getAddScoreCal(XCCount, isDropAdd);
    Utils.showHurtText("+" + addScoreCount, null, 0, 0, 30);
    this.updateScore(addScoreCount);
  },
  //计算加分的公式
  getAddScoreCal: function getAddScoreCal(XCCount, isDropAdd) {
    var x = XCCount + 1;
    var addScoreCount = isDropAdd ? x : x * x; //数量的平方

    return addScoreCount * this.m_doublescore;
  },
  //检测是不是输了
  checkIsLose: function checkIsLose() {
    //如果正在消除中，那就不判断输赢，因为消除后会再判断
    if (this._isdeleting) return;
    this.m_normal_curtime = 0;
    var count = 0;

    for (var i = 0; i < 3; i++) {
      var node = cc.find('n_kuai' + (i + 1), this.m_n_gamenode);
      var script = node.getComponent('ShapeItem');

      if (script.checkIsLose()) {
        count++;
        node.opacity = 125;
      } else {
        node.opacity = 255;
      }
    }

    if (count >= 2 && !this._isbless) {
      this._isbless = true;

      for (var _i2 = 0; _i2 < 3; _i2++) {
        var _node = cc.find('n_kuai' + (_i2 + 1), this.m_n_gamenode);

        _node.getComponent('ShapeItem').setNextBlock(0); //设置下一个必定是某个形状

      }
    }

    if (count == 3) {
      //没地方放了
      this.judgeGame(false);
    }
  },
  //检查是否有可消除
  checkClearUp: function checkClearUp() {
    var haveFKIndexList = [];

    for (var i = 0; i < this.m_maparray.length; i++) {
      if (this.m_maparray[i].isHaveFK) {
        haveFKIndexList.push(this.m_maparray[i].FKIndex);
      }
    }

    haveFKIndexList.sort(function (a, b) {
      return a - b;
    });
    var xcList = []; //要消除的方块列表

    for (var _i3 = 0; _i3 < window.DISLIST.length; _i3++) {
      var oneXCList = window.DISLIST[_i3];
      var intersectAry = this.get2AryIntersect(haveFKIndexList, oneXCList); //求数组交集

      if (intersectAry.length > 0) {
        var isXC = this.check2AryIsEqual(oneXCList, intersectAry); //数组相同，消除

        if (isXC) {
          xcList.push(oneXCList);
        }
      }
    }

    var actionAry = []; //消除

    var count = 0;
    var clearnum = 0;

    for (var _i4 = 0; _i4 < xcList.length; _i4++) {
      var oneList = xcList[_i4];
      clearnum += oneList.length;

      for (var j = 0; j < oneList.length; j++) {
        var xIndex = oneList[j];
        actionAry.push(cc.callFunc(function () {
          var xIndex = arguments[1][0];
          var count = arguments[1][1];
          var score = this.getAddScoreCal(count); // Utils.showTipsText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 60);

          Utils.showHurtText("+" + score, this.m_n_gamenode, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y, 20, null, null, null, true);
          this.updateScore(score);
        }, this, [xIndex, count]));
        actionAry.push(cc.callFunc(function () {
          var xIndex = arguments[1];
          this.m_maparray[xIndex].isHaveFK = null;
          var FKNode = this.m_maparray[xIndex].getChildByName("colorSpr");

          if (!FKNode) {
            return; //防止没有这个方块的时候
          }

          this.attackMonster(FKNode.colorIndex, this.m_maparray[xIndex].x, this.m_maparray[xIndex].y); //这个假方块变大并且渐隐掉

          FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
        }, this, xIndex));
        actionAry.push(cc.delayTime(0.1));
        count++;
      }
    }

    if (actionAry.length > 0) {
      Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      actionAry.push(cc.callFunc(function () {
        this._isdeleting = false;
        this.checkIsLose();
      }, this));
      this.handlerShowTime(clearnum);
      this._isdeleting = true;
      var action = cc.sequence(actionAry);
      this.node.runAction(action);
    }
  },
  //获得两个数组的交集
  get2AryIntersect: function get2AryIntersect(ary1, ary2) {
    var intersectAry = [];

    for (var i = 0; i < ary1.length; i++) {
      for (var j = 0; j < ary2.length; j++) {
        if (ary2[j] == ary1[i]) {
          intersectAry.push(ary2[j]);
        }
      }
    }

    return intersectAry;
  },

  /**
   * 获得两个数组的交集
   * @param  {array}数组1
   * @param  {array}数组2
   * @return {boolean}是否相交
   */
  check2AryIsEqual: function check2AryIsEqual(ary1, ary2) {
    for (var i = 0; i < ary1.length; i++) {
      if (ary2[i] != ary1[i]) {
        return false;
      }
    }

    return true;
  },
  handlerShowTime: function handlerShowTime(num) {
    var _this4 = this;

    console.log("handlerShowTime", num);
    var index = -1;

    if (num > 9 && num <= 12) {
      index = 0;
    } else if (num > 12 && num <= 15) {
      index = 1;
    } else if (num > 15) {
      index = 2;
    }

    if (index >= 0) {
      if (index == 2) {
        Utils.SetSoundEffect(window.SAY_3, false, 1);
      } else {
        Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      }

      this.m_n_showtime[index].active = true;
      this.m_n_showtime[index].getComponent(cc.Animation).play();
      setTimeout(function () {
        _this4.m_n_showtime[index].active = false;
      }, 1500);
    }
  },
  //增加金币数
  addGold: function addGold(gold, spos, epos) {
    var this$1 = this;
    var spritefram = this.m_spf_gold;
    window.INIT_GAME_SAVE_DATA.gold_num += gold;

    for (var i = 0; i < gold; i++) {
      Utils.moveIcon(spritefram, this.m_n_gamenode, spos, epos, function () {
        Utils.SetSoundEffect(window.GET_GOLD, false, 0.4);
        this$1.m_l_gold.string = window.INIT_GAME_SAVE_DATA.gold_num;
      }, 0.5, 60 * (i + 1));
    } // })

  },
  //展示宝箱
  showBox: function showBox(spos, epos, lv) {
    var this$1 = this;

    var callback = function callback() {
      if (lv % 10 == 0 && lv <= 370) {
        this$1.m_n_stepview.scale = 0;
        this$1.m_n_stepview.active = true;
        this$1.m_n_stepview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));
        this$1.m_n_stepview.getComponent("StepViewItem").showStep(lv);
      }
    };

    Utils.loadRes('sprite/getshare_box', cc.SpriteFrame, function (obj) {
      Utils.moveIcon(obj, this$1.m_n_gamenode, spos, epos, function () {
        this$1.m_n_sharegift.active = true;
        this$1.m_n_sharegift.getComponent('GetBoxGiftItem').showView(callback);
      }, 0.8, 100);
    });
  },
  attackMonster: function attackMonster(hurt, x, y) {
    var self = this;
    var realhurt = hurt ? 2 * hurt : 2;
    var blocknode = this.m_block_pool.get();

    if (!blocknode) {
      blocknode = cc.instantiate(this.m_pre_rock);
    }

    var angle = Utils.getAngle(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y, x, y);

    if (this.m_sp_monster.node.parent.x <= x) {
      angle = -angle;
    }

    blocknode.rotation = angle;
    blocknode.getComponent("RockItem").resetSytem();
    blocknode.zIndex = 1 << 5;
    blocknode.parent = this.m_n_gamenode;
    blocknode.x = x;
    blocknode.y = y;
    blocknode.runAction(cc.sequence(cc.callFunc(function () {}), cc.moveTo(1.0, cc.v2(this.m_sp_monster.node.parent.x, this.m_sp_monster.node.parent.y)).easing(cc.easeIn(2.0)), cc.callFunc(function () {
      self.m_block_pool.put(blocknode);
      blocknode = null;
      self.monsterbeHit(realhurt);
    })));
  },
  destroyBlockByHitMonster: function destroyBlockByHitMonster() {
    var _this5 = this;

    var self = this;
    var arr = [];
    var len = 4;

    for (var i = 0; i < this.m_maparray.length; i++) {
      if (this.m_maparray[i].isHaveFK) {
        arr.push(i);
        len--;
        if (len <= 0) break;
      }
    }

    var _loop = function _loop(_i5) {
      var blocknode = _this5.m_light_pool.get();

      if (!blocknode) {
        blocknode = cc.instantiate(_this5.m_pre_light);
      }

      var pos = _this5.m_maparray[arr[_i5]].position;
      blocknode.parent = _this5.m_n_gamenode;
      blocknode.position = cc.v2(_this5.m_sp_monster.node.parent.x, _this5.m_sp_monster.node.parent.y);
      blocknode.runAction(cc.sequence(cc.callFunc(function () {
        Utils.SetSoundEffect(window.GET_GOLD, false, 1);
      }), cc.moveTo(0.8, pos).easing(cc.easeIn(2.0)), cc.callFunc(function () {
        self.m_light_pool.put(blocknode);
        blocknode = null;
        self.blockBeHit(arr[_i5]);
      })));
    };

    for (var _i5 = 0; _i5 < arr.length; _i5++) {
      _loop(_i5);
    }
  },
  blockBeHit: function blockBeHit(index) {
    this.m_maparray[index].isHaveFK = null;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");

      if (shapeitem.checkIsLose()) {
        this.m_n_kuai[i].opacity = 125;
      } else {
        this.m_n_kuai[i].opacity = 255;
      }
    }

    var FKNode = this.m_maparray[index].getChildByName("colorSpr");

    if (!FKNode) {
      return; //防止没有这个方块的时候
    }

    FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
  },
  monsterbeHit: function monsterbeHit(hurt) {
    Utils.SetSoundEffect(window.BE_HIT, false, 0.3);
    Utils.showHurtText('-' + hurt, this.m_sp_monster.node.parent, 0, 100, 30, new cc.Color(230, 71, 21), 0.8);
    this.updateScore(hurt);
    var hp = this.m_sp_monster.node.getComponent("MonsterItem").reduceHp(hurt);

    if (hp <= 0) {
      this.m_normal_curtime = -1;
      this.judgeGame(true);
    } else {
      this.m_normal_curtime = 0;

      if (this.m_solidernum <= 0 && this.m_cur_attack_num <= 0) {
        this.judgeGame(false);
      } else if (this.m_cur_attack_num <= 0 && hp <= 20) {
        this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
      } else {
        this.m_sp_monster.node.getComponent("MonsterItem").playBeHit();
      }
    }
  },
  onOpenSkinPanel: function onOpenSkinPanel() {
    this.m_n_skinpanel.active = true;
  },
  onCancelVideo: function onCancelVideo() {
    var _this6 = this;

    this.m_n_lookvideo.active = false;

    if (this._relivenum <= 0) {
      this.m_n_reliveview.active = true;
      this.m_n_reliveview.scale = 0;
      this.m_n_reliveview.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

      if (window.SKIN_SHARE) {
        this.showAdBanner(false);
        var node = cc.find("btn_close", this.m_n_reliveview);
        node.y = -585;
        this.scheduleOnce(function () {
          node.y = -514;
          if (!_this6.showAdb) _this6.showAdBanner(true);
        }, 1.3);
      } else {
        this.showAdBanner(true);
      }
    } else {
      this.m_n_displaycheck.active = false;
      this.m_n_displayrank.active = true;
      console.log("this._relivenum++", this._relivenum);
      this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
      this.showAdBanner(true);
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
      Utils.SetSoundEffect(window.CHALLENG_FAIL_MUSIC, false, 1);
    }

    this._relivenum++;
  },
  onAdBtnClick: function onAdBtnClick(event, custom) {
    if (typeof wx != 'undefined') {
      if (!window.firstvideo && custom == 3) {
        // window.CHANGE_BLOCK = 1;
        // cc.sys.localStorage.setItem('change', '1');
        window.firstvideo = true;
        this.videoReward(1);
        return;
      }

      var VersionToast = function VersionToast() {
        wx.showToast({
          title: "微信版本过低，无法看广告",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 2000);
      };

      var info = wx.getSystemInfoSync();

      if (info.SDKVersion >= '2.0.4') {
        this.showAd(custom);
      } else {
        VersionToast();
      }
    } else {
      console.log('it is not wechat');
      this.videoReward(custom);
    }
  },
  showAd: function showAd(custom) {
    var self = this;

    if (!this.m_videoAd) {
      this.m_videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-e573e466be94d7f5'
      });
    }

    this.m_videoAd.onError(function (err) {// Utils.showTipsText("error:" + err.errMsg);
    });
    this.m_videoAd.load().then(function () {
      self.m_videoAd.show();
      self.showAdb = true;
      self.m_videoAd.onClose(function (status) {
        self.m_videoAd.offClose();
        self.showAdb = false;
        self.showAdBanner(false);

        if (status && status.isEnded || status === undefined) {
          self.videoReward(custom);
        } else {}
      });
    })["catch"](function (err) {
      return Utils.showTipsText("拉去视频广告失败，请稍候重试", null, null, null, 60, cc.Color.BLACK, 1.2);
    });
  },
  videoReward: function videoReward(custom) {
    if (custom == 1 || custom == 3) {
      var list = this.getCanDropBlocks(); // console.log('list=',list);

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        var shapeitem = this.m_n_kuai[i].getComponent("ShapeItem");
        this.m_n_kuai[i].opacity = 255;
        shapeitem.resetBlock(list[i] || 0);
      }

      this.m_in_judge = false;
      this.m_n_lookvideo.active = false;
    } else if (custom == 2) {
      this.m_doublescore = 2;
      this.m_n_doublescore.active = true;
      Utils.showTipsText("得分双倍", null, 0, 0, 60);
      this.m_n_luckyvideo.active = false;
    }
  },
  judgeGame: function judgeGame(boo) {
    if (this.m_in_judge) return;
    this.m_in_judge = true;

    if (boo) {
      //胜利
      console.log('胜利');
      this._killnum++;
      var time = this.m_sp_monster.node.getComponent("MonsterItem").playDead();
      Utils.SetSoundEffect(window.CHALLENG_VICTORY_MUSIC, false, 1);
      var gold = 3;
      var pos = this.m_sp_monster.node.parent.position;

      if (this.m_cur_level % 5 == 0) {
        this.showBox(cc.v2(pos.x, pos.y - 100), cc.Vec2.ZERO, this.m_cur_level);
      } else {
        this.addGold(gold, cc.v2(pos.x, pos.y - 10), this.m_l_gold.node.position);
      }

      window.INIT_GAME_SAVE_DATA.top_level += 1;
      var self = this;
      this.scheduleOnce(function () {
        self.onNextLevel();
      }, time / 1000);
      this.destroyBlockByHitMonster();
      RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    } else {
      if (this._videonum <= 0) {
        console.log('失败');
        this.m_sp_monster.node.getComponent("MonsterItem").playMonsterVictory();
        this.m_n_lookvideo.active = true;
        this.m_n_lookvideo.scale = 0;
        this.m_n_lookvideo.runAction(cc.sequence(cc.scaleTo(0.2, 1.2, 1.2).easing(cc.easeIn(3.0)), cc.scaleTo(0.1, 1, 1)));

        if (window.firstvideo) {
          this.m_l_asktype.string = "看视频换一批";
        } else {
          this.m_l_asktype.string = "免费换一批"; // window.firstvideo = true;
        }

        this._videonum++;
      } else {
        this.onCancelVideo();
      }
    }
  },

  /**
   * @description 宝箱奖励获取处理
   * @author 吴建奋
   * @param {Number} type
   */
  BoxReward: function BoxReward(type) {
    if (type == 0) {
      this.updateToolsNum();
    } else {
      this.updateGold();
    }
  },
  onVideoClose: function onVideoClose() {
    this.m_n_reliveview.active = false;
    this.m_n_displaycheck.active = false;
    this.m_n_displayrank.active = true;
    this.m_n_result_panel.getComponent("GameResult").showFail(this._relivenum, this.m_cur_score, this._killnum);
    this.showAdBanner(true);
    RankList.setScore(window.INIT_GAME_SAVE_DATA.top_score);
    Utils.SetSoundEffect(window.CHALLENG_FAIL_MUSIC, false, 1);
  },
  onReliveBtnClick: function onReliveBtnClick() {
    if (typeof wx != 'undefined') {
      var VersionToast = function VersionToast() {
        wx.showToast({
          title: "微信版本过低，无法看广告",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 2000);
      };

      var info = wx.getSystemInfoSync();

      if (info.SDKVersion >= '2.0.4') {
        this.showReliveAd();
      } else {
        VersionToast();
      }
    } else {
      console.log('it is not wechat');
      this.onReliveGameVideo();
    }
  },
  showReliveAd: function showReliveAd() {
    var self = this;

    if (!this.m_videoAd2) {
      this.m_videoAd2 = wx.createRewardedVideoAd({
        adUnitId: 'adunit-5187ffc3ab571318'
      });
    }

    this.m_videoAd2.onError(function (err) {// Utils.showTipsText("error:" + err.errMsg);
    });
    this.m_videoAd2.load().then(function () {
      self.m_videoAd2.show();
      self.showAdBanner(false);
      self.m_videoAd2.onClose(function (status) {
        self.m_videoAd2.offClose();

        if (status && status.isEnded || status === undefined) {
          self.onReliveGameVideo();
        } else {}
      });
    })["catch"](function (err) {
      return Utils.showTipsText("视频拉取失败，请稍后重试", null, null, null, 60, cc.Color.BLACK, 1.2);
    });
  },
  onNextLevel: function onNextLevel() {
    this.m_n_result_panel.active = false;
    this.showAdBanner(false);
    this.m_cur_level = window.INIT_GAME_SAVE_DATA.top_level + 1;
    console.log("this.m_cur", this.m_cur_level);
    this.m_in_judge = false;
    this.m_l_level.string = "LV." + this.m_cur_level;
    this.initMonster(this.m_cur_level);
    this.checkIsLose();
  },
  onBackToMenu: function onBackToMenu() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);
    cc.director.loadScene(window.MENU_SCENE_NAME);
  },
  onBoomClick: function onBoomClick(event) {
    // this.judgeGame(false);
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (this.m_gamestate == 0 && !this._isdeleting) {
      if (this.m_boomnum <= 0) {
        this.m_n_tooluse.active = true;
        this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(0, this.m_boomnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[0].name));
      } else {
        this.m_n_guidemask.active = !this.m_mapblink;
        this.m_touch_boom = !this.m_mapblink;
        this.setMapBlink(!this.m_mapblink);
      }
    }
  },
  onStrongClick: function onStrongClick(event) {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (this.m_gamestate == 0) {
      this.m_n_tooluse.active = true;
      this.m_n_tooluse.getComponent("UseToolItem").initToolInfo(1, this.m_strongnum, this.m_spriteAtlas.getSpriteFrame(window.TOOL_CONFIG[1].name));
      this.guideMaskClick();
    }
  },
  onUseStrong: function onUseStrong() {
    var t = false;

    for (var i = 0; i < this.m_row; i++) {
      for (var j = 0; j < this.m_col; j++) {
        if (this.m_grid_array[i][j].type == 1) {
          var a = this.m_grid_array[i][j].obj.getComponent("BlockItem").addStrong();

          if (a) {
            t = true;
          }
        }
      }
    }

    if (t) {
      window.INIT_GAME_SAVE_DATA.tool[1] -= 1;
      this.updateToolsNum();
    }
  },
  //设置背景闪烁
  setMapBlink: function setMapBlink(boo) {
    if (boo === this.m_mapblink) {
      return;
    }

    this.m_mapblink = boo;

    if (boo) {
      for (var i = 0; i < this.m_maparray.length; i++) {
        if (!this.m_maparray[i].isHaveFK) {
          var action = cc.repeatForever(cc.sequence(cc.scaleTo(0.8, 0.8, 0.8), cc.scaleTo(0.8, 1, 1)));
          action.setTag(1);
          this.m_maparray[i].runAction(action);
        }
      }
    } else {
      for (var _i6 = 0; _i6 < this.m_maparray.length; _i6++) {
        if (!this.m_maparray[_i6].isHaveFK) {
          this.m_maparray[_i6].stopActionByTag(1);

          this.m_maparray[_i6].scale = 1;
        }
      }
    }
  },
  getTargetGridInfo: function getTargetGridInfo(target) {
    var i = Math.floor(target / this.m_row);
    var j = target % this.m_col;
    return this.m_maparray[i][j];
  },
  onReliveGameVideo: function onReliveGameVideo() {
    Utils.showTipsText("复活成功");
    this.m_in_judge = false;

    for (var i = 0; i < this.m_n_kuai.length; i++) {
      this.m_n_kuai[i].getComponent("ShapeItem").resetBlock();
      this.m_n_kuai[i].opacity = 255;
    }

    this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
    this.m_n_result_panel.active = false;
    this.m_n_reliveview.active = false;
    this.m_maparray.forEach(function (element) {
      element.getChildByName("colorSpr");
    });

    for (var index = 0; index < this.m_maparray.length; index++) {
      var FKNode = this.m_maparray[index].getChildByName("colorSpr"); //这个假方块变大并且渐隐掉

      if (FKNode) {
        FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
      }

      this.m_maparray[index].isHaveFK = null;
    }

    RankList.checkWillSurpass(this.m_cur_score);
    this.m_n_displaycheck.active = true;
    this.m_n_displayrank.active = false;
    this.m_gamestate = 0;
  },
  onReliveGame: function onReliveGame() {
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 1);

    if (window.INIT_GAME_SAVE_DATA.gold_num >= 20) {
      Utils.showTipsText("复活成功");
      this.m_in_judge = false;
      window.INIT_GAME_SAVE_DATA.gold_num -= 20;
      this.updateGold();

      for (var i = 0; i < this.m_n_kuai.length; i++) {
        this.m_n_kuai[i].getComponent("ShapeItem").resetBlock(0);
        this.m_n_kuai[i].opacity = 255;
      }

      this.m_sp_monster.node.getComponent("MonsterItem").playAngry();
      this.m_n_result_panel.active = false;
      RankList.checkWillSurpass(this.m_cur_score);
      this.m_n_displaycheck.active = true;
      this.m_n_displayrank.active = false;
      this.m_gamestate = 0;
    } else {
      // Utils.showTipsText("金币不足")
      ShareSdk.shareAppMessage({
        title: "来帮帮我，我被怪兽消灭了",
        imageUrl: window.tempFileURL[1],
        success: function success(res) {},
        fail: function fail(err) {},
        complate: function complate(msg) {}
      });
    }
  },
  showAdBanner: function showAdBanner(boo) {
    if (typeof wx == 'undefined') return;
    var Size = cc.winSize;
    var Widthnode = cc.find("Canvas/n_funnymap/n_bannerpos");
    var pos = this.node.convertToWorldSpace(Widthnode);

    if (Size.height / Size.width > 2) {
      //适配全面屏 适用于FIXHeight
      pos.y += (Size.height - 1920) / 2;
    }

    var system = wx.getSystemInfoSync();
    var adaptScaleH = system.screenHeight / Size.height;
    var PosY = (Size.height - pos.y) * adaptScaleH;
    var self = this;

    if (this.m_bannerad) {
      this.m_bannerad.destroy();
      this.m_bannerad = null;
    }

    if (!this.m_bannerad && boo) {
      if (system.SDKVersion < '2.0.4') {
        wx.showToast({
          title: "微信版本过低，无法创建广告banner",
          icon: "none",
          image: "",
          duration: 0
        });
        setTimeout(function () {
          return wx.hideToast();
        }, 3000);
      } else {
        self.m_bannerad = wx.createBannerAd({
          adUnitId: 'adunit-9dd057b6b514245a',
          style: {
            left: 0,
            top: PosY,
            width: system.screenWidth
          }
        });
        self.m_bannerad.onResize(function (res1) {
          try {
            if (self.m_bannerad && self.m_bannerad.style) {
              self.m_bannerad.style.top = PosY;
              self.m_bannerad.style.height = res1.height;
            }
          } catch (error) {
            console.log("onResize-error", error);
          }
        });
        self.m_bannerad.onLoad(function () {// console.log('banner 广告加载成功')
        });
        self.m_bannerad.show().then(function () {// console.log("广告显示成功");
        })["catch"](function (err) {// console.error("广告加载失败", err);
        });
        self.m_bannerad.onError(function (err) {// console.error(err)
        });
      }
    }
  },
  onOpenAskPanel: function onOpenAskPanel() {
    this.m_n_askpanel.active = true;
  },
  onCloseAskPanel: function onCloseAskPanel() {
    this.m_n_askpanel.active = false;
  },
  update: function update(dt) {
    if (this.m_normal_curtime != -1) {
      this.m_normal_curtime += dt;

      if (this.m_normal_curtime >= this.m_normal_talktime && this.m_gamestate == 0) {
        this.m_normal_curtime = 0;
        this.m_sp_monster.node.getComponent("MonsterItem").playNormal();
      }
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTWFpbi5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJTaGFyZVNkayIsIlJhbmtMaXN0IiwiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJtX25fZ2FtZW5vZGUiLCJOb2RlIiwibV9uX2JnX3BhbmVsIiwibV9wcmVfYmxvY2tiZyIsIlByZWZhYiIsIm1fcHJlX2xpZ2h0IiwibV9wcmVfYm9vbWVmZmVjdCIsIm1fcHJlX2Jvb20iLCJtX2xfYm9vbW51bSIsIkxhYmVsIiwibV9sX3Njb3JlIiwibV9zcF9tb25zdGVyIiwiU3ByaXRlIiwibV9sX2xldmVsIiwibV9uX3Jlc3VsdF9wYW5lbCIsIm1fYnRuX3Rvb2wyIiwibV9uX2d1aWRlbWFzayIsIm1fbl90b29sdXNlIiwibV9uX3Nob3d0aW1lIiwidHlwZSIsIm1fc3BmX2dvbGQiLCJTcHJpdGVGcmFtZSIsIm1fbl9hc2twYW5lbCIsIm1fbl9ib3NzIiwibV9zcHJpdGVBdGxhcyIsIlNwcml0ZUF0bGFzIiwibV9uX2JnbGlzdCIsIm1fbF9nb2xkIiwibV9wcmVfcm9jayIsIm1fbl9rdWFpIiwibV9uX2Rpc3BsYXljaGVjayIsIm1fbl9kaXNwbGF5cmFuayIsIm1fbl9zdGVwdmlldyIsIm1fbl9yZWxpdmV2aWV3IiwibV9uX3ZpZGVvIiwibV9uX2xvb2t2aWRlbyIsIm1fbl9sdWNreXZpZGVvIiwibV9uX2RvdWJsZXZpZGVvIiwibV9uX2RvdWJsZXNjb3JlIiwibV9uX3NoYXJlZ2lmdCIsIm1fbl9za2lucGFuZWwiLCJtX25fZ3VpZGVub2RlIiwibV9sX2Fza3R5cGUiLCJtX25fZ3VpZGVmaWdlciIsIm9uTG9hZCIsIndpbmRvdyIsIkdBTUVfQ09OVFJPTCIsInNldERlc2lnblJlc29sdXRpb24iLCJvbkRlc3Ryb3kiLCJtX2Jsb2NrX3Bvb2wiLCJjbGVhciIsIm1fbGlnaHRfcG9vbCIsIm1fYmFubmVyYWQiLCJkZXN0cm95IiwiRVZFTlRfTElTVEVORVIiLCJvZmYiLCJHQU1FX1VQREFURV9EQVRBIiwiR0FNRV9TQVZFX0hBTkRMRVIiLCJzdGFydCIsImZpcnN0R2FtZSIsImNyZWF0ZU1hcCIsImluaXREYXRhIiwiaW5pdE1vbnN0ZXIiLCJtX2N1cl9sZXZlbCIsInNob3dBZEJhbm5lciIsIm5vZGUiLCJvbiIsIkV2ZW50VHlwZSIsIlRPVUNIX0VORCIsInRvdWNoRW5kIiwidXBkYXRlR29sZCIsInVwZGF0ZVNraW4iLCJnZXRDb21wb25lbnQiLCJhY3RpdmUiLCJtX2dhbWVzdGF0ZSIsIm1fY3VyX3Njb3JlIiwiSU5JVF9HQU1FX1NBVkVfREFUQSIsInRvcF9sZXZlbCIsIm1fbm9ybWFsX3RhbGt0aW1lIiwibV9ub3JtYWxfY3VydGltZSIsIm1fdGFyZ2V0X2Jsb2NrIiwibV9tYXBibGluayIsIm1fdG91Y2hfYm9vbSIsIl9yZWxpdmVudW0iLCJfdmlkZW9udW0iLCJfa2lsbG51bSIsInN0cmluZyIsIm1fZG91Ymxlc2NvcmUiLCJnb2xkX251bSIsIl9pc2RlbGV0aW5nIiwiX2lzYmxlc3MiLCJOb2RlUG9vbCIsInVwZGF0ZVRvb2xzTnVtIiwic2NoZWR1bGUiLCJydW5BY3Rpb24iLCJzZXF1ZW5jZSIsInJlcGVhdCIsInJvdGF0ZVRvIiwiZGVsYXlUaW1lIiwiX2NvbmZpZ2xpc3QiLCJnZXRUaGVDb25maWciLCJjaGVja1dpbGxTdXJwYXNzIiwicmFuZCIsInJhbmRvbSIsInNjYWxlIiwic2NhbGVUbyIsImVhc2luZyIsImVhc2VJbiIsIlNLSU5fU0hBUkUiLCJmaW5kIiwieSIsInNjaGVkdWxlT25jZSIsInNob3dBZGIiLCJoaWRlR3VpZGUiLCJzdG9wQWxsQWN0aW9ucyIsIkdVSURFX0xFVkVMIiwic3lzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsInNob3dHdWlkZSIsIl90ZW1wZ3VpZGUiLCJ0eXBlaW5kZXgiLCJpbmRleGxpc3QiLCJza2luIiwiaSIsImxlbmd0aCIsImRhdGEiLCJTS0lOX0NPTkZJRyIsInBvc2l0aW9uIiwicmVwZWF0Rm9yZXZlciIsImNhbGxGdW5jIiwibW92ZVRvIiwieCIsImluZGV4IiwiZ2V0Q3VyQ29sb3JJbmRleCIsImJsb2NraW5kZXgiLCJjb2xvckluZGV4IiwiY29sb3JOYW1lIiwibmFtZSIsInNwcml0ZSIsImFkZENvbXBvbmVudCIsImNvbnNvbGUiLCJsb2ciLCJzcHJpdGVGcmFtZSIsImdldFNwcml0ZUZyYW1lIiwiVmVjMiIsIlpFUk8iLCJwYXJlbnQiLCJtX21hcGFycmF5IiwiaXNIYXZlRksiLCJvbktlZXBHb2luZyIsImV2ZW50IiwidmVjIiwidG91Y2giLCJnZXRMb2NhdGlvbiIsImNvbnZlcnRUb05vZGVTcGFjZSIsImJhY2tJbmRleG9mTGlzdCIsImluc3RhbnRpYXRlIiwidG9vbCIsImRvQm9vbUFjdGlvbiIsInNldE1hcEJsaW5rIiwic2hhcGVpdGVtIiwiY2hlY2tJc0xvc2UiLCJvcGFjaXR5IiwicG9zIiwiRktOb2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzcGF3biIsImZhZGVPdXQiLCJyZW1vdmVTZWxmIiwiekluZGV4IiwiQW5pbWF0aW9uIiwicGxheSIsIlNldFNvdW5kRWZmZWN0IiwiQk9PTV9FRkZFQ1QiLCJsaXN0IiwiZ2V0Qm9vbUluZGV4TGlzdCIsImNvdW50IiwiYWN0aW9uQXJ5IiwicHVzaCIsIm9uZUxpc3QiLCJqIiwieEluZGV4IiwiYXJndW1lbnRzIiwic2NvcmUiLCJnZXRBZGRTY29yZUNhbCIsInNob3dIdXJ0VGV4dCIsInVwZGF0ZVNjb3JlIiwiYXR0YWNrTW9uc3RlciIsImFjdGlvbiIsImJvb21yYW5nZSIsImJvbWJGaW5pc2giLCJnZXRDYW5Ecm9wQmxvY2tzIiwiY2FuRHJvcGxzaXQiLCJrIiwiZnJhbWVOb2RlIiwic3JjUG9zIiwidjIiLCJjaGlsZHJlbiIsImxlbiIsImNoaWxkUG9zIiwiYWRkIiwicyIsInRGcmFtZU5vZGUiLCJkaXMiLCJzdWIiLCJtYWciLCJhcnIiLCJnZXRSYW5kb21TRGlmZiIsIklOREVYX1RPX1BPSU5UIiwibV9ib29tbnVtIiwic2V0QWRkVmlzaWJsZSIsImRhdGFfaW5kZXgiLCJ1cGRhdGVJbmRleCIsIm51bSIsImFkZGJ0biIsInRvcF9zY29yZSIsInNldFNjb3JlIiwiZnJhbWVMaXN0IiwiRktJbmRleCIsImxldmVsIiwic2VsZiIsImx2IiwiTUFQX0NPTkZJRyIsImluaXRUeXBlIiwibW9uX2lkIiwibW9uX2hwIiwicGxheVN0YXJ0VGFsayIsIm9mZnNldCIsImRlbHRhVGltZSIsImVhc2VCYWNrSW4iLCJmYWRlVG8iLCJtb3ZlQnkiLCJhZGRTY29yZSIsIlhDQ291bnQiLCJpc0Ryb3BBZGQiLCJhZGRTY29yZUNvdW50Iiwic2NyaXB0Iiwic2V0TmV4dEJsb2NrIiwianVkZ2VHYW1lIiwiY2hlY2tDbGVhclVwIiwiaGF2ZUZLSW5kZXhMaXN0Iiwic29ydCIsImEiLCJiIiwieGNMaXN0IiwiRElTTElTVCIsIm9uZVhDTGlzdCIsImludGVyc2VjdEFyeSIsImdldDJBcnlJbnRlcnNlY3QiLCJpc1hDIiwiY2hlY2syQXJ5SXNFcXVhbCIsImNsZWFybnVtIiwiR0VUX0dPTEQiLCJoYW5kbGVyU2hvd1RpbWUiLCJhcnkxIiwiYXJ5MiIsIlNBWV8zIiwic2V0VGltZW91dCIsImFkZEdvbGQiLCJnb2xkIiwic3BvcyIsImVwb3MiLCJ0aGlzJDEiLCJzcHJpdGVmcmFtIiwibW92ZUljb24iLCJzaG93Qm94IiwiY2FsbGJhY2siLCJzaG93U3RlcCIsImxvYWRSZXMiLCJvYmoiLCJzaG93VmlldyIsImh1cnQiLCJyZWFsaHVydCIsImJsb2Nrbm9kZSIsImdldCIsImFuZ2xlIiwiZ2V0QW5nbGUiLCJyb3RhdGlvbiIsInJlc2V0U3l0ZW0iLCJwdXQiLCJtb25zdGVyYmVIaXQiLCJkZXN0cm95QmxvY2tCeUhpdE1vbnN0ZXIiLCJibG9ja0JlSGl0IiwiQkVfSElUIiwiQ29sb3IiLCJocCIsInJlZHVjZUhwIiwibV9zb2xpZGVybnVtIiwibV9jdXJfYXR0YWNrX251bSIsInBsYXlBbmdyeSIsInBsYXlCZUhpdCIsIm9uT3BlblNraW5QYW5lbCIsIm9uQ2FuY2VsVmlkZW8iLCJzaG93RmFpbCIsIkNIQUxMRU5HX0ZBSUxfTVVTSUMiLCJvbkFkQnRuQ2xpY2siLCJjdXN0b20iLCJ3eCIsImZpcnN0dmlkZW8iLCJ2aWRlb1Jld2FyZCIsIlZlcnNpb25Ub2FzdCIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImltYWdlIiwiZHVyYXRpb24iLCJoaWRlVG9hc3QiLCJpbmZvIiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJTREtWZXJzaW9uIiwic2hvd0FkIiwibV92aWRlb0FkIiwiY3JlYXRlUmV3YXJkZWRWaWRlb0FkIiwiYWRVbml0SWQiLCJvbkVycm9yIiwiZXJyIiwibG9hZCIsInRoZW4iLCJzaG93Iiwib25DbG9zZSIsInN0YXR1cyIsIm9mZkNsb3NlIiwiaXNFbmRlZCIsInVuZGVmaW5lZCIsInNob3dUaXBzVGV4dCIsIkJMQUNLIiwicmVzZXRCbG9jayIsIm1faW5fanVkZ2UiLCJib28iLCJ0aW1lIiwicGxheURlYWQiLCJDSEFMTEVOR19WSUNUT1JZX01VU0lDIiwib25OZXh0TGV2ZWwiLCJwbGF5TW9uc3RlclZpY3RvcnkiLCJCb3hSZXdhcmQiLCJvblZpZGVvQ2xvc2UiLCJvblJlbGl2ZUJ0bkNsaWNrIiwic2hvd1JlbGl2ZUFkIiwib25SZWxpdmVHYW1lVmlkZW8iLCJtX3ZpZGVvQWQyIiwib25CYWNrVG9NZW51IiwiQlVUVE9OX0NMSUNLX01VU0lDIiwiZGlyZWN0b3IiLCJsb2FkU2NlbmUiLCJNRU5VX1NDRU5FX05BTUUiLCJvbkJvb21DbGljayIsImluaXRUb29sSW5mbyIsIlRPT0xfQ09ORklHIiwib25TdHJvbmdDbGljayIsIm1fc3Ryb25nbnVtIiwiZ3VpZGVNYXNrQ2xpY2siLCJvblVzZVN0cm9uZyIsInQiLCJtX3JvdyIsIm1fY29sIiwibV9ncmlkX2FycmF5IiwiYWRkU3Ryb25nIiwic2V0VGFnIiwic3RvcEFjdGlvbkJ5VGFnIiwiZ2V0VGFyZ2V0R3JpZEluZm8iLCJ0YXJnZXQiLCJNYXRoIiwiZmxvb3IiLCJmb3JFYWNoIiwiZWxlbWVudCIsIm9uUmVsaXZlR2FtZSIsInNoYXJlQXBwTWVzc2FnZSIsImltYWdlVXJsIiwidGVtcEZpbGVVUkwiLCJzdWNjZXNzIiwicmVzIiwiZmFpbCIsImNvbXBsYXRlIiwibXNnIiwiU2l6ZSIsIndpblNpemUiLCJXaWR0aG5vZGUiLCJjb252ZXJ0VG9Xb3JsZFNwYWNlIiwiaGVpZ2h0Iiwid2lkdGgiLCJzeXN0ZW0iLCJhZGFwdFNjYWxlSCIsInNjcmVlbkhlaWdodCIsIlBvc1kiLCJjcmVhdGVCYW5uZXJBZCIsInN0eWxlIiwibGVmdCIsInRvcCIsInNjcmVlbldpZHRoIiwib25SZXNpemUiLCJyZXMxIiwiZXJyb3IiLCJvbk9wZW5Bc2tQYW5lbCIsIm9uQ2xvc2VBc2tQYW5lbCIsInVwZGF0ZSIsImR0IiwicGxheU5vcm1hbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxPQUFELENBQW5COztBQUNBLElBQUlDLFFBQVEsR0FBR0QsT0FBTyxDQUFDLFVBQUQsQ0FBdEI7O0FBQ0EsSUFBSUUsUUFBUSxHQUFHRixPQUFPLENBQUMsVUFBRCxDQUF0Qjs7QUFDQUcsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFlBQVksRUFBRUosRUFBRSxDQUFDSyxJQURUO0FBRVJDLElBQUFBLFlBQVksRUFBRU4sRUFBRSxDQUFDSyxJQUZUO0FBR1JFLElBQUFBLGFBQWEsRUFBRVAsRUFBRSxDQUFDUSxNQUhWO0FBSVJDLElBQUFBLFdBQVcsRUFBRVQsRUFBRSxDQUFDUSxNQUpSO0FBS1JFLElBQUFBLGdCQUFnQixFQUFFVixFQUFFLENBQUNRLE1BTGI7QUFNUkcsSUFBQUEsVUFBVSxFQUFFWCxFQUFFLENBQUNRLE1BTlA7QUFPUkksSUFBQUEsV0FBVyxFQUFFWixFQUFFLENBQUNhLEtBUFI7QUFRUkMsSUFBQUEsU0FBUyxFQUFFZCxFQUFFLENBQUNhLEtBUk47QUFTUkUsSUFBQUEsWUFBWSxFQUFFZixFQUFFLENBQUNnQixNQVRUO0FBVVJDLElBQUFBLFNBQVMsRUFBRWpCLEVBQUUsQ0FBQ2EsS0FWTjtBQVdSSyxJQUFBQSxnQkFBZ0IsRUFBRWxCLEVBQUUsQ0FBQ0ssSUFYYjtBQVlSYyxJQUFBQSxXQUFXLEVBQUVuQixFQUFFLENBQUNLLElBWlI7QUFhUmUsSUFBQUEsYUFBYSxFQUFFcEIsRUFBRSxDQUFDSyxJQWJWO0FBY1JnQixJQUFBQSxXQUFXLEVBQUVyQixFQUFFLENBQUNLLElBZFI7QUFlUmlCLElBQUFBLFlBQVksRUFBRTtBQUNWQyxNQUFBQSxJQUFJLEVBQUV2QixFQUFFLENBQUNLLElBREM7QUFFVixpQkFBUztBQUZDLEtBZk47QUFtQlJtQixJQUFBQSxVQUFVLEVBQUV4QixFQUFFLENBQUN5QixXQW5CUDtBQW9CUkMsSUFBQUEsWUFBWSxFQUFFMUIsRUFBRSxDQUFDSyxJQXBCVDtBQXFCUnNCLElBQUFBLFFBQVEsRUFBRTNCLEVBQUUsQ0FBQ0ssSUFyQkw7QUFzQlJ1QixJQUFBQSxhQUFhLEVBQUU1QixFQUFFLENBQUM2QixXQXRCVjtBQXVCUkMsSUFBQUEsVUFBVSxFQUFFOUIsRUFBRSxDQUFDSyxJQXZCUDtBQXdCUjBCLElBQUFBLFFBQVEsRUFBRS9CLEVBQUUsQ0FBQ2EsS0F4Qkw7QUF5QlJtQixJQUFBQSxVQUFVLEVBQUVoQyxFQUFFLENBQUNRLE1BekJQO0FBMEJSeUIsSUFBQUEsUUFBUSxFQUFFO0FBQ05WLE1BQUFBLElBQUksRUFBRXZCLEVBQUUsQ0FBQ0ssSUFESDtBQUVOLGlCQUFTO0FBRkgsS0ExQkY7QUE4QlI2QixJQUFBQSxnQkFBZ0IsRUFBRWxDLEVBQUUsQ0FBQ0ssSUE5QmI7QUErQlI4QixJQUFBQSxlQUFlLEVBQUVuQyxFQUFFLENBQUNLLElBL0JaO0FBZ0NSK0IsSUFBQUEsWUFBWSxFQUFFcEMsRUFBRSxDQUFDSyxJQWhDVDtBQWlDUmdDLElBQUFBLGNBQWMsRUFBRXJDLEVBQUUsQ0FBQ0ssSUFqQ1g7QUFrQ1JpQyxJQUFBQSxTQUFTLEVBQUV0QyxFQUFFLENBQUNLLElBbENOO0FBbUNSa0MsSUFBQUEsYUFBYSxFQUFFdkMsRUFBRSxDQUFDSyxJQW5DVjtBQW9DUm1DLElBQUFBLGNBQWMsRUFBRXhDLEVBQUUsQ0FBQ0ssSUFwQ1g7QUFxQ1JvQyxJQUFBQSxlQUFlLEVBQUV6QyxFQUFFLENBQUNLLElBckNaO0FBc0NScUMsSUFBQUEsZUFBZSxFQUFFMUMsRUFBRSxDQUFDSyxJQXRDWjtBQXVDUnNDLElBQUFBLGFBQWEsRUFBRTNDLEVBQUUsQ0FBQ0ssSUF2Q1Y7QUF3Q1J1QyxJQUFBQSxhQUFhLEVBQUU1QyxFQUFFLENBQUNLLElBeENWO0FBeUNSd0MsSUFBQUEsYUFBYSxFQUFFN0MsRUFBRSxDQUFDSyxJQXpDVjtBQTBDUnlDLElBQUFBLFdBQVcsRUFBRTlDLEVBQUUsQ0FBQ2EsS0ExQ1I7QUEyQ1JrQyxJQUFBQSxjQUFjLEVBQUUvQyxFQUFFLENBQUNLO0FBM0NYLEdBSFA7QUFpREw7QUFFQTJDLEVBQUFBLE1BbkRLLG9CQW1ESTtBQUNMQyxJQUFBQSxNQUFNLENBQUNDLFlBQVAsR0FBc0IsSUFBdEI7QUFDQXRELElBQUFBLEtBQUssQ0FBQ3VELG1CQUFOO0FBQ0gsR0F0REk7QUF3RExDLEVBQUFBLFNBeERLLHVCQXdETztBQUNSLFNBQUtDLFlBQUwsQ0FBa0JDLEtBQWxCO0FBQ0EsU0FBS0MsWUFBTCxDQUFrQkQsS0FBbEI7QUFDQUwsSUFBQUEsTUFBTSxDQUFDQyxZQUFQLEdBQXNCLElBQXRCOztBQUNBLFFBQUksS0FBS00sVUFBVCxFQUFxQjtBQUNqQixXQUFLQSxVQUFMLENBQWdCQyxPQUFoQjtBQUNBLFdBQUtELFVBQUwsR0FBa0IsSUFBbEI7QUFDSDs7QUFDREUsSUFBQUEsY0FBYyxDQUFDQyxHQUFmLENBQW1CVixNQUFNLENBQUNXLGdCQUExQixFQUE0QyxJQUE1QztBQUNBRixJQUFBQSxjQUFjLENBQUNDLEdBQWYsQ0FBbUJWLE1BQU0sQ0FBQ1ksaUJBQTFCLEVBQTZDLElBQTdDO0FBQ0gsR0FsRUk7QUFvRUxDLEVBQUFBLEtBcEVLLG1CQW9FRztBQUNKLFFBQUliLE1BQU0sQ0FBQ2MsU0FBWCxFQUNJZCxNQUFNLENBQUNjLFNBQVAsR0FBbUIsS0FBbkI7QUFDSixTQUFLQyxTQUFMO0FBQ0EsU0FBS0MsUUFBTDtBQUNBLFNBQUtDLFdBQUwsQ0FBaUIsS0FBS0MsV0FBdEI7QUFDQSxTQUFLQyxZQUFMLENBQWtCLEtBQWxCO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWF0RSxFQUFFLENBQUNLLElBQUgsQ0FBUWtFLFNBQVIsQ0FBa0JDLFNBQS9CLEVBQTBDLEtBQUtDLFFBQS9DLEVBQXlELElBQXpEO0FBQ0FmLElBQUFBLGNBQWMsQ0FBQ1ksRUFBZixDQUFrQnJCLE1BQU0sQ0FBQ1csZ0JBQXpCLEVBQTJDLEtBQUtjLFVBQWhELEVBQTRELElBQTVEO0FBQ0FoQixJQUFBQSxjQUFjLENBQUNZLEVBQWYsQ0FBa0JyQixNQUFNLENBQUNZLGlCQUF6QixFQUE0QyxLQUFLYyxVQUFqRCxFQUE2RCxJQUE3RDtBQUNILEdBOUVJO0FBZ0ZMVixFQUFBQSxRQWhGSyxzQkFnRk07QUFBQTs7QUFDUCxTQUFLckIsYUFBTCxDQUFtQmdDLFlBQW5CLENBQWdDLFdBQWhDLEVBQTZDWCxRQUE3QztBQUNBLFNBQUsvQixnQkFBTCxDQUFzQjJDLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsU0FBSzFDLGVBQUwsQ0FBcUIwQyxNQUFyQixHQUE4QixLQUE5QjtBQUNBLFNBQUt0QyxhQUFMLENBQW1Cc0MsTUFBbkIsR0FBNEIsS0FBNUI7QUFDQSxTQUFLbkMsZUFBTCxDQUFxQm1DLE1BQXJCLEdBQThCLEtBQTlCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLWixXQUFMLEdBQW1CbEIsTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkJDLFNBQTNCLEdBQXVDLENBQTFEO0FBQ0EsU0FBS0MsaUJBQUwsR0FBeUIsQ0FBekIsQ0FUTyxDQVNxQjs7QUFDNUIsU0FBS0MsZ0JBQUwsR0FBd0IsQ0FBQyxDQUF6QjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsRUFBdEI7QUFDQSxTQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFwQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFNBQUszRSxTQUFMLENBQWU0RSxNQUFmLEdBQXdCLEtBQUtYLFdBQTdCO0FBQ0EsU0FBS1ksYUFBTCxHQUFxQixDQUFyQixDQWxCTyxDQW1CUDs7QUFDQSxTQUFLMUUsU0FBTCxDQUFleUUsTUFBZixHQUF3QixRQUFRLEtBQUt2QixXQUFyQztBQUNBLFNBQUtwQyxRQUFMLENBQWMyRCxNQUFkLEdBQXVCekMsTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkJZLFFBQWxEO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQixLQUFuQixDQXRCTyxDQXNCa0I7O0FBQ3pCLFNBQUtDLFFBQUwsR0FBZ0IsS0FBaEIsQ0F2Qk8sQ0F1QmdCOztBQUN2QixTQUFLekMsWUFBTCxHQUFvQixJQUFJckQsRUFBRSxDQUFDK0YsUUFBUCxFQUFwQjtBQUNBLFNBQUt4QyxZQUFMLEdBQW9CLElBQUl2RCxFQUFFLENBQUMrRixRQUFQLEVBQXBCO0FBQ0EsU0FBS0MsY0FBTDtBQUNBLFNBQUtDLFFBQUwsQ0FBYyxZQUFZO0FBQ3RCLFdBQUs5RSxXQUFMLENBQWlCK0UsU0FBakIsQ0FBMkJsRyxFQUFFLENBQUNtRyxRQUFILENBQVluRyxFQUFFLENBQUNvRyxNQUFILENBQVVwRyxFQUFFLENBQUNtRyxRQUFILENBQVluRyxFQUFFLENBQUNxRyxRQUFILENBQVksR0FBWixFQUFpQixDQUFDLEVBQWxCLENBQVosRUFBbUNyRyxFQUFFLENBQUNxRyxRQUFILENBQVksR0FBWixFQUFpQixFQUFqQixDQUFuQyxDQUFWLEVBQW9FLENBQXBFLENBQVosRUFBb0ZyRyxFQUFFLENBQUNxRyxRQUFILENBQVksR0FBWixFQUFpQixDQUFqQixDQUFwRixDQUEzQjtBQUNBLFdBQUsvRCxTQUFMLENBQWU0RCxTQUFmLENBQXlCbEcsRUFBRSxDQUFDbUcsUUFBSCxDQUFZbkcsRUFBRSxDQUFDc0csU0FBSCxDQUFhLEdBQWIsQ0FBWixFQUErQnRHLEVBQUUsQ0FBQ29HLE1BQUgsQ0FBVXBHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW5HLEVBQUUsQ0FBQ3FHLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLENBQUMsRUFBbEIsQ0FBWixFQUFtQ3JHLEVBQUUsQ0FBQ3FHLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLEVBQWpCLENBQW5DLENBQVYsRUFBb0UsQ0FBcEUsQ0FBL0IsRUFBdUdyRyxFQUFFLENBQUNxRyxRQUFILENBQVksR0FBWixFQUFpQixDQUFqQixDQUF2RyxDQUF6QjtBQUNBLFdBQUs1RCxlQUFMLENBQXFCeUQsU0FBckIsQ0FBK0JsRyxFQUFFLENBQUNtRyxRQUFILENBQVluRyxFQUFFLENBQUNzRyxTQUFILENBQWEsR0FBYixDQUFaLEVBQStCdEcsRUFBRSxDQUFDb0csTUFBSCxDQUFVcEcsRUFBRSxDQUFDbUcsUUFBSCxDQUFZbkcsRUFBRSxDQUFDcUcsUUFBSCxDQUFZLEdBQVosRUFBaUIsQ0FBQyxFQUFsQixDQUFaLEVBQW1DckcsRUFBRSxDQUFDcUcsUUFBSCxDQUFZLEdBQVosRUFBaUIsRUFBakIsQ0FBbkMsQ0FBVixFQUFvRSxDQUFwRSxDQUEvQixFQUF1R3JHLEVBQUUsQ0FBQ3FHLFFBQUgsQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQXZHLENBQS9CO0FBQ0gsS0FKRCxFQUlHLENBSkg7QUFLQSxTQUFLRSxXQUFMLEdBQW1CLEtBQUt0RSxRQUFMLENBQWMsQ0FBZCxFQUFpQjJDLFlBQWpCLENBQThCLFdBQTlCLEVBQTJDNEIsWUFBM0MsRUFBbkI7QUFDQXpHLElBQUFBLFFBQVEsQ0FBQzBHLGdCQUFULENBQTBCLEtBQUsxQixXQUEvQjtBQUVBLFFBQUkyQixJQUFJLEdBQUc5RyxLQUFLLENBQUMrRyxNQUFOLENBQWEsQ0FBYixFQUFnQixJQUFoQixDQUFYO0FBRUEsU0FBS25FLGNBQUwsQ0FBb0JxQyxNQUFwQixHQUE2QjZCLElBQUksSUFBSSxHQUFSLElBQWUsS0FBS3ZDLFdBQUwsR0FBbUIsQ0FBL0Q7O0FBQ0EsUUFBSSxLQUFLM0IsY0FBTCxDQUFvQnFDLE1BQXhCLEVBQWdDO0FBQUM7QUFDN0IsV0FBS3JDLGNBQUwsQ0FBb0JvRSxLQUFwQixHQUE0QixDQUE1QjtBQUNBLFdBQUtwRSxjQUFMLENBQW9CMEQsU0FBcEIsQ0FBOEJsRyxFQUFFLENBQUNtRyxRQUFILENBQVluRyxFQUFFLENBQUM2RyxPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQkMsTUFBMUIsQ0FBaUM5RyxFQUFFLENBQUMrRyxNQUFILENBQVUsR0FBVixDQUFqQyxDQUFaLEVBQThEL0csRUFBRSxDQUFDNkcsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBOUQsQ0FBOUI7O0FBQ0EsVUFBSTVELE1BQU0sQ0FBQytELFVBQVgsRUFBdUI7QUFDbkIsWUFBSTNDLElBQUksR0FBR3JFLEVBQUUsQ0FBQ2lILElBQUgsQ0FBUSxZQUFSLEVBQXNCLEtBQUt6RSxjQUEzQixDQUFYO0FBQ0E2QixRQUFBQSxJQUFJLENBQUM2QyxDQUFMLEdBQVMsQ0FBQyxHQUFWO0FBQ0EsYUFBS0MsWUFBTCxDQUFrQixZQUFNO0FBQ3BCOUMsVUFBQUEsSUFBSSxDQUFDNkMsQ0FBTCxHQUFTLENBQUMsR0FBVjtBQUNBLGNBQUksS0FBSSxDQUFDMUUsY0FBTCxDQUFvQnFDLE1BQXBCLElBQThCLENBQUMsS0FBSSxDQUFDdUMsT0FBeEMsRUFDSSxLQUFJLENBQUNoRCxZQUFMLENBQWtCLElBQWxCO0FBQ1AsU0FKRCxFQUlHLEdBSkg7QUFLSDtBQUNKO0FBQ0osR0FuSUk7QUFxSUxpRCxFQUFBQSxTQXJJSyx1QkFxSU87QUFDUixRQUFJLEtBQUtsRCxXQUFMLElBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLFdBQUt0QixhQUFMLENBQW1CZ0MsTUFBbkIsR0FBNEIsS0FBNUI7QUFDQSxXQUFLOUIsY0FBTCxDQUFvQnVFLGNBQXBCO0FBQ0EsV0FBS3ZFLGNBQUwsQ0FBb0I4QixNQUFwQixHQUE2QixLQUE3QjtBQUNBNUIsTUFBQUEsTUFBTSxDQUFDc0UsV0FBUCxHQUFxQixDQUFyQjtBQUNBdkgsTUFBQUEsRUFBRSxDQUFDd0gsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixXQUE1QixFQUF5QyxHQUF6QztBQUNIO0FBQ0osR0E3SUk7QUErSUxDLEVBQUFBLFNBL0lLLHVCQStJTztBQUFBOztBQUNSLFFBQUksQ0FBQyxLQUFLQyxVQUFWLEVBQXNCO0FBQ2xCLFdBQUtBLFVBQUwsR0FBa0IsSUFBbEI7QUFDSCxLQUZELE1BRU87QUFBRTtBQUFTOztBQUNsQixRQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxRQUFJQyxTQUFTLEdBQUc3RSxNQUFNLENBQUMrQixtQkFBUCxDQUEyQitDLElBQTNDOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0YsU0FBUyxDQUFDRyxNQUE5QixFQUFzQ0QsQ0FBQyxFQUF2QyxFQUEyQztBQUN2QyxVQUFJRixTQUFTLENBQUNFLENBQUQsQ0FBVCxJQUFnQixDQUFwQixFQUF1QjtBQUNuQkgsUUFBQUEsU0FBUyxHQUFHRyxDQUFaO0FBQ0E7QUFDSDtBQUNKOztBQUVELFFBQUlFLElBQUksR0FBR2pGLE1BQU0sQ0FBQ2tGLFdBQVAsQ0FBbUJOLFNBQW5CLENBQVg7QUFDQSxTQUFLaEYsYUFBTCxDQUFtQmdDLE1BQW5CLEdBQTRCLElBQTVCO0FBQ0EsU0FBSzlCLGNBQUwsQ0FBb0I4QixNQUFwQixHQUE2QixJQUE3QjtBQUNBLFNBQUs5QixjQUFMLENBQW9CcUYsUUFBcEIsR0FBK0IsS0FBS25HLFFBQUwsQ0FBYyxDQUFkLEVBQWlCbUcsUUFBaEQ7QUFDQSxTQUFLckYsY0FBTCxDQUFvQm1ELFNBQXBCLENBQThCbEcsRUFBRSxDQUFDcUksYUFBSCxDQUFpQnJJLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW5HLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFNO0FBQ3pFLE1BQUEsTUFBSSxDQUFDdkYsY0FBTCxDQUFvQnFGLFFBQXBCLEdBQStCLE1BQUksQ0FBQ25HLFFBQUwsQ0FBYyxDQUFkLEVBQWlCbUcsUUFBaEQ7QUFDSCxLQUYwRCxDQUFaLEVBRTNDcEksRUFBRSxDQUFDdUksTUFBSCxDQUFVLEdBQVYsRUFBZSxLQUFLdEcsUUFBTCxDQUFjLENBQWQsRUFBaUJ1RyxDQUFoQyxFQUFtQyxLQUFLdkcsUUFBTCxDQUFjLENBQWQsRUFBaUJpRixDQUFqQixHQUFxQixHQUF4RCxDQUYyQyxDQUFqQixDQUE5QjtBQUdBLFFBQUl1QixLQUFLLEdBQUcsS0FBS3hHLFFBQUwsQ0FBYyxDQUFkLEVBQWlCMkMsWUFBakIsQ0FBOEIsV0FBOUIsRUFBMkM4RCxnQkFBM0MsRUFBWjtBQUNBLFFBQUlDLFVBQVUsR0FBRyxFQUFqQjtBQUNBQSxJQUFBQSxVQUFVLENBQUMsRUFBRCxDQUFWLEdBQWlCLENBQWpCO0FBQ0FBLElBQUFBLFVBQVUsQ0FBQyxFQUFELENBQVYsR0FBaUIsQ0FBakI7QUFDQUEsSUFBQUEsVUFBVSxDQUFDLEVBQUQsQ0FBVixHQUFpQixDQUFqQjtBQUNBQSxJQUFBQSxVQUFVLENBQUMsRUFBRCxDQUFWLEdBQWlCLENBQWpCOztBQUNBLFNBQUssSUFBSVgsRUFBQyxHQUFHLEVBQWIsRUFBaUJBLEVBQUMsR0FBRyxFQUFyQixFQUF5QkEsRUFBQyxFQUExQixFQUE4QjtBQUMxQixVQUFJVyxVQUFVLENBQUNYLEVBQUQsQ0FBZCxFQUFtQixDQUNmO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsWUFBSTNELElBQUksR0FBRyxJQUFJckUsRUFBRSxDQUFDSyxJQUFQLENBQVksVUFBWixDQUFYO0FBQ0FnRSxRQUFBQSxJQUFJLENBQUN1RSxVQUFMLEdBQWtCSCxLQUFsQjtBQUNBcEUsUUFBQUEsSUFBSSxDQUFDd0UsU0FBTCxHQUFpQlgsSUFBSSxDQUFDWSxJQUF0QjtBQUNBLFlBQUlDLE1BQU0sR0FBRzFFLElBQUksQ0FBQzJFLFlBQUwsQ0FBa0JoSixFQUFFLENBQUNnQixNQUFyQixDQUFiO0FBQ0FpSSxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWWhCLElBQUksQ0FBQ1ksSUFBakIsRUFBdUJMLEtBQXZCO0FBQ0FNLFFBQUFBLE1BQU0sQ0FBQ0ksV0FBUCxHQUFxQixLQUFLdkgsYUFBTCxDQUFtQndILGNBQW5CLENBQWtDbEIsSUFBSSxDQUFDWSxJQUFMLEdBQVlMLEtBQTlDLENBQXJCO0FBQ0FwRSxRQUFBQSxJQUFJLENBQUMrRCxRQUFMLEdBQWdCcEksRUFBRSxDQUFDcUosSUFBSCxDQUFRQyxJQUF4QjtBQUNBakYsUUFBQUEsSUFBSSxDQUFDa0YsTUFBTCxHQUFjLEtBQUtDLFVBQUwsQ0FBZ0J4QixFQUFoQixDQUFkO0FBQ0EsYUFBS3dCLFVBQUwsQ0FBZ0J4QixFQUFoQixFQUFtQnlCLFFBQW5CLEdBQThCLElBQTlCO0FBQ0g7QUFDSjtBQUNKLEdBeExJO0FBMExMQyxFQUFBQSxXQTFMSyx5QkEwTFM7QUFDVixTQUFLbEgsY0FBTCxDQUFvQnFDLE1BQXBCLEdBQTZCLEtBQTdCO0FBQ0EsU0FBS1QsWUFBTCxDQUFrQixLQUFsQjtBQUNILEdBN0xJO0FBK0xMSyxFQUFBQSxRQS9MSyxvQkErTElrRixLQS9MSixFQStMVztBQUNaLFFBQUksS0FBSzdFLFdBQUwsSUFBb0IsQ0FBcEIsSUFBeUIsS0FBS1EsWUFBbEMsRUFBZ0Q7QUFDNUMsV0FBS1IsV0FBTCxHQUFtQixDQUFuQjtBQUNBLFVBQUk4RSxHQUFHLEdBQUdELEtBQUssQ0FBQ0UsS0FBTixDQUFZQyxXQUFaLEVBQVY7QUFDQUYsTUFBQUEsR0FBRyxHQUFHLEtBQUt4SixZQUFMLENBQWtCMkosa0JBQWxCLENBQXFDSCxHQUFyQyxDQUFOO0FBQ0EsVUFBSW5CLEtBQUssR0FBRyxLQUFLdUIsZUFBTCxDQUFxQkosR0FBckIsQ0FBWjs7QUFDQSxVQUFJbkIsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixZQUFJLENBQUMsS0FBS2UsVUFBTCxDQUFnQmYsS0FBaEIsRUFBdUJnQixRQUE1QixFQUFzQztBQUNsQyxlQUFLRCxVQUFMLENBQWdCZixLQUFoQixFQUF1QmdCLFFBQXZCLEdBQWtDLElBQWxDO0FBQ0EsY0FBSXBGLElBQUksR0FBR3JFLEVBQUUsQ0FBQ2lLLFdBQUgsQ0FBZSxLQUFLdEosVUFBcEIsQ0FBWDtBQUNBMEQsVUFBQUEsSUFBSSxDQUFDa0YsTUFBTCxHQUFjLEtBQUtDLFVBQUwsQ0FBZ0JmLEtBQWhCLENBQWQ7QUFDQXhGLFVBQUFBLE1BQU0sQ0FBQytCLG1CQUFQLENBQTJCa0YsSUFBM0IsQ0FBZ0MsQ0FBaEMsS0FBc0MsQ0FBdEM7QUFDQSxlQUFLbEUsY0FBTDtBQUNBLGVBQUttRSxZQUFMLENBQWtCLEtBQUtYLFVBQUwsQ0FBZ0JmLEtBQWhCLEVBQXVCTCxRQUF6QyxFQUFtREssS0FBbkQ7QUFDSDtBQUNKOztBQUNELFdBQUtySCxhQUFMLENBQW1CeUQsTUFBbkIsR0FBNEIsQ0FBQyxLQUFLUSxVQUFsQztBQUNBLFdBQUtDLFlBQUwsR0FBb0IsQ0FBQyxLQUFLRCxVQUExQjtBQUNBLFdBQUsrRSxXQUFMLENBQWlCLENBQUMsS0FBSy9FLFVBQXZCO0FBQ0EsV0FBS1AsV0FBTCxHQUFtQixDQUFuQjs7QUFDQSxXQUFLLElBQUlrRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsvRixRQUFMLENBQWNnRyxNQUFsQyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUMzQyxZQUFJcUMsU0FBUyxHQUFHLEtBQUtwSSxRQUFMLENBQWMrRixDQUFkLEVBQWlCcEQsWUFBakIsQ0FBOEIsV0FBOUIsQ0FBaEI7O0FBQ0EsWUFBSXlGLFNBQVMsQ0FBQ0MsV0FBVixFQUFKLEVBQTZCO0FBQ3pCLGVBQUtySSxRQUFMLENBQWMrRixDQUFkLEVBQWlCdUMsT0FBakIsR0FBMkIsR0FBM0I7QUFDSCxTQUZELE1BRU87QUFDSCxlQUFLdEksUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnVDLE9BQWpCLEdBQTJCLEdBQTNCO0FBQ0g7QUFDSjtBQUNKO0FBQ0osR0E1Tkk7QUE4TkxKLEVBQUFBLFlBOU5LLHdCQThOUUssR0E5TlIsRUE4TmEvQixLQTlOYixFQThOb0I7QUFBQTs7QUFDckIsUUFBSWdDLE1BQU0sR0FBRyxLQUFLakIsVUFBTCxDQUFnQmYsS0FBaEIsRUFBdUJpQyxjQUF2QixDQUFzQyxVQUF0QyxDQUFiLENBRHFCLENBRXJCOztBQUNBRCxJQUFBQSxNQUFNLENBQUN2RSxTQUFQLENBQWlCbEcsRUFBRSxDQUFDbUcsUUFBSCxDQUNibkcsRUFBRSxDQUFDMkssS0FBSCxDQUFTM0ssRUFBRSxDQUFDNkcsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsQ0FBVCxFQUE2QjdHLEVBQUUsQ0FBQzRLLE9BQUgsQ0FBVyxHQUFYLENBQTdCLENBRGEsRUFFYjVLLEVBQUUsQ0FBQzZLLFVBQUgsQ0FBYyxJQUFkLENBRmEsQ0FBakI7QUFJQSxTQUFLckIsVUFBTCxDQUFnQmYsS0FBaEIsRUFBdUJnQixRQUF2QixHQUFrQyxJQUFsQztBQUNBLFNBQUt0QyxZQUFMLENBQWtCLFlBQU07QUFDcEIsVUFBSTlDLElBQUksR0FBR3JFLEVBQUUsQ0FBQ2lLLFdBQUgsQ0FBZSxNQUFJLENBQUN2SixnQkFBcEIsQ0FBWDtBQUNBMkQsTUFBQUEsSUFBSSxDQUFDa0YsTUFBTCxHQUFjLE1BQUksQ0FBQ25KLFlBQW5CO0FBQ0FpRSxNQUFBQSxJQUFJLENBQUMrRCxRQUFMLEdBQWdCb0MsR0FBaEI7QUFDQW5HLE1BQUFBLElBQUksQ0FBQzZDLENBQUwsSUFBVSxHQUFWO0FBQ0E3QyxNQUFBQSxJQUFJLENBQUN5RyxNQUFMLEdBQWMsS0FBSyxDQUFuQjtBQUNBekcsTUFBQUEsSUFBSSxDQUFDTyxZQUFMLENBQWtCNUUsRUFBRSxDQUFDK0ssU0FBckIsRUFBZ0NDLElBQWhDLENBQXFDLFlBQXJDO0FBQ0FwTCxNQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDaUksV0FBNUIsRUFBeUMsS0FBekMsRUFBZ0QsQ0FBaEQ7QUFDSCxLQVJELEVBUUcsR0FSSDtBQVNBLFFBQUlDLElBQUksR0FBRyxLQUFLQyxnQkFBTCxDQUFzQjNDLEtBQXRCLENBQVg7QUFDQVEsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlpQyxJQUFaO0FBQ0EsUUFBSUUsS0FBSyxHQUFHLENBQVo7QUFDQSxRQUFJQyxTQUFTLEdBQUcsRUFBaEI7QUFDQUEsSUFBQUEsU0FBUyxDQUFDQyxJQUFWLENBQWV2TCxFQUFFLENBQUNzRyxTQUFILENBQWEsR0FBYixDQUFmOztBQUNBLFNBQUssSUFBSTBCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdtRCxJQUFJLENBQUNsRCxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxVQUFJd0QsT0FBTyxHQUFHTCxJQUFJLENBQUNuRCxDQUFELENBQWxCOztBQUNBLFdBQUssSUFBSXlELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELE9BQU8sQ0FBQ3ZELE1BQTVCLEVBQW9Dd0QsQ0FBQyxFQUFyQyxFQUF5QztBQUNyQyxZQUFJQyxNQUFNLEdBQUdGLE9BQU8sQ0FBQ0MsQ0FBRCxDQUFwQjs7QUFDQSxZQUFJLEtBQUtqQyxVQUFMLENBQWdCa0MsTUFBaEIsRUFBd0JqQyxRQUE1QixFQUFzQztBQUNsQzZCLFVBQUFBLFNBQVMsQ0FBQ0MsSUFBVixDQUFldkwsRUFBRSxDQUFDc0ksUUFBSCxDQUFZLFlBQVk7QUFDbkMsZ0JBQUlvRCxNQUFNLEdBQUdDLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYSxDQUFiLENBQWI7QUFDQSxnQkFBSU4sS0FBSyxHQUFHTSxTQUFTLENBQUMsQ0FBRCxDQUFULENBQWEsQ0FBYixDQUFaO0FBQ0EsZ0JBQUlDLEtBQUssR0FBRyxLQUFLQyxjQUFMLENBQW9CUixLQUFwQixDQUFaO0FBQ0F6TCxZQUFBQSxLQUFLLENBQUNrTSxZQUFOLENBQW1CLE1BQU1GLEtBQXpCLEVBQWdDLEtBQUt4TCxZQUFyQyxFQUFtRCxLQUFLb0osVUFBTCxDQUFnQmtDLE1BQWhCLEVBQXdCbEQsQ0FBM0UsRUFBOEUsS0FBS2dCLFVBQUwsQ0FBZ0JrQyxNQUFoQixFQUF3QnhFLENBQXRHLEVBQXlHLEVBQXpHLEVBQTZHLElBQTdHLEVBQW1ILElBQW5ILEVBQXlILElBQXpILEVBQStILElBQS9IO0FBQ0EsaUJBQUs2RSxXQUFMLENBQWlCSCxLQUFqQjtBQUNILFdBTmMsRUFNWixJQU5ZLEVBTU4sQ0FBQ0YsTUFBRCxFQUFTTCxLQUFULENBTk0sQ0FBZjtBQVFBQyxVQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZXZMLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFZO0FBQ25DLGdCQUFJb0QsTUFBTSxHQUFHQyxTQUFTLENBQUMsQ0FBRCxDQUF0QjtBQUNBLGlCQUFLbkMsVUFBTCxDQUFnQmtDLE1BQWhCLEVBQXdCakMsUUFBeEIsR0FBbUMsSUFBbkM7QUFDQSxnQkFBSWdCLE1BQU0sR0FBRyxLQUFLakIsVUFBTCxDQUFnQmtDLE1BQWhCLEVBQXdCaEIsY0FBeEIsQ0FBdUMsVUFBdkMsQ0FBYjs7QUFDQSxnQkFBSSxDQUFDRCxNQUFMLEVBQWE7QUFDVCxxQkFEUyxDQUNGO0FBQ1Y7O0FBQ0QsaUJBQUt1QixhQUFMLENBQW1CdkIsTUFBTSxDQUFDN0IsVUFBMUIsRUFBc0MsS0FBS1ksVUFBTCxDQUFnQmtDLE1BQWhCLEVBQXdCbEQsQ0FBOUQsRUFBaUUsS0FBS2dCLFVBQUwsQ0FBZ0JrQyxNQUFoQixFQUF3QnhFLENBQXpGLEVBUG1DLENBUW5DOztBQUNBdUQsWUFBQUEsTUFBTSxDQUFDdkUsU0FBUCxDQUFpQmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FDYm5HLEVBQUUsQ0FBQzJLLEtBQUgsQ0FBUzNLLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQVQsRUFBNkI3RyxFQUFFLENBQUM0SyxPQUFILENBQVcsR0FBWCxDQUE3QixDQURhLEVBRWI1SyxFQUFFLENBQUM2SyxVQUFILENBQWMsSUFBZCxDQUZhLENBQWpCO0FBS0gsV0FkYyxFQWNaLElBZFksRUFjTmEsTUFkTSxDQUFmO0FBZUFMLFVBQUFBLEtBQUs7QUFDUjtBQUNKOztBQUNEQyxNQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZXZMLEVBQUUsQ0FBQ3NHLFNBQUgsQ0FBYSxHQUFiLENBQWY7QUFDSDs7QUFFRCxRQUFJZ0YsU0FBUyxDQUFDckQsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN0QjtBQUNBcUQsTUFBQUEsU0FBUyxDQUFDQyxJQUFWLENBQWV2TCxFQUFFLENBQUNzSSxRQUFILENBQVksWUFBWTtBQUNuQyxhQUFLekMsV0FBTCxHQUFtQixLQUFuQjtBQUNBLGFBQUt5RSxXQUFMO0FBQ0gsT0FIYyxFQUdaLElBSFksQ0FBZjtBQUlBLFdBQUt6RSxXQUFMLEdBQW1CLElBQW5CO0FBQ0EsVUFBSW9HLE1BQU0sR0FBR2pNLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW1GLFNBQVosQ0FBYjtBQUNBLFdBQUtqSCxJQUFMLENBQVU2QixTQUFWLENBQW9CK0YsTUFBcEI7QUFDSDtBQUNKLEdBaFNJOztBQWtTTDtBQUNKO0FBQ0E7QUFDQTtBQUNJYixFQUFBQSxnQkF0U0ssNEJBc1NZM0MsS0F0U1osRUFzU21CO0FBQ3BCLFdBQU94RixNQUFNLENBQUNpSixTQUFQLENBQWlCekQsS0FBakIsQ0FBUDtBQUNILEdBeFNJO0FBMFNMMEQsRUFBQUEsVUExU0ssd0JBMFNRLENBRVosQ0E1U0k7O0FBNlNMO0FBQ0o7QUFDQTtBQUNJQyxFQUFBQSxnQkFoVEssOEJBZ1RjO0FBQ2YsUUFBSUMsV0FBVyxHQUFHLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLENBQWxCOztBQUNBLFNBQUssSUFBSUMsQ0FBQyxHQUFHLEtBQUsvRixXQUFMLENBQWlCMEIsTUFBakIsR0FBMEIsQ0FBdkMsRUFBMENxRSxDQUFDLElBQUksQ0FBL0MsRUFBa0RBLENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQ7QUFDQSxXQUFLLElBQUl0RSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt3QixVQUFMLENBQWdCdkIsTUFBcEMsRUFBNENELENBQUMsRUFBN0MsRUFBaUQ7QUFDN0MsWUFBSXVFLFNBQVMsR0FBRyxLQUFLL0MsVUFBTCxDQUFnQnhCLENBQWhCLENBQWhCO0FBQ0EsWUFBSXdFLE1BQU0sR0FBR3hNLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTUYsU0FBUyxDQUFDL0QsQ0FBaEIsRUFBbUIrRCxTQUFTLENBQUNyRixDQUE3QixDQUFiO0FBQ0EsWUFBSW1FLEtBQUssR0FBRyxDQUFaOztBQUNBLFlBQUksQ0FBQ2tCLFNBQVMsQ0FBQzlDLFFBQWYsRUFBeUI7QUFDckI7QUFDQSxjQUFJaUQsUUFBUSxHQUFHLEtBQUtuRyxXQUFMLENBQWlCK0YsQ0FBakIsQ0FBZjs7QUFDQSxlQUFLLElBQUliLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdpQixRQUFRLENBQUN6RSxNQUE3QixFQUFxQ3dELENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsZ0JBQUlrQixHQUFHLEdBQUcsRUFBVixDQURzQyxDQUN6Qjs7QUFDYixnQkFBSUMsUUFBUSxHQUFHSixNQUFNLENBQUNLLEdBQVAsQ0FBVzdNLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTUMsUUFBUSxDQUFDakIsQ0FBRCxDQUFSLENBQVlqRCxDQUFsQixFQUFxQmtFLFFBQVEsQ0FBQ2pCLENBQUQsQ0FBUixDQUFZdkUsQ0FBakMsQ0FBWCxDQUFmLENBRnNDLENBR3RDOztBQUNBLGlCQUFLLElBQUk0RixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt0RCxVQUFMLENBQWdCdkIsTUFBcEMsRUFBNEM2RSxDQUFDLEVBQTdDLEVBQWlEO0FBQzdDLGtCQUFJQyxVQUFVLEdBQUcsS0FBS3ZELFVBQUwsQ0FBZ0JzRCxDQUFoQixDQUFqQjtBQUNBLGtCQUFJRSxHQUFHLEdBQUdoTixFQUFFLENBQUN5TSxFQUFILENBQU1NLFVBQVUsQ0FBQ3ZFLENBQWpCLEVBQW9CdUUsVUFBVSxDQUFDN0YsQ0FBL0IsRUFBa0MrRixHQUFsQyxDQUFzQ0wsUUFBdEMsRUFBZ0RNLEdBQWhELEVBQVY7O0FBQ0Esa0JBQUlGLEdBQUcsSUFBSUwsR0FBUCxJQUFjLENBQUNJLFVBQVUsQ0FBQ3RELFFBQTlCLEVBQXdDO0FBQ3BDNEIsZ0JBQUFBLEtBQUssR0FEK0IsQ0FDNUI7QUFDWDtBQUNKO0FBQ0osV0Fkb0IsQ0FlckI7OztBQUNBLGNBQUlBLEtBQUssSUFBSXFCLFFBQVEsQ0FBQ3pFLE1BQXRCLEVBQThCO0FBQzFCb0UsWUFBQUEsV0FBVyxDQUFDZCxJQUFaLENBQWlCZSxDQUFqQjtBQUNBO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBQ0QsUUFBSUQsV0FBVyxDQUFDcEUsTUFBWixHQUFxQixDQUF6QixFQUE0QjtBQUN4QixVQUFJa0YsR0FBRyxHQUFHdk4sS0FBSyxDQUFDd04sY0FBTixDQUFxQixDQUFyQixFQUF3QmYsV0FBVyxDQUFDcEUsTUFBWixHQUFxQixDQUE3QyxFQUFnRCxDQUFoRCxDQUFWO0FBQ0EsYUFBTyxDQUFDb0UsV0FBVyxDQUFDYyxHQUFHLENBQUMsQ0FBRCxDQUFKLENBQVosRUFBc0JkLFdBQVcsQ0FBQ2MsR0FBRyxDQUFDLENBQUQsQ0FBSixDQUFqQyxFQUEyQ2QsV0FBVyxDQUFDYyxHQUFHLENBQUMsQ0FBRCxDQUFKLENBQXRELENBQVA7QUFDSCxLQUhELE1BR087QUFDSCxhQUFPLENBQUNkLFdBQVcsQ0FBQyxDQUFELENBQVosRUFBaUJBLFdBQVcsQ0FBQyxDQUFELENBQTVCLEVBQWlDQSxXQUFXLENBQUMsQ0FBRCxDQUE1QyxDQUFQO0FBQ0g7QUFDSixHQXJWSTtBQXVWTHJDLEVBQUFBLGVBdlZLLDJCQXVWV1EsR0F2VlgsRUF1VmdCO0FBQ2pCLFNBQUssSUFBSXhDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcvRSxNQUFNLENBQUNvSyxjQUFQLENBQXNCcEYsTUFBMUMsRUFBa0RELENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBSXdDLEdBQUcsQ0FBQ3lDLEdBQUosQ0FBUWpOLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTXhKLE1BQU0sQ0FBQ29LLGNBQVAsQ0FBc0JyRixDQUF0QixFQUF5QixDQUF6QixDQUFOLEVBQW1DL0UsTUFBTSxDQUFDb0ssY0FBUCxDQUFzQnJGLENBQXRCLEVBQXlCLENBQXpCLENBQW5DLENBQVIsRUFBeUVrRixHQUF6RSxNQUFrRixFQUF0RixFQUEwRjtBQUN0RixlQUFPbEYsQ0FBUDtBQUNIO0FBQ0o7O0FBQ0QsV0FBTyxDQUFDLENBQVI7QUFDSCxHQTlWSTtBQWdXTGhDLEVBQUFBLGNBaFdLLDRCQWdXWTtBQUNiLFNBQUtzSCxTQUFMLEdBQWlCckssTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkJrRixJQUEzQixDQUFnQyxDQUFoQyxDQUFqQjtBQUNBLFNBQUt0SixXQUFMLENBQWlCOEUsTUFBakIsR0FBMEIsTUFBTSxLQUFLNEgsU0FBckM7QUFDQSxTQUFLQyxhQUFMLENBQW1CLEtBQUtwTSxXQUF4QixFQUFxQyxLQUFLbU0sU0FBMUM7QUFDQSxTQUFLNUksVUFBTDtBQUNILEdBcldJO0FBdVdMQSxFQUFBQSxVQXZXSyx3QkF1V1E7QUFDVCxTQUFLM0MsUUFBTCxDQUFjMkQsTUFBZCxHQUF1QnpDLE1BQU0sQ0FBQytCLG1CQUFQLENBQTJCWSxRQUFsRDtBQUNILEdBeldJO0FBMldMakIsRUFBQUEsVUEzV0ssd0JBMldRO0FBQ1RzRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaO0FBQ0EsUUFBSXNFLFVBQVUsR0FBRyxDQUFqQjs7QUFDQSxTQUFLLElBQUl4RixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsvRixRQUFMLENBQWNnRyxNQUFsQyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUMzQ3dGLE1BQUFBLFVBQVUsR0FBRyxLQUFLdkwsUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnBELFlBQWpCLENBQThCLFdBQTlCLEVBQTJDNkksV0FBM0MsQ0FBdUQsSUFBdkQsQ0FBYjtBQUNIOztBQUNELFFBQUl2RixJQUFJLEdBQUdqRixNQUFNLENBQUNrRixXQUFQLENBQW1CcUYsVUFBbkIsQ0FBWDs7QUFDQSxTQUFLLElBQUkvQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtqQyxVQUFMLENBQWdCdkIsTUFBcEMsRUFBNEN3RCxDQUFDLEVBQTdDLEVBQWlEO0FBQzdDLFVBQUloQixNQUFNLEdBQUcsS0FBS2pCLFVBQUwsQ0FBZ0JpQyxDQUFoQixFQUFtQmYsY0FBbkIsQ0FBa0MsVUFBbEMsQ0FBYjs7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDUkEsUUFBQUEsTUFBTSxDQUFDN0YsWUFBUCxDQUFvQjVFLEVBQUUsQ0FBQ2dCLE1BQXZCLEVBQStCbUksV0FBL0IsR0FBNkMsS0FBS3ZILGFBQUwsQ0FBbUJ3SCxjQUFuQixDQUFrQ2xCLElBQUksQ0FBQ1ksSUFBTCxHQUFZMkIsTUFBTSxDQUFDN0IsVUFBckQsQ0FBN0M7QUFDSDtBQUNKO0FBQ0osR0F4WEk7QUEwWEwyRSxFQUFBQSxhQTFYSyx5QkEwWFNsSixJQTFYVCxFQTBYZXFKLEdBMVhmLEVBMFhvQjtBQUNyQixRQUFJQyxNQUFNLEdBQUczTixFQUFFLENBQUNpSCxJQUFILENBQVEsUUFBUixFQUFrQjVDLElBQWxCLENBQWI7QUFDQXNKLElBQUFBLE1BQU0sQ0FBQzlJLE1BQVAsR0FBZ0I2SSxHQUFHLElBQUksQ0FBdkI7QUFDSCxHQTdYSTtBQStYTDNCLEVBQUFBLFdBL1hLLHVCQStYT0gsS0EvWFAsRUErWGM7QUFDZixTQUFLN0csV0FBTCxJQUFvQjZHLEtBQXBCO0FBQ0EsU0FBSzlLLFNBQUwsQ0FBZTRFLE1BQWYsR0FBd0IsS0FBS1gsV0FBN0I7QUFDQSxRQUFJLENBQUMsS0FBSzdELGdCQUFMLENBQXNCMkQsTUFBM0IsRUFDSTlFLFFBQVEsQ0FBQzBHLGdCQUFULENBQTBCLEtBQUsxQixXQUEvQjs7QUFDSixRQUFJLEtBQUtBLFdBQUwsR0FBbUI5QixNQUFNLENBQUMrQixtQkFBUCxDQUEyQjRJLFNBQWxELEVBQTZEO0FBQ3pEM0ssTUFBQUEsTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkI0SSxTQUEzQixHQUF1QyxLQUFLN0ksV0FBNUM7QUFDQWhGLE1BQUFBLFFBQVEsQ0FBQzhOLFFBQVQsQ0FBa0I1SyxNQUFNLENBQUMrQixtQkFBUCxDQUEyQjRJLFNBQTdDO0FBQ0g7QUFDSixHQXhZSTtBQTBZTDVKLEVBQUFBLFNBMVlLLHVCQTBZTztBQUNSLFNBQUt3RixVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsUUFBSXNFLFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxTQUFLLElBQUlyRixLQUFLLEdBQUcsQ0FBakIsRUFBb0JBLEtBQUssR0FBR3hGLE1BQU0sQ0FBQ29LLGNBQVAsQ0FBc0JwRixNQUFsRCxFQUEwRFEsS0FBSyxFQUEvRCxFQUFtRTtBQUMvRCxVQUFJcEUsSUFBSSxHQUFHckUsRUFBRSxDQUFDaUssV0FBSCxDQUFlLEtBQUsxSixhQUFwQixDQUFYO0FBQ0E4RCxNQUFBQSxJQUFJLENBQUNtRSxDQUFMLEdBQVN2RixNQUFNLENBQUNvSyxjQUFQLENBQXNCNUUsS0FBdEIsRUFBNkIsQ0FBN0IsQ0FBVDtBQUNBcEUsTUFBQUEsSUFBSSxDQUFDNkMsQ0FBTCxHQUFTakUsTUFBTSxDQUFDb0ssY0FBUCxDQUFzQjVFLEtBQXRCLEVBQTZCLENBQTdCLENBQVQ7QUFDQXBFLE1BQUFBLElBQUksQ0FBQ2tGLE1BQUwsR0FBYyxLQUFLekgsVUFBbkI7QUFDQXVDLE1BQUFBLElBQUksQ0FBQzBKLE9BQUwsR0FBZXRGLEtBQWY7QUFDQXFGLE1BQUFBLFNBQVMsQ0FBQ3ZDLElBQVYsQ0FBZWxILElBQWY7QUFDSDs7QUFDRCxTQUFLbUYsVUFBTCxHQUFrQnNFLFNBQWxCO0FBQ0gsR0F0Wkk7QUF3Wkw7QUFDQTVKLEVBQUFBLFdBelpLLHVCQXlaTzhKLEtBelpQLEVBeVpjO0FBQ2YsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQSxRQUFJQyxFQUFFLEdBQUdGLEtBQUssR0FBRyxHQUFqQjtBQUNBLFFBQUlFLEVBQUUsSUFBSSxDQUFWLEVBQWFBLEVBQUUsSUFBSSxDQUFOO0FBQ2IsUUFBSWhHLElBQUksR0FBR2pGLE1BQU0sQ0FBQ2tMLFVBQVAsQ0FBa0JELEVBQUUsR0FBRyxDQUF2QixDQUFYO0FBRUEsU0FBS25OLFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1Qk8sWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbUR3SixRQUFuRCxDQUE0RGxHLElBQUksQ0FBQ21HLE1BQWpFLEVBQXlFbkcsSUFBSSxDQUFDb0csTUFBOUUsRUFBc0ZOLEtBQXRGLEVBTmUsQ0FPZjs7QUFDQSxTQUFLak4sWUFBTCxDQUFrQnNELElBQWxCLENBQXVCUSxNQUF2QixHQUFnQyxJQUFoQztBQUNBLFNBQUs5RCxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJrRyxPQUF2QixHQUFpQyxHQUFqQztBQUNBLFNBQUt4SixZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUI2QyxDQUF2QixHQUEyQixHQUEzQjtBQUNBLFFBQUlBLENBQUMsR0FBRyxDQUFSO0FBQ0EsU0FBS25HLFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1Qk8sWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbUQySixhQUFuRDs7QUFDQSxRQUFJckcsSUFBSSxDQUFDbUcsTUFBTCxJQUFlLENBQW5CLEVBQXNCO0FBQ2xCO0FBQ0FuSCxNQUFBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMO0FBQ0gsS0FIRCxNQUdPLENBQ0g7QUFDSDs7QUFFRCxTQUFLbkcsWUFBTCxDQUFrQnNELElBQWxCLENBQXVCNkIsU0FBdkIsQ0FBaUNsRyxFQUFFLENBQUN1SSxNQUFILENBQVUsR0FBVixFQUFlLENBQWYsRUFBa0JyQixDQUFsQixFQUFxQkosTUFBckIsQ0FBNEI5RyxFQUFFLENBQUMrRyxNQUFILENBQVUsR0FBVixDQUE1QixDQUFqQzs7QUFFQSxRQUFJaUgsS0FBSyxHQUFHLENBQVIsSUFBYSxDQUFqQixFQUFvQjtBQUNoQixXQUFLck0sUUFBTCxDQUFja0QsTUFBZCxHQUF1QixJQUF2QjtBQUNBLFdBQUtsRCxRQUFMLENBQWM0SSxPQUFkLEdBQXdCLEVBQXhCO0FBQ0EsV0FBSzVJLFFBQUwsQ0FBY2lGLEtBQWQsR0FBc0IsR0FBdEI7QUFDQSxVQUFJNEgsTUFBTSxHQUFHLEVBQWI7QUFDQSxVQUFJQyxTQUFTLEdBQUcsSUFBaEI7QUFDQSxXQUFLOU0sUUFBTCxDQUFjdUUsU0FBZCxDQUF3QmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW5HLEVBQUUsQ0FBQzJLLEtBQUgsQ0FBUzNLLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCQyxNQUFyQixDQUE0QjlHLEVBQUUsQ0FBQzBPLFVBQUgsQ0FBYyxHQUFkLENBQTVCLENBQVQsRUFBMEQxTyxFQUFFLENBQUMyTyxNQUFILENBQVUsR0FBVixFQUFlLEdBQWYsQ0FBMUQsQ0FBWixFQUE0RjNPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBVixFQUFxQnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTStCLE1BQU0sR0FBRyxDQUFmLEVBQWtCLENBQWxCLENBQXJCLENBQTVGLEVBQ3BCeE8sRUFBRSxDQUFDNE8sTUFBSCxDQUFVSCxTQUFTLEdBQUcsQ0FBdEIsRUFBeUJ6TyxFQUFFLENBQUN5TSxFQUFILENBQU0sQ0FBQytCLE1BQUQsR0FBVSxDQUFoQixDQUF6QixDQURvQixFQUVwQnhPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBVixFQUFxQnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTStCLE1BQU0sR0FBRyxDQUFmLENBQXJCLENBRm9CLEVBSXBCeE8sRUFBRSxDQUFDNE8sTUFBSCxDQUFVSCxTQUFWLEVBQXFCek8sRUFBRSxDQUFDeU0sRUFBSCxDQUFNLENBQU4sRUFBUytCLE1BQU0sR0FBRyxDQUFsQixDQUFyQixDQUpvQixFQUtwQnhPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBUyxHQUFHLENBQXRCLEVBQXlCek8sRUFBRSxDQUFDeU0sRUFBSCxDQUFNLENBQU4sRUFBUyxDQUFDK0IsTUFBRCxHQUFVLENBQW5CLENBQXpCLENBTG9CLEVBTXBCeE8sRUFBRSxDQUFDNE8sTUFBSCxDQUFVSCxTQUFWLEVBQXFCek8sRUFBRSxDQUFDeU0sRUFBSCxDQUFNLENBQU4sRUFBUytCLE1BQU0sR0FBRyxDQUFsQixDQUFyQixDQU5vQixFQVFwQnhPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBVixFQUFxQnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTStCLE1BQU4sRUFBYyxDQUFkLENBQXJCLENBUm9CLEVBU3BCeE8sRUFBRSxDQUFDNE8sTUFBSCxDQUFVSCxTQUFTLEdBQUcsQ0FBdEIsRUFBeUJ6TyxFQUFFLENBQUN5TSxFQUFILENBQU0sQ0FBQytCLE1BQUQsR0FBVSxDQUFoQixFQUFtQixDQUFuQixDQUF6QixDQVRvQixFQVVwQnhPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBVixFQUFxQnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTStCLE1BQU4sRUFBYyxDQUFkLENBQXJCLENBVm9CLEVBWXBCeE8sRUFBRSxDQUFDNE8sTUFBSCxDQUFVSCxTQUFWLEVBQXFCek8sRUFBRSxDQUFDeU0sRUFBSCxDQUFNLENBQU4sRUFBUytCLE1BQVQsQ0FBckIsQ0Fab0IsRUFhcEJ4TyxFQUFFLENBQUM0TyxNQUFILENBQVVILFNBQVMsR0FBRyxDQUF0QixFQUF5QnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTSxDQUFOLEVBQVMsQ0FBQytCLE1BQUQsR0FBVSxDQUFuQixDQUF6QixDQWJvQixFQWNwQnhPLEVBQUUsQ0FBQzRPLE1BQUgsQ0FBVUgsU0FBVixFQUFxQnpPLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTSxDQUFOLEVBQVMrQixNQUFULENBQXJCLENBZG9CLEVBZXBCeE8sRUFBRSxDQUFDNEssT0FBSCxDQUFXLEdBQVgsQ0Fmb0IsQ0FBeEI7QUFnQkg7QUFDSixHQXRjSTtBQXljTDtBQUNBaUUsRUFBQUEsUUFBUSxFQUFFLGtCQUFVQyxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjtBQUNwQyxRQUFJQyxhQUFhLEdBQUcsS0FBS25ELGNBQUwsQ0FBb0JpRCxPQUFwQixFQUE2QkMsU0FBN0IsQ0FBcEI7QUFDQW5QLElBQUFBLEtBQUssQ0FBQ2tNLFlBQU4sQ0FBbUIsTUFBTWtELGFBQXpCLEVBQXdDLElBQXhDLEVBQThDLENBQTlDLEVBQWlELENBQWpELEVBQW9ELEVBQXBEO0FBQ0EsU0FBS2pELFdBQUwsQ0FBaUJpRCxhQUFqQjtBQUNILEdBOWNJO0FBZ2RMO0FBQ0FuRCxFQUFBQSxjQUFjLEVBQUUsd0JBQVVpRCxPQUFWLEVBQW1CQyxTQUFuQixFQUE4QjtBQUMxQyxRQUFJdkcsQ0FBQyxHQUFHc0csT0FBTyxHQUFHLENBQWxCO0FBQ0EsUUFBSUUsYUFBYSxHQUFHRCxTQUFTLEdBQUd2RyxDQUFILEdBQU9BLENBQUMsR0FBR0EsQ0FBeEMsQ0FGMEMsQ0FFQTs7QUFDMUMsV0FBT3dHLGFBQWEsR0FBRyxLQUFLckosYUFBNUI7QUFDSCxHQXJkSTtBQXVkTDtBQUNBMkUsRUFBQUEsV0FBVyxFQUFFLHVCQUFZO0FBQ3JCO0FBQ0EsUUFBSSxLQUFLekUsV0FBVCxFQUFzQjtBQUN0QixTQUFLVixnQkFBTCxHQUF3QixDQUF4QjtBQUNBLFFBQUlrRyxLQUFLLEdBQUcsQ0FBWjs7QUFDQSxTQUFLLElBQUlyRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLFVBQUkzRCxJQUFJLEdBQUdyRSxFQUFFLENBQUNpSCxJQUFILENBQVEsWUFBWWUsQ0FBQyxHQUFHLENBQWhCLENBQVIsRUFBNEIsS0FBSzVILFlBQWpDLENBQVg7QUFDQSxVQUFJNk8sTUFBTSxHQUFHNUssSUFBSSxDQUFDTyxZQUFMLENBQWtCLFdBQWxCLENBQWI7O0FBQ0EsVUFBSXFLLE1BQU0sQ0FBQzNFLFdBQVAsRUFBSixFQUEwQjtBQUN0QmUsUUFBQUEsS0FBSztBQUNMaEgsUUFBQUEsSUFBSSxDQUFDa0csT0FBTCxHQUFlLEdBQWY7QUFDSCxPQUhELE1BR087QUFDSGxHLFFBQUFBLElBQUksQ0FBQ2tHLE9BQUwsR0FBZSxHQUFmO0FBQ0g7QUFDSjs7QUFDRCxRQUFJYyxLQUFLLElBQUksQ0FBVCxJQUFjLENBQUMsS0FBS3ZGLFFBQXhCLEVBQWtDO0FBQzlCLFdBQUtBLFFBQUwsR0FBZ0IsSUFBaEI7O0FBQ0EsV0FBSyxJQUFJa0MsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRyxDQUFwQixFQUF1QkEsR0FBQyxFQUF4QixFQUE0QjtBQUN4QixZQUFJM0QsS0FBSSxHQUFHckUsRUFBRSxDQUFDaUgsSUFBSCxDQUFRLFlBQVllLEdBQUMsR0FBRyxDQUFoQixDQUFSLEVBQTRCLEtBQUs1SCxZQUFqQyxDQUFYOztBQUNBaUUsUUFBQUEsS0FBSSxDQUFDTyxZQUFMLENBQWtCLFdBQWxCLEVBQStCc0ssWUFBL0IsQ0FBNEMsQ0FBNUMsRUFGd0IsQ0FFd0I7O0FBQ25EO0FBQ0o7O0FBQ0QsUUFBSTdELEtBQUssSUFBSSxDQUFiLEVBQWdCO0FBQUU7QUFDZCxXQUFLOEQsU0FBTCxDQUFlLEtBQWY7QUFDSDtBQUNKLEdBamZJO0FBbWZMO0FBQ0FDLEVBQUFBLFlBcGZLLDBCQW9mVTtBQUNYLFFBQUlDLGVBQWUsR0FBRyxFQUF0Qjs7QUFDQSxTQUFLLElBQUlySCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUt3QixVQUFMLENBQWdCdkIsTUFBcEMsRUFBNENELENBQUMsRUFBN0MsRUFBaUQ7QUFDN0MsVUFBSSxLQUFLd0IsVUFBTCxDQUFnQnhCLENBQWhCLEVBQW1CeUIsUUFBdkIsRUFBaUM7QUFDN0I0RixRQUFBQSxlQUFlLENBQUM5RCxJQUFoQixDQUFxQixLQUFLL0IsVUFBTCxDQUFnQnhCLENBQWhCLEVBQW1CK0YsT0FBeEM7QUFDSDtBQUNKOztBQUNEc0IsSUFBQUEsZUFBZSxDQUFDQyxJQUFoQixDQUFxQixVQUFVQyxDQUFWLEVBQWFDLENBQWIsRUFBZ0I7QUFDakMsYUFBT0QsQ0FBQyxHQUFHQyxDQUFYO0FBQ0gsS0FGRDtBQUdBLFFBQUlDLE1BQU0sR0FBRyxFQUFiLENBVlcsQ0FVSzs7QUFDaEIsU0FBSyxJQUFJekgsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBRy9FLE1BQU0sQ0FBQ3lNLE9BQVAsQ0FBZXpILE1BQW5DLEVBQTJDRCxHQUFDLEVBQTVDLEVBQWdEO0FBQzVDLFVBQUkySCxTQUFTLEdBQUcxTSxNQUFNLENBQUN5TSxPQUFQLENBQWUxSCxHQUFmLENBQWhCO0FBQ0EsVUFBSTRILFlBQVksR0FBRyxLQUFLQyxnQkFBTCxDQUFzQlIsZUFBdEIsRUFBdUNNLFNBQXZDLENBQW5CLENBRjRDLENBRXlCOztBQUNyRSxVQUFJQyxZQUFZLENBQUMzSCxNQUFiLEdBQXNCLENBQTFCLEVBQTZCO0FBQ3pCLFlBQUk2SCxJQUFJLEdBQUcsS0FBS0MsZ0JBQUwsQ0FBc0JKLFNBQXRCLEVBQWlDQyxZQUFqQyxDQUFYLENBRHlCLENBQ2lDOztBQUMxRCxZQUFJRSxJQUFKLEVBQVU7QUFDTkwsVUFBQUEsTUFBTSxDQUFDbEUsSUFBUCxDQUFZb0UsU0FBWjtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxRQUFJckUsU0FBUyxHQUFHLEVBQWhCLENBckJXLENBc0JYOztBQUNBLFFBQUlELEtBQUssR0FBRyxDQUFaO0FBQ0EsUUFBSTJFLFFBQVEsR0FBRyxDQUFmOztBQUNBLFNBQUssSUFBSWhJLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUd5SCxNQUFNLENBQUN4SCxNQUEzQixFQUFtQ0QsR0FBQyxFQUFwQyxFQUF3QztBQUNwQyxVQUFJd0QsT0FBTyxHQUFHaUUsTUFBTSxDQUFDekgsR0FBRCxDQUFwQjtBQUNBZ0ksTUFBQUEsUUFBUSxJQUFJeEUsT0FBTyxDQUFDdkQsTUFBcEI7O0FBQ0EsV0FBSyxJQUFJd0QsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsT0FBTyxDQUFDdkQsTUFBNUIsRUFBb0N3RCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDLFlBQUlDLE1BQU0sR0FBR0YsT0FBTyxDQUFDQyxDQUFELENBQXBCO0FBQ0FILFFBQUFBLFNBQVMsQ0FBQ0MsSUFBVixDQUFldkwsRUFBRSxDQUFDc0ksUUFBSCxDQUFZLFlBQVk7QUFDbkMsY0FBSW9ELE1BQU0sR0FBR0MsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLENBQWIsQ0FBYjtBQUNBLGNBQUlOLEtBQUssR0FBR00sU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhLENBQWIsQ0FBWjtBQUNBLGNBQUlDLEtBQUssR0FBRyxLQUFLQyxjQUFMLENBQW9CUixLQUFwQixDQUFaLENBSG1DLENBSW5DOztBQUNBekwsVUFBQUEsS0FBSyxDQUFDa00sWUFBTixDQUFtQixNQUFNRixLQUF6QixFQUFnQyxLQUFLeEwsWUFBckMsRUFBbUQsS0FBS29KLFVBQUwsQ0FBZ0JrQyxNQUFoQixFQUF3QmxELENBQTNFLEVBQThFLEtBQUtnQixVQUFMLENBQWdCa0MsTUFBaEIsRUFBd0J4RSxDQUF0RyxFQUF5RyxFQUF6RyxFQUE2RyxJQUE3RyxFQUFtSCxJQUFuSCxFQUF5SCxJQUF6SCxFQUErSCxJQUEvSDtBQUNBLGVBQUs2RSxXQUFMLENBQWlCSCxLQUFqQjtBQUNILFNBUGMsRUFPWixJQVBZLEVBT04sQ0FBQ0YsTUFBRCxFQUFTTCxLQUFULENBUE0sQ0FBZjtBQVNBQyxRQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZXZMLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFZO0FBQ25DLGNBQUlvRCxNQUFNLEdBQUdDLFNBQVMsQ0FBQyxDQUFELENBQXRCO0FBQ0EsZUFBS25DLFVBQUwsQ0FBZ0JrQyxNQUFoQixFQUF3QmpDLFFBQXhCLEdBQW1DLElBQW5DO0FBQ0EsY0FBSWdCLE1BQU0sR0FBRyxLQUFLakIsVUFBTCxDQUFnQmtDLE1BQWhCLEVBQXdCaEIsY0FBeEIsQ0FBdUMsVUFBdkMsQ0FBYjs7QUFDQSxjQUFJLENBQUNELE1BQUwsRUFBYTtBQUNULG1CQURTLENBQ0Y7QUFDVjs7QUFDRCxlQUFLdUIsYUFBTCxDQUFtQnZCLE1BQU0sQ0FBQzdCLFVBQTFCLEVBQXNDLEtBQUtZLFVBQUwsQ0FBZ0JrQyxNQUFoQixFQUF3QmxELENBQTlELEVBQWlFLEtBQUtnQixVQUFMLENBQWdCa0MsTUFBaEIsRUFBd0J4RSxDQUF6RixFQVBtQyxDQVFuQzs7QUFDQXVELFVBQUFBLE1BQU0sQ0FBQ3ZFLFNBQVAsQ0FBaUJsRyxFQUFFLENBQUNtRyxRQUFILENBQ2JuRyxFQUFFLENBQUMySyxLQUFILENBQVMzSyxFQUFFLENBQUM2RyxPQUFILENBQVcsR0FBWCxFQUFnQixDQUFoQixDQUFULEVBQTZCN0csRUFBRSxDQUFDNEssT0FBSCxDQUFXLEdBQVgsQ0FBN0IsQ0FEYSxFQUViNUssRUFBRSxDQUFDNkssVUFBSCxDQUFjLElBQWQsQ0FGYSxDQUFqQjtBQUtILFNBZGMsRUFjWixJQWRZLEVBY05hLE1BZE0sQ0FBZjtBQWdCQUosUUFBQUEsU0FBUyxDQUFDQyxJQUFWLENBQWV2TCxFQUFFLENBQUNzRyxTQUFILENBQWEsR0FBYixDQUFmO0FBQ0ErRSxRQUFBQSxLQUFLO0FBQ1I7QUFDSjs7QUFFRCxRQUFJQyxTQUFTLENBQUNyRCxNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3RCckksTUFBQUEsS0FBSyxDQUFDcUwsY0FBTixDQUFxQmhJLE1BQU0sQ0FBQ2dOLFFBQTVCLEVBQXNDLEtBQXRDLEVBQTZDLENBQTdDO0FBQ0EzRSxNQUFBQSxTQUFTLENBQUNDLElBQVYsQ0FBZXZMLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFZO0FBQ25DLGFBQUt6QyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0EsYUFBS3lFLFdBQUw7QUFDSCxPQUhjLEVBR1osSUFIWSxDQUFmO0FBSUEsV0FBSzRGLGVBQUwsQ0FBcUJGLFFBQXJCO0FBQ0EsV0FBS25LLFdBQUwsR0FBbUIsSUFBbkI7QUFDQSxVQUFJb0csTUFBTSxHQUFHak0sRUFBRSxDQUFDbUcsUUFBSCxDQUFZbUYsU0FBWixDQUFiO0FBQ0EsV0FBS2pILElBQUwsQ0FBVTZCLFNBQVYsQ0FBb0IrRixNQUFwQjtBQUNIO0FBQ0osR0EzakJJO0FBNmpCTDtBQUNBNEQsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVNLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3BDLFFBQUlSLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxTQUFLLElBQUk1SCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHbUksSUFBSSxDQUFDbEksTUFBekIsRUFBaUNELENBQUMsRUFBbEMsRUFBc0M7QUFDbEMsV0FBSyxJQUFJeUQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzJFLElBQUksQ0FBQ25JLE1BQXpCLEVBQWlDd0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxZQUFJMkUsSUFBSSxDQUFDM0UsQ0FBRCxDQUFKLElBQVcwRSxJQUFJLENBQUNuSSxDQUFELENBQW5CLEVBQXdCO0FBQ3BCNEgsVUFBQUEsWUFBWSxDQUFDckUsSUFBYixDQUFrQjZFLElBQUksQ0FBQzNFLENBQUQsQ0FBdEI7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsV0FBT21FLFlBQVA7QUFDSCxHQXhrQkk7O0FBMmtCTDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUcsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVVJLElBQVYsRUFBZ0JDLElBQWhCLEVBQXNCO0FBQ3BDLFNBQUssSUFBSXBJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdtSSxJQUFJLENBQUNsSSxNQUF6QixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxVQUFJb0ksSUFBSSxDQUFDcEksQ0FBRCxDQUFKLElBQVdtSSxJQUFJLENBQUNuSSxDQUFELENBQW5CLEVBQXdCO0FBQ3BCLGVBQU8sS0FBUDtBQUNIO0FBQ0o7O0FBQ0QsV0FBTyxJQUFQO0FBQ0gsR0F4bEJJO0FBMGxCTGtJLEVBQUFBLGVBMWxCSywyQkEwbEJXeEMsR0ExbEJYLEVBMGxCZ0I7QUFBQTs7QUFDakJ6RSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxpQkFBWixFQUErQndFLEdBQS9CO0FBQ0EsUUFBSWpGLEtBQUssR0FBRyxDQUFDLENBQWI7O0FBQ0EsUUFBSWlGLEdBQUcsR0FBRyxDQUFOLElBQVdBLEdBQUcsSUFBSSxFQUF0QixFQUEwQjtBQUN0QmpGLE1BQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0gsS0FGRCxNQUVPLElBQUlpRixHQUFHLEdBQUcsRUFBTixJQUFZQSxHQUFHLElBQUksRUFBdkIsRUFBMkI7QUFDOUJqRixNQUFBQSxLQUFLLEdBQUcsQ0FBUjtBQUNILEtBRk0sTUFFQSxJQUFJaUYsR0FBRyxHQUFHLEVBQVYsRUFBYztBQUNqQmpGLE1BQUFBLEtBQUssR0FBRyxDQUFSO0FBQ0g7O0FBQ0QsUUFBSUEsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixVQUFJQSxLQUFLLElBQUksQ0FBYixFQUFnQjtBQUNaN0ksUUFBQUEsS0FBSyxDQUFDcUwsY0FBTixDQUFxQmhJLE1BQU0sQ0FBQ29OLEtBQTVCLEVBQW1DLEtBQW5DLEVBQTBDLENBQTFDO0FBQ0gsT0FGRCxNQUVPO0FBQ0h6USxRQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDZ04sUUFBNUIsRUFBc0MsS0FBdEMsRUFBNkMsQ0FBN0M7QUFDSDs7QUFDRCxXQUFLM08sWUFBTCxDQUFrQm1ILEtBQWxCLEVBQXlCNUQsTUFBekIsR0FBa0MsSUFBbEM7QUFDQSxXQUFLdkQsWUFBTCxDQUFrQm1ILEtBQWxCLEVBQXlCN0QsWUFBekIsQ0FBc0M1RSxFQUFFLENBQUMrSyxTQUF6QyxFQUFvREMsSUFBcEQ7QUFDQXNGLE1BQUFBLFVBQVUsQ0FBQyxZQUFNO0FBQ2IsUUFBQSxNQUFJLENBQUNoUCxZQUFMLENBQWtCbUgsS0FBbEIsRUFBeUI1RCxNQUF6QixHQUFrQyxLQUFsQztBQUNILE9BRlMsRUFFUCxJQUZPLENBQVY7QUFHSDtBQUNKLEdBaG5CSTtBQWtuQkw7QUFDQTBMLEVBQUFBLE9Bbm5CSyxtQkFtbkJHQyxJQW5uQkgsRUFtbkJTQyxJQW5uQlQsRUFtbkJlQyxJQW5uQmYsRUFtbkJxQjtBQUN0QixRQUFJQyxNQUFNLEdBQUcsSUFBYjtBQUNBLFFBQUlDLFVBQVUsR0FBRyxLQUFLcFAsVUFBdEI7QUFDQXlCLElBQUFBLE1BQU0sQ0FBQytCLG1CQUFQLENBQTJCWSxRQUEzQixJQUF1QzRLLElBQXZDOztBQUNBLFNBQUssSUFBSXhJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd3SSxJQUFwQixFQUEwQnhJLENBQUMsRUFBM0IsRUFBK0I7QUFDM0JwSSxNQUFBQSxLQUFLLENBQUNpUixRQUFOLENBQWVELFVBQWYsRUFBMkIsS0FBS3hRLFlBQWhDLEVBQThDcVEsSUFBOUMsRUFBb0RDLElBQXBELEVBQTBELFlBQU07QUFDNUQ5USxRQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDZ04sUUFBNUIsRUFBc0MsS0FBdEMsRUFBNkMsR0FBN0M7QUFDQVUsUUFBQUEsTUFBTSxDQUFDNU8sUUFBUCxDQUFnQjJELE1BQWhCLEdBQXlCekMsTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkJZLFFBQXBEO0FBQ0gsT0FIRCxFQUdHLEdBSEgsRUFHUSxNQUFNb0MsQ0FBQyxHQUFHLENBQVYsQ0FIUjtBQUlILEtBVHFCLENBVXRCOztBQUNILEdBOW5CSTtBQWdvQkw7QUFDQThJLEVBQUFBLE9Bam9CSyxtQkFpb0JHTCxJQWpvQkgsRUFpb0JTQyxJQWpvQlQsRUFpb0JleEMsRUFqb0JmLEVBaW9CbUI7QUFDcEIsUUFBSXlDLE1BQU0sR0FBRyxJQUFiOztBQUNBLFFBQUlJLFFBQVEsR0FBRyxTQUFYQSxRQUFXLEdBQVk7QUFDdkIsVUFBSTdDLEVBQUUsR0FBRyxFQUFMLElBQVcsQ0FBWCxJQUFnQkEsRUFBRSxJQUFJLEdBQTFCLEVBQStCO0FBQzNCeUMsUUFBQUEsTUFBTSxDQUFDdk8sWUFBUCxDQUFvQndFLEtBQXBCLEdBQTRCLENBQTVCO0FBQ0ErSixRQUFBQSxNQUFNLENBQUN2TyxZQUFQLENBQW9CeUMsTUFBcEIsR0FBNkIsSUFBN0I7QUFDQThMLFFBQUFBLE1BQU0sQ0FBQ3ZPLFlBQVAsQ0FBb0I4RCxTQUFwQixDQUE4QmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW5HLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCQyxNQUExQixDQUFpQzlHLEVBQUUsQ0FBQytHLE1BQUgsQ0FBVSxHQUFWLENBQWpDLENBQVosRUFBOEQvRyxFQUFFLENBQUM2RyxPQUFILENBQVcsR0FBWCxFQUFnQixDQUFoQixFQUFtQixDQUFuQixDQUE5RCxDQUE5QjtBQUNBOEosUUFBQUEsTUFBTSxDQUFDdk8sWUFBUCxDQUFvQndDLFlBQXBCLENBQWlDLGNBQWpDLEVBQWlEb00sUUFBakQsQ0FBMEQ5QyxFQUExRDtBQUNIO0FBQ0osS0FQRDs7QUFRQXRPLElBQUFBLEtBQUssQ0FBQ3FSLE9BQU4sQ0FBYyxxQkFBZCxFQUFxQ2pSLEVBQUUsQ0FBQ3lCLFdBQXhDLEVBQXFELFVBQUN5UCxHQUFELEVBQVM7QUFDMUR0UixNQUFBQSxLQUFLLENBQUNpUixRQUFOLENBQWVLLEdBQWYsRUFBb0JQLE1BQU0sQ0FBQ3ZRLFlBQTNCLEVBQXlDcVEsSUFBekMsRUFBK0NDLElBQS9DLEVBQXFELFlBQU07QUFDdkRDLFFBQUFBLE1BQU0sQ0FBQ2hPLGFBQVAsQ0FBcUJrQyxNQUFyQixHQUE4QixJQUE5QjtBQUNBOEwsUUFBQUEsTUFBTSxDQUFDaE8sYUFBUCxDQUFxQmlDLFlBQXJCLENBQWtDLGdCQUFsQyxFQUFvRHVNLFFBQXBELENBQTZESixRQUE3RDtBQUNILE9BSEQsRUFHRyxHQUhILEVBR1EsR0FIUjtBQUlILEtBTEQ7QUFNSCxHQWpwQkk7QUFtcEJML0UsRUFBQUEsYUFucEJLLHlCQW1wQlNvRixJQW5wQlQsRUFtcEJlNUksQ0FucEJmLEVBbXBCa0J0QixDQW5wQmxCLEVBbXBCcUI7QUFDdEIsUUFBSStHLElBQUksR0FBRyxJQUFYO0FBQ0EsUUFBSW9ELFFBQVEsR0FBR0QsSUFBSSxHQUFHLElBQUlBLElBQVAsR0FBYyxDQUFqQztBQUNBLFFBQUlFLFNBQVMsR0FBRyxLQUFLak8sWUFBTCxDQUFrQmtPLEdBQWxCLEVBQWhCOztBQUNBLFFBQUksQ0FBQ0QsU0FBTCxFQUFnQjtBQUNaQSxNQUFBQSxTQUFTLEdBQUd0UixFQUFFLENBQUNpSyxXQUFILENBQWUsS0FBS2pJLFVBQXBCLENBQVo7QUFDSDs7QUFDRCxRQUFJd1AsS0FBSyxHQUFHNVIsS0FBSyxDQUFDNlIsUUFBTixDQUFlLEtBQUsxUSxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJrRixNQUF2QixDQUE4QmYsQ0FBN0MsRUFBZ0QsS0FBS3pILFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1QmtGLE1BQXZCLENBQThCckMsQ0FBOUUsRUFBaUZzQixDQUFqRixFQUFvRnRCLENBQXBGLENBQVo7O0FBQ0EsUUFBSSxLQUFLbkcsWUFBTCxDQUFrQnNELElBQWxCLENBQXVCa0YsTUFBdkIsQ0FBOEJmLENBQTlCLElBQW1DQSxDQUF2QyxFQUEwQztBQUN0Q2dKLE1BQUFBLEtBQUssR0FBRyxDQUFDQSxLQUFUO0FBQ0g7O0FBQ0RGLElBQUFBLFNBQVMsQ0FBQ0ksUUFBVixHQUFxQkYsS0FBckI7QUFDQUYsSUFBQUEsU0FBUyxDQUFDMU0sWUFBVixDQUF1QixVQUF2QixFQUFtQytNLFVBQW5DO0FBQ0FMLElBQUFBLFNBQVMsQ0FBQ3hHLE1BQVYsR0FBbUIsS0FBSyxDQUF4QjtBQUNBd0csSUFBQUEsU0FBUyxDQUFDL0gsTUFBVixHQUFtQixLQUFLbkosWUFBeEI7QUFDQWtSLElBQUFBLFNBQVMsQ0FBQzlJLENBQVYsR0FBY0EsQ0FBZDtBQUNBOEksSUFBQUEsU0FBUyxDQUFDcEssQ0FBVixHQUFjQSxDQUFkO0FBQ0FvSyxJQUFBQSxTQUFTLENBQUNwTCxTQUFWLENBQW9CbEcsRUFBRSxDQUFDbUcsUUFBSCxDQUFZbkcsRUFBRSxDQUFDc0ksUUFBSCxDQUFZLFlBQU0sQ0FDakQsQ0FEK0IsQ0FBWixFQUNoQnRJLEVBQUUsQ0FBQ3VJLE1BQUgsQ0FBVSxHQUFWLEVBQWV2SSxFQUFFLENBQUN5TSxFQUFILENBQU0sS0FBSzFMLFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1QmtGLE1BQXZCLENBQThCZixDQUFwQyxFQUF1QyxLQUFLekgsWUFBTCxDQUFrQnNELElBQWxCLENBQXVCa0YsTUFBdkIsQ0FBOEJyQyxDQUFyRSxDQUFmLEVBQXdGSixNQUF4RixDQUErRjlHLEVBQUUsQ0FBQytHLE1BQUgsQ0FBVSxHQUFWLENBQS9GLENBRGdCLEVBQ2dHL0csRUFBRSxDQUFDc0ksUUFBSCxDQUFZLFlBQU07QUFDbEkyRixNQUFBQSxJQUFJLENBQUM1SyxZQUFMLENBQWtCdU8sR0FBbEIsQ0FBc0JOLFNBQXRCO0FBQ0FBLE1BQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0FyRCxNQUFBQSxJQUFJLENBQUM0RCxZQUFMLENBQWtCUixRQUFsQjtBQUNILEtBSm1ILENBRGhHLENBQXBCO0FBTUgsR0ExcUJJO0FBNHFCTFMsRUFBQUEsd0JBNXFCSyxzQ0E0cUJzQjtBQUFBOztBQUN2QixRQUFJN0QsSUFBSSxHQUFHLElBQVg7QUFDQSxRQUFJZCxHQUFHLEdBQUcsRUFBVjtBQUNBLFFBQUlSLEdBQUcsR0FBRyxDQUFWOztBQUNBLFNBQUssSUFBSTNFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3dCLFVBQUwsQ0FBZ0J2QixNQUFwQyxFQUE0Q0QsQ0FBQyxFQUE3QyxFQUFpRDtBQUM3QyxVQUFJLEtBQUt3QixVQUFMLENBQWdCeEIsQ0FBaEIsRUFBbUJ5QixRQUF2QixFQUFpQztBQUM3QjBELFFBQUFBLEdBQUcsQ0FBQzVCLElBQUosQ0FBU3ZELENBQVQ7QUFDQTJFLFFBQUFBLEdBQUc7QUFDSCxZQUFJQSxHQUFHLElBQUksQ0FBWCxFQUFjO0FBQ2pCO0FBQ0o7O0FBVnNCLCtCQVdkM0UsR0FYYztBQVluQixVQUFJc0osU0FBUyxHQUFHLE1BQUksQ0FBQy9OLFlBQUwsQ0FBa0JnTyxHQUFsQixFQUFoQjs7QUFDQSxVQUFJLENBQUNELFNBQUwsRUFBZ0I7QUFDWkEsUUFBQUEsU0FBUyxHQUFHdFIsRUFBRSxDQUFDaUssV0FBSCxDQUFlLE1BQUksQ0FBQ3hKLFdBQXBCLENBQVo7QUFDSDs7QUFDRCxVQUFJK0osR0FBRyxHQUFHLE1BQUksQ0FBQ2hCLFVBQUwsQ0FBZ0IyRCxHQUFHLENBQUNuRixHQUFELENBQW5CLEVBQXdCSSxRQUFsQztBQUNBa0osTUFBQUEsU0FBUyxDQUFDL0gsTUFBVixHQUFtQixNQUFJLENBQUNuSixZQUF4QjtBQUNBa1IsTUFBQUEsU0FBUyxDQUFDbEosUUFBVixHQUFxQnBJLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTSxNQUFJLENBQUMxTCxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJrRixNQUF2QixDQUE4QmYsQ0FBcEMsRUFBdUMsTUFBSSxDQUFDekgsWUFBTCxDQUFrQnNELElBQWxCLENBQXVCa0YsTUFBdkIsQ0FBOEJyQyxDQUFyRSxDQUFyQjtBQUNBb0ssTUFBQUEsU0FBUyxDQUFDcEwsU0FBVixDQUFvQmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FBWW5HLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFNO0FBQzlDMUksUUFBQUEsS0FBSyxDQUFDcUwsY0FBTixDQUFxQmhJLE1BQU0sQ0FBQ2dOLFFBQTVCLEVBQXNDLEtBQXRDLEVBQTZDLENBQTdDO0FBQ0gsT0FGK0IsQ0FBWixFQUVoQmpRLEVBQUUsQ0FBQ3VJLE1BQUgsQ0FBVSxHQUFWLEVBQWVpQyxHQUFmLEVBQW9CMUQsTUFBcEIsQ0FBMkI5RyxFQUFFLENBQUMrRyxNQUFILENBQVUsR0FBVixDQUEzQixDQUZnQixFQUU0Qi9HLEVBQUUsQ0FBQ3NJLFFBQUgsQ0FBWSxZQUFNO0FBQzlEMkYsUUFBQUEsSUFBSSxDQUFDMUssWUFBTCxDQUFrQnFPLEdBQWxCLENBQXNCTixTQUF0QjtBQUNBQSxRQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNBckQsUUFBQUEsSUFBSSxDQUFDOEQsVUFBTCxDQUFnQjVFLEdBQUcsQ0FBQ25GLEdBQUQsQ0FBbkI7QUFDSCxPQUorQyxDQUY1QixDQUFwQjtBQW5CbUI7O0FBV3ZCLFNBQUssSUFBSUEsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR21GLEdBQUcsQ0FBQ2xGLE1BQXhCLEVBQWdDRCxHQUFDLEVBQWpDLEVBQXFDO0FBQUEsWUFBNUJBLEdBQTRCO0FBZXBDO0FBQ0osR0F2c0JJO0FBeXNCTCtKLEVBQUFBLFVBenNCSyxzQkF5c0JNdEosS0F6c0JOLEVBeXNCYTtBQUNkLFNBQUtlLFVBQUwsQ0FBZ0JmLEtBQWhCLEVBQXVCZ0IsUUFBdkIsR0FBa0MsSUFBbEM7O0FBQ0EsU0FBSyxJQUFJekIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLL0YsUUFBTCxDQUFjZ0csTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDM0MsVUFBSXFDLFNBQVMsR0FBRyxLQUFLcEksUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnBELFlBQWpCLENBQThCLFdBQTlCLENBQWhCOztBQUNBLFVBQUl5RixTQUFTLENBQUNDLFdBQVYsRUFBSixFQUE2QjtBQUN6QixhQUFLckksUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnVDLE9BQWpCLEdBQTJCLEdBQTNCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS3RJLFFBQUwsQ0FBYytGLENBQWQsRUFBaUJ1QyxPQUFqQixHQUEyQixHQUEzQjtBQUNIO0FBQ0o7O0FBQ0QsUUFBSUUsTUFBTSxHQUFHLEtBQUtqQixVQUFMLENBQWdCZixLQUFoQixFQUF1QmlDLGNBQXZCLENBQXNDLFVBQXRDLENBQWI7O0FBQ0EsUUFBSSxDQUFDRCxNQUFMLEVBQWE7QUFDVCxhQURTLENBQ0Y7QUFDVjs7QUFDREEsSUFBQUEsTUFBTSxDQUFDdkUsU0FBUCxDQUFpQmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FDYm5HLEVBQUUsQ0FBQzJLLEtBQUgsQ0FBUzNLLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQVQsRUFBNkI3RyxFQUFFLENBQUM0SyxPQUFILENBQVcsR0FBWCxDQUE3QixDQURhLEVBRWI1SyxFQUFFLENBQUM2SyxVQUFILENBQWMsSUFBZCxDQUZhLENBQWpCO0FBSUgsR0EzdEJJO0FBNnRCTGdILEVBQUFBLFlBN3RCSyx3QkE2dEJRVCxJQTd0QlIsRUE2dEJjO0FBQ2Z4UixJQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDK08sTUFBNUIsRUFBb0MsS0FBcEMsRUFBMkMsR0FBM0M7QUFDQXBTLElBQUFBLEtBQUssQ0FBQ2tNLFlBQU4sQ0FBbUIsTUFBTXNGLElBQXpCLEVBQStCLEtBQUtyUSxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJrRixNQUF0RCxFQUE4RCxDQUE5RCxFQUFpRSxHQUFqRSxFQUFzRSxFQUF0RSxFQUEwRSxJQUFJdkosRUFBRSxDQUFDaVMsS0FBUCxDQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsQ0FBMUUsRUFBcUcsR0FBckc7QUFDQSxTQUFLbEcsV0FBTCxDQUFpQnFGLElBQWpCO0FBQ0EsUUFBSWMsRUFBRSxHQUFHLEtBQUtuUixZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJPLFlBQXZCLENBQW9DLGFBQXBDLEVBQW1EdU4sUUFBbkQsQ0FBNERmLElBQTVELENBQVQ7O0FBQ0EsUUFBSWMsRUFBRSxJQUFJLENBQVYsRUFBYTtBQUNULFdBQUsvTSxnQkFBTCxHQUF3QixDQUFDLENBQXpCO0FBQ0EsV0FBS2dLLFNBQUwsQ0FBZSxJQUFmO0FBQ0gsS0FIRCxNQUdPO0FBQ0gsV0FBS2hLLGdCQUFMLEdBQXdCLENBQXhCOztBQUNBLFVBQUksS0FBS2lOLFlBQUwsSUFBcUIsQ0FBckIsSUFBMEIsS0FBS0MsZ0JBQUwsSUFBeUIsQ0FBdkQsRUFBMEQ7QUFDdEQsYUFBS2xELFNBQUwsQ0FBZSxLQUFmO0FBQ0gsT0FGRCxNQUVPLElBQUksS0FBS2tELGdCQUFMLElBQXlCLENBQXpCLElBQThCSCxFQUFFLElBQUksRUFBeEMsRUFBNEM7QUFDL0MsYUFBS25SLFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1Qk8sWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbUQwTixTQUFuRDtBQUNILE9BRk0sTUFFQTtBQUNILGFBQUt2UixZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJPLFlBQXZCLENBQW9DLGFBQXBDLEVBQW1EMk4sU0FBbkQ7QUFDSDtBQUNKO0FBQ0osR0EvdUJJO0FBaXZCTEMsRUFBQUEsZUFqdkJLLDZCQWl2QmE7QUFDZCxTQUFLNVAsYUFBTCxDQUFtQmlDLE1BQW5CLEdBQTRCLElBQTVCO0FBQ0gsR0FudkJJO0FBdXZCTDROLEVBQUFBLGFBdnZCSywyQkF1dkJXO0FBQUE7O0FBQ1osU0FBS2xRLGFBQUwsQ0FBbUJzQyxNQUFuQixHQUE0QixLQUE1Qjs7QUFDQSxRQUFJLEtBQUtVLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDdEIsV0FBS2xELGNBQUwsQ0FBb0J3QyxNQUFwQixHQUE2QixJQUE3QjtBQUNBLFdBQUt4QyxjQUFMLENBQW9CdUUsS0FBcEIsR0FBNEIsQ0FBNUI7QUFDQSxXQUFLdkUsY0FBTCxDQUFvQjZELFNBQXBCLENBQThCbEcsRUFBRSxDQUFDbUcsUUFBSCxDQUFZbkcsRUFBRSxDQUFDNkcsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEJDLE1BQTFCLENBQWlDOUcsRUFBRSxDQUFDK0csTUFBSCxDQUFVLEdBQVYsQ0FBakMsQ0FBWixFQUE4RC9HLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQTlELENBQTlCOztBQUNBLFVBQUk1RCxNQUFNLENBQUMrRCxVQUFYLEVBQXVCO0FBQ25CLGFBQUs1QyxZQUFMLENBQWtCLEtBQWxCO0FBQ0EsWUFBSUMsSUFBSSxHQUFHckUsRUFBRSxDQUFDaUgsSUFBSCxDQUFRLFdBQVIsRUFBcUIsS0FBSzVFLGNBQTFCLENBQVg7QUFDQWdDLFFBQUFBLElBQUksQ0FBQzZDLENBQUwsR0FBUyxDQUFDLEdBQVY7QUFDQSxhQUFLQyxZQUFMLENBQWtCLFlBQU07QUFDcEI5QyxVQUFBQSxJQUFJLENBQUM2QyxDQUFMLEdBQVMsQ0FBQyxHQUFWO0FBQ0EsY0FBSSxDQUFDLE1BQUksQ0FBQ0UsT0FBVixFQUNJLE1BQUksQ0FBQ2hELFlBQUwsQ0FBa0IsSUFBbEI7QUFDUCxTQUpELEVBSUcsR0FKSDtBQUtILE9BVEQsTUFTTztBQUNILGFBQUtBLFlBQUwsQ0FBa0IsSUFBbEI7QUFDSDtBQUNKLEtBaEJELE1BaUJLO0FBQ0QsV0FBS2xDLGdCQUFMLENBQXNCMkMsTUFBdEIsR0FBK0IsS0FBL0I7QUFDQSxXQUFLMUMsZUFBTCxDQUFxQjBDLE1BQXJCLEdBQThCLElBQTlCO0FBQ0FvRSxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxLQUFLM0QsVUFBdEM7QUFDQSxXQUFLckUsZ0JBQUwsQ0FBc0IwRCxZQUF0QixDQUFtQyxZQUFuQyxFQUFpRDhOLFFBQWpELENBQTBELEtBQUtuTixVQUEvRCxFQUEyRSxLQUFLUixXQUFoRixFQUE2RixLQUFLVSxRQUFsRztBQUNBLFdBQUtyQixZQUFMLENBQWtCLElBQWxCO0FBQ0FyRSxNQUFBQSxRQUFRLENBQUM4TixRQUFULENBQWtCNUssTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkI0SSxTQUE3QztBQUNBaE8sTUFBQUEsS0FBSyxDQUFDcUwsY0FBTixDQUFxQmhJLE1BQU0sQ0FBQzBQLG1CQUE1QixFQUFpRCxLQUFqRCxFQUF3RCxDQUF4RDtBQUNIOztBQUNELFNBQUtwTixVQUFMO0FBQ0gsR0FweEJJO0FBc3hCTHFOLEVBQUFBLFlBdHhCSyx3QkFzeEJRakosS0F0eEJSLEVBc3hCZWtKLE1BdHhCZixFQXN4QnVCO0FBQ3hCLFFBQUksT0FBUUMsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCLFVBQUksQ0FBQzdQLE1BQU0sQ0FBQzhQLFVBQVIsSUFBc0JGLE1BQU0sSUFBSSxDQUFwQyxFQUF1QztBQUNuQztBQUNBO0FBQ0E1UCxRQUFBQSxNQUFNLENBQUM4UCxVQUFQLEdBQW9CLElBQXBCO0FBQ0EsYUFBS0MsV0FBTCxDQUFpQixDQUFqQjtBQUNBO0FBQ0g7O0FBQ0QsVUFBSUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUNyQkgsUUFBQUEsRUFBRSxDQUFDSSxTQUFILENBQWE7QUFDVEMsVUFBQUEsS0FBSyxFQUFFLGNBREU7QUFFVEMsVUFBQUEsSUFBSSxFQUFFLE1BRkc7QUFHVEMsVUFBQUEsS0FBSyxFQUFFLEVBSEU7QUFJVEMsVUFBQUEsUUFBUSxFQUFFO0FBSkQsU0FBYjtBQU1BaEQsUUFBQUEsVUFBVSxDQUFDO0FBQUEsaUJBQU13QyxFQUFFLENBQUNTLFNBQUgsRUFBTjtBQUFBLFNBQUQsRUFBdUIsSUFBdkIsQ0FBVjtBQUNILE9BUkQ7O0FBU0EsVUFBSUMsSUFBSSxHQUFHVixFQUFFLENBQUNXLGlCQUFILEVBQVg7O0FBQ0EsVUFBSUQsSUFBSSxDQUFDRSxVQUFMLElBQW1CLE9BQXZCLEVBQWdDO0FBQzVCLGFBQUtDLE1BQUwsQ0FBWWQsTUFBWjtBQUNILE9BRkQsTUFFTztBQUNISSxRQUFBQSxZQUFZO0FBQ2Y7QUFDSixLQXZCRCxNQXVCTztBQUNIaEssTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7QUFDQSxXQUFLOEosV0FBTCxDQUFpQkgsTUFBakI7QUFDSDtBQUNKLEdBbHpCSTtBQW96QkxjLEVBQUFBLE1BcHpCSyxrQkFvekJFZCxNQXB6QkYsRUFvekJVO0FBQ1gsUUFBSTVFLElBQUksR0FBRyxJQUFYOztBQUNBLFFBQUksQ0FBQyxLQUFLMkYsU0FBVixFQUFxQjtBQUNqQixXQUFLQSxTQUFMLEdBQWlCZCxFQUFFLENBQUNlLHFCQUFILENBQXlCO0FBQ3RDQyxRQUFBQSxRQUFRLEVBQUU7QUFENEIsT0FBekIsQ0FBakI7QUFHSDs7QUFDRCxTQUFLRixTQUFMLENBQWVHLE9BQWYsQ0FBdUIsVUFBQUMsR0FBRyxFQUFJLENBQzFCO0FBQ0gsS0FGRDtBQUlBLFNBQUtKLFNBQUwsQ0FBZUssSUFBZixHQUNLQyxJQURMLENBQ1UsWUFBTTtBQUNSakcsTUFBQUEsSUFBSSxDQUFDMkYsU0FBTCxDQUFlTyxJQUFmO0FBQ0FsRyxNQUFBQSxJQUFJLENBQUM3RyxPQUFMLEdBQWUsSUFBZjtBQUNBNkcsTUFBQUEsSUFBSSxDQUFDMkYsU0FBTCxDQUFlUSxPQUFmLENBQXVCLFVBQUNDLE1BQUQsRUFBWTtBQUMvQnBHLFFBQUFBLElBQUksQ0FBQzJGLFNBQUwsQ0FBZVUsUUFBZjtBQUNBckcsUUFBQUEsSUFBSSxDQUFDN0csT0FBTCxHQUFlLEtBQWY7QUFDQTZHLFFBQUFBLElBQUksQ0FBQzdKLFlBQUwsQ0FBa0IsS0FBbEI7O0FBQ0EsWUFBSWlRLE1BQU0sSUFBSUEsTUFBTSxDQUFDRSxPQUFqQixJQUE0QkYsTUFBTSxLQUFLRyxTQUEzQyxFQUFzRDtBQUNsRHZHLFVBQUFBLElBQUksQ0FBQytFLFdBQUwsQ0FBaUJILE1BQWpCO0FBQ0gsU0FGRCxNQUVPLENBRU47QUFDSixPQVREO0FBVUgsS0FkTCxXQWVXLFVBQUFtQixHQUFHO0FBQUEsYUFBSXBVLEtBQUssQ0FBQzZVLFlBQU4sQ0FBbUIsZ0JBQW5CLEVBQXFDLElBQXJDLEVBQTJDLElBQTNDLEVBQWlELElBQWpELEVBQXVELEVBQXZELEVBQTJEelUsRUFBRSxDQUFDaVMsS0FBSCxDQUFTeUMsS0FBcEUsRUFBMkUsR0FBM0UsQ0FBSjtBQUFBLEtBZmQ7QUFnQkgsR0EvMEJJO0FBaTFCTDFCLEVBQUFBLFdBajFCSyx1QkFpMUJPSCxNQWoxQlAsRUFpMUJlO0FBQ2hCLFFBQUlBLE1BQU0sSUFBSSxDQUFWLElBQWVBLE1BQU0sSUFBSSxDQUE3QixFQUFnQztBQUM1QixVQUFJMUgsSUFBSSxHQUFHLEtBQUtpQixnQkFBTCxFQUFYLENBRDRCLENBRTVCOztBQUNBLFdBQUssSUFBSXBFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBSy9GLFFBQUwsQ0FBY2dHLE1BQWxDLEVBQTBDRCxDQUFDLEVBQTNDLEVBQStDO0FBQzNDLFlBQUlxQyxTQUFTLEdBQUcsS0FBS3BJLFFBQUwsQ0FBYytGLENBQWQsRUFBaUJwRCxZQUFqQixDQUE4QixXQUE5QixDQUFoQjtBQUNBLGFBQUszQyxRQUFMLENBQWMrRixDQUFkLEVBQWlCdUMsT0FBakIsR0FBMkIsR0FBM0I7QUFDQUYsUUFBQUEsU0FBUyxDQUFDc0ssVUFBVixDQUFxQnhKLElBQUksQ0FBQ25ELENBQUQsQ0FBSixJQUFXLENBQWhDO0FBQ0g7O0FBQ0QsV0FBSzRNLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFLclMsYUFBTCxDQUFtQnNDLE1BQW5CLEdBQTRCLEtBQTVCO0FBQ0gsS0FWRCxNQVVPLElBQUlnTyxNQUFNLElBQUksQ0FBZCxFQUFpQjtBQUNwQixXQUFLbE4sYUFBTCxHQUFxQixDQUFyQjtBQUNBLFdBQUtqRCxlQUFMLENBQXFCbUMsTUFBckIsR0FBOEIsSUFBOUI7QUFDQWpGLE1BQUFBLEtBQUssQ0FBQzZVLFlBQU4sQ0FBbUIsTUFBbkIsRUFBMkIsSUFBM0IsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsRUFBdkM7QUFDQSxXQUFLalMsY0FBTCxDQUFvQnFDLE1BQXBCLEdBQTZCLEtBQTdCO0FBQ0g7QUFDSixHQWwyQkk7QUFvMkJMc0ssRUFBQUEsU0FwMkJLLHFCQW8yQkswRixHQXAyQkwsRUFvMkJVO0FBQ1gsUUFBSSxLQUFLRCxVQUFULEVBQXFCO0FBQ3JCLFNBQUtBLFVBQUwsR0FBa0IsSUFBbEI7O0FBRUEsUUFBSUMsR0FBSixFQUFTO0FBQUU7QUFDUDVMLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDQSxXQUFLekQsUUFBTDtBQUNBLFVBQUlxUCxJQUFJLEdBQUcsS0FBSy9ULFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1Qk8sWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbURtUSxRQUFuRCxFQUFYO0FBQ0FuVixNQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDK1Isc0JBQTVCLEVBQW9ELEtBQXBELEVBQTJELENBQTNEO0FBQ0EsVUFBSXhFLElBQUksR0FBRyxDQUFYO0FBQ0EsVUFBSWhHLEdBQUcsR0FBRyxLQUFLekosWUFBTCxDQUFrQnNELElBQWxCLENBQXVCa0YsTUFBdkIsQ0FBOEJuQixRQUF4Qzs7QUFDQSxVQUFJLEtBQUtqRSxXQUFMLEdBQW1CLENBQW5CLElBQXdCLENBQTVCLEVBQStCO0FBQzNCLGFBQUsyTSxPQUFMLENBQWE5USxFQUFFLENBQUN5TSxFQUFILENBQU1qQyxHQUFHLENBQUNoQyxDQUFWLEVBQWFnQyxHQUFHLENBQUN0RCxDQUFKLEdBQVEsR0FBckIsQ0FBYixFQUF3Q2xILEVBQUUsQ0FBQ3FKLElBQUgsQ0FBUUMsSUFBaEQsRUFBc0QsS0FBS25GLFdBQTNEO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS29NLE9BQUwsQ0FBYUMsSUFBYixFQUFtQnhRLEVBQUUsQ0FBQ3lNLEVBQUgsQ0FBTWpDLEdBQUcsQ0FBQ2hDLENBQVYsRUFBYWdDLEdBQUcsQ0FBQ3RELENBQUosR0FBUSxFQUFyQixDQUFuQixFQUE2QyxLQUFLbkYsUUFBTCxDQUFjc0MsSUFBZCxDQUFtQitELFFBQWhFO0FBQ0g7O0FBRURuRixNQUFBQSxNQUFNLENBQUMrQixtQkFBUCxDQUEyQkMsU0FBM0IsSUFBd0MsQ0FBeEM7QUFDQSxVQUFJZ0osSUFBSSxHQUFHLElBQVg7QUFDQSxXQUFLOUcsWUFBTCxDQUFrQixZQUFNO0FBQ3BCOEcsUUFBQUEsSUFBSSxDQUFDZ0gsV0FBTDtBQUNILE9BRkQsRUFFR0gsSUFBSSxHQUFHLElBRlY7QUFHQSxXQUFLaEQsd0JBQUw7QUFDQS9SLE1BQUFBLFFBQVEsQ0FBQzhOLFFBQVQsQ0FBa0I1SyxNQUFNLENBQUMrQixtQkFBUCxDQUEyQjRJLFNBQTdDO0FBQ0gsS0FwQkQsTUFvQk87QUFDSCxVQUFJLEtBQUtwSSxTQUFMLElBQWtCLENBQXRCLEVBQXlCO0FBQ3JCeUQsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksSUFBWjtBQUNBLGFBQUtuSSxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJPLFlBQXZCLENBQW9DLGFBQXBDLEVBQW1Ec1Esa0JBQW5EO0FBQ0EsYUFBSzNTLGFBQUwsQ0FBbUJzQyxNQUFuQixHQUE0QixJQUE1QjtBQUNBLGFBQUt0QyxhQUFMLENBQW1CcUUsS0FBbkIsR0FBMkIsQ0FBM0I7QUFDQSxhQUFLckUsYUFBTCxDQUFtQjJELFNBQW5CLENBQTZCbEcsRUFBRSxDQUFDbUcsUUFBSCxDQUFZbkcsRUFBRSxDQUFDNkcsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEJDLE1BQTFCLENBQWlDOUcsRUFBRSxDQUFDK0csTUFBSCxDQUFVLEdBQVYsQ0FBakMsQ0FBWixFQUE4RC9HLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLEVBQW1CLENBQW5CLENBQTlELENBQTdCOztBQUNBLFlBQUk1RCxNQUFNLENBQUM4UCxVQUFYLEVBQXVCO0FBQ25CLGVBQUtqUSxXQUFMLENBQWlCNEMsTUFBakIsR0FBMEIsUUFBMUI7QUFDSCxTQUZELE1BRU87QUFDSCxlQUFLNUMsV0FBTCxDQUFpQjRDLE1BQWpCLEdBQTBCLE9BQTFCLENBREcsQ0FFSDtBQUNIOztBQUNELGFBQUtGLFNBQUw7QUFDSCxPQWJELE1BYU87QUFDSCxhQUFLaU4sYUFBTDtBQUNIO0FBQ0o7QUFDSixHQTk0Qkk7O0FBZzVCTDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0kwQyxFQUFBQSxTQXI1QksscUJBcTVCSzVULElBcjVCTCxFQXE1Qlc7QUFDWixRQUFJQSxJQUFJLElBQUksQ0FBWixFQUFlO0FBQ1gsV0FBS3lFLGNBQUw7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLdEIsVUFBTDtBQUNIO0FBQ0osR0EzNUJJO0FBNjVCTDBRLEVBQUFBLFlBNzVCSywwQkE2NUJVO0FBQ1gsU0FBSy9TLGNBQUwsQ0FBb0J3QyxNQUFwQixHQUE2QixLQUE3QjtBQUNBLFNBQUszQyxnQkFBTCxDQUFzQjJDLE1BQXRCLEdBQStCLEtBQS9CO0FBQ0EsU0FBSzFDLGVBQUwsQ0FBcUIwQyxNQUFyQixHQUE4QixJQUE5QjtBQUNBLFNBQUszRCxnQkFBTCxDQUFzQjBELFlBQXRCLENBQW1DLFlBQW5DLEVBQWlEOE4sUUFBakQsQ0FBMEQsS0FBS25OLFVBQS9ELEVBQTJFLEtBQUtSLFdBQWhGLEVBQTZGLEtBQUtVLFFBQWxHO0FBQ0EsU0FBS3JCLFlBQUwsQ0FBa0IsSUFBbEI7QUFDQXJFLElBQUFBLFFBQVEsQ0FBQzhOLFFBQVQsQ0FBa0I1SyxNQUFNLENBQUMrQixtQkFBUCxDQUEyQjRJLFNBQTdDO0FBQ0FoTyxJQUFBQSxLQUFLLENBQUNxTCxjQUFOLENBQXFCaEksTUFBTSxDQUFDMFAsbUJBQTVCLEVBQWlELEtBQWpELEVBQXdELENBQXhEO0FBQ0gsR0FyNkJJO0FBdTZCTDBDLEVBQUFBLGdCQXY2QkssOEJBdTZCYztBQUNmLFFBQUksT0FBUXZDLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QixVQUFJRyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxHQUFNO0FBQ3JCSCxRQUFBQSxFQUFFLENBQUNJLFNBQUgsQ0FBYTtBQUNUQyxVQUFBQSxLQUFLLEVBQUUsY0FERTtBQUVUQyxVQUFBQSxJQUFJLEVBQUUsTUFGRztBQUdUQyxVQUFBQSxLQUFLLEVBQUUsRUFIRTtBQUlUQyxVQUFBQSxRQUFRLEVBQUU7QUFKRCxTQUFiO0FBTUFoRCxRQUFBQSxVQUFVLENBQUM7QUFBQSxpQkFBTXdDLEVBQUUsQ0FBQ1MsU0FBSCxFQUFOO0FBQUEsU0FBRCxFQUF1QixJQUF2QixDQUFWO0FBQ0gsT0FSRDs7QUFTQSxVQUFJQyxJQUFJLEdBQUdWLEVBQUUsQ0FBQ1csaUJBQUgsRUFBWDs7QUFDQSxVQUFJRCxJQUFJLENBQUNFLFVBQUwsSUFBbUIsT0FBdkIsRUFBZ0M7QUFDNUIsYUFBSzRCLFlBQUw7QUFDSCxPQUZELE1BRU87QUFDSHJDLFFBQUFBLFlBQVk7QUFDZjtBQUNKLEtBaEJELE1BZ0JPO0FBQ0hoSyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxrQkFBWjtBQUNBLFdBQUtxTSxpQkFBTDtBQUNIO0FBQ0osR0E1N0JJO0FBODdCTEQsRUFBQUEsWUE5N0JLLDBCQTg3QlU7QUFDWCxRQUFJckgsSUFBSSxHQUFHLElBQVg7O0FBQ0EsUUFBSSxDQUFDLEtBQUt1SCxVQUFWLEVBQXNCO0FBQ2xCLFdBQUtBLFVBQUwsR0FBa0IxQyxFQUFFLENBQUNlLHFCQUFILENBQXlCO0FBQ3ZDQyxRQUFBQSxRQUFRLEVBQUU7QUFENkIsT0FBekIsQ0FBbEI7QUFHSDs7QUFDRCxTQUFLMEIsVUFBTCxDQUFnQnpCLE9BQWhCLENBQXdCLFVBQUFDLEdBQUcsRUFBSSxDQUMzQjtBQUNILEtBRkQ7QUFJQSxTQUFLd0IsVUFBTCxDQUFnQnZCLElBQWhCLEdBQ0tDLElBREwsQ0FDVSxZQUFNO0FBQ1JqRyxNQUFBQSxJQUFJLENBQUN1SCxVQUFMLENBQWdCckIsSUFBaEI7QUFDQWxHLE1BQUFBLElBQUksQ0FBQzdKLFlBQUwsQ0FBa0IsS0FBbEI7QUFDQTZKLE1BQUFBLElBQUksQ0FBQ3VILFVBQUwsQ0FBZ0JwQixPQUFoQixDQUF3QixVQUFDQyxNQUFELEVBQVk7QUFDaENwRyxRQUFBQSxJQUFJLENBQUN1SCxVQUFMLENBQWdCbEIsUUFBaEI7O0FBQ0EsWUFBSUQsTUFBTSxJQUFJQSxNQUFNLENBQUNFLE9BQWpCLElBQTRCRixNQUFNLEtBQUtHLFNBQTNDLEVBQXNEO0FBQ2xEdkcsVUFBQUEsSUFBSSxDQUFDc0gsaUJBQUw7QUFDSCxTQUZELE1BRU8sQ0FFTjtBQUNKLE9BUEQ7QUFRSCxLQVpMLFdBYVcsVUFBQXZCLEdBQUc7QUFBQSxhQUFJcFUsS0FBSyxDQUFDNlUsWUFBTixDQUFtQixjQUFuQixFQUFtQyxJQUFuQyxFQUF5QyxJQUF6QyxFQUErQyxJQUEvQyxFQUFxRCxFQUFyRCxFQUF5RHpVLEVBQUUsQ0FBQ2lTLEtBQUgsQ0FBU3lDLEtBQWxFLEVBQXlFLEdBQXpFLENBQUo7QUFBQSxLQWJkO0FBY0gsR0F2OUJJO0FBeTlCTE8sRUFBQUEsV0F6OUJLLHlCQXk5QlM7QUFDVixTQUFLL1QsZ0JBQUwsQ0FBc0IyRCxNQUF0QixHQUErQixLQUEvQjtBQUNBLFNBQUtULFlBQUwsQ0FBa0IsS0FBbEI7QUFDQSxTQUFLRCxXQUFMLEdBQW1CbEIsTUFBTSxDQUFDK0IsbUJBQVAsQ0FBMkJDLFNBQTNCLEdBQXVDLENBQTFEO0FBQ0FnRSxJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCLEtBQUsvRSxXQUEvQjtBQUNBLFNBQUt5USxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBSzNULFNBQUwsQ0FBZXlFLE1BQWYsR0FBd0IsUUFBUSxLQUFLdkIsV0FBckM7QUFDQSxTQUFLRCxXQUFMLENBQWlCLEtBQUtDLFdBQXRCO0FBQ0EsU0FBS21HLFdBQUw7QUFDSCxHQWwrQkk7QUFvK0JMbUwsRUFBQUEsWUFwK0JLLDBCQW8rQlU7QUFDWDdWLElBQUFBLEtBQUssQ0FBQ3FMLGNBQU4sQ0FBcUJoSSxNQUFNLENBQUN5UyxrQkFBNUIsRUFBZ0QsS0FBaEQsRUFBdUQsQ0FBdkQ7QUFDQTFWLElBQUFBLEVBQUUsQ0FBQzJWLFFBQUgsQ0FBWUMsU0FBWixDQUFzQjNTLE1BQU0sQ0FBQzRTLGVBQTdCO0FBQ0gsR0F2K0JJO0FBeStCTEMsRUFBQUEsV0F6K0JLLHVCQXkrQk9uTSxLQXorQlAsRUF5K0JjO0FBQ2Y7QUFDQS9KLElBQUFBLEtBQUssQ0FBQ3FMLGNBQU4sQ0FBcUJoSSxNQUFNLENBQUN5UyxrQkFBNUIsRUFBZ0QsS0FBaEQsRUFBdUQsQ0FBdkQ7O0FBQ0EsUUFBSSxLQUFLNVEsV0FBTCxJQUFvQixDQUFwQixJQUF5QixDQUFDLEtBQUtlLFdBQW5DLEVBQWdEO0FBQzVDLFVBQUksS0FBS3lILFNBQUwsSUFBa0IsQ0FBdEIsRUFBeUI7QUFDckIsYUFBS2pNLFdBQUwsQ0FBaUJ3RCxNQUFqQixHQUEwQixJQUExQjtBQUNBLGFBQUt4RCxXQUFMLENBQWlCdUQsWUFBakIsQ0FBOEIsYUFBOUIsRUFBNkNtUixZQUE3QyxDQUEwRCxDQUExRCxFQUE2RCxLQUFLekksU0FBbEUsRUFBNkUsS0FBSzFMLGFBQUwsQ0FBbUJ3SCxjQUFuQixDQUFrQ25HLE1BQU0sQ0FBQytTLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JsTixJQUF4RCxDQUE3RTtBQUNILE9BSEQsTUFHTztBQUNILGFBQUsxSCxhQUFMLENBQW1CeUQsTUFBbkIsR0FBNEIsQ0FBQyxLQUFLUSxVQUFsQztBQUNBLGFBQUtDLFlBQUwsR0FBb0IsQ0FBQyxLQUFLRCxVQUExQjtBQUNBLGFBQUsrRSxXQUFMLENBQWlCLENBQUMsS0FBSy9FLFVBQXZCO0FBQ0g7QUFDSjtBQUNKLEdBdC9CSTtBQXcvQkw0USxFQUFBQSxhQXgvQksseUJBdy9CU3RNLEtBeC9CVCxFQXcvQmdCO0FBQ2pCL0osSUFBQUEsS0FBSyxDQUFDcUwsY0FBTixDQUFxQmhJLE1BQU0sQ0FBQ3lTLGtCQUE1QixFQUFnRCxLQUFoRCxFQUF1RCxDQUF2RDs7QUFDQSxRQUFJLEtBQUs1USxXQUFMLElBQW9CLENBQXhCLEVBQTJCO0FBQ3ZCLFdBQUt6RCxXQUFMLENBQWlCd0QsTUFBakIsR0FBMEIsSUFBMUI7QUFDQSxXQUFLeEQsV0FBTCxDQUFpQnVELFlBQWpCLENBQThCLGFBQTlCLEVBQTZDbVIsWUFBN0MsQ0FBMEQsQ0FBMUQsRUFBNkQsS0FBS0csV0FBbEUsRUFBK0UsS0FBS3RVLGFBQUwsQ0FBbUJ3SCxjQUFuQixDQUFrQ25HLE1BQU0sQ0FBQytTLFdBQVAsQ0FBbUIsQ0FBbkIsRUFBc0JsTixJQUF4RCxDQUEvRTtBQUNBLFdBQUtxTixjQUFMO0FBQ0g7QUFDSixHQS8vQkk7QUFpZ0NMQyxFQUFBQSxXQWpnQ0sseUJBaWdDUztBQUNWLFFBQUlDLENBQUMsR0FBRyxLQUFSOztBQUNBLFNBQUssSUFBSXJPLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsS0FBS3NPLEtBQXpCLEVBQWdDdE8sQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxXQUFLLElBQUl5RCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUs4SyxLQUF6QixFQUFnQzlLLENBQUMsRUFBakMsRUFBcUM7QUFDakMsWUFBSSxLQUFLK0ssWUFBTCxDQUFrQnhPLENBQWxCLEVBQXFCeUQsQ0FBckIsRUFBd0JsSyxJQUF4QixJQUFnQyxDQUFwQyxFQUF1QztBQUNuQyxjQUFJZ08sQ0FBQyxHQUFHLEtBQUtpSCxZQUFMLENBQWtCeE8sQ0FBbEIsRUFBcUJ5RCxDQUFyQixFQUF3QnlGLEdBQXhCLENBQTRCdE0sWUFBNUIsQ0FBeUMsV0FBekMsRUFBc0Q2UixTQUF0RCxFQUFSOztBQUNBLGNBQUlsSCxDQUFKLEVBQU87QUFDSDhHLFlBQUFBLENBQUMsR0FBRyxJQUFKO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7O0FBQ0QsUUFBSUEsQ0FBSixFQUFPO0FBQ0hwVCxNQUFBQSxNQUFNLENBQUMrQixtQkFBUCxDQUEyQmtGLElBQTNCLENBQWdDLENBQWhDLEtBQXNDLENBQXRDO0FBQ0EsV0FBS2xFLGNBQUw7QUFDSDtBQUNKLEdBamhDSTtBQW1oQ0w7QUFDQW9FLEVBQUFBLFdBcGhDSyx1QkFvaENPeUssR0FwaENQLEVBb2hDWTtBQUNiLFFBQUlBLEdBQUcsS0FBSyxLQUFLeFAsVUFBakIsRUFBNkI7QUFDekI7QUFDSDs7QUFFRCxTQUFLQSxVQUFMLEdBQWtCd1AsR0FBbEI7O0FBQ0EsUUFBSUEsR0FBSixFQUFTO0FBQ0wsV0FBSyxJQUFJN00sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLd0IsVUFBTCxDQUFnQnZCLE1BQXBDLEVBQTRDRCxDQUFDLEVBQTdDLEVBQWlEO0FBQzdDLFlBQUksQ0FBQyxLQUFLd0IsVUFBTCxDQUFnQnhCLENBQWhCLEVBQW1CeUIsUUFBeEIsRUFBa0M7QUFDOUIsY0FBSXdDLE1BQU0sR0FBR2pNLEVBQUUsQ0FBQ3FJLGFBQUgsQ0FBaUJySSxFQUFFLENBQUNtRyxRQUFILENBQVluRyxFQUFFLENBQUM2RyxPQUFILENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixDQUFaLEVBQXVDN0csRUFBRSxDQUFDNkcsT0FBSCxDQUFXLEdBQVgsRUFBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsQ0FBdkMsQ0FBakIsQ0FBYjtBQUNBb0YsVUFBQUEsTUFBTSxDQUFDeUssTUFBUCxDQUFjLENBQWQ7QUFDQSxlQUFLbE4sVUFBTCxDQUFnQnhCLENBQWhCLEVBQW1COUIsU0FBbkIsQ0FBNkIrRixNQUE3QjtBQUNIO0FBQ0o7QUFDSixLQVJELE1BUU87QUFDSCxXQUFLLElBQUlqRSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHLEtBQUt3QixVQUFMLENBQWdCdkIsTUFBcEMsRUFBNENELEdBQUMsRUFBN0MsRUFBaUQ7QUFDN0MsWUFBSSxDQUFDLEtBQUt3QixVQUFMLENBQWdCeEIsR0FBaEIsRUFBbUJ5QixRQUF4QixFQUFrQztBQUM5QixlQUFLRCxVQUFMLENBQWdCeEIsR0FBaEIsRUFBbUIyTyxlQUFuQixDQUFtQyxDQUFuQzs7QUFDQSxlQUFLbk4sVUFBTCxDQUFnQnhCLEdBQWhCLEVBQW1CcEIsS0FBbkIsR0FBMkIsQ0FBM0I7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQTFpQ0k7QUE0aUNMZ1EsRUFBQUEsaUJBNWlDSyw2QkE0aUNhQyxNQTVpQ2IsRUE0aUNxQjtBQUN0QixRQUFJN08sQ0FBQyxHQUFHOE8sSUFBSSxDQUFDQyxLQUFMLENBQVdGLE1BQU0sR0FBRyxLQUFLUCxLQUF6QixDQUFSO0FBQ0EsUUFBSTdLLENBQUMsR0FBR29MLE1BQU0sR0FBRyxLQUFLTixLQUF0QjtBQUNBLFdBQU8sS0FBSy9NLFVBQUwsQ0FBZ0J4QixDQUFoQixFQUFtQnlELENBQW5CLENBQVA7QUFDSCxHQWhqQ0k7QUFrakNMOEosRUFBQUEsaUJBbGpDSywrQkFrakNlO0FBQ2hCM1YsSUFBQUEsS0FBSyxDQUFDNlUsWUFBTixDQUFtQixNQUFuQjtBQUNBLFNBQUtHLFVBQUwsR0FBa0IsS0FBbEI7O0FBQ0EsU0FBSyxJQUFJNU0sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLL0YsUUFBTCxDQUFjZ0csTUFBbEMsRUFBMENELENBQUMsRUFBM0MsRUFBK0M7QUFDM0MsV0FBSy9GLFFBQUwsQ0FBYytGLENBQWQsRUFBaUJwRCxZQUFqQixDQUE4QixXQUE5QixFQUEyQytQLFVBQTNDO0FBQ0EsV0FBSzFTLFFBQUwsQ0FBYytGLENBQWQsRUFBaUJ1QyxPQUFqQixHQUEyQixHQUEzQjtBQUNIOztBQUNELFNBQUt4SixZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJPLFlBQXZCLENBQW9DLGFBQXBDLEVBQW1EME4sU0FBbkQ7QUFDQSxTQUFLcFIsZ0JBQUwsQ0FBc0IyRCxNQUF0QixHQUErQixLQUEvQjtBQUNBLFNBQUt4QyxjQUFMLENBQW9Cd0MsTUFBcEIsR0FBNkIsS0FBN0I7QUFDQSxTQUFLMkUsVUFBTCxDQUFnQndOLE9BQWhCLENBQXdCLFVBQUFDLE9BQU8sRUFBSTtBQUMvQkEsTUFBQUEsT0FBTyxDQUFDdk0sY0FBUixDQUF1QixVQUF2QjtBQUNILEtBRkQ7O0FBR0EsU0FBSyxJQUFJakMsS0FBSyxHQUFHLENBQWpCLEVBQW9CQSxLQUFLLEdBQUcsS0FBS2UsVUFBTCxDQUFnQnZCLE1BQTVDLEVBQW9EUSxLQUFLLEVBQXpELEVBQTZEO0FBQ3pELFVBQUlnQyxNQUFNLEdBQUcsS0FBS2pCLFVBQUwsQ0FBZ0JmLEtBQWhCLEVBQXVCaUMsY0FBdkIsQ0FBc0MsVUFBdEMsQ0FBYixDQUR5RCxDQUV6RDs7QUFDQSxVQUFJRCxNQUFKLEVBQVk7QUFDUkEsUUFBQUEsTUFBTSxDQUFDdkUsU0FBUCxDQUFpQmxHLEVBQUUsQ0FBQ21HLFFBQUgsQ0FDYm5HLEVBQUUsQ0FBQzJLLEtBQUgsQ0FBUzNLLEVBQUUsQ0FBQzZHLE9BQUgsQ0FBVyxHQUFYLEVBQWdCLENBQWhCLENBQVQsRUFBNkI3RyxFQUFFLENBQUM0SyxPQUFILENBQVcsR0FBWCxDQUE3QixDQURhLEVBRWI1SyxFQUFFLENBQUM2SyxVQUFILENBQWMsSUFBZCxDQUZhLENBQWpCO0FBSUg7O0FBQ0QsV0FBS3JCLFVBQUwsQ0FBZ0JmLEtBQWhCLEVBQXVCZ0IsUUFBdkIsR0FBa0MsSUFBbEM7QUFDSDs7QUFFRDFKLElBQUFBLFFBQVEsQ0FBQzBHLGdCQUFULENBQTBCLEtBQUsxQixXQUEvQjtBQUNBLFNBQUs3QyxnQkFBTCxDQUFzQjJDLE1BQXRCLEdBQStCLElBQS9CO0FBQ0EsU0FBSzFDLGVBQUwsQ0FBcUIwQyxNQUFyQixHQUE4QixLQUE5QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDSCxHQS9rQ0k7QUFpbENMb1MsRUFBQUEsWUFqbENLLDBCQWlsQ1U7QUFDWHRYLElBQUFBLEtBQUssQ0FBQ3FMLGNBQU4sQ0FBcUJoSSxNQUFNLENBQUN5UyxrQkFBNUIsRUFBZ0QsS0FBaEQsRUFBdUQsQ0FBdkQ7O0FBQ0EsUUFBSXpTLE1BQU0sQ0FBQytCLG1CQUFQLENBQTJCWSxRQUEzQixJQUF1QyxFQUEzQyxFQUErQztBQUMzQ2hHLE1BQUFBLEtBQUssQ0FBQzZVLFlBQU4sQ0FBbUIsTUFBbkI7QUFDQSxXQUFLRyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0EzUixNQUFBQSxNQUFNLENBQUMrQixtQkFBUCxDQUEyQlksUUFBM0IsSUFBdUMsRUFBdkM7QUFDQSxXQUFLbEIsVUFBTDs7QUFDQSxXQUFLLElBQUlzRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUsvRixRQUFMLENBQWNnRyxNQUFsQyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUMzQyxhQUFLL0YsUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnBELFlBQWpCLENBQThCLFdBQTlCLEVBQTJDK1AsVUFBM0MsQ0FBc0QsQ0FBdEQ7QUFDQSxhQUFLMVMsUUFBTCxDQUFjK0YsQ0FBZCxFQUFpQnVDLE9BQWpCLEdBQTJCLEdBQTNCO0FBQ0g7O0FBQ0QsV0FBS3hKLFlBQUwsQ0FBa0JzRCxJQUFsQixDQUF1Qk8sWUFBdkIsQ0FBb0MsYUFBcEMsRUFBbUQwTixTQUFuRDtBQUNBLFdBQUtwUixnQkFBTCxDQUFzQjJELE1BQXRCLEdBQStCLEtBQS9CO0FBQ0E5RSxNQUFBQSxRQUFRLENBQUMwRyxnQkFBVCxDQUEwQixLQUFLMUIsV0FBL0I7QUFDQSxXQUFLN0MsZ0JBQUwsQ0FBc0IyQyxNQUF0QixHQUErQixJQUEvQjtBQUNBLFdBQUsxQyxlQUFMLENBQXFCMEMsTUFBckIsR0FBOEIsS0FBOUI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLENBQW5CO0FBQ0gsS0FmRCxNQWVPO0FBQ0g7QUFDQWhGLE1BQUFBLFFBQVEsQ0FBQ3FYLGVBQVQsQ0FBeUI7QUFDckJoRSxRQUFBQSxLQUFLLEVBQUUsY0FEYztBQUVyQmlFLFFBQUFBLFFBQVEsRUFBRW5VLE1BQU0sQ0FBQ29VLFdBQVAsQ0FBbUIsQ0FBbkIsQ0FGVztBQUdyQkMsUUFBQUEsT0FBTyxFQUFFLGlCQUFBQyxHQUFHLEVBQUksQ0FFZixDQUxvQjtBQU1yQkMsUUFBQUEsSUFBSSxFQUFFLGNBQUF4RCxHQUFHLEVBQUksQ0FFWixDQVJvQjtBQVNyQnlELFFBQUFBLFFBQVEsRUFBRSxrQkFBQUMsR0FBRyxFQUFJLENBRWhCO0FBWG9CLE9BQXpCO0FBYUg7QUFDSixHQWxuQ0k7QUFvbkNMdFQsRUFBQUEsWUFwbkNLLHdCQW9uQ1F5USxHQXBuQ1IsRUFvbkNhO0FBQ2QsUUFBSSxPQUFRL0IsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQ2hDLFFBQUk2RSxJQUFJLEdBQUczWCxFQUFFLENBQUM0WCxPQUFkO0FBRUEsUUFBSUMsU0FBUyxHQUFHN1gsRUFBRSxDQUFDaUgsSUFBSCxDQUFRLCtCQUFSLENBQWhCO0FBQ0EsUUFBSXVELEdBQUcsR0FBRyxLQUFLbkcsSUFBTCxDQUFVeVQsbUJBQVYsQ0FBOEJELFNBQTlCLENBQVY7O0FBRUEsUUFBSUYsSUFBSSxDQUFDSSxNQUFMLEdBQWNKLElBQUksQ0FBQ0ssS0FBbkIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFBQztBQUMvQnhOLE1BQUFBLEdBQUcsQ0FBQ3RELENBQUosSUFBUyxDQUFDeVEsSUFBSSxDQUFDSSxNQUFMLEdBQWMsSUFBZixJQUF1QixDQUFoQztBQUNIOztBQUVELFFBQUlFLE1BQU0sR0FBR25GLEVBQUUsQ0FBQ1csaUJBQUgsRUFBYjtBQUVBLFFBQUl5RSxXQUFXLEdBQUdELE1BQU0sQ0FBQ0UsWUFBUCxHQUFzQlIsSUFBSSxDQUFDSSxNQUE3QztBQUNBLFFBQUlLLElBQUksR0FBSSxDQUFDVCxJQUFJLENBQUNJLE1BQUwsR0FBY3ZOLEdBQUcsQ0FBQ3RELENBQW5CLElBQXdCZ1IsV0FBcEM7QUFFQSxRQUFJakssSUFBSSxHQUFHLElBQVg7O0FBQ0EsUUFBSSxLQUFLekssVUFBVCxFQUFxQjtBQUNqQixXQUFLQSxVQUFMLENBQWdCQyxPQUFoQjtBQUNBLFdBQUtELFVBQUwsR0FBa0IsSUFBbEI7QUFDSDs7QUFDRCxRQUFJLENBQUMsS0FBS0EsVUFBTixJQUFvQnFSLEdBQXhCLEVBQTZCO0FBQ3pCLFVBQUlvRCxNQUFNLENBQUN2RSxVQUFQLEdBQW9CLE9BQXhCLEVBQWlDO0FBQzdCWixRQUFBQSxFQUFFLENBQUNJLFNBQUgsQ0FBYTtBQUNUQyxVQUFBQSxLQUFLLEVBQUUscUJBREU7QUFFVEMsVUFBQUEsSUFBSSxFQUFFLE1BRkc7QUFHVEMsVUFBQUEsS0FBSyxFQUFFLEVBSEU7QUFJVEMsVUFBQUEsUUFBUSxFQUFFO0FBSkQsU0FBYjtBQU1BaEQsUUFBQUEsVUFBVSxDQUFDO0FBQUEsaUJBQU13QyxFQUFFLENBQUNTLFNBQUgsRUFBTjtBQUFBLFNBQUQsRUFBdUIsSUFBdkIsQ0FBVjtBQUNILE9BUkQsTUFRTztBQUNIdEYsUUFBQUEsSUFBSSxDQUFDekssVUFBTCxHQUFrQnNQLEVBQUUsQ0FBQ3VGLGNBQUgsQ0FBa0I7QUFDaEN2RSxVQUFBQSxRQUFRLEVBQUUseUJBRHNCO0FBRWhDd0UsVUFBQUEsS0FBSyxFQUFFO0FBQ0hDLFlBQUFBLElBQUksRUFBRSxDQURIO0FBRUhDLFlBQUFBLEdBQUcsRUFBRUosSUFGRjtBQUdISixZQUFBQSxLQUFLLEVBQUVDLE1BQU0sQ0FBQ1E7QUFIWDtBQUZ5QixTQUFsQixDQUFsQjtBQVFBeEssUUFBQUEsSUFBSSxDQUFDekssVUFBTCxDQUFnQmtWLFFBQWhCLENBQXlCLFVBQUNDLElBQUQsRUFBVTtBQUMvQixjQUFJO0FBQ0EsZ0JBQUkxSyxJQUFJLENBQUN6SyxVQUFMLElBQW1CeUssSUFBSSxDQUFDekssVUFBTCxDQUFnQjhVLEtBQXZDLEVBQThDO0FBRTFDckssY0FBQUEsSUFBSSxDQUFDekssVUFBTCxDQUFnQjhVLEtBQWhCLENBQXNCRSxHQUF0QixHQUE0QkosSUFBNUI7QUFDQW5LLGNBQUFBLElBQUksQ0FBQ3pLLFVBQUwsQ0FBZ0I4VSxLQUFoQixDQUFzQlAsTUFBdEIsR0FBK0JZLElBQUksQ0FBQ1osTUFBcEM7QUFDSDtBQUNKLFdBTkQsQ0FNRSxPQUFPYSxLQUFQLEVBQWM7QUFDWjNQLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGdCQUFaLEVBQThCMFAsS0FBOUI7QUFDSDtBQUNKLFNBVkQ7QUFXQTNLLFFBQUFBLElBQUksQ0FBQ3pLLFVBQUwsQ0FBZ0JSLE1BQWhCLENBQXVCLFlBQU0sQ0FDekI7QUFFSCxTQUhEO0FBSUFpTCxRQUFBQSxJQUFJLENBQUN6SyxVQUFMLENBQWdCMlEsSUFBaEIsR0FBdUJELElBQXZCLENBQTRCLFlBQU0sQ0FDOUI7QUFDSCxTQUZELFdBRVMsVUFBQ0YsR0FBRCxFQUFTLENBQ2Q7QUFDSCxTQUpEO0FBS0EvRixRQUFBQSxJQUFJLENBQUN6SyxVQUFMLENBQWdCdVEsT0FBaEIsQ0FBd0IsVUFBQUMsR0FBRyxFQUFJLENBQzNCO0FBQ0gsU0FGRDtBQUlIO0FBQ0o7QUFDSixHQXJyQ0k7QUF1ckNMNkUsRUFBQUEsY0F2ckNLLDRCQXVyQ1k7QUFDYixTQUFLblgsWUFBTCxDQUFrQm1ELE1BQWxCLEdBQTJCLElBQTNCO0FBQ0gsR0F6ckNJO0FBMnJDTGlVLEVBQUFBLGVBM3JDSyw2QkEyckNhO0FBQ2QsU0FBS3BYLFlBQUwsQ0FBa0JtRCxNQUFsQixHQUEyQixLQUEzQjtBQUNILEdBN3JDSTtBQStyQ0xrVSxFQUFBQSxNQS9yQ0ssa0JBK3JDRUMsRUEvckNGLEVBK3JDTTtBQUNQLFFBQUksS0FBSzdULGdCQUFMLElBQXlCLENBQUMsQ0FBOUIsRUFBaUM7QUFDN0IsV0FBS0EsZ0JBQUwsSUFBeUI2VCxFQUF6Qjs7QUFDQSxVQUFJLEtBQUs3VCxnQkFBTCxJQUF5QixLQUFLRCxpQkFBOUIsSUFBbUQsS0FBS0osV0FBTCxJQUFvQixDQUEzRSxFQUE4RTtBQUMxRSxhQUFLSyxnQkFBTCxHQUF3QixDQUF4QjtBQUNBLGFBQUtwRSxZQUFMLENBQWtCc0QsSUFBbEIsQ0FBdUJPLFlBQXZCLENBQW9DLGFBQXBDLEVBQW1EcVUsVUFBbkQ7QUFDSDtBQUNKO0FBQ0o7QUF2c0NJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImxldCBVdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcbmxldCBTaGFyZVNkayA9IHJlcXVpcmUoXCJTaGFyZVNka1wiKTtcbmxldCBSYW5rTGlzdCA9IHJlcXVpcmUoXCJSYW5rTGlzdFwiKTtcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1fbl9nYW1lbm9kZTogY2MuTm9kZSxcbiAgICAgICAgbV9uX2JnX3BhbmVsOiBjYy5Ob2RlLFxuICAgICAgICBtX3ByZV9ibG9ja2JnOiBjYy5QcmVmYWIsXG4gICAgICAgIG1fcHJlX2xpZ2h0OiBjYy5QcmVmYWIsXG4gICAgICAgIG1fcHJlX2Jvb21lZmZlY3Q6IGNjLlByZWZhYixcbiAgICAgICAgbV9wcmVfYm9vbTogY2MuUHJlZmFiLFxuICAgICAgICBtX2xfYm9vbW51bTogY2MuTGFiZWwsXG4gICAgICAgIG1fbF9zY29yZTogY2MuTGFiZWwsXG4gICAgICAgIG1fc3BfbW9uc3RlcjogY2MuU3ByaXRlLFxuICAgICAgICBtX2xfbGV2ZWw6IGNjLkxhYmVsLFxuICAgICAgICBtX25fcmVzdWx0X3BhbmVsOiBjYy5Ob2RlLFxuICAgICAgICBtX2J0bl90b29sMjogY2MuTm9kZSxcbiAgICAgICAgbV9uX2d1aWRlbWFzazogY2MuTm9kZSxcbiAgICAgICAgbV9uX3Rvb2x1c2U6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9zaG93dGltZToge1xuICAgICAgICAgICAgdHlwZTogY2MuTm9kZSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdXG4gICAgICAgIH0sXG4gICAgICAgIG1fc3BmX2dvbGQ6IGNjLlNwcml0ZUZyYW1lLFxuICAgICAgICBtX25fYXNrcGFuZWw6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9ib3NzOiBjYy5Ob2RlLFxuICAgICAgICBtX3Nwcml0ZUF0bGFzOiBjYy5TcHJpdGVBdGxhcyxcbiAgICAgICAgbV9uX2JnbGlzdDogY2MuTm9kZSxcbiAgICAgICAgbV9sX2dvbGQ6IGNjLkxhYmVsLFxuICAgICAgICBtX3ByZV9yb2NrOiBjYy5QcmVmYWIsXG4gICAgICAgIG1fbl9rdWFpOiB7XG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxuICAgICAgICAgICAgZGVmYXVsdDogW11cbiAgICAgICAgfSxcbiAgICAgICAgbV9uX2Rpc3BsYXljaGVjazogY2MuTm9kZSxcbiAgICAgICAgbV9uX2Rpc3BsYXlyYW5rOiBjYy5Ob2RlLFxuICAgICAgICBtX25fc3RlcHZpZXc6IGNjLk5vZGUsXG4gICAgICAgIG1fbl9yZWxpdmV2aWV3OiBjYy5Ob2RlLFxuICAgICAgICBtX25fdmlkZW86IGNjLk5vZGUsXG4gICAgICAgIG1fbl9sb29rdmlkZW86IGNjLk5vZGUsXG4gICAgICAgIG1fbl9sdWNreXZpZGVvOiBjYy5Ob2RlLFxuICAgICAgICBtX25fZG91YmxldmlkZW86IGNjLk5vZGUsXG4gICAgICAgIG1fbl9kb3VibGVzY29yZTogY2MuTm9kZSxcbiAgICAgICAgbV9uX3NoYXJlZ2lmdDogY2MuTm9kZSxcbiAgICAgICAgbV9uX3NraW5wYW5lbDogY2MuTm9kZSxcbiAgICAgICAgbV9uX2d1aWRlbm9kZTogY2MuTm9kZSxcbiAgICAgICAgbV9sX2Fza3R5cGU6IGNjLkxhYmVsLFxuICAgICAgICBtX25fZ3VpZGVmaWdlcjogY2MuTm9kZSxcbiAgICB9LFxuXG4gICAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHdpbmRvdy5HQU1FX0NPTlRST0wgPSB0aGlzO1xuICAgICAgICBVdGlscy5zZXREZXNpZ25SZXNvbHV0aW9uKCk7XG4gICAgfSxcblxuICAgIG9uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5tX2Jsb2NrX3Bvb2wuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5tX2xpZ2h0X3Bvb2wuY2xlYXIoKTtcbiAgICAgICAgd2luZG93LkdBTUVfQ09OVFJPTCA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLm1fYmFubmVyYWQpIHtcbiAgICAgICAgICAgIHRoaXMubV9iYW5uZXJhZC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLm1fYmFubmVyYWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9mZih3aW5kb3cuR0FNRV9VUERBVEVfREFUQSwgdGhpcyk7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9mZih3aW5kb3cuR0FNRV9TQVZFX0hBTkRMRVIsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5maXJzdEdhbWUpXG4gICAgICAgICAgICB3aW5kb3cuZmlyc3RHYW1lID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY3JlYXRlTWFwKCk7XG4gICAgICAgIHRoaXMuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5pbml0TW9uc3Rlcih0aGlzLm1fY3VyX2xldmVsKTtcbiAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIoZmFsc2UpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLnRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgRVZFTlRfTElTVEVORVIub24od2luZG93LkdBTUVfVVBEQVRFX0RBVEEsIHRoaXMudXBkYXRlR29sZCwgdGhpcyk7XG4gICAgICAgIEVWRU5UX0xJU1RFTkVSLm9uKHdpbmRvdy5HQU1FX1NBVkVfSEFORExFUiwgdGhpcy51cGRhdGVTa2luLCB0aGlzKTtcbiAgICB9LFxuXG4gICAgaW5pdERhdGEoKSB7XG4gICAgICAgIHRoaXMubV9uX3NraW5wYW5lbC5nZXRDb21wb25lbnQoXCJTa2luUGFuZWxcIikuaW5pdERhdGEoKTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheWNoZWNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9uX2Rpc3BsYXlyYW5rLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fbl9sb29rdmlkZW8uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9uX2RvdWJsZXNjb3JlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1fZ2FtZXN0YXRlID0gMDtcbiAgICAgICAgdGhpcy5tX2N1cl9zY29yZSA9IDA7XG4gICAgICAgIHRoaXMubV9jdXJfbGV2ZWwgPSB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3BfbGV2ZWwgKyAxO1xuICAgICAgICB0aGlzLm1fbm9ybWFsX3RhbGt0aW1lID0gNDsgLy/mgKrnianor7Tor53pl7TpmpRcbiAgICAgICAgdGhpcy5tX25vcm1hbF9jdXJ0aW1lID0gLTE7XG4gICAgICAgIHRoaXMubV90YXJnZXRfYmxvY2sgPSBbXTtcbiAgICAgICAgdGhpcy5tX21hcGJsaW5rID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV90b3VjaF9ib29tID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbGl2ZW51bSA9IDA7XG4gICAgICAgIHRoaXMuX3ZpZGVvbnVtID0gMDtcbiAgICAgICAgdGhpcy5fa2lsbG51bSA9IDA7XG4gICAgICAgIHRoaXMubV9sX3Njb3JlLnN0cmluZyA9IHRoaXMubV9jdXJfc2NvcmU7XG4gICAgICAgIHRoaXMubV9kb3VibGVzY29yZSA9IDE7XG4gICAgICAgIC8vIHRoaXMubV9sX3NvbGlkZXJudW0uc3RyaW5nID0gXCJYXCIgKyB0aGlzLm1fc29saWRlcm51bTtcbiAgICAgICAgdGhpcy5tX2xfbGV2ZWwuc3RyaW5nID0gXCJMVi5cIiArIHRoaXMubV9jdXJfbGV2ZWw7XG4gICAgICAgIHRoaXMubV9sX2dvbGQuc3RyaW5nID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW07XG4gICAgICAgIHRoaXMuX2lzZGVsZXRpbmcgPSBmYWxzZSAvL+WIpOaWreaYr+WQpuato+WcqOa2iOmZpOeahOS+neaNrlxuICAgICAgICB0aGlzLl9pc2JsZXNzID0gZmFsc2U7IC8v5piv5ZCm5bey57uP5oGp6LWQ6L+HXG4gICAgICAgIHRoaXMubV9ibG9ja19wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHRoaXMubV9saWdodF9wb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVG9vbHNOdW0oKTtcbiAgICAgICAgdGhpcy5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm1fYnRuX3Rvb2wyLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5yZXBlYXQoY2Muc2VxdWVuY2UoY2Mucm90YXRlVG8oMC4xLCAtMTApLCBjYy5yb3RhdGVUbygwLjEsIDEwKSksIDMpLCBjYy5yb3RhdGVUbygwLjEsIDApKSk7XG4gICAgICAgICAgICB0aGlzLm1fbl92aWRlby5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuZGVsYXlUaW1lKDEuMCksIGNjLnJlcGVhdChjYy5zZXF1ZW5jZShjYy5yb3RhdGVUbygwLjEsIC0xMCksIGNjLnJvdGF0ZVRvKDAuMSwgMTApKSwgMyksIGNjLnJvdGF0ZVRvKDAuMSwgMCkpKTtcbiAgICAgICAgICAgIHRoaXMubV9uX2RvdWJsZXZpZGVvLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5kZWxheVRpbWUoMi4wKSwgY2MucmVwZWF0KGNjLnNlcXVlbmNlKGNjLnJvdGF0ZVRvKDAuMSwgLTEwKSwgY2Mucm90YXRlVG8oMC4xLCAxMCkpLCAzKSwgY2Mucm90YXRlVG8oMC4xLCAwKSkpXG4gICAgICAgIH0sIDUpO1xuICAgICAgICB0aGlzLl9jb25maWdsaXN0ID0gdGhpcy5tX25fa3VhaVswXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikuZ2V0VGhlQ29uZmlnKCk7XG4gICAgICAgIFJhbmtMaXN0LmNoZWNrV2lsbFN1cnBhc3ModGhpcy5tX2N1cl9zY29yZSk7XG5cbiAgICAgICAgbGV0IHJhbmQgPSBVdGlscy5yYW5kb20oMCwgMTAwMCk7XG5cbiAgICAgICAgdGhpcy5tX25fbHVja3l2aWRlby5hY3RpdmUgPSByYW5kIDw9IDUwMCAmJiB0aGlzLm1fY3VyX2xldmVsID4gMTtcbiAgICAgICAgaWYgKHRoaXMubV9uX2x1Y2t5dmlkZW8uYWN0aXZlKSB7Ly/nrKzkuIDlhbPkuI3lh7rnjrBcbiAgICAgICAgICAgIHRoaXMubV9uX2x1Y2t5dmlkZW8uc2NhbGUgPSAwO1xuICAgICAgICAgICAgdGhpcy5tX25fbHVja3l2aWRlby5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuMiwgMS4yKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCBjYy5zY2FsZVRvKDAuMSwgMSwgMSkpKTtcbiAgICAgICAgICAgIGlmICh3aW5kb3cuU0tJTl9TSEFSRSkge1xuICAgICAgICAgICAgICAgIGxldCBub2RlID0gY2MuZmluZChcImJ0bl9jYW5jZWxcIiwgdGhpcy5tX25fbHVja3l2aWRlbyk7XG4gICAgICAgICAgICAgICAgbm9kZS55ID0gLTU3MDtcbiAgICAgICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUueSA9IC01MTQ7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSAmJiAhdGhpcy5zaG93QWRiKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSwgMS44KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGhpZGVHdWlkZSgpIHtcbiAgICAgICAgaWYgKHRoaXMubV9jdXJfbGV2ZWwgPT0gMSkge1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5zdG9wQWxsQWN0aW9ucygpO1xuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHdpbmRvdy5HVUlERV9MRVZFTCA9IDE7XG4gICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2d1aWRlaW5mbycsICcxJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0d1aWRlKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3RlbXBndWlkZSkge1xuICAgICAgICAgICAgdGhpcy5fdGVtcGd1aWRlID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHsgcmV0dXJuOyB9XG4gICAgICAgIGxldCB0eXBlaW5kZXggPSAwO1xuICAgICAgICBsZXQgaW5kZXhsaXN0ID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuc2tpbjtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmRleGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpbmRleGxpc3RbaV0gPj0gMikge1xuICAgICAgICAgICAgICAgIHR5cGVpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJR1t0eXBlaW5kZXhdO1xuICAgICAgICB0aGlzLm1fbl9ndWlkZW5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLm1fbl9ndWlkZWZpZ2VyLnBvc2l0aW9uID0gdGhpcy5tX25fa3VhaVsxXS5wb3NpdGlvbjtcbiAgICAgICAgdGhpcy5tX25fZ3VpZGVmaWdlci5ydW5BY3Rpb24oY2MucmVwZWF0Rm9yZXZlcihjYy5zZXF1ZW5jZShjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1fbl9ndWlkZWZpZ2VyLnBvc2l0aW9uID0gdGhpcy5tX25fa3VhaVsxXS5wb3NpdGlvbjtcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLjAsIHRoaXMubV9uX2t1YWlbMV0ueCwgdGhpcy5tX25fa3VhaVsxXS55ICsgMzUwKSkpKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5tX25fa3VhaVswXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikuZ2V0Q3VyQ29sb3JJbmRleCgpO1xuICAgICAgICBsZXQgYmxvY2tpbmRleCA9IFtdO1xuICAgICAgICBibG9ja2luZGV4WzQ2XSA9IDE7XG4gICAgICAgIGJsb2NraW5kZXhbNTJdID0gMTtcbiAgICAgICAgYmxvY2tpbmRleFs1M10gPSAxO1xuICAgICAgICBibG9ja2luZGV4WzU4XSA9IDE7XG4gICAgICAgIGZvciAobGV0IGkgPSA0MzsgaSA8IDYxOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChibG9ja2luZGV4W2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5tX21hcGFycmF5W2ldLmdldENvbXBvbmVudChcIkJsb2NrQkdJdGVtXCIpLnNldEJyaWdodFZpc2libGUodHJ1ZSwgJyMwMDAwMDAnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBuZXcgY2MuTm9kZShcImNvbG9yU3ByXCIpO1xuICAgICAgICAgICAgICAgIG5vZGUuY29sb3JJbmRleCA9IGluZGV4O1xuICAgICAgICAgICAgICAgIG5vZGUuY29sb3JOYW1lID0gZGF0YS5uYW1lO1xuICAgICAgICAgICAgICAgIGxldCBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEubmFtZSwgaW5kZXgpO1xuICAgICAgICAgICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMubV9zcHJpdGVBdGxhcy5nZXRTcHJpdGVGcmFtZShkYXRhLm5hbWUgKyBpbmRleCk7XG4gICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGNjLlZlYzIuWkVSTztcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9tYXBhcnJheVtpXTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbaV0uaXNIYXZlRksgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uS2VlcEdvaW5nKCkge1xuICAgICAgICB0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNob3dBZEJhbm5lcihmYWxzZSk7XG4gICAgfSxcblxuICAgIHRvdWNoRW5kKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDAgJiYgdGhpcy5tX3RvdWNoX2Jvb20pIHtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAyO1xuICAgICAgICAgICAgbGV0IHZlYyA9IGV2ZW50LnRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICB2ZWMgPSB0aGlzLm1fbl9nYW1lbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2UodmVjKTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuYmFja0luZGV4b2ZMaXN0KHZlYyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLmlzSGF2ZUZLID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1fcHJlX2Jvb20pO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9tYXBhcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvb2xbMF0gLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUb29sc051bSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvQm9vbUFjdGlvbih0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLnBvc2l0aW9uLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVtYXNrLmFjdGl2ZSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICB0aGlzLm1fdG91Y2hfYm9vbSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICB0aGlzLnNldE1hcEJsaW5rKCF0aGlzLm1fbWFwYmxpbmspO1xuICAgICAgICAgICAgdGhpcy5tX2dhbWVzdGF0ZSA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgc2hhcGVpdGVtID0gdGhpcy5tX25fa3VhaVtpXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIik7XG4gICAgICAgICAgICAgICAgaWYgKHNoYXBlaXRlbS5jaGVja0lzTG9zZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9uX2t1YWlbaV0ub3BhY2l0eSA9IDEyNTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGRvQm9vbUFjdGlvbihwb3MsIGluZGV4KSB7XG4gICAgICAgIGxldCBGS05vZGUgPSB0aGlzLm1fbWFwYXJyYXlbaW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgLy/ov5nkuKrlgYfmlrnlnZflj5jlpKflubbkuJTmuJDpmpDmjolcbiAgICAgICAgRktOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgKSk7XG4gICAgICAgIHRoaXMubV9tYXBhcnJheVtpbmRleF0uaXNIYXZlRksgPSBudWxsO1xuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfYm9vbWVmZmVjdCk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubV9uX2dhbWVub2RlO1xuICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IHBvcztcbiAgICAgICAgICAgIG5vZGUueSAtPSAxMDA7XG4gICAgICAgICAgICBub2RlLnpJbmRleCA9IDEgPDwgODtcbiAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLkFuaW1hdGlvbikucGxheShcImJvbWJlZmZlY3RcIik7XG4gICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQk9PTV9FRkZFQ1QsIGZhbHNlLCAxKTtcbiAgICAgICAgfSwgMC40KTtcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmdldEJvb21JbmRleExpc3QoaW5kZXgpO1xuICAgICAgICBjb25zb2xlLmxvZyhsaXN0KTtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IGFjdGlvbkFyeSA9IFtdO1xuICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5kZWxheVRpbWUoMC40KSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9uZUxpc3QgPSBsaXN0W2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvbmVMaXN0Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IG9uZUxpc3Rbal07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4SW5kZXggPSBhcmd1bWVudHNbMV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IGFyZ3VtZW50c1sxXVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2hvd0h1cnRUZXh0KFwiK1wiICsgc2NvcmUsIHRoaXMubV9uX2dhbWVub2RlLCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS54LCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS55LCAyMCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVNjb3JlKHNjb3JlKVxuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLCBbeEluZGV4LCBjb3VudF0pKVxuXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB4SW5kZXggPSBhcmd1bWVudHNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmlzSGF2ZUZLID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghRktOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC8v6Ziy5q2i5rKh5pyJ6L+Z5Liq5pa55Z2X55qE5pe25YCZXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGFja01vbnN0ZXIoRktOb2RlLmNvbG9ySW5kZXgsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLngsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy/ov5nkuKrlgYfmlrnlnZflj5jlpKflubbkuJTmuJDpmpDmjolcbiAgICAgICAgICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2Muc3Bhd24oY2Muc2NhbGVUbygwLjUsIDIpLCBjYy5mYWRlT3V0KDAuNSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcywgeEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5kZWxheVRpbWUoMC4zKSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhY3Rpb25BcnkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICBhY3Rpb25BcnkucHVzaChjYy5jYWxsRnVuYyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNkZWxldGluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja0lzTG9zZSgpXG4gICAgICAgICAgICB9LCB0aGlzKSlcbiAgICAgICAgICAgIHRoaXMuX2lzZGVsZXRpbmcgPSB0cnVlXG4gICAgICAgICAgICBsZXQgYWN0aW9uID0gY2Muc2VxdWVuY2UoYWN0aW9uQXJ5KVxuICAgICAgICAgICAgdGhpcy5ub2RlLnJ1bkFjdGlvbihhY3Rpb24pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOagueaNrueCuOW8ueS4i+agh+iOt+WPluiMg+WbtOW8leeIhuiMg+WbtFxuICAgICAqIEBwYXJhbSB754K45by55LiL5qCHfSBpbmRleCBcbiAgICAgKi9cbiAgICBnZXRCb29tSW5kZXhMaXN0KGluZGV4KSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuYm9vbXJhbmdlW2luZGV4XTtcbiAgICB9LFxuXG4gICAgYm9tYkZpbmlzaCgpIHtcblxuICAgIH0sXG4gICAgLyoqXG4gICAgICog6I635Y+W5Y+v5Lul5pS+572u55qE5pa55qC8IDPkuKpcbiAgICAgKi9cbiAgICBnZXRDYW5Ecm9wQmxvY2tzKCkge1xuICAgICAgICBsZXQgY2FuRHJvcGxzaXQgPSBbMCwgMCwgMF07XG4gICAgICAgIGZvciAobGV0IGsgPSB0aGlzLl9jb25maWdsaXN0Lmxlbmd0aCAtIDE7IGsgPj0gMTsgay0tKSB7XG4gICAgICAgICAgICAvL+S4gOS4quS4quagvOWtkOaUvuivleS4gOS4i+iDveS4jeiDveaUvlxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJhbWVOb2RlID0gdGhpcy5tX21hcGFycmF5W2ldXG4gICAgICAgICAgICAgICAgdmFyIHNyY1BvcyA9IGNjLnYyKGZyYW1lTm9kZS54LCBmcmFtZU5vZGUueSlcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAxXG4gICAgICAgICAgICAgICAgaWYgKCFmcmFtZU5vZGUuaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ov5nph4zlgZrmmK/lkKblj6/ku6XmlL7nmoTliKTmlq1cbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuID0gdGhpcy5fY29uZmlnbGlzdFtrXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCBjaGlsZHJlbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9IDUyIC8v56Kw5pKe6Led56a7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGRQb3MgPSBzcmNQb3MuYWRkKGNjLnYyKGNoaWxkcmVuW2pdLngsIGNoaWxkcmVuW2pdLnkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy/norDmkp7mo4DmtYtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHMgPSAwOyBzIDwgdGhpcy5tX21hcGFycmF5Lmxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRGcmFtZU5vZGUgPSB0aGlzLm1fbWFwYXJyYXlbc11cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzID0gY2MudjIodEZyYW1lTm9kZS54LCB0RnJhbWVOb2RlLnkpLnN1YihjaGlsZFBvcykubWFnKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpcyA8PSBsZW4gJiYgIXRGcmFtZU5vZGUuaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKyAvL+WPr+S7peaUvuWwseimgee0r+WKoOiuoeaVsFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvL+WmguaenOaVsOmHj+ebuOetieWwseivtOaYjui/meS4quaWueWdl+WcqOi/meS4quagvOWtkOaYr+WPr+S7peaUvuS4i+eahFxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYW5Ecm9wbHNpdC5wdXNoKGspO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbkRyb3Bsc2l0Lmxlbmd0aCA+IDMpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSBVdGlscy5nZXRSYW5kb21TRGlmZigwLCBjYW5Ecm9wbHNpdC5sZW5ndGggLSAxLCAzKTtcbiAgICAgICAgICAgIHJldHVybiBbY2FuRHJvcGxzaXRbYXJyWzBdXSwgY2FuRHJvcGxzaXRbYXJyWzFdXSwgY2FuRHJvcGxzaXRbYXJyWzJdXV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW2NhbkRyb3Bsc2l0WzBdLCBjYW5Ecm9wbHNpdFsxXSwgY2FuRHJvcGxzaXRbMl1dO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJhY2tJbmRleG9mTGlzdChwb3MpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aW5kb3cuSU5ERVhfVE9fUE9JTlQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwb3Muc3ViKGNjLnYyKHdpbmRvdy5JTkRFWF9UT19QT0lOVFtpXVswXSwgd2luZG93LklOREVYX1RPX1BPSU5UW2ldWzFdKSkubWFnKCkgPD0gNTApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSxcblxuICAgIHVwZGF0ZVRvb2xzTnVtKCkge1xuICAgICAgICB0aGlzLm1fYm9vbW51bSA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvb2xbMF07XG4gICAgICAgIHRoaXMubV9sX2Jvb21udW0uc3RyaW5nID0gXCJ4XCIgKyB0aGlzLm1fYm9vbW51bTtcbiAgICAgICAgdGhpcy5zZXRBZGRWaXNpYmxlKHRoaXMubV9idG5fdG9vbDIsIHRoaXMubV9ib29tbnVtKTtcbiAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUdvbGQoKSB7XG4gICAgICAgIHRoaXMubV9sX2dvbGQuc3RyaW5nID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEuZ29sZF9udW07XG4gICAgfSxcblxuICAgIHVwZGF0ZVNraW4oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd1cGRhdGVza2luJylcbiAgICAgICAgbGV0IGRhdGFfaW5kZXggPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFfaW5kZXggPSB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKS51cGRhdGVJbmRleCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IHdpbmRvdy5TS0lOX0NPTkZJR1tkYXRhX2luZGV4XTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGxldCBGS05vZGUgPSB0aGlzLm1fbWFwYXJyYXlbal0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2xvclNwclwiKTtcbiAgICAgICAgICAgIGlmIChGS05vZGUpIHtcbiAgICAgICAgICAgICAgICBGS05vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSB0aGlzLm1fc3ByaXRlQXRsYXMuZ2V0U3ByaXRlRnJhbWUoZGF0YS5uYW1lICsgRktOb2RlLmNvbG9ySW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldEFkZFZpc2libGUobm9kZSwgbnVtKSB7XG4gICAgICAgIGxldCBhZGRidG4gPSBjYy5maW5kKFwic3BfYWRkXCIsIG5vZGUpO1xuICAgICAgICBhZGRidG4uYWN0aXZlID0gbnVtIDw9IDA7XG4gICAgfSxcblxuICAgIHVwZGF0ZVNjb3JlKHNjb3JlKSB7XG4gICAgICAgIHRoaXMubV9jdXJfc2NvcmUgKz0gc2NvcmU7XG4gICAgICAgIHRoaXMubV9sX3Njb3JlLnN0cmluZyA9IHRoaXMubV9jdXJfc2NvcmU7XG4gICAgICAgIGlmICghdGhpcy5tX25fcmVzdWx0X3BhbmVsLmFjdGl2ZSlcbiAgICAgICAgICAgIFJhbmtMaXN0LmNoZWNrV2lsbFN1cnBhc3ModGhpcy5tX2N1cl9zY29yZSk7XG4gICAgICAgIGlmICh0aGlzLm1fY3VyX3Njb3JlID4gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKSB7XG4gICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b3Bfc2NvcmUgPSB0aGlzLm1fY3VyX3Njb3JlO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVNYXAoKSB7XG4gICAgICAgIHRoaXMubV9tYXBhcnJheSA9IFtdO1xuICAgICAgICBsZXQgZnJhbWVMaXN0ID0gW107XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB3aW5kb3cuSU5ERVhfVE9fUE9JTlQubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfYmxvY2tiZyk7XG4gICAgICAgICAgICBub2RlLnggPSB3aW5kb3cuSU5ERVhfVE9fUE9JTlRbaW5kZXhdWzBdO1xuICAgICAgICAgICAgbm9kZS55ID0gd2luZG93LklOREVYX1RPX1BPSU5UW2luZGV4XVsxXTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5tX25fYmdsaXN0O1xuICAgICAgICAgICAgbm9kZS5GS0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICBmcmFtZUxpc3QucHVzaChub2RlKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9tYXBhcnJheSA9IGZyYW1lTGlzdDtcbiAgICB9LFxuXG4gICAgLy/liJvlu7rns5bmnpxcbiAgICBpbml0TW9uc3RlcihsZXZlbCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsdiA9IGxldmVsICUgMTAwO1xuICAgICAgICBpZiAobHYgPD0gMCkgbHYgKz0gMTtcbiAgICAgICAgbGV0IGRhdGEgPSB3aW5kb3cuTUFQX0NPTkZJR1tsdiAtIDFdO1xuXG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikuaW5pdFR5cGUoZGF0YS5tb25faWQsIGRhdGEubW9uX2hwLCBsZXZlbCk7XG4gICAgICAgIC8vIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuY29sb3IgPSB3aW5kb3cuTU9OX0NPTE9SW2RhdGEuY29sb3JdO1xuICAgICAgICB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS55ID0gMzAwO1xuICAgICAgICBsZXQgeSA9IDA7XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheVN0YXJ0VGFsaygpO1xuICAgICAgICBpZiAoZGF0YS5tb25faWQgPT0gMCkge1xuICAgICAgICAgICAgLy8gdGhpcy5tX3NwX21vbnN0ZXIubm9kZS55ID0gLTEwO1xuICAgICAgICAgICAgeSA9IC0xMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMubV9zcF9tb25zdGVyLm5vZGUueSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnJ1bkFjdGlvbihjYy5tb3ZlVG8oMC40LCAwLCB5KS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpKTtcblxuICAgICAgICBpZiAobGV2ZWwgJSA1ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubV9uX2Jvc3MuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX2Jvc3Mub3BhY2l0eSA9IDUwO1xuICAgICAgICAgICAgdGhpcy5tX25fYm9zcy5zY2FsZSA9IDIuNTtcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSAxMDtcbiAgICAgICAgICAgIGxldCBkZWx0YVRpbWUgPSAwLjAyO1xuICAgICAgICAgICAgdGhpcy5tX25fYm9zcy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc3Bhd24oY2Muc2NhbGVUbygwLjgsIDEuMCkuZWFzaW5nKGNjLmVhc2VCYWNrSW4oMy4wKSksIGNjLmZhZGVUbygwLjgsIDI1NSkpLCBjYy5tb3ZlQnkoZGVsdGFUaW1lLCBjYy52MihvZmZzZXQgKiAyLCAwKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKC1vZmZzZXQgKiA0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIob2Zmc2V0ICogMikpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0ICogMikpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52MigwLCAtb2Zmc2V0ICogNCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKDAsIG9mZnNldCAqIDIpKSxcblxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUgKiAyLCBjYy52Migtb2Zmc2V0ICogMiwgMCkpLFxuICAgICAgICAgICAgICAgIGNjLm1vdmVCeShkZWx0YVRpbWUsIGNjLnYyKG9mZnNldCwgMCkpLFxuXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSAqIDIsIGNjLnYyKDAsIC1vZmZzZXQgKiAyKSksXG4gICAgICAgICAgICAgICAgY2MubW92ZUJ5KGRlbHRhVGltZSwgY2MudjIoMCwgb2Zmc2V0KSksXG4gICAgICAgICAgICAgICAgY2MuZmFkZU91dCgxLjUpKSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG5cbiAgICAvL+WKoOWIhu+8jOWPguaVsOaYr+a2iOmZpOeahOaAu+aVsCxpc0Ryb3BBZGTmmK/mmK/lkKbmmK/mlL7kuIvnmoTljZXnuq/liqDliIZcbiAgICBhZGRTY29yZTogZnVuY3Rpb24gKFhDQ291bnQsIGlzRHJvcEFkZCkge1xuICAgICAgICBsZXQgYWRkU2NvcmVDb3VudCA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoWENDb3VudCwgaXNEcm9wQWRkKVxuICAgICAgICBVdGlscy5zaG93SHVydFRleHQoXCIrXCIgKyBhZGRTY29yZUNvdW50LCBudWxsLCAwLCAwLCAzMCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoYWRkU2NvcmVDb3VudCk7XG4gICAgfSxcblxuICAgIC8v6K6h566X5Yqg5YiG55qE5YWs5byPXG4gICAgZ2V0QWRkU2NvcmVDYWw6IGZ1bmN0aW9uIChYQ0NvdW50LCBpc0Ryb3BBZGQpIHtcbiAgICAgICAgbGV0IHggPSBYQ0NvdW50ICsgMVxuICAgICAgICBsZXQgYWRkU2NvcmVDb3VudCA9IGlzRHJvcEFkZCA/IHggOiB4ICogeCAvL+aVsOmHj+eahOW5s+aWuVxuICAgICAgICByZXR1cm4gYWRkU2NvcmVDb3VudCAqIHRoaXMubV9kb3VibGVzY29yZTtcbiAgICB9LFxuXG4gICAgLy/mo4DmtYvmmK/kuI3mmK/ovpPkuoZcbiAgICBjaGVja0lzTG9zZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvL+WmguaenOato+WcqOa2iOmZpOS4re+8jOmCo+WwseS4jeWIpOaWrei+k+i1ou+8jOWboOS4uua2iOmZpOWQjuS8muWGjeWIpOaWrVxuICAgICAgICBpZiAodGhpcy5faXNkZWxldGluZykgcmV0dXJuXG4gICAgICAgIHRoaXMubV9ub3JtYWxfY3VydGltZSA9IDA7XG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gY2MuZmluZCgnbl9rdWFpJyArIChpICsgMSksIHRoaXMubV9uX2dhbWVub2RlKVxuICAgICAgICAgICAgbGV0IHNjcmlwdCA9IG5vZGUuZ2V0Q29tcG9uZW50KCdTaGFwZUl0ZW0nKTtcbiAgICAgICAgICAgIGlmIChzY3JpcHQuY2hlY2tJc0xvc2UoKSkge1xuICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICBub2RlLm9wYWNpdHkgPSAxMjVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5vcGFjaXR5ID0gMjU1XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID49IDIgJiYgIXRoaXMuX2lzYmxlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzYmxlc3MgPSB0cnVlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmZpbmQoJ25fa3VhaScgKyAoaSArIDEpLCB0aGlzLm1fbl9nYW1lbm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmdldENvbXBvbmVudCgnU2hhcGVJdGVtJykuc2V0TmV4dEJsb2NrKDApOyAvL+iuvue9ruS4i+S4gOS4quW/heWumuaYr+afkOS4quW9oueKtlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PSAzKSB7IC8v5rKh5Zyw5pa55pS+5LqGXG4gICAgICAgICAgICB0aGlzLmp1ZGdlR2FtZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/mo4Dmn6XmmK/lkKbmnInlj6/mtojpmaRcbiAgICBjaGVja0NsZWFyVXAoKSB7XG4gICAgICAgIGxldCBoYXZlRktJbmRleExpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVtpXS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgIGhhdmVGS0luZGV4TGlzdC5wdXNoKHRoaXMubV9tYXBhcnJheVtpXS5GS0luZGV4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGhhdmVGS0luZGV4TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSAtIGJcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCB4Y0xpc3QgPSBbXSAvL+imgea2iOmZpOeahOaWueWdl+WIl+ihqFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpbmRvdy5ESVNMSVNULmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgb25lWENMaXN0ID0gd2luZG93LkRJU0xJU1RbaV1cbiAgICAgICAgICAgIGxldCBpbnRlcnNlY3RBcnkgPSB0aGlzLmdldDJBcnlJbnRlcnNlY3QoaGF2ZUZLSW5kZXhMaXN0LCBvbmVYQ0xpc3QpIC8v5rGC5pWw57uE5Lqk6ZuGXG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0QXJ5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBsZXQgaXNYQyA9IHRoaXMuY2hlY2syQXJ5SXNFcXVhbChvbmVYQ0xpc3QsIGludGVyc2VjdEFyeSkgLy/mlbDnu4Tnm7jlkIzvvIzmtojpmaRcbiAgICAgICAgICAgICAgICBpZiAoaXNYQykge1xuICAgICAgICAgICAgICAgICAgICB4Y0xpc3QucHVzaChvbmVYQ0xpc3QpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBhY3Rpb25BcnkgPSBbXTtcbiAgICAgICAgLy/mtojpmaRcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgbGV0IGNsZWFybnVtID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Y0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvbmVMaXN0ID0geGNMaXN0W2ldO1xuICAgICAgICAgICAgY2xlYXJudW0gKz0gb25lTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9uZUxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgeEluZGV4ID0gb25lTGlzdFtqXVxuICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IGFyZ3VtZW50c1sxXVswXVxuICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSBhcmd1bWVudHNbMV1bMV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHRoaXMuZ2V0QWRkU2NvcmVDYWwoY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAvLyBVdGlscy5zaG93VGlwc1RleHQoXCIrXCIgKyBzY29yZSwgdGhpcy5tX25fZ2FtZW5vZGUsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLngsIHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLnksIDYwKTtcbiAgICAgICAgICAgICAgICAgICAgVXRpbHMuc2hvd0h1cnRUZXh0KFwiK1wiICsgc2NvcmUsIHRoaXMubV9uX2dhbWVub2RlLCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS54LCB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS55LCAyMCwgbnVsbCwgbnVsbCwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2NvcmUoc2NvcmUpXG4gICAgICAgICAgICAgICAgfSwgdGhpcywgW3hJbmRleCwgY291bnRdKSlcblxuICAgICAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHhJbmRleCA9IGFyZ3VtZW50c1sxXVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbWFwYXJyYXlbeEluZGV4XS5pc0hhdmVGSyA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVt4SW5kZXhdLmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFGS05vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAvL+mYsuatouayoeaciei/meS4quaWueWdl+eahOaXtuWAmVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNrTW9uc3RlcihGS05vZGUuY29sb3JJbmRleCwgdGhpcy5tX21hcGFycmF5W3hJbmRleF0ueCwgdGhpcy5tX21hcGFycmF5W3hJbmRleF0ueSk7XG4gICAgICAgICAgICAgICAgICAgIC8v6L+Z5Liq5YGH5pa55Z2X5Y+Y5aSn5bm25LiU5riQ6ZqQ5o6JXG4gICAgICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5zcGF3bihjYy5zY2FsZVRvKDAuNSwgMiksIGNjLmZhZGVPdXQoMC41KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy5yZW1vdmVTZWxmKHRydWUpXG4gICAgICAgICAgICAgICAgICAgICkpXG5cbiAgICAgICAgICAgICAgICB9LCB0aGlzLCB4SW5kZXgpKVxuXG4gICAgICAgICAgICAgICAgYWN0aW9uQXJ5LnB1c2goY2MuZGVsYXlUaW1lKDAuMSkpXG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFjdGlvbkFyeS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuR0VUX0dPTEQsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIGFjdGlvbkFyeS5wdXNoKGNjLmNhbGxGdW5jKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc2RlbGV0aW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrSXNMb3NlKClcbiAgICAgICAgICAgIH0sIHRoaXMpKVxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyU2hvd1RpbWUoY2xlYXJudW0pO1xuICAgICAgICAgICAgdGhpcy5faXNkZWxldGluZyA9IHRydWVcbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBjYy5zZXF1ZW5jZShhY3Rpb25BcnkpXG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/ojrflvpfkuKTkuKrmlbDnu4TnmoTkuqTpm4ZcbiAgICBnZXQyQXJ5SW50ZXJzZWN0OiBmdW5jdGlvbiAoYXJ5MSwgYXJ5Mikge1xuICAgICAgICBsZXQgaW50ZXJzZWN0QXJ5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGFyeTIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJ5MltqXSA9PSBhcnkxW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGludGVyc2VjdEFyeS5wdXNoKGFyeTJbal0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnRlcnNlY3RBcnlcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiDojrflvpfkuKTkuKrmlbDnu4TnmoTkuqTpm4ZcbiAgICAgKiBAcGFyYW0gIHthcnJheX3mlbDnu4QxXG4gICAgICogQHBhcmFtICB7YXJyYXl95pWw57uEMlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW595piv5ZCm55u45LqkXG4gICAgICovXG4gICAgY2hlY2syQXJ5SXNFcXVhbDogZnVuY3Rpb24gKGFyeTEsIGFyeTIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnkxLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoYXJ5MltpXSAhPSBhcnkxW2ldKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9LFxuXG4gICAgaGFuZGxlclNob3dUaW1lKG51bSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImhhbmRsZXJTaG93VGltZVwiLCBudW0pO1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgaWYgKG51bSA+IDkgJiYgbnVtIDw9IDEyKSB7XG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID4gMTIgJiYgbnVtIDw9IDE1KSB7XG4gICAgICAgICAgICBpbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAobnVtID4gMTUpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IDIpIHtcbiAgICAgICAgICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuU0FZXzMsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkdFVF9HT0xELCBmYWxzZSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1fbl9zaG93dGltZVtpbmRleF0uYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX3Nob3d0aW1lW2luZGV4XS5nZXRDb21wb25lbnQoY2MuQW5pbWF0aW9uKS5wbGF5KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9zaG93dGltZVtpbmRleF0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9LCAxNTAwKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+WinuWKoOmHkeW4geaVsFxuICAgIGFkZEdvbGQoZ29sZCwgc3BvcywgZXBvcykge1xuICAgICAgICBsZXQgdGhpcyQxID0gdGhpcztcbiAgICAgICAgbGV0IHNwcml0ZWZyYW0gPSB0aGlzLm1fc3BmX2dvbGQ7XG4gICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtICs9IGdvbGQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ29sZDsgaSsrKSB7XG4gICAgICAgICAgICBVdGlscy5tb3ZlSWNvbihzcHJpdGVmcmFtLCB0aGlzLm1fbl9nYW1lbm9kZSwgc3BvcywgZXBvcywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5HRVRfR09MRCwgZmFsc2UsIDAuNCk7XG4gICAgICAgICAgICAgICAgdGhpcyQxLm1fbF9nb2xkLnN0cmluZyA9IHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtO1xuICAgICAgICAgICAgfSwgMC41LCA2MCAqIChpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIH0pXG4gICAgfSxcblxuICAgIC8v5bGV56S65a6d566xXG4gICAgc2hvd0JveChzcG9zLCBlcG9zLCBsdikge1xuICAgICAgICBsZXQgdGhpcyQxID0gdGhpcztcbiAgICAgICAgbGV0IGNhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGx2ICUgMTAgPT0gMCAmJiBsdiA8PSAzNzApIHtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcyQxLm1fbl9zdGVwdmlldy5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjIsIDEuMiwgMS4yKS5lYXNpbmcoY2MuZWFzZUluKDMuMCkpLCBjYy5zY2FsZVRvKDAuMSwgMSwgMSkpKTtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3N0ZXB2aWV3LmdldENvbXBvbmVudChcIlN0ZXBWaWV3SXRlbVwiKS5zaG93U3RlcChsdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgVXRpbHMubG9hZFJlcygnc3ByaXRlL2dldHNoYXJlX2JveCcsIGNjLlNwcml0ZUZyYW1lLCAob2JqKSA9PiB7XG4gICAgICAgICAgICBVdGlscy5tb3ZlSWNvbihvYmosIHRoaXMkMS5tX25fZ2FtZW5vZGUsIHNwb3MsIGVwb3MsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzJDEubV9uX3NoYXJlZ2lmdC5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMkMS5tX25fc2hhcmVnaWZ0LmdldENvbXBvbmVudCgnR2V0Qm94R2lmdEl0ZW0nKS5zaG93VmlldyhjYWxsYmFjayk7XG4gICAgICAgICAgICB9LCAwLjgsIDEwMCk7XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGF0dGFja01vbnN0ZXIoaHVydCwgeCwgeSkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCByZWFsaHVydCA9IGh1cnQgPyAyICogaHVydCA6IDI7XG4gICAgICAgIGxldCBibG9ja25vZGUgPSB0aGlzLm1fYmxvY2tfcG9vbC5nZXQoKTtcbiAgICAgICAgaWYgKCFibG9ja25vZGUpIHtcbiAgICAgICAgICAgIGJsb2Nrbm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubV9wcmVfcm9jayk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFuZ2xlID0gVXRpbHMuZ2V0QW5nbGUodGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQueCwgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQueSwgeCwgeSk7XG4gICAgICAgIGlmICh0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC54IDw9IHgpIHtcbiAgICAgICAgICAgIGFuZ2xlID0gLWFuZ2xlO1xuICAgICAgICB9XG4gICAgICAgIGJsb2Nrbm9kZS5yb3RhdGlvbiA9IGFuZ2xlO1xuICAgICAgICBibG9ja25vZGUuZ2V0Q29tcG9uZW50KFwiUm9ja0l0ZW1cIikucmVzZXRTeXRlbSgpO1xuICAgICAgICBibG9ja25vZGUuekluZGV4ID0gMSA8PCA1O1xuICAgICAgICBibG9ja25vZGUucGFyZW50ID0gdGhpcy5tX25fZ2FtZW5vZGU7XG4gICAgICAgIGJsb2Nrbm9kZS54ID0geDtcbiAgICAgICAgYmxvY2tub2RlLnkgPSB5O1xuICAgICAgICBibG9ja25vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLmNhbGxGdW5jKCgpID0+IHtcbiAgICAgICAgfSksIGNjLm1vdmVUbygxLjAsIGNjLnYyKHRoaXMubV9zcF9tb25zdGVyLm5vZGUucGFyZW50LngsIHRoaXMubV9zcF9tb25zdGVyLm5vZGUucGFyZW50LnkpKS5lYXNpbmcoY2MuZWFzZUluKDIuMCkpLCBjYy5jYWxsRnVuYygoKSA9PiB7XG4gICAgICAgICAgICBzZWxmLm1fYmxvY2tfcG9vbC5wdXQoYmxvY2tub2RlKTtcbiAgICAgICAgICAgIGJsb2Nrbm9kZSA9IG51bGw7XG4gICAgICAgICAgICBzZWxmLm1vbnN0ZXJiZUhpdChyZWFsaHVydCk7XG4gICAgICAgIH0pKSk7XG4gICAgfSxcblxuICAgIGRlc3Ryb3lCbG9ja0J5SGl0TW9uc3RlcigpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgIGxldCBsZW4gPSA0O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubV9tYXBhcnJheVtpXS5pc0hhdmVGSykge1xuICAgICAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgICAgICAgIGxlbi0tO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPD0gMCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBibG9ja25vZGUgPSB0aGlzLm1fbGlnaHRfcG9vbC5nZXQoKTtcbiAgICAgICAgICAgIGlmICghYmxvY2tub2RlKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tX3ByZV9saWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5tX21hcGFycmF5W2FycltpXV0ucG9zaXRpb247XG4gICAgICAgICAgICBibG9ja25vZGUucGFyZW50ID0gdGhpcy5tX25fZ2FtZW5vZGU7XG4gICAgICAgICAgICBibG9ja25vZGUucG9zaXRpb24gPSBjYy52Mih0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC54LCB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC55KTtcbiAgICAgICAgICAgIGJsb2Nrbm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5HRVRfR09MRCwgZmFsc2UsIDEpO1xuICAgICAgICAgICAgfSksIGNjLm1vdmVUbygwLjgsIHBvcykuZWFzaW5nKGNjLmVhc2VJbigyLjApKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubV9saWdodF9wb29sLnB1dChibG9ja25vZGUpO1xuICAgICAgICAgICAgICAgIGJsb2Nrbm9kZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgc2VsZi5ibG9ja0JlSGl0KGFycltpXSk7XG4gICAgICAgICAgICB9KSkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGJsb2NrQmVIaXQoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSyA9IG51bGw7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHNoYXBlaXRlbSA9IHRoaXMubV9uX2t1YWlbaV0uZ2V0Q29tcG9uZW50KFwiU2hhcGVJdGVtXCIpO1xuICAgICAgICAgICAgaWYgKHNoYXBlaXRlbS5jaGVja0lzTG9zZSgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5vcGFjaXR5ID0gMTI1O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IEZLTm9kZSA9IHRoaXMubV9tYXBhcnJheVtpbmRleF0uZ2V0Q2hpbGRCeU5hbWUoXCJjb2xvclNwclwiKVxuICAgICAgICBpZiAoIUZLTm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIC8v6Ziy5q2i5rKh5pyJ6L+Z5Liq5pa55Z2X55qE5pe25YCZXG4gICAgICAgIH1cbiAgICAgICAgRktOb2RlLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShcbiAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgIGNjLnJlbW92ZVNlbGYodHJ1ZSlcbiAgICAgICAgKSk7XG4gICAgfSxcblxuICAgIG1vbnN0ZXJiZUhpdChodXJ0KSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CRV9ISVQsIGZhbHNlLCAwLjMpO1xuICAgICAgICBVdGlscy5zaG93SHVydFRleHQoJy0nICsgaHVydCwgdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5wYXJlbnQsIDAsIDEwMCwgMzAsIG5ldyBjYy5Db2xvcigyMzAsIDcxLCAyMSksIDAuOCk7XG4gICAgICAgIHRoaXMudXBkYXRlU2NvcmUoaHVydCk7XG4gICAgICAgIGxldCBocCA9IHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucmVkdWNlSHAoaHVydCk7XG4gICAgICAgIGlmIChocCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPSAtMTtcbiAgICAgICAgICAgIHRoaXMuanVkZ2VHYW1lKHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tX25vcm1hbF9jdXJ0aW1lID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fc29saWRlcm51bSA8PSAwICYmIHRoaXMubV9jdXJfYXR0YWNrX251bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qdWRnZUdhbWUoZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm1fY3VyX2F0dGFja19udW0gPD0gMCAmJiBocCA8PSAyMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUJlSGl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25PcGVuU2tpblBhbmVsKCkge1xuICAgICAgICB0aGlzLm1fbl9za2lucGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG5cblxuICAgIG9uQ2FuY2VsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubV9uX2xvb2t2aWRlby5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX3JlbGl2ZW51bSA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZWxpdmV2aWV3LmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZWxpdmV2aWV3LnNjYWxlID0gMDtcbiAgICAgICAgICAgIHRoaXMubV9uX3JlbGl2ZXZpZXcucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjIsIDEuMikuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICBpZiAod2luZG93LlNLSU5fU0hBUkUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dBZEJhbm5lcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5maW5kKFwiYnRuX2Nsb3NlXCIsIHRoaXMubV9uX3JlbGl2ZXZpZXcpO1xuICAgICAgICAgICAgICAgIG5vZGUueSA9IC01ODU7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uY2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnkgPSAtNTE0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuc2hvd0FkYilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKHRydWUpO1xuICAgICAgICAgICAgICAgIH0sIDEuMylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5Y2hlY2suYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5cmFuay5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLl9yZWxpdmVudW0rK1wiLCB0aGlzLl9yZWxpdmVudW0pO1xuICAgICAgICAgICAgdGhpcy5tX25fcmVzdWx0X3BhbmVsLmdldENvbXBvbmVudChcIkdhbWVSZXN1bHRcIikuc2hvd0ZhaWwodGhpcy5fcmVsaXZlbnVtLCB0aGlzLm1fY3VyX3Njb3JlLCB0aGlzLl9raWxsbnVtKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FkQmFubmVyKHRydWUpO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5DSEFMTEVOR19GQUlMX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVsaXZlbnVtKys7XG4gICAgfSxcblxuICAgIG9uQWRCdG5DbGljayhldmVudCwgY3VzdG9tKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKCF3aW5kb3cuZmlyc3R2aWRlbyAmJiBjdXN0b20gPT0gMykge1xuICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5DSEFOR0VfQkxPQ0sgPSAxO1xuICAgICAgICAgICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2hhbmdlJywgJzEnKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZmlyc3R2aWRlbyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1Jld2FyZCgxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgVmVyc2lvblRvYXN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIuW+ruS/oeeJiOacrOi/h+S9ju+8jOaXoOazleeci+W5v+WRilwiLFxuICAgICAgICAgICAgICAgICAgICBpY29uOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gd3guaGlkZVRvYXN0KCksIDIwMDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCBpbmZvID0gd3guZ2V0U3lzdGVtSW5mb1N5bmMoKTtcbiAgICAgICAgICAgIGlmIChpbmZvLlNES1ZlcnNpb24gPj0gJzIuMC40Jykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FkKGN1c3RvbSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZlcnNpb25Ub2FzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2l0IGlzIG5vdCB3ZWNoYXQnKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9SZXdhcmQoY3VzdG9tKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzaG93QWQoY3VzdG9tKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm1fdmlkZW9BZCkge1xuICAgICAgICAgICAgdGhpcy5tX3ZpZGVvQWQgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LWU1NzNlNDY2YmU5NGQ3ZjUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fdmlkZW9BZC5vbkVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAvLyBVdGlscy5zaG93VGlwc1RleHQoXCJlcnJvcjpcIiArIGVyci5lcnJNc2cpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm1fdmlkZW9BZC5sb2FkKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLm1fdmlkZW9BZC5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QWRiID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLm1fdmlkZW9BZC5vbkNsb3NlKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tX3ZpZGVvQWQub2ZmQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zaG93QWRiID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc2hvd0FkQmFubmVyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cyAmJiBzdGF0dXMuaXNFbmRlZCB8fCBzdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb1Jld2FyZChjdXN0b20pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IFV0aWxzLnNob3dUaXBzVGV4dChcIuaLieWOu+inhumikeW5v+WRiuWksei0pe+8jOivt+eojeWAmemHjeivlVwiLCBudWxsLCBudWxsLCBudWxsLCA2MCwgY2MuQ29sb3IuQkxBQ0ssIDEuMikpO1xuICAgIH0sXG5cbiAgICB2aWRlb1Jld2FyZChjdXN0b20pIHtcbiAgICAgICAgaWYgKGN1c3RvbSA9PSAxIHx8IGN1c3RvbSA9PSAzKSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0Q2FuRHJvcEJsb2NrcygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2xpc3Q9JyxsaXN0KTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBzaGFwZWl0ZW0gPSB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICAgICAgc2hhcGVpdGVtLnJlc2V0QmxvY2sobGlzdFtpXSB8fCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubV9pbl9qdWRnZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1c3RvbSA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLm1fZG91Ymxlc2NvcmUgPSAyO1xuICAgICAgICAgICAgdGhpcy5tX25fZG91Ymxlc2NvcmUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIFV0aWxzLnNob3dUaXBzVGV4dChcIuW+l+WIhuWPjOWAjVwiLCBudWxsLCAwLCAwLCA2MCk7XG4gICAgICAgICAgICB0aGlzLm1fbl9sdWNreXZpZGVvLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGp1ZGdlR2FtZShib28pIHtcbiAgICAgICAgaWYgKHRoaXMubV9pbl9qdWRnZSkgcmV0dXJuO1xuICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSB0cnVlO1xuXG4gICAgICAgIGlmIChib28pIHsgLy/og5zliKlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfog5zliKknKTtcbiAgICAgICAgICAgIHRoaXMuX2tpbGxudW0rKztcbiAgICAgICAgICAgIGxldCB0aW1lID0gdGhpcy5tX3NwX21vbnN0ZXIubm9kZS5nZXRDb21wb25lbnQoXCJNb25zdGVySXRlbVwiKS5wbGF5RGVhZCgpO1xuICAgICAgICAgICAgVXRpbHMuU2V0U291bmRFZmZlY3Qod2luZG93LkNIQUxMRU5HX1ZJQ1RPUllfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgICAgIGxldCBnb2xkID0gMztcbiAgICAgICAgICAgIGxldCBwb3MgPSB0aGlzLm1fc3BfbW9uc3Rlci5ub2RlLnBhcmVudC5wb3NpdGlvbjtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fY3VyX2xldmVsICUgNSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Qm94KGNjLnYyKHBvcy54LCBwb3MueSAtIDEwMCksIGNjLlZlYzIuWkVSTywgdGhpcy5tX2N1cl9sZXZlbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkR29sZChnb2xkLCBjYy52Mihwb3MueCwgcG9zLnkgLSAxMCksIHRoaXMubV9sX2dvbGQubm9kZS5wb3NpdGlvbilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX2xldmVsICs9IDE7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbk5leHRMZXZlbCgpO1xuICAgICAgICAgICAgfSwgdGltZSAvIDEwMDApXG4gICAgICAgICAgICB0aGlzLmRlc3Ryb3lCbG9ja0J5SGl0TW9uc3RlcigpO1xuICAgICAgICAgICAgUmFua0xpc3Quc2V0U2NvcmUod2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX3Njb3JlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl92aWRlb251bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+Wksei0pScpO1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheU1vbnN0ZXJWaWN0b3J5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fbG9va3ZpZGVvLnNjYWxlID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9sb29rdmlkZW8ucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC4yLCAxLjIsIDEuMikuZWFzaW5nKGNjLmVhc2VJbigzLjApKSwgY2Muc2NhbGVUbygwLjEsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5maXJzdHZpZGVvKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9sX2Fza3R5cGUuc3RyaW5nID0gXCLnnIvop4bpopHmjaLkuIDmiblcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1fbF9hc2t0eXBlLnN0cmluZyA9IFwi5YWN6LS55o2i5LiA5om5XCI7XG4gICAgICAgICAgICAgICAgICAgIC8vIHdpbmRvdy5maXJzdHZpZGVvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9udW0rKztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNhbmNlbFZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIOWuneeuseWlluWKseiOt+WPluWkhOeQhlxuICAgICAqIEBhdXRob3Ig5ZC05bu65aWLXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHR5cGVcbiAgICAgKi9cbiAgICBCb3hSZXdhcmQodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzTnVtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdvbGQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblZpZGVvQ2xvc2UoKSB7XG4gICAgICAgIHRoaXMubV9uX3JlbGl2ZXZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9uX2Rpc3BsYXljaGVjay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheXJhbmsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fcmVzdWx0X3BhbmVsLmdldENvbXBvbmVudChcIkdhbWVSZXN1bHRcIikuc2hvd0ZhaWwodGhpcy5fcmVsaXZlbnVtLCB0aGlzLm1fY3VyX3Njb3JlLCB0aGlzLl9raWxsbnVtKTtcbiAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIodHJ1ZSk7XG4gICAgICAgIFJhbmtMaXN0LnNldFNjb3JlKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLnRvcF9zY29yZSk7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5DSEFMTEVOR19GQUlMX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgfSxcblxuICAgIG9uUmVsaXZlQnRuQ2xpY2soKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgbGV0IFZlcnNpb25Ub2FzdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCLlvq7kv6HniYjmnKzov4fkvY7vvIzml6Dms5XnnIvlub/lkYpcIixcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHd4LmhpZGVUb2FzdCgpLCAyMDAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgaW5mbyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKCk7XG4gICAgICAgICAgICBpZiAoaW5mby5TREtWZXJzaW9uID49ICcyLjAuNCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSZWxpdmVBZCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBWZXJzaW9uVG9hc3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdCBpcyBub3Qgd2VjaGF0Jyk7XG4gICAgICAgICAgICB0aGlzLm9uUmVsaXZlR2FtZVZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd1JlbGl2ZUFkKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5tX3ZpZGVvQWQyKSB7XG4gICAgICAgICAgICB0aGlzLm1fdmlkZW9BZDIgPSB3eC5jcmVhdGVSZXdhcmRlZFZpZGVvQWQoe1xuICAgICAgICAgICAgICAgIGFkVW5pdElkOiAnYWR1bml0LTUxODdmZmMzYWI1NzEzMTgnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fdmlkZW9BZDIub25FcnJvcihlcnIgPT4ge1xuICAgICAgICAgICAgLy8gVXRpbHMuc2hvd1RpcHNUZXh0KFwiZXJyb3I6XCIgKyBlcnIuZXJyTXNnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tX3ZpZGVvQWQyLmxvYWQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYubV92aWRlb0FkMi5zaG93KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zaG93QWRCYW5uZXIoZmFsc2UpO1xuICAgICAgICAgICAgICAgIHNlbGYubV92aWRlb0FkMi5vbkNsb3NlKChzdGF0dXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5tX3ZpZGVvQWQyLm9mZkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgJiYgc3RhdHVzLmlzRW5kZWQgfHwgc3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25SZWxpdmVHYW1lVmlkZW8oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBVdGlscy5zaG93VGlwc1RleHQoXCLop4bpopHmi4nlj5blpLHotKXvvIzor7fnqI3lkI7ph43or5VcIiwgbnVsbCwgbnVsbCwgbnVsbCwgNjAsIGNjLkNvbG9yLkJMQUNLLCAxLjIpKTtcbiAgICB9LFxuXG4gICAgb25OZXh0TGV2ZWwoKSB7XG4gICAgICAgIHRoaXMubV9uX3Jlc3VsdF9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93QWRCYW5uZXIoZmFsc2UpO1xuICAgICAgICB0aGlzLm1fY3VyX2xldmVsID0gd2luZG93LklOSVRfR0FNRV9TQVZFX0RBVEEudG9wX2xldmVsICsgMTtcbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLm1fY3VyXCIsIHRoaXMubV9jdXJfbGV2ZWwpO1xuICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX2xfbGV2ZWwuc3RyaW5nID0gXCJMVi5cIiArIHRoaXMubV9jdXJfbGV2ZWw7XG4gICAgICAgIHRoaXMuaW5pdE1vbnN0ZXIodGhpcy5tX2N1cl9sZXZlbCk7XG4gICAgICAgIHRoaXMuY2hlY2tJc0xvc2UoKTtcbiAgICB9LFxuXG4gICAgb25CYWNrVG9NZW51KCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FKTtcbiAgICB9LFxuXG4gICAgb25Cb29tQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgLy8gdGhpcy5qdWRnZUdhbWUoZmFsc2UpO1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDAgJiYgIXRoaXMuX2lzZGVsZXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fYm9vbW51bSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fdG9vbHVzZS5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuZ2V0Q29tcG9uZW50KFwiVXNlVG9vbEl0ZW1cIikuaW5pdFRvb2xJbmZvKDAsIHRoaXMubV9ib29tbnVtLCB0aGlzLm1fc3ByaXRlQXRsYXMuZ2V0U3ByaXRlRnJhbWUod2luZG93LlRPT0xfQ09ORklHWzBdLm5hbWUpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tX25fZ3VpZGVtYXNrLmFjdGl2ZSA9ICF0aGlzLm1fbWFwYmxpbms7XG4gICAgICAgICAgICAgICAgdGhpcy5tX3RvdWNoX2Jvb20gPSAhdGhpcy5tX21hcGJsaW5rO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0TWFwQmxpbmsoIXRoaXMubV9tYXBibGluayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25TdHJvbmdDbGljayhldmVudCkge1xuICAgICAgICBVdGlscy5TZXRTb3VuZEVmZmVjdCh3aW5kb3cuQlVUVE9OX0NMSUNLX01VU0lDLCBmYWxzZSwgMSk7XG4gICAgICAgIGlmICh0aGlzLm1fZ2FtZXN0YXRlID09IDApIHtcbiAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMubV9uX3Rvb2x1c2UuZ2V0Q29tcG9uZW50KFwiVXNlVG9vbEl0ZW1cIikuaW5pdFRvb2xJbmZvKDEsIHRoaXMubV9zdHJvbmdudW0sIHRoaXMubV9zcHJpdGVBdGxhcy5nZXRTcHJpdGVGcmFtZSh3aW5kb3cuVE9PTF9DT05GSUdbMV0ubmFtZSkpO1xuICAgICAgICAgICAgdGhpcy5ndWlkZU1hc2tDbGljaygpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uVXNlU3Ryb25nKCkge1xuICAgICAgICBsZXQgdCA9IGZhbHNlO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9yb3c7IGkrKykge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLm1fY29sOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tX2dyaWRfYXJyYXlbaV1bal0udHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhID0gdGhpcy5tX2dyaWRfYXJyYXlbaV1bal0ub2JqLmdldENvbXBvbmVudChcIkJsb2NrSXRlbVwiKS5hZGRTdHJvbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0KSB7XG4gICAgICAgICAgICB3aW5kb3cuSU5JVF9HQU1FX1NBVkVfREFUQS50b29sWzFdIC09IDE7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVRvb2xzTnVtKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/orr7nva7og4zmma/pl6rng4FcbiAgICBzZXRNYXBCbGluayhib28pIHtcbiAgICAgICAgaWYgKGJvbyA9PT0gdGhpcy5tX21hcGJsaW5rKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1fbWFwYmxpbmsgPSBib287XG4gICAgICAgIGlmIChib28pIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX21hcGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLm1fbWFwYXJyYXlbaV0uaXNIYXZlRkspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbiA9IGNjLnJlcGVhdEZvcmV2ZXIoY2Muc2VxdWVuY2UoY2Muc2NhbGVUbygwLjgsIDAuOCwgMC44KSwgY2Muc2NhbGVUbygwLjgsIDEsIDEpKSk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbi5zZXRUYWcoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5ydW5BY3Rpb24oYWN0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9tYXBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5tX21hcGFycmF5W2ldLmlzSGF2ZUZLKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5zdG9wQWN0aW9uQnlUYWcoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubV9tYXBhcnJheVtpXS5zY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldFRhcmdldEdyaWRJbmZvKHRhcmdldCkge1xuICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IodGFyZ2V0IC8gdGhpcy5tX3Jvdyk7XG4gICAgICAgIGxldCBqID0gdGFyZ2V0ICUgdGhpcy5tX2NvbDtcbiAgICAgICAgcmV0dXJuIHRoaXMubV9tYXBhcnJheVtpXVtqXTtcbiAgICB9LFxuXG4gICAgb25SZWxpdmVHYW1lVmlkZW8oKSB7XG4gICAgICAgIFV0aWxzLnNob3dUaXBzVGV4dChcIuWkjea0u+aIkOWKn1wiKTtcbiAgICAgICAgdGhpcy5tX2luX2p1ZGdlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tX25fa3VhaS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5nZXRDb21wb25lbnQoXCJTaGFwZUl0ZW1cIikucmVzZXRCbG9jaygpO1xuICAgICAgICAgICAgdGhpcy5tX25fa3VhaVtpXS5vcGFjaXR5ID0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgIHRoaXMubV9uX3Jlc3VsdF9wYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX25fcmVsaXZldmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tX21hcGFycmF5LmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmdldENoaWxkQnlOYW1lKFwiY29sb3JTcHJcIilcbiAgICAgICAgfSk7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm1fbWFwYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICBsZXQgRktOb2RlID0gdGhpcy5tX21hcGFycmF5W2luZGV4XS5nZXRDaGlsZEJ5TmFtZShcImNvbG9yU3ByXCIpXG4gICAgICAgICAgICAvL+i/meS4quWBh+aWueWdl+WPmOWkp+W5tuS4lOa4kOmakOaOiVxuICAgICAgICAgICAgaWYgKEZLTm9kZSkge1xuICAgICAgICAgICAgICAgIEZLTm9kZS5ydW5BY3Rpb24oY2Muc2VxdWVuY2UoXG4gICAgICAgICAgICAgICAgICAgIGNjLnNwYXduKGNjLnNjYWxlVG8oMC41LCAyKSwgY2MuZmFkZU91dCgwLjUpKSxcbiAgICAgICAgICAgICAgICAgICAgY2MucmVtb3ZlU2VsZih0cnVlKVxuICAgICAgICAgICAgICAgICkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tX21hcGFycmF5W2luZGV4XS5pc0hhdmVGSyA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBSYW5rTGlzdC5jaGVja1dpbGxTdXJwYXNzKHRoaXMubV9jdXJfc2NvcmUpO1xuICAgICAgICB0aGlzLm1fbl9kaXNwbGF5Y2hlY2suYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tX25fZGlzcGxheXJhbmsuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAwO1xuICAgIH0sXG5cbiAgICBvblJlbGl2ZUdhbWUoKSB7XG4gICAgICAgIFV0aWxzLlNldFNvdW5kRWZmZWN0KHdpbmRvdy5CVVRUT05fQ0xJQ0tfTVVTSUMsIGZhbHNlLCAxKTtcbiAgICAgICAgaWYgKHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtID49IDIwKSB7XG4gICAgICAgICAgICBVdGlscy5zaG93VGlwc1RleHQoXCLlpI3mtLvmiJDlip9cIik7XG4gICAgICAgICAgICB0aGlzLm1faW5fanVkZ2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHdpbmRvdy5JTklUX0dBTUVfU0FWRV9EQVRBLmdvbGRfbnVtIC09IDIwO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHb2xkKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubV9uX2t1YWkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbl9rdWFpW2ldLmdldENvbXBvbmVudChcIlNoYXBlSXRlbVwiKS5yZXNldEJsb2NrKDApO1xuICAgICAgICAgICAgICAgIHRoaXMubV9uX2t1YWlbaV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheUFuZ3J5KCk7XG4gICAgICAgICAgICB0aGlzLm1fbl9yZXN1bHRfcGFuZWwuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBSYW5rTGlzdC5jaGVja1dpbGxTdXJwYXNzKHRoaXMubV9jdXJfc2NvcmUpO1xuICAgICAgICAgICAgdGhpcy5tX25fZGlzcGxheWNoZWNrLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1fbl9kaXNwbGF5cmFuay5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubV9nYW1lc3RhdGUgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVXRpbHMuc2hvd1RpcHNUZXh0KFwi6YeR5biB5LiN6LazXCIpXG4gICAgICAgICAgICBTaGFyZVNkay5zaGFyZUFwcE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIuadpeW4ruW4ruaIke+8jOaIkeiiq+aAquWFvea2iOeBreS6hlwiLFxuICAgICAgICAgICAgICAgIGltYWdlVXJsOiB3aW5kb3cudGVtcEZpbGVVUkxbMV0sXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFpbDogZXJyID0+IHtcblxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY29tcGxhdGU6IG1zZyA9PiB7XG5cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2hvd0FkQmFubmVyKGJvbykge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgPT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgbGV0IFNpemUgPSBjYy53aW5TaXplXG5cbiAgICAgICAgbGV0IFdpZHRobm9kZSA9IGNjLmZpbmQoXCJDYW52YXMvbl9mdW5ueW1hcC9uX2Jhbm5lcnBvc1wiKTtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlKFdpZHRobm9kZSk7XG5cbiAgICAgICAgaWYgKFNpemUuaGVpZ2h0IC8gU2l6ZS53aWR0aCA+IDIpIHsvL+mAgumFjeWFqOmdouWxjyDpgILnlKjkuo5GSVhIZWlnaHRcbiAgICAgICAgICAgIHBvcy55ICs9IChTaXplLmhlaWdodCAtIDE5MjApIC8gMjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzeXN0ZW0gPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpO1xuXG4gICAgICAgIGxldCBhZGFwdFNjYWxlSCA9IHN5c3RlbS5zY3JlZW5IZWlnaHQgLyBTaXplLmhlaWdodDtcbiAgICAgICAgdmFyIFBvc1kgPSAoKFNpemUuaGVpZ2h0IC0gcG9zLnkpICogYWRhcHRTY2FsZUgpO1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMubV9iYW5uZXJhZCkge1xuICAgICAgICAgICAgdGhpcy5tX2Jhbm5lcmFkLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubV9iYW5uZXJhZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLm1fYmFubmVyYWQgJiYgYm9vKSB7XG4gICAgICAgICAgICBpZiAoc3lzdGVtLlNES1ZlcnNpb24gPCAnMi4wLjQnKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwi5b6u5L+h54mI5pys6L+H5L2O77yM5peg5rOV5Yib5bu65bm/5ZGKYmFubmVyXCIsXG4gICAgICAgICAgICAgICAgICAgIGljb246IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDAsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3eC5oaWRlVG9hc3QoKSwgMzAwMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZCA9IHd4LmNyZWF0ZUJhbm5lckFkKHtcbiAgICAgICAgICAgICAgICAgICAgYWRVbml0SWQ6ICdhZHVuaXQtOWRkMDU3YjZiNTE0MjQ1YScsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBQb3NZLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHN5c3RlbS5zY3JlZW5XaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLm9uUmVzaXplKChyZXMxKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5tX2Jhbm5lcmFkICYmIHNlbGYubV9iYW5uZXJhZC5zdHlsZSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLnN0eWxlLnRvcCA9IFBvc1k7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5tX2Jhbm5lcmFkLnN0eWxlLmhlaWdodCA9IHJlczEuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvblJlc2l6ZS1lcnJvclwiLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQub25Mb2FkKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Jhbm5lciDlub/lkYrliqDovb3miJDlip8nKVxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzZWxmLm1fYmFubmVyYWQuc2hvdygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuW5v+WRiuaYvuekuuaIkOWKn1wiKTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCLlub/lkYrliqDovb3lpLHotKVcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHNlbGYubV9iYW5uZXJhZC5vbkVycm9yKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbk9wZW5Bc2tQYW5lbCgpIHtcbiAgICAgICAgdGhpcy5tX25fYXNrcGFuZWwuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgb25DbG9zZUFza1BhbmVsKCkge1xuICAgICAgICB0aGlzLm1fbl9hc2twYW5lbC5hY3RpdmUgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLm1fbm9ybWFsX2N1cnRpbWUgIT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMubV9ub3JtYWxfY3VydGltZSArPSBkdDtcbiAgICAgICAgICAgIGlmICh0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPj0gdGhpcy5tX25vcm1hbF90YWxrdGltZSAmJiB0aGlzLm1fZ2FtZXN0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1fbm9ybWFsX2N1cnRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMubV9zcF9tb25zdGVyLm5vZGUuZ2V0Q29tcG9uZW50KFwiTW9uc3Rlckl0ZW1cIikucGxheU5vcm1hbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0pOyJdfQ==
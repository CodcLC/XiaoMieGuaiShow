"use strict";
cc._RF.push(module, 'f7756iw0ZVBxpZpYOFetAz7', 'ShapeItem');
// Script/item/ShapeItem.js

"use strict";

var Utils = require("Utils");

var GameMain = require('GameMain');

var scaleParam = 0.5;
var colorlist = ['#ffffff', '#f9bd1d', '#003DFF', '#85d546', '#D6309A'];
cc.Class({
  "extends": cc.Component,
  properties: {
    m_spa_blocklist: cc.SpriteAtlas,
    GameLayer: {
      "default": null,
      type: GameMain
    }
  },
  // LIFE-CYCLE CALLBACKS:
  // onLoad () {},
  start: function start() {
    this._bg_color = 0;
    this._type_index = 0;
    this._colorindex = 1; // this.updateIndex();

    if (window.INIT_GAME_SAVE_DATA.top_level < 1 && !window.GUIDE_LEVEL) {
      //showguai
      this.resetBlock(22);
      this.GameLayer.showGuide();
    } else {
      this.resetBlock();
    } // let oneNode = this.createItem();
    // this.node.addChild(oneNode);


    this.addTouchEvent();
    this._blockcount = 0; //5个循环，5个之后必定出现一个单个的
  },
  updateIndex: function updateIndex(boo) {
    var indexlist = window.INIT_GAME_SAVE_DATA.skin;

    for (var i = 0; i < indexlist.length; i++) {
      if (indexlist[i] >= 2) {
        this._type_index = i;
        break;
      }
    }

    this._data = window.SKIN_CONFIG[this._type_index];

    if (boo) {
      var node = this.node.getChildByName('n_shape');

      if (node) {
        for (var _i = 0; _i < node.childrenCount; _i++) {
          node.children[_i].getComponent(cc.Sprite).spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + this._colorindex);
        }
      }
    }

    return this._type_index;
  },
  //获取方块配置
  getTheConfig: function getTheConfig() {
    var a = 109.77249200050075;
    var h = 110;
    var height = 95;
    var cos60 = Math.cos(60 * Math.PI / 180);
    var sin60 = Math.sin(60 * Math.PI / 180);
    var cos120 = Math.cos(120 * Math.PI / 180);
    var sin120 = Math.sin(120 * Math.PI / 180);
    var cos300 = Math.cos(300 * Math.PI / 180);
    var sin300 = Math.sin(300 * Math.PI / 180);
    var configLists = [//一个
    [cc.v2(0, 0)], //四个
    // [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a)],
    // [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a)],
    // [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0)],
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h * 3, 0)], //横摆1 ----
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h + cos60 * a, sin60 * a)], //横摆2   --=-
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(h + cos300 * a, sin300 * a)], //横摆3 --T-
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(cos60 * a, sin60 * a)], //横摆4
    [cc.v2(0, 0), cc.v2(h, 0), cc.v2(h * 2, 0), cc.v2(cos300 * a, sin300 * a)], //横摆5
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos120 * a, sin120 * a)], //斜上摆1
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos120 * a + cos60 * a, sin120 * a + sin60 * a)], //斜上摆2
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(h, 0)], //斜上摆3
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos60 * a + h, sin60 * a)], //斜上摆4
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a * 2, sin60 * a * 2), cc.v2(cos60 * a * 3, sin60 * a * 3)], //斜上直线
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a * 2 + h, sin120 * a * 2)], //斜下摆1
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a - h, sin120 * a)], //斜下摆2
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a + h, sin120 * a)], //斜下摆3
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(-h, 0)], //斜下摆4
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(cos120 * a * 2, sin120 * a * 2), cc.v2(cos120 * a * 3, sin120 * a * 3)], //斜下直线
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(cos60 * a + h, sin60 * a), cc.v2(2 * h, 0)], //拱桥1
    [cc.v2(0, 0), cc.v2(cos300 * a, sin300 * a), cc.v2(cos300 * a + h, sin300 * a), cc.v2(2 * h, 0)], //拱桥2
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(h, 2 * height)], //拱桥3
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(0, 2 * height), cc.v2(-h, 2 * height)], //拱桥4
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(h, 0)], //拱桥5
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(0, 2 * height), cc.v2(-h, 0)], //拱桥6
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(0, 2 * height), cc.v2(cos300 * a, 2 * height + sin300 * a)], //四方四方
    [cc.v2(0, 0), cc.v2(cos60 * a, sin60 * a), cc.v2(h, 0), cc.v2(cos60 * a + h, sin60 * a)], //斜四方/
    [cc.v2(0, 0), cc.v2(cos120 * a, sin120 * a), cc.v2(-h, 0), cc.v2(cos120 * a - h, sin120 * a)] //斜四方\
    ];
    return configLists;
  },
  //创建单个六边形 colorIndex 颜色下标
  newOneK: function newOneK(colorIndex) {
    //创建一个块
    var node = new cc.Node("colorSpr");
    node.colorIndex = colorIndex;
    node.colorName = this._data.name;
    var sprite = node.addComponent(cc.Sprite);
    sprite.spriteFrame = this.m_spa_blocklist.getSpriteFrame(this._data.name + colorIndex);
    return node;
  },
  getCurColorIndex: function getCurColorIndex() {
    return this._colorindex;
  },
  createItem: function createItem(index) {
    this._blockcount++;

    if (this._blockcount >= 5) {
      // index = 0;
      this._next = 0;
      this._blockcount = 0;
    }

    if (typeof this._next == 'number' && !index) {
      index = this._next;
      this._next = null;

      if (index == 0) {
        this._blockcount = 0;
      }
    }

    var shapeitem = new cc.Node("n_shape");
    var config = this.getTheConfig();
    var randomIndex = Utils.random(0, config.length);

    if (typeof index == 'number' && index >= 0) {
      randomIndex = index;
    }

    if (randomIndex == 0) {
      //碰到一也重置
      this._blockcount = 0;
    }

    var posList = config[randomIndex];
    var randomIndexColor = Utils.random(1, 5);
    this._bg_color = colorlist[randomIndexColor];
    this._colorindex = randomIndexColor;
    var sumX = 0;
    var countX = 0;
    var sumY = 0;
    var countY = 0;

    for (var _index = 0; _index < posList.length; _index++) {
      var pos = posList[_index];
      var kuai = this.newOneK(randomIndexColor);
      kuai.x = pos.x;
      sumX += kuai.x;
      countX++;
      kuai.y = pos.y;
      sumY += kuai.y;
      countY++;
      shapeitem.addChild(kuai);
    }

    shapeitem.setScale(scaleParam);
    shapeitem.x = -sumX / countX * scaleParam;
    shapeitem.y = -sumY / countY * scaleParam;
    return shapeitem;
  },
  //添加触摸
  addTouchEvent: function addTouchEvent() {
    var upH = 130;
    var self = this;
    this.node.ox = this.node.x;
    this.node.oy = this.node.y;
    this.node.on(cc.Node.EventType.TOUCH_START, function () {
      this.node.y += upH;
      Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 0.8);
      this.node.getChildByName("n_shape").setScale(1);
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
      var delta = event.touch.getDelta();
      this.node.x += delta.x;
      this.node.y += delta.y;
      self.collisionFunc(); // //变色处理

      if (!self.checkIsCanDrop()) {
        self.changeColorDeal(true);
      } else {
        self.changeColorDeal();
      }
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
      this.dropDownFunc();
    }, this);
    this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
      this.dropDownFunc();
    }, this);
  },
  //检测是否能够放下
  checkIsCanDrop: function checkIsCanDrop() {
    //先判断数量是否一致，不一致说明有一个超出去了
    if (!this._checkFrameList || this._checkFrameList.length == 0 || this._checkFrameList.length != this.node.children[0].children.length) {
      return false;
    } //检测放下的格子是否已经有方块


    for (var i = 0; i < this._checkFrameList.length; i++) {
      if (this._checkFrameList[i].isHaveFK) {
        return false;
      }
    }

    return true;
  },
  //变色处理
  changeColorDeal: function changeColorDeal(isJustClearColor) {
    var children = this.GameLayer.m_maparray;

    for (var i = 0; i < children.length; i++) {
      children[i].getComponent("BlockBGItem").setBrightVisible(false);
    } //如果参数有值，直接返回，不做下面的


    if (isJustClearColor) {
      return;
    }

    for (var _i2 = 0; _i2 < this._checkFrameList.length; _i2++) {
      this._checkFrameList[_i2].getComponent("BlockBGItem").setBrightVisible(true, this._bg_color);
    }
  },
  //碰撞逻辑
  collisionFunc: function collisionFunc() {
    this._checkFrameList = []; //清空数组

    this._checkFKlist = []; //清空数组

    var children = this.node.children[0].children;

    for (var i = 0; i < children.length; i++) {
      var pianyiCPos = cc.v2(this.node.children[0].x, this.node.children[0].y).add(cc.v2(children[i].x, children[i].y));
      var childPos = this.node.position.add(pianyiCPos);
      var frame = this.checkPosFunc(childPos);

      if (frame) {
        this._checkFKlist.push(children[i]);

        this._checkFrameList.push(frame);
      }
    }
  },
  //一个点和棋盘的所有框检测
  checkPosFunc: function checkPosFunc(pos) {
    var len = 52; //碰撞距离

    var children = this.GameLayer.m_maparray;

    for (var i = 0; i < children.length; i++) {
      var frameNode = children[i];
      var dis = cc.v2(frameNode.x, frameNode.y).sub(pos).mag();

      if (dis <= len) {
        return frameNode;
      }
    }
  },
  //放下逻辑
  dropDownFunc: function dropDownFunc() {
    if (!this.checkIsCanDrop()) {
      //放回去
      this.takeBack();
      return;
    }

    for (var i = 0; i < this._checkFKlist.length; i++) {
      this._checkFKlist[i].x = 0;
      this._checkFKlist[i].y = 0;
      this._checkFKlist[i].parent = this._checkFrameList[i];
      this._checkFrameList[i].isHaveFK = true;

      this._checkFKlist[i].runAction(cc.sequence(cc.scaleTo(0.1, 1.1, 0.8), cc.scaleTo(0.15, 0.9, 1.1), cc.scaleTo(0.015, 1.1, 0.9), cc.scaleTo(0.2, 1, 1)));
    }

    this.GameLayer.hideGuide();
    this.node.removeAllChildren();
    var oneNode = this.createItem();
    this.node.addChild(oneNode);
    Utils.SetSoundEffect(window.BUTTON_CLICK_MUSIC, false, 0.8);
    this.GameLayer.addScore(this._checkFKlist.length, true);
    this.GameLayer.checkClearUp(); //放回去

    this.takeBack(); //直接用棋盘检测是不是输了

    this.GameLayer.checkIsLose();
  },
  //回到原位
  takeBack: function takeBack() {
    //变色处理
    this.checkFrameList = []; //清空数组

    this.changeColorDeal(true);
    this.node.getChildByName("n_shape").setScale(scaleParam);
    this.node.x = this.node.ox;
    this.node.y = this.node.oy;
  },
  checkIsLose: function checkIsLose() {
    var canDropCount = 0;
    var children = this.node.children[0].children; //一个个格子放试一下能不能放

    for (var i = 0; i < this.GameLayer.m_maparray.length; i++) {
      var frameNode = this.GameLayer.m_maparray[i];
      var srcPos = cc.v2(frameNode.x, frameNode.y);
      var count = 1;

      if (!frameNode.isHaveFK) {
        //这里做是否可以放的判断
        for (var j = 1; j < children.length; j++) {
          var len = 52; //碰撞距离

          var childPos = srcPos.add(cc.v2(children[j].x, children[j].y)); //碰撞检测

          for (var k = 0; k < this.GameLayer.m_maparray.length; k++) {
            var tFrameNode = this.GameLayer.m_maparray[k];
            var dis = cc.v2(tFrameNode.x, tFrameNode.y).sub(childPos).mag();

            if (dis <= len && !tFrameNode.isHaveFK) {
              count++; //可以放就要累加计数
            }
          }
        } //如果数量相等就说明这个方块在这个格子是可以放下的


        if (count == children.length) {
          canDropCount++;
        }
      }
    }

    if (canDropCount == 0) {
      return true;
    } else {
      return false;
    }
  },
  resetBlock: function resetBlock(index) {
    this.node.removeAllChildren();
    this.updateIndex();
    var oneNode = this.createItem(index);
    this.node.addChild(oneNode);
  },
  setNextBlock: function setNextBlock(index) {
    this._next = index;
  } // update (dt) {},

});

cc._RF.pop();
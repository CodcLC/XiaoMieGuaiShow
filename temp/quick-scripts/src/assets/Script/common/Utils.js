"use strict";
cc._RF.push(module, 'eb7ebzZ/c1Alap1sGhOsN/K', 'Utils');
// Script/common/Utils.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 命名 node = n_  label = l_  sprite = sp_ button = btn_   scrollView = sc_
 */
var t = console.log;

console.log = function () {// t(...param);
};

var Utils = {
  //适配分辨率默认高度适配，iphonex宽度适配
  setDesignResolution: function setDesignResolution() {
    var canvas = cc.find("Canvas").getComponent(cc.Canvas);
    var winSize = cc.winSize;

    if (winSize.width / winSize.height > 9 / 16) {
      canvas.fitWidth = false;
      canvas.fitHeight = true;
    } else {
      canvas.fitWidth = true;
      canvas.fitHeight = false;
    }
  },

  /**
   * 
   * @param {String} key 保存的键值
   * @param {String} value  保存的值
   */
  setKVUserData: function setKVUserData(key, value, success, fail) {
    if (window.GAME_SAVE_TYPE === 1) {
      cc.sys.localStorage.setItem(key, value);
    } else {
      _Data["default"].setData(value, success, fail);
    }
  },

  /**
   * 
   * @param {String} key 获取对应内容的键值
   * @param {String} callback 存储服务端的话需要回调函数
   */
  getKVUserData: function getKVUserData(key, success, fail) {
    if (window.GAME_SAVE_TYPE === 1) {
      return cc.sys.localStorage.getItem(key);
    } else {
      _Data["default"].getData(success, fail);
    }
  },

  /**
   * 
   * @param {String} imagUrl 相对rescourse下的路径
   * @param {Number} type 加载资源类型
   * @param {*} callback 加载之后回调
   */
  loadRes: function loadRes(imagUrl, type, callback) {
    cc.loader.loadRes(imagUrl, type, function (err, obj) {
      if (err) {
        cc.error(err.message || err);
        return;
      }

      typeof callback == 'function' && callback(obj);
    });
  },

  /**
   * 
   * @param {*} node 淡入节点
   * @param {Number} time 淡入时间 默认1s
   */
  fadeIn: function fadeIn(node, time) {
    var fadetime = time ? time : 1;
    node.opacity = 0;
    node.runAction(cc.fadeIn(fadetime));
  },

  /**
   * 获取上传服务器的存储信息
   */
  getSaveData: function getSaveData(callback) {
    if (window.GAME_SAVE_TYPE === 1) {
      var data = cc.sys.localStorage.getItem(window.GAME_SAVE_HANDLER);

      if (data) {
        window.INIT_GAME_SAVE_DATA = JSON.parse(data);
      } else {
        cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
        data = window.INIT_GAME_SAVE_DATA;
      } // if(callback){
      //     callback(data);
      // }

    } else {
      var DB = wx.cloud.database({
        config: {
          env: window.ENV
        }
      });
      DB.collection("todos").doc(window.userInfo.openId).get({
        success: function success(res) {
          console.log(res.data);
          if (!res.data.skin) res.data.skin = window.SKIN_CONFIG_STATE;
          window.INIT_GAME_SAVE_DATA = res.data;

          if (callback) {
            callback(window.INIT_GAME_SAVE_DATA);
          }
        },
        fail: function fail(err) {
          console.log("fail", err);
          window.need_add = true;

          if (callback) {
            callback(window.INIT_GAME_SAVE_DATA);
          }
        },
        complete: function complete(res) {// console.log("complete", err);
        }
      });
    }
  },

  /**
   * 
   * @param {String} jsonobj 存储信息解析
   */
  setSaveData: function setSaveData() {
    if (window.GAME_SAVE_TYPE === 1) {
      // console.log("本地数据设置成功", JSON.stringify(window.INIT_GAME_SAVE_DATA));
      cc.sys.localStorage.setItem(window.GAME_SAVE_HANDLER, JSON.stringify(window.INIT_GAME_SAVE_DATA));
    } else {
      var DB = wx.cloud.database({
        config: {
          env: window.ENV
        }
      });
      window.INIT_GAME_SAVE_DATA._id = window.userInfo.openId;

      if (window.need_add) {
        DB.collection("todos").add({
          data: window.INIT_GAME_SAVE_DATA,
          success: function success(res) {
            // console.log(res, "add data good");
            window.need_add = false;
          },
          fail: function fail(err) {// console.log("fail ", err);
          }
        });
      } else {
        DB.collection("todos").doc(window.userInfo.openId).update({
          data: {
            gold_num: window.INIT_GAME_SAVE_DATA.gold_num,
            login_time: window.INIT_GAME_SAVE_DATA.login_time,
            tool: window.INIT_GAME_SAVE_DATA.tool,
            top_level: window.INIT_GAME_SAVE_DATA.top_level,
            top_score: window.INIT_GAME_SAVE_DATA.top_score,
            skin: window.INIT_GAME_SAVE_DATA.skin
          },
          success: function success(res) {// console.log(res, "add data good");
          },
          fail: function fail(err) {// console.log("fail ", err);
          }
        });
      }
    }
  },

  /**
   * @param {Number}min max随机数范围
   */
  random: function random(min, max) {
    return min + Math.floor(Math.random() * (max - min));
  },

  /**
   * 获取两个点的夹角
   */
  getAngle: function getAngle(x1, y1, x2, y2) {
    // 直角的边长
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2); // 斜边长

    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // 余弦

    var cos = y / z; // 弧度

    var radina = Math.acos(cos); // 角度

    var angle = 180 / (Math.PI / radina);
    return angle;
  },

  /**
   * @desc 从给定整数范围内生成n个不重复的随机数 n不能超过给定范围
   * @param {Number} min 
   * @param {Number} max 
   */
  getRandomSDiff: function getRandomSDiff(min, max, n) {
    if (max - min + 1 < n) return [];
    var originalArray = new Array();
    var len = max - min + 1;

    for (var i = 0; i < len; i++) {
      originalArray[i] = min + i;
    }

    var randomArray = new Array();

    for (var _i = 0; _i < n; _i++) {
      var _t = this.random(0, len - 1 - _i);

      randomArray[_i] = originalArray[_t];
      var temp = originalArray[len - 1 - _i];
      originalArray[len - 1 - _i] = originalArray[_t];
      originalArray[_t] = temp;
    }

    return randomArray;
  },

  /**
   * 显示道具获得
   * @param {Number} num 
   * @param {Number} type 0 炸弹 1金币
   * @param {any} parentNode 
   * @param {Number} x 
   * @param {Number} y 
   */
  showGetItem: function showGetItem(num, type, parentNode, x, y) {
    this.loadRes("prefabs/textbg", cc.Prefab, function (obj) {
      var node = cc.instantiate(obj);
      node.zindex = 1000;
      var labelnode = node.getChildByName('l_num');
      var goldnode = node.getChildByName('sp_gold');
      var boomnode = node.getChildByName('sp_boom');

      if (type == 0) {
        labelnode.getComponent(cc.Label).string = cc.js.formatStr("终极轰炸x%d", num);
        goldnode.active = false;
        boomnode.active = true;
      } else {
        labelnode.getComponent(cc.Label).string = cc.js.formatStr("金币x%d", num);
        goldnode.active = true;
        boomnode.active = false;
      }

      var xx = x ? x : 0;
      var yy = y ? y : 0;

      if (parentNode && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        node.parent = cc.find("Canvas");
      }

      node.setPosition(xx, yy);
      var movetime = 1.5;
      var dis = 70;
      node.setPosition(xx, yy);
      var action1 = cc.moveBy(movetime, cc.v2(0, dis));
      var action2 = cc.fadeOut(1);
      node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
        node.destroy();
      })));
    });
  },

  /**
   * 
   * @param {String} text 文字描述
   * @param {*} parentNode 父节点，默认cc.find("Canvas")
   * @param {Number} x *坐标x默认0
   * @param {Number} y *坐标y默认0
   * @param {Number} font_size*字体大小默认40
   * @param {*} color 字体颜色
   * @param {Number} time 飘字移动时间
   * @param {Number} ydis 移动距离
   */
  showTipsText: function showTipsText(text, parentNode, x, y, font_size, color, time, ydis) {
    var node = new cc.Node('tipstext');
    node.zindex = 1000;
    var label = node.addComponent(cc.Label);
    label.fontFamily = '黑体';
    label.string = text;
    var xx = x ? x : 0;
    var yy = y ? y : 0;
    label.fontSize = font_size ? font_size : 40;
    label.lineHeight = font_size ? font_size + 10 : 50;
    node.color = color ? color : cc.Color.WHITE;

    if (parentNode && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      node.parent = cc.find("Canvas");
    }

    var movetime = time ? time : 0.5;
    var dis = ydis ? ydis : 70;
    node.setPosition(xx, yy);
    var action1 = cc.moveBy(movetime, cc.v2(0, dis));
    var action2 = cc.fadeOut(1);
    node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
      node.destroy();
    })));
  },

  /**
   * 
   * @param {String} text 文字描述
   * @param {*} parentNode 父节点，默认cc.find("Canvas")
   * @param {Number} x *坐标x默认0
   * @param {Number} y *坐标y默认0
   * @param {Number} font_size*字体大小默认40
   * @param {*} color 字体颜色
   * @param {Number} time 飘字移动时间
   * @param {Number} ydis 移动距离
   * @param {boolean} boo 是否不需要跳跃效果
   */
  showHurtText: function showHurtText(text, parentNode, x, y, font_size, color, time, ydis, boo) {
    var _this = this;

    this.loadRes("prefabs/l_hurt", cc.Prefab, function (obj) {
      var node = cc.instantiate(obj);
      node.zindex = 1000;
      var label = node.getComponent(cc.Label);
      label.string = text;
      var xx = x ? x : 0;
      var yy = y ? y : 0;
      label.fontSize = font_size ? font_size : 40;
      label.lineHeight = 80; //font_size ? font_size + 10 : 40;

      node.color = color ? color : cc.Color.WHITE;

      if (parentNode && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        node.parent = cc.find("Canvas");
      }

      var movetime = time ? time : 0.5;
      var dis = ydis ? ydis : 1;
      node.setPosition(xx, yy);
      _this.dir = !_this.dir;
      var movex = _this.dir ? -1 : 1;
      if (boo) dis = 0;
      var action1 = cc.jumpBy(movetime, dis * 100 * movex, -30, 100, 1);
      var action2 = cc.fadeOut(0.8);
      node.runAction(cc.sequence(action1, action2, cc.callFunc(function () {
        node.destroy();
        node = null;
      })));
    });
  },

  /**
   *          
   * @param {string} sprite_name 资源路径
   * @param {*} parentNode 父节点 默认canvas
   * @param {Vec2} startpos 开始位置
   * @param {Vec2} targetpos 结束位置
   * @param {function} callback 回调
   * @param {Number} time 时间
   * @param {*} type 类型，是否需要添加一个jump
   */
  moveIcon: function moveIcon(sprite_name, parentNode, startpos, targetpos, callback, time, type) {
    var runtime = time ? time : 1; // this.loadRes(sprite_name, cc.SpriteFrame, (sprite) => {

    var node = new cc.Node('iconmove');
    var spritenode = node.addComponent(cc.Sprite);
    spritenode.spriteFrame = sprite_name;

    if (parentNode && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      node.parent = cc.find("Canvas");
    }

    var dir = Utils.random(0, 1000);
    node.anchorY = 0;
    node.position = startpos;
    node.zindex = 1000;

    if (type && type > 0) {
      if (dir > 500) {
        type = -1 * type;
      }

      node.runAction(cc.sequence(cc.jumpBy(0.5, type, 0, 100, 1), cc.delayTime(0.5), cc.moveTo(runtime, targetpos).easing(cc.easeIn(3.0)), cc.callFunc(function () {
        if (callback) callback();
        node.destroy();
      })));
    } else {
      node.runAction(cc.sequence(cc.moveTo(runtime, targetpos).easing(cc.easeIn(3.0)), cc.callFunc(function () {
        if (callback) callback();
        node.destroy();
      })));
    } // })

  },

  /**
   * 添加音效
   * @param musicUrl 音效路径
   * @constructor
   */
  SetSoundEffect: function SetSoundEffect(musicUrl, boo, volum) {
    var voluem = volum ? volum : 1;

    if (window.MUSIC_SHOW_OFF) {
      cc.loader.loadRes(musicUrl, cc.AudioClip, function (err, clip) {
        window.bgmAudioID = cc.audioEngine.playEffect(clip, false);
      }); // var audioUrl = cc.url.raw("resources/" + musicUrl);
      // cc.audioEngine.play(audioUrl, boo, voluem);
    }
  },
  //播放背景音乐
  playBgmMusic: function playBgmMusic(musicUrl, volum) {
    this.resumBgmMusic(musicUrl, volum);
  },
  resumBgmMusic: function resumBgmMusic(musicUrl, volum) {
    var url = musicUrl ? musicUrl : window.BGM;
    var voice = volum ? volum : 0.8;

    try {
      if (window.MUSIC_SHOW_OFF) {
        if (window.bgmAudioID >= 0) {
          cc.audioEngine.resume(window.bgmAudioID);
        } // window.bgmAudioID = -1;
        else {
            setTimeout(function () {
              // var audioUrl = cc.url.raw("resources/" + url);
              cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
                window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
              }); // console.error("window.bgmAudioID", window.bgmAudioID);
            }, 500);
          }
      }
    } catch (error) {
      console.error(error);
      setTimeout(function () {
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
          window.bgmAudioID = cc.audioEngine.playMusic(clip, true);
        }); // console.error("window.bgmAudioID", window.bgmAudioID);
      }, 500);
    }
  },
  //停止背景音乐
  stopBgmMusic: function stopBgmMusic() {
    try {
      if (typeof window.bgmAudioID != 'undefined') {
        cc.audioEngine.pause(window.bgmAudioID); // window.bgmAudioID = -1;
      }
    } catch (error) {
      console.warn(error);
    }
  },
  //格式化秒数

  /**
   * 
   * @param {Number} sec 秒数
   */
  formatSecToTime: function formatSecToTime(s) {
    var t;

    if (s > -1) {
      var hour = Math.floor(s / 3600);
      var min = Math.floor(s / 60) % 60;
      var sec = s % 60;

      if (hour < 10) {
        t = '0' + hour + ":";
      } else {
        t = hour + ":";
      }

      if (min < 10) {
        t += "0";
      }

      t += min + ":";

      if (sec < 10) {
        t += "0";
      }

      t += sec;
    }

    return t;
  },
  getMin: function getMin(a, b) {
    var min = a > b ? b : a;
    return min;
  },
  getMax: function getMax(x, i) {
    var max = x > i ? x : i;
    return max;
  },
  //type:type为1的时候更倾向于大这边
  getMiddleIndex: function getMiddleIndex(min, max, type) {
    var len = max - min;

    if (len % 2 == 0) {
      return len / 2 + min;
    } else {
      if (type) {
        return Math.ceil(len / 2) + min;
      } else {
        return Math.floor(len / 2) + min;
      }
    }
  }
};
module.exports = Utils;

cc._RF.pop();
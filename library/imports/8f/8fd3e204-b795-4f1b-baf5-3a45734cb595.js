"use strict";
cc._RF.push(module, '8fd3eIEt5VPG7r1OkVzTLWV', 'Wxlife');
// Script/common/Wxlife.js

"use strict";

var _event_listener = _interopRequireDefault(require("./event_listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import data from '../dataStatistics/Data';
var Utils = require("Utils");

window.EVENT_LISTENER = (0, _event_listener["default"])({});
var wxIsBackGround = false;
window.firstGame = true;
window.firststart = false;
window.getdata = false;
window.need_add = false;
window.firstshare = false;
window.firstvideo = false;
var time = 0;
cc.view.enableRetina(true);

if (typeof wx != "undefined") {
  wx.onHide(function () {
    // console.log("==========wx HIDE==============");
    wxIsBackGround = true;

    if (window.getdata) {
      Utils.setSaveData();
    }

    time = new Date().getTime();
  });
  wx.onShow(function (res) {
    // console.log("==========wx SHOW==============");
    if (!wxIsBackGround) {} else {
      //其他时间隐藏显示更新界
      Utils.resumBgmMusic();
      var endtime = new Date().getTime();
      EVENT_LISTENER.fire(window.ON_SHOW_BACK, endtime - time);
    }

    if (res.query.group) {
      window.SHOW_RES = res;
      EVENT_LISTENER.fire(window.GAME_RANK_LISTENER);
    }
  });
}

cc._RF.pop();
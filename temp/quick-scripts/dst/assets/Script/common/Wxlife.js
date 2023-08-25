
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/Wxlife.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFd4bGlmZS5qcyJdLCJuYW1lcyI6WyJVdGlscyIsInJlcXVpcmUiLCJ3aW5kb3ciLCJFVkVOVF9MSVNURU5FUiIsInd4SXNCYWNrR3JvdW5kIiwiZmlyc3RHYW1lIiwiZmlyc3RzdGFydCIsImdldGRhdGEiLCJuZWVkX2FkZCIsImZpcnN0c2hhcmUiLCJmaXJzdHZpZGVvIiwidGltZSIsImNjIiwidmlldyIsImVuYWJsZVJldGluYSIsInd4Iiwib25IaWRlIiwic2V0U2F2ZURhdGEiLCJEYXRlIiwiZ2V0VGltZSIsIm9uU2hvdyIsInJlcyIsInJlc3VtQmdtTXVzaWMiLCJlbmR0aW1lIiwiZmlyZSIsIk9OX1NIT1dfQkFDSyIsInF1ZXJ5IiwiZ3JvdXAiLCJTSE9XX1JFUyIsIkdBTUVfUkFOS19MSVNURU5FUiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBO0FBQ0EsSUFBSUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFuQjs7QUFDQUMsTUFBTSxDQUFDQyxjQUFQLEdBQXdCLGdDQUFjLEVBQWQsQ0FBeEI7QUFDQSxJQUFJQyxjQUFjLEdBQUcsS0FBckI7QUFDQUYsTUFBTSxDQUFDRyxTQUFQLEdBQW1CLElBQW5CO0FBQ0FILE1BQU0sQ0FBQ0ksVUFBUCxHQUFvQixLQUFwQjtBQUNBSixNQUFNLENBQUNLLE9BQVAsR0FBaUIsS0FBakI7QUFDQUwsTUFBTSxDQUFDTSxRQUFQLEdBQWtCLEtBQWxCO0FBQ0FOLE1BQU0sQ0FBQ08sVUFBUCxHQUFvQixLQUFwQjtBQUNBUCxNQUFNLENBQUNRLFVBQVAsR0FBb0IsS0FBcEI7QUFDQSxJQUFJQyxJQUFJLEdBQUcsQ0FBWDtBQUNBQyxFQUFFLENBQUNDLElBQUgsQ0FBUUMsWUFBUixDQUFxQixJQUFyQjs7QUFDQSxJQUFJLE9BQVFDLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QkEsRUFBQUEsRUFBRSxDQUFDQyxNQUFILENBQVUsWUFBTTtBQUNaO0FBQ0FaLElBQUFBLGNBQWMsR0FBRyxJQUFqQjs7QUFDQSxRQUFJRixNQUFNLENBQUNLLE9BQVgsRUFBb0I7QUFDaEJQLE1BQUFBLEtBQUssQ0FBQ2lCLFdBQU47QUFDSDs7QUFDRE4sSUFBQUEsSUFBSSxHQUFHLElBQUlPLElBQUosR0FBV0MsT0FBWCxFQUFQO0FBQ0gsR0FQRDtBQVNBSixFQUFBQSxFQUFFLENBQUNLLE1BQUgsQ0FBVSxVQUFDQyxHQUFELEVBQVM7QUFDZjtBQUNBLFFBQUksQ0FBQ2pCLGNBQUwsRUFBcUIsQ0FFcEIsQ0FGRCxNQUVPO0FBQUM7QUFDSkosTUFBQUEsS0FBSyxDQUFDc0IsYUFBTjtBQUNBLFVBQUlDLE9BQU8sR0FBRyxJQUFJTCxJQUFKLEdBQVdDLE9BQVgsRUFBZDtBQUNBaEIsTUFBQUEsY0FBYyxDQUFDcUIsSUFBZixDQUFvQnRCLE1BQU0sQ0FBQ3VCLFlBQTNCLEVBQXlDRixPQUFPLEdBQUdaLElBQW5EO0FBQ0g7O0FBRUQsUUFBSVUsR0FBRyxDQUFDSyxLQUFKLENBQVVDLEtBQWQsRUFBcUI7QUFDakJ6QixNQUFBQSxNQUFNLENBQUMwQixRQUFQLEdBQWtCUCxHQUFsQjtBQUNBbEIsTUFBQUEsY0FBYyxDQUFDcUIsSUFBZixDQUFvQnRCLE1BQU0sQ0FBQzJCLGtCQUEzQjtBQUNIO0FBQ0osR0FkRDtBQWVIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRXZlbnRMaXN0ZW5lciBmcm9tICcuL2V2ZW50X2xpc3RlbmVyJztcbi8vIGltcG9ydCBkYXRhIGZyb20gJy4uL2RhdGFTdGF0aXN0aWNzL0RhdGEnO1xudmFyIFV0aWxzID0gcmVxdWlyZShcIlV0aWxzXCIpO1xud2luZG93LkVWRU5UX0xJU1RFTkVSID0gRXZlbnRMaXN0ZW5lcih7fSk7XG5sZXQgd3hJc0JhY2tHcm91bmQgPSBmYWxzZTtcbndpbmRvdy5maXJzdEdhbWUgPSB0cnVlO1xud2luZG93LmZpcnN0c3RhcnQgPSBmYWxzZTtcbndpbmRvdy5nZXRkYXRhID0gZmFsc2U7XG53aW5kb3cubmVlZF9hZGQgPSBmYWxzZTtcbndpbmRvdy5maXJzdHNoYXJlID0gZmFsc2U7XG53aW5kb3cuZmlyc3R2aWRlbyA9IGZhbHNlO1xubGV0IHRpbWUgPSAwO1xuY2Mudmlldy5lbmFibGVSZXRpbmEodHJ1ZSk7XG5pZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHd4Lm9uSGlkZSgoKSA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiPT09PT09PT09PXd4IEhJREU9PT09PT09PT09PT09PVwiKTtcbiAgICAgICAgd3hJc0JhY2tHcm91bmQgPSB0cnVlO1xuICAgICAgICBpZiAod2luZG93LmdldGRhdGEpIHtcbiAgICAgICAgICAgIFV0aWxzLnNldFNhdmVEYXRhKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH0pO1xuXG4gICAgd3gub25TaG93KChyZXMpID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCI9PT09PT09PT09d3ggU0hPVz09PT09PT09PT09PT09XCIpO1xuICAgICAgICBpZiAoIXd4SXNCYWNrR3JvdW5kKSB7XG5cbiAgICAgICAgfSBlbHNlIHsvL+WFtuS7luaXtumXtOmakOiXj+aYvuekuuabtOaWsOeVjFxuICAgICAgICAgICAgVXRpbHMucmVzdW1CZ21NdXNpYygpO1xuICAgICAgICAgICAgbGV0IGVuZHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIEVWRU5UX0xJU1RFTkVSLmZpcmUod2luZG93Lk9OX1NIT1dfQkFDSywgZW5kdGltZSAtIHRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlcy5xdWVyeS5ncm91cCkge1xuICAgICAgICAgICAgd2luZG93LlNIT1dfUkVTID0gcmVzO1xuICAgICAgICAgICAgRVZFTlRfTElTVEVORVIuZmlyZSh3aW5kb3cuR0FNRV9SQU5LX0xJU1RFTkVSKTtcbiAgICAgICAgfVxuICAgIH0pO1xufSJdfQ==
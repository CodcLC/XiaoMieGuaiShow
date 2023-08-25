"use strict";
cc._RF.push(module, 'c0e844NcElKPp+0tkp+hKuL', 'event_listener');
// Script/common/event_listener.js

"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var EventListenr = function EventListenr(obj) {
  var that = {};

  obj.on = function (name, method, target) {
    if (!that.hasOwnProperty(name)) {
      that[name] = [];
    }

    var handler = {};
    handler.func = method;
    handler.target = target;
    that[name].push(handler); // console.log("global on-",name, that);
  };

  obj.fire = function (name) {
    if (that.hasOwnProperty(name)) {
      var handlerList = that[name];

      for (var i = 0; i < handlerList.length; i++) {
        var handler = handlerList[i];
        var args = [];

        for (var j = 1; j < arguments.length; j++) {
          args.push(arguments[j]);
        }

        if (handler.func) handler.func.apply(handler.target, args);else trace("[Warn] 没有对应的回调事件类型 - " + name);
      }
    }
  };

  obj.off = function (name, target) {
    // console.log("try to off "+ name, that)
    if (that.hasOwnProperty(name)) {
      var handlerList = that[name]; // console.log("try to off "+ name + "have num"+handlerList.length);

      for (var i = 0; i < handlerList.length; i++) {
        var handler = handlerList[i];

        if (handler.target === target) {
          // console.log("delete -" + target + name);
          handlerList.splice(i, 1);
        }
      }
    }
  };

  return obj;
};

var _default = EventListenr;
exports["default"] = _default;
module.exports = exports["default"];

cc._RF.pop();
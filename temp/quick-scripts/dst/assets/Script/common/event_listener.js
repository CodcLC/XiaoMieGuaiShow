
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/event_listener.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXGV2ZW50X2xpc3RlbmVyLmpzIl0sIm5hbWVzIjpbIkV2ZW50TGlzdGVuciIsIm9iaiIsInRoYXQiLCJvbiIsIm5hbWUiLCJtZXRob2QiLCJ0YXJnZXQiLCJoYXNPd25Qcm9wZXJ0eSIsImhhbmRsZXIiLCJmdW5jIiwicHVzaCIsImZpcmUiLCJoYW5kbGVyTGlzdCIsImkiLCJsZW5ndGgiLCJhcmdzIiwiaiIsImFyZ3VtZW50cyIsImFwcGx5IiwidHJhY2UiLCJvZmYiLCJzcGxpY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBVUMsR0FBVixFQUFlO0FBQ2hDLE1BQUlDLElBQUksR0FBRyxFQUFYOztBQUNBRCxFQUFBQSxHQUFHLENBQUNFLEVBQUosR0FBUyxVQUFVQyxJQUFWLEVBQWdCQyxNQUFoQixFQUF3QkMsTUFBeEIsRUFBZ0M7QUFDckMsUUFBSSxDQUFDSixJQUFJLENBQUNLLGNBQUwsQ0FBb0JILElBQXBCLENBQUwsRUFBZ0M7QUFDNUJGLE1BQUFBLElBQUksQ0FBQ0UsSUFBRCxDQUFKLEdBQWEsRUFBYjtBQUNIOztBQUNELFFBQUlJLE9BQU8sR0FBRyxFQUFkO0FBQ0FBLElBQUFBLE9BQU8sQ0FBQ0MsSUFBUixHQUFlSixNQUFmO0FBQ0FHLElBQUFBLE9BQU8sQ0FBQ0YsTUFBUixHQUFpQkEsTUFBakI7QUFFQUosSUFBQUEsSUFBSSxDQUFDRSxJQUFELENBQUosQ0FBV00sSUFBWCxDQUFnQkYsT0FBaEIsRUFScUMsQ0FTckM7QUFDSCxHQVZEOztBQVdBUCxFQUFBQSxHQUFHLENBQUNVLElBQUosR0FBVyxVQUFVUCxJQUFWLEVBQWdCO0FBQ3ZCLFFBQUlGLElBQUksQ0FBQ0ssY0FBTCxDQUFvQkgsSUFBcEIsQ0FBSixFQUErQjtBQUMzQixVQUFJUSxXQUFXLEdBQUdWLElBQUksQ0FBQ0UsSUFBRCxDQUF0Qjs7QUFDQSxXQUFLLElBQUlTLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELFdBQVcsQ0FBQ0UsTUFBaEMsRUFBd0NELENBQUMsRUFBekMsRUFBNkM7QUFDekMsWUFBSUwsT0FBTyxHQUFHSSxXQUFXLENBQUNDLENBQUQsQ0FBekI7QUFDQSxZQUFJRSxJQUFJLEdBQUcsRUFBWDs7QUFDQSxhQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdDLFNBQVMsQ0FBQ0gsTUFBOUIsRUFBc0NFLENBQUMsRUFBdkMsRUFBMkM7QUFDdkNELFVBQUFBLElBQUksQ0FBQ0wsSUFBTCxDQUFVTyxTQUFTLENBQUNELENBQUQsQ0FBbkI7QUFDSDs7QUFDRCxZQUFJUixPQUFPLENBQUNDLElBQVosRUFDSUQsT0FBTyxDQUFDQyxJQUFSLENBQWFTLEtBQWIsQ0FBbUJWLE9BQU8sQ0FBQ0YsTUFBM0IsRUFBbUNTLElBQW5DLEVBREosS0FHSUksS0FBSyxDQUFDLDBCQUEwQmYsSUFBM0IsQ0FBTDtBQUVQO0FBQ0o7QUFDSixHQWhCRDs7QUFpQkFILEVBQUFBLEdBQUcsQ0FBQ21CLEdBQUosR0FBVSxVQUFVaEIsSUFBVixFQUFlRSxNQUFmLEVBQXVCO0FBQzdCO0FBQ0EsUUFBSUosSUFBSSxDQUFDSyxjQUFMLENBQW9CSCxJQUFwQixDQUFKLEVBQStCO0FBQzNCLFVBQUlRLFdBQVcsR0FBR1YsSUFBSSxDQUFDRSxJQUFELENBQXRCLENBRDJCLENBRTNCOztBQUNBLFdBQUssSUFBSVMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsV0FBVyxDQUFDRSxNQUFoQyxFQUF3Q0QsQ0FBQyxFQUF6QyxFQUE2QztBQUN6QyxZQUFJTCxPQUFPLEdBQUdJLFdBQVcsQ0FBQ0MsQ0FBRCxDQUF6Qjs7QUFDQSxZQUFHTCxPQUFPLENBQUNGLE1BQVIsS0FBbUJBLE1BQXRCLEVBQTZCO0FBQ3pCO0FBQ0FNLFVBQUFBLFdBQVcsQ0FBQ1MsTUFBWixDQUFtQlIsQ0FBbkIsRUFBcUIsQ0FBckI7QUFDSDtBQUNKO0FBQ0o7QUFDSixHQWJEOztBQWNBLFNBQU9aLEdBQVA7QUFDSCxDQTdDRDs7ZUE4Q2VEIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBFdmVudExpc3RlbnIgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgbGV0IHRoYXQgPSB7fTtcbiAgICBvYmoub24gPSBmdW5jdGlvbiAobmFtZSwgbWV0aG9kLCB0YXJnZXQpIHtcbiAgICAgICAgaWYgKCF0aGF0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICB0aGF0W25hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhbmRsZXIgPSB7fTtcbiAgICAgICAgaGFuZGxlci5mdW5jID0gbWV0aG9kO1xuICAgICAgICBoYW5kbGVyLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgXG4gICAgICAgIHRoYXRbbmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJnbG9iYWwgb24tXCIsbmFtZSwgdGhhdCk7XG4gICAgfTtcbiAgICBvYmouZmlyZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICh0aGF0Lmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBsZXQgaGFuZGxlckxpc3QgPSB0aGF0W25hbWVdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kbGVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gaGFuZGxlckxpc3RbaV07XG4gICAgICAgICAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGFyZ3VtZW50cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuZnVuYylcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5mdW5jLmFwcGx5KGhhbmRsZXIudGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRyYWNlKFwiW1dhcm5dIOayoeacieWvueW6lOeahOWbnuiwg+S6i+S7tuexu+WeiyAtIFwiICsgbmFtZSlcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBvYmoub2ZmID0gZnVuY3Rpb24gKG5hbWUsdGFyZ2V0KSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwidHJ5IHRvIG9mZiBcIisgbmFtZSwgdGhhdClcbiAgICAgICAgaWYgKHRoYXQuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGxldCBoYW5kbGVyTGlzdCA9IHRoYXRbbmFtZV07XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRyeSB0byBvZmYgXCIrIG5hbWUgKyBcImhhdmUgbnVtXCIraGFuZGxlckxpc3QubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGFuZGxlckxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaGFuZGxlciA9IGhhbmRsZXJMaXN0W2ldXG4gICAgICAgICAgICAgICAgaWYoaGFuZGxlci50YXJnZXQgPT09IHRhcmdldCl7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVsZXRlIC1cIiArIHRhcmdldCArIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyTGlzdC5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBvYmo7XG59O1xuZXhwb3J0IGRlZmF1bHQgRXZlbnRMaXN0ZW5yOyJdfQ==
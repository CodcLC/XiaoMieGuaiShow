
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/RankList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0dc77eqhXNCk68n5Q8vi7mz', 'RankList');
// Script/common/RankList.js

"use strict";

module.exports = {
  /**
   * 
   * @param {int} _score 设置游戏分数
   * @param {*} success  成功回调
   * @param {*} fail     失败回调
   * @param {*} complete 完成回调
   */
  setScore: function setScore(_score, success, fail, complete) {
    if (typeof wx != "undefined") {
      // console.log("_score=",_score);
      wx.setUserCloudStorage({
        KVDataList: [{
          key: "score",
          value: _score + ""
        }],
        success: success || null,
        fail: fail || null,
        complete: complete || null
      }); // console.log("set score== end");
    }
  },

  /**
   * 显示好友排行榜
   */
  showFriendList: function showFriendList() {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 1
      });
    }
  },

  /**
   * 显示群排行
   * @param {string} shareTicket 群排行分享许可证
   */
  showGroupList: function showGroupList(shareTicket) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        shareTicket: shareTicket,
        rankType: 0
      });
    }
  },

  /**
   * 游戏结束排行
   */
  showGameResultList: function showGameResultList() {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 2
      });
    }
  },

  /**
   * 检查是否超越好友 并显示
   * @param {int} score 当前分数
   * @param {Number} x  显示位置pos.x
   * @param {Number} y  显示位置pos.y
   */
  checkSurpassFriend: function checkSurpassFriend(score, x, y) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 3,
        score: score,
        x: x || 0,
        y: y || 0
      });
    }
  },
  checkWillSurpass: function checkWillSurpass(score, y) {
    if (typeof wx != "undefined") {
      wx.postMessage({
        rankType: 4,
        score: score,
        y: y || 500
      });
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFJhbmtMaXN0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZXRTY29yZSIsIl9zY29yZSIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsInNldFVzZXJDbG91ZFN0b3JhZ2UiLCJLVkRhdGFMaXN0Iiwia2V5IiwidmFsdWUiLCJzaG93RnJpZW5kTGlzdCIsInBvc3RNZXNzYWdlIiwicmFua1R5cGUiLCJzaG93R3JvdXBMaXN0Iiwic2hhcmVUaWNrZXQiLCJzaG93R2FtZVJlc3VsdExpc3QiLCJjaGVja1N1cnBhc3NGcmllbmQiLCJzY29yZSIsIngiLCJ5IiwiY2hlY2tXaWxsU3VycGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQUEsTUFBTSxDQUFDQyxPQUFQLEdBQWlCO0FBR2I7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSUMsRUFBQUEsUUFWYSxvQkFVSkMsTUFWSSxFQVVJQyxPQVZKLEVBVWFDLElBVmIsRUFVbUJDLFFBVm5CLEVBVTZCO0FBQ3RDLFFBQUksT0FBUUMsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCO0FBQ0FBLE1BQUFBLEVBQUUsQ0FBQ0MsbUJBQUgsQ0FBdUI7QUFDbkJDLFFBQUFBLFVBQVUsRUFBRSxDQUFDO0FBQUVDLFVBQUFBLEdBQUcsRUFBRSxPQUFQO0FBQWdCQyxVQUFBQSxLQUFLLEVBQUVSLE1BQU0sR0FBRztBQUFoQyxTQUFELENBRE87QUFFbkJDLFFBQUFBLE9BQU8sRUFBRUEsT0FBTyxJQUFJLElBRkQ7QUFHbkJDLFFBQUFBLElBQUksRUFBRUEsSUFBSSxJQUFJLElBSEs7QUFJbkJDLFFBQUFBLFFBQVEsRUFBRUEsUUFBUSxJQUFJO0FBSkgsT0FBdkIsRUFGNEIsQ0FRNUI7QUFDSDtBQUNKLEdBckJZOztBQXVCYjtBQUNKO0FBQ0E7QUFDSU0sRUFBQUEsY0ExQmEsNEJBMEJJO0FBQ2IsUUFBSSxPQUFRTCxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ00sV0FBSCxDQUFlO0FBQ1hDLFFBQUFBLFFBQVEsRUFBRTtBQURDLE9BQWY7QUFHSDtBQUNKLEdBaENZOztBQWtDYjtBQUNKO0FBQ0E7QUFDQTtBQUNJQyxFQUFBQSxhQXRDYSx5QkFzQ0NDLFdBdENELEVBc0NjO0FBQ3ZCLFFBQUksT0FBUVQsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCQSxNQUFBQSxFQUFFLENBQUNNLFdBQUgsQ0FBZTtBQUNYRyxRQUFBQSxXQUFXLEVBQUVBLFdBREY7QUFFWEYsUUFBQUEsUUFBUSxFQUFFO0FBRkMsT0FBZjtBQUlIO0FBQ0osR0E3Q1k7O0FBK0NiO0FBQ0o7QUFDQTtBQUNJRyxFQUFBQSxrQkFsRGEsZ0NBa0RRO0FBQ2pCLFFBQUksT0FBUVYsRUFBUixJQUFlLFdBQW5CLEVBQWdDO0FBQzVCQSxNQUFBQSxFQUFFLENBQUNNLFdBQUgsQ0FBZTtBQUNYQyxRQUFBQSxRQUFRLEVBQUU7QUFEQyxPQUFmO0FBR0g7QUFDSixHQXhEWTs7QUEwRGI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lJLEVBQUFBLGtCQWhFYSw4QkFnRU1DLEtBaEVOLEVBZ0VhQyxDQWhFYixFQWdFZ0JDLENBaEVoQixFQWdFbUI7QUFDNUIsUUFBSSxPQUFRZCxFQUFSLElBQWUsV0FBbkIsRUFBZ0M7QUFDNUJBLE1BQUFBLEVBQUUsQ0FBQ00sV0FBSCxDQUFlO0FBQ1hDLFFBQUFBLFFBQVEsRUFBRSxDQURDO0FBRVhLLFFBQUFBLEtBQUssRUFBRUEsS0FGSTtBQUdYQyxRQUFBQSxDQUFDLEVBQUVBLENBQUMsSUFBSSxDQUhHO0FBSVhDLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxJQUFJO0FBSkcsT0FBZjtBQU1IO0FBQ0osR0F6RVk7QUE0RWJDLEVBQUFBLGdCQTVFYSw0QkE0RUlILEtBNUVKLEVBNEVXRSxDQTVFWCxFQTRFYztBQUN2QixRQUFJLE9BQVFkLEVBQVIsSUFBZSxXQUFuQixFQUFnQztBQUM1QkEsTUFBQUEsRUFBRSxDQUFDTSxXQUFILENBQWU7QUFDWEMsUUFBQUEsUUFBUSxFQUFFLENBREM7QUFFWEssUUFBQUEsS0FBSyxFQUFFQSxLQUZJO0FBR1hFLFFBQUFBLENBQUMsRUFBRUEsQ0FBQyxJQUFJO0FBSEcsT0FBZjtBQUtIO0FBQ0o7QUFwRlksQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtpbnR9IF9zY29yZSDorr7nva7muLjmiI/liIbmlbBcbiAgICAgKiBAcGFyYW0geyp9IHN1Y2Nlc3MgIOaIkOWKn+Wbnuiwg1xuICAgICAqIEBwYXJhbSB7Kn0gZmFpbCAgICAg5aSx6LSl5Zue6LCDXG4gICAgICogQHBhcmFtIHsqfSBjb21wbGV0ZSDlrozmiJDlm57osINcbiAgICAgKi9cbiAgICBzZXRTY29yZShfc2NvcmUsIHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIl9zY29yZT1cIixfc2NvcmUpO1xuICAgICAgICAgICAgd3guc2V0VXNlckNsb3VkU3RvcmFnZSh7XG4gICAgICAgICAgICAgICAgS1ZEYXRhTGlzdDogW3sga2V5OiBcInNjb3JlXCIsIHZhbHVlOiBfc2NvcmUgKyBcIlwiIH1dLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHN1Y2Nlc3MgfHwgbnVsbCxcbiAgICAgICAgICAgICAgICBmYWlsOiBmYWlsIHx8IG51bGwsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlIHx8IG51bGwsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic2V0IHNjb3JlPT0gZW5kXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOaYvuekuuWlveWPi+aOkuihjOamnFxuICAgICAqL1xuICAgIHNob3dGcmllbmRMaXN0KCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAxLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmmL7npLrnvqTmjpLooYxcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2hhcmVUaWNrZXQg576k5o6S6KGM5YiG5Lqr6K645Y+v6K+BXG4gICAgICovXG4gICAgc2hvd0dyb3VwTGlzdChzaGFyZVRpY2tldCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHNoYXJlVGlja2V0OiBzaGFyZVRpY2tldCxcbiAgICAgICAgICAgICAgICByYW5rVHlwZTogMCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICog5ri45oiP57uT5p2f5o6S6KGMXG4gICAgICovXG4gICAgc2hvd0dhbWVSZXN1bHRMaXN0KCkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAyLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiDmo4Dmn6XmmK/lkKbotoXotorlpb3lj4sg5bm25pi+56S6XG4gICAgICogQHBhcmFtIHtpbnR9IHNjb3JlIOW9k+WJjeWIhuaVsFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB4ICDmmL7npLrkvY3nva5wb3MueFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB5ICDmmL7npLrkvY3nva5wb3MueVxuICAgICAqL1xuICAgIGNoZWNrU3VycGFzc0ZyaWVuZChzY29yZSwgeCwgeSkge1xuICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgd3gucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIHJhbmtUeXBlOiAzLFxuICAgICAgICAgICAgICAgIHNjb3JlOiBzY29yZSxcbiAgICAgICAgICAgICAgICB4OiB4IHx8IDAsXG4gICAgICAgICAgICAgICAgeTogeSB8fCAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cblxuICAgIGNoZWNrV2lsbFN1cnBhc3Moc2NvcmUsIHkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiAod3gpICE9IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHd4LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICByYW5rVHlwZTogNCxcbiAgICAgICAgICAgICAgICBzY29yZTogc2NvcmUsXG4gICAgICAgICAgICAgICAgeTogeSB8fCA1MDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==
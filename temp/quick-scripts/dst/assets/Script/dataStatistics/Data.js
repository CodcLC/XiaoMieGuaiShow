
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/dataStatistics/Data.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b846fNhcCFFZrE+CJj/eqje', 'Data');
// Script/dataStatistics/Data.js

"use strict";

var netErrorToast = function netErrorToast() {
  wx.showToast({
    title: "联网超时",
    icon: "none",
    image: "",
    duration: 0
  });
  setTimeout(function () {
    return wx.hideToast();
  }, 2000);
}; //被动转发（点击右上角转发菜单） 请勿重复注册回调事件，如不需要转发，请调用wx.hideShareMenu();


module.exports = {
  //onShow时调用 上报统计数据 
  onShow: function onShow(info, _success, _fail) {// dataStatistics.onShowInfo(info, _success, _fail);
  },
  //onHide时调用 上报统计数据
  onHide: function onHide() {// dataStatistics.onHideInfo();
  },

  /**
   * 主动转发
   * @param {EChannelPrefix} channelPrefix    分享渠道
   * @param {string} query                     onShow参数列表
   * @param {Function} netError               联网失败回调方法
   * @param {Function} success                分享成功回调 
   * @param {Function} fail                   分享失败回调 
   * @param {Function} complete               分享完成回调
   */
  share: function share(channelPrefix, query, netError, success, fail, complete, titlePrefix) {// dataStatistics.getShareInfo(channelPrefix, (res) => {
    //     console.log("获取分享数据成功：", res);
    //     dataStatistics.shareAppMsg({
    //         title: (titlePrefix || "") + res.data.data.title,
    //         imageUrl: res.data.data.image,
    //         query: query || "",
    //         success: (res) => {
    //             dataStatistics.shareSuccess(EChannelPrefix.invitation);
    //             if (success)
    //                 success(res);
    //         },
    //         fail: fail || null,
    //         complete: complete || null
    //     });
    // }, () => {
    //     netErrorToast();
    //     if (netError)
    //         netError();
    // });
  },
  //分享成绩
  shareScore: function shareScore(score, query, netError, success, fail, complete) {// this.share(EChannelPrefix.result, query, netError, success, fail, complete, "我的分数：" + score);
  },
  setData: function setData(value, success, fail) {// dataStatistics.setKVUserData(value, res => {
    //     //console.log("========保存数据成功：",res);
    //     if (success)
    //         success(res);
    // }, res => {
    //     console.log("========保存数据失败：", res);
    //     if (fail)
    //         fail(res);
    // });
  },
  getData: function getData(success, fail) {// dataStatistics.getKVUserData(res => {
    //     //console.log("========获取数据成功：",res);
    //     if (success)
    //         success(res);
    // }, err => {
    //     console.log("========获取数据失败：", err);
    //     if (fail)
    //         fail(err);
    // });
  },
  getGameConfigByAppkey: function getGameConfigByAppkey(_success, _fail) {// dataStatistics.getGameConfigByAppkey(_success, _fail);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxkYXRhU3RhdGlzdGljc1xcRGF0YS5qcyJdLCJuYW1lcyI6WyJuZXRFcnJvclRvYXN0Iiwid3giLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJpbWFnZSIsImR1cmF0aW9uIiwic2V0VGltZW91dCIsImhpZGVUb2FzdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJvblNob3ciLCJpbmZvIiwiX3N1Y2Nlc3MiLCJfZmFpbCIsIm9uSGlkZSIsInNoYXJlIiwiY2hhbm5lbFByZWZpeCIsInF1ZXJ5IiwibmV0RXJyb3IiLCJzdWNjZXNzIiwiZmFpbCIsImNvbXBsZXRlIiwidGl0bGVQcmVmaXgiLCJzaGFyZVNjb3JlIiwic2NvcmUiLCJzZXREYXRhIiwidmFsdWUiLCJnZXREYXRhIiwiZ2V0R2FtZUNvbmZpZ0J5QXBwa2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsR0FBTTtBQUN0QkMsRUFBQUEsRUFBRSxDQUFDQyxTQUFILENBQWE7QUFDVEMsSUFBQUEsS0FBSyxFQUFFLE1BREU7QUFFVEMsSUFBQUEsSUFBSSxFQUFFLE1BRkc7QUFHVEMsSUFBQUEsS0FBSyxFQUFFLEVBSEU7QUFJVEMsSUFBQUEsUUFBUSxFQUFFO0FBSkQsR0FBYjtBQU1BQyxFQUFBQSxVQUFVLENBQUM7QUFBQSxXQUFNTixFQUFFLENBQUNPLFNBQUgsRUFBTjtBQUFBLEdBQUQsRUFBdUIsSUFBdkIsQ0FBVjtBQUNILENBUkQsRUFVQTs7O0FBR0FDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjtBQUViO0FBQ0FDLEVBQUFBLE1BSGEsa0JBR05DLElBSE0sRUFHQUMsUUFIQSxFQUdVQyxLQUhWLEVBR2lCLENBQzFCO0FBQ0gsR0FMWTtBQU9iO0FBQ0FDLEVBQUFBLE1BUmEsb0JBUUosQ0FDTDtBQUNILEdBVlk7O0FBWWI7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lDLEVBQUFBLEtBckJhLGlCQXFCUEMsYUFyQk8sRUFxQlFDLEtBckJSLEVBcUJlQyxRQXJCZixFQXFCeUJDLE9BckJ6QixFQXFCa0NDLElBckJsQyxFQXFCd0NDLFFBckJ4QyxFQXFCa0RDLFdBckJsRCxFQXFCK0QsQ0FDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDSCxHQXpDWTtBQTJDYjtBQUNBQyxFQUFBQSxVQTVDYSxzQkE0Q0ZDLEtBNUNFLEVBNENLUCxLQTVDTCxFQTRDWUMsUUE1Q1osRUE0Q3NCQyxPQTVDdEIsRUE0QytCQyxJQTVDL0IsRUE0Q3FDQyxRQTVDckMsRUE0QytDLENBQ3hEO0FBQ0gsR0E5Q1k7QUFnRGJJLEVBQUFBLE9BaERhLG1CQWdETEMsS0FoREssRUFnREVQLE9BaERGLEVBZ0RXQyxJQWhEWCxFQWdEaUIsQ0FDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0gsR0ExRFk7QUE0RGJPLEVBQUFBLE9BNURhLG1CQTRETFIsT0E1REssRUE0RElDLElBNURKLEVBNERVLENBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNILEdBdEVZO0FBd0ViUSxFQUFBQSxxQkF4RWEsaUNBd0VTaEIsUUF4RVQsRUF3RW1CQyxLQXhFbkIsRUF3RTBCLENBQ25DO0FBQ0g7QUExRVksQ0FBakIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5sZXQgbmV0RXJyb3JUb2FzdCA9ICgpID0+IHtcbiAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICB0aXRsZTogXCLogZTnvZHotoXml7ZcIixcbiAgICAgICAgaWNvbjogXCJub25lXCIsXG4gICAgICAgIGltYWdlOiBcIlwiLFxuICAgICAgICBkdXJhdGlvbjogMCxcbiAgICB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHd4LmhpZGVUb2FzdCgpLCAyMDAwKTtcbn07XG5cbi8v6KKr5Yqo6L2s5Y+R77yI54K55Ye75Y+z5LiK6KeS6L2s5Y+R6I+c5Y2V77yJIOivt+WLv+mHjeWkjeazqOWGjOWbnuiwg+S6i+S7tu+8jOWmguS4jemcgOimgei9rOWPke+8jOivt+iwg+eUqHd4LmhpZGVTaGFyZU1lbnUoKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8vb25TaG935pe26LCD55SoIOS4iuaKpee7n+iuoeaVsOaNriBcbiAgICBvblNob3coaW5mbywgX3N1Y2Nlc3MsIF9mYWlsKSB7XG4gICAgICAgIC8vIGRhdGFTdGF0aXN0aWNzLm9uU2hvd0luZm8oaW5mbywgX3N1Y2Nlc3MsIF9mYWlsKTtcbiAgICB9LFxuXG4gICAgLy9vbkhpZGXml7bosIPnlKgg5LiK5oql57uf6K6h5pWw5o2uXG4gICAgb25IaWRlKCkge1xuICAgICAgICAvLyBkYXRhU3RhdGlzdGljcy5vbkhpZGVJbmZvKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIOS4u+WKqOi9rOWPkVxuICAgICAqIEBwYXJhbSB7RUNoYW5uZWxQcmVmaXh9IGNoYW5uZWxQcmVmaXggICAg5YiG5Lqr5rig6YGTXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5ICAgICAgICAgICAgICAgICAgICAgb25TaG935Y+C5pWw5YiX6KGoXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV0RXJyb3IgICAgICAgICAgICAgICDogZTnvZHlpLHotKXlm57osIPmlrnms5VcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdWNjZXNzICAgICAgICAgICAgICAgIOWIhuS6q+aIkOWKn+WbnuiwgyBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWlsICAgICAgICAgICAgICAgICAgIOWIhuS6q+Wksei0peWbnuiwgyBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjb21wbGV0ZSAgICAgICAgICAgICAgIOWIhuS6q+WujOaIkOWbnuiwg1xuICAgICAqL1xuICAgIHNoYXJlKGNoYW5uZWxQcmVmaXgsIHF1ZXJ5LCBuZXRFcnJvciwgc3VjY2VzcywgZmFpbCwgY29tcGxldGUsIHRpdGxlUHJlZml4KSB7XG4gICAgICAgIC8vIGRhdGFTdGF0aXN0aWNzLmdldFNoYXJlSW5mbyhjaGFubmVsUHJlZml4LCAocmVzKSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIuiOt+WPluWIhuS6q+aVsOaNruaIkOWKn++8mlwiLCByZXMpO1xuICAgICAgICAvLyAgICAgZGF0YVN0YXRpc3RpY3Muc2hhcmVBcHBNc2coe1xuICAgICAgICAvLyAgICAgICAgIHRpdGxlOiAodGl0bGVQcmVmaXggfHwgXCJcIikgKyByZXMuZGF0YS5kYXRhLnRpdGxlLFxuICAgICAgICAvLyAgICAgICAgIGltYWdlVXJsOiByZXMuZGF0YS5kYXRhLmltYWdlLFxuICAgICAgICAvLyAgICAgICAgIHF1ZXJ5OiBxdWVyeSB8fCBcIlwiLFxuICAgICAgICAvLyAgICAgICAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZGF0YVN0YXRpc3RpY3Muc2hhcmVTdWNjZXNzKEVDaGFubmVsUHJlZml4Lmludml0YXRpb24pO1xuICAgICAgICAvLyAgICAgICAgICAgICBpZiAoc3VjY2VzcylcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKTtcbiAgICAgICAgLy8gICAgICAgICB9LFxuICAgICAgICAvLyAgICAgICAgIGZhaWw6IGZhaWwgfHwgbnVsbCxcbiAgICAgICAgLy8gICAgICAgICBjb21wbGV0ZTogY29tcGxldGUgfHwgbnVsbFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0sICgpID0+IHtcbiAgICAgICAgLy8gICAgIG5ldEVycm9yVG9hc3QoKTtcbiAgICAgICAgLy8gICAgIGlmIChuZXRFcnJvcilcbiAgICAgICAgLy8gICAgICAgICBuZXRFcnJvcigpO1xuICAgICAgICAvLyB9KTtcbiAgICB9LFxuXG4gICAgLy/liIbkuqvmiJDnu6lcbiAgICBzaGFyZVNjb3JlKHNjb3JlLCBxdWVyeSwgbmV0RXJyb3IsIHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlKSB7XG4gICAgICAgIC8vIHRoaXMuc2hhcmUoRUNoYW5uZWxQcmVmaXgucmVzdWx0LCBxdWVyeSwgbmV0RXJyb3IsIHN1Y2Nlc3MsIGZhaWwsIGNvbXBsZXRlLCBcIuaIkeeahOWIhuaVsO+8mlwiICsgc2NvcmUpO1xuICAgIH0sXG5cbiAgICBzZXREYXRhKHZhbHVlLCBzdWNjZXNzLCBmYWlsKSB7XG4gICAgICAgIC8vIGRhdGFTdGF0aXN0aWNzLnNldEtWVXNlckRhdGEodmFsdWUsIHJlcyA9PiB7XG4gICAgICAgIC8vICAgICAvL2NvbnNvbGUubG9nKFwiPT09PT09PT3kv53lrZjmlbDmja7miJDlip/vvJpcIixyZXMpO1xuICAgICAgICAvLyAgICAgaWYgKHN1Y2Nlc3MpXG4gICAgICAgIC8vICAgICAgICAgc3VjY2VzcyhyZXMpO1xuICAgICAgICAvLyB9LCByZXMgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCI9PT09PT09PeS/neWtmOaVsOaNruWksei0pe+8mlwiLCByZXMpO1xuICAgICAgICAvLyAgICAgaWYgKGZhaWwpXG4gICAgICAgIC8vICAgICAgICAgZmFpbChyZXMpO1xuICAgICAgICAvLyB9KTtcbiAgICB9LFxuXG4gICAgZ2V0RGF0YShzdWNjZXNzLCBmYWlsKSB7XG4gICAgICAgIC8vIGRhdGFTdGF0aXN0aWNzLmdldEtWVXNlckRhdGEocmVzID0+IHtcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coXCI9PT09PT09PeiOt+WPluaVsOaNruaIkOWKn++8mlwiLHJlcyk7XG4gICAgICAgIC8vICAgICBpZiAoc3VjY2VzcylcbiAgICAgICAgLy8gICAgICAgICBzdWNjZXNzKHJlcyk7XG4gICAgICAgIC8vIH0sIGVyciA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIj09PT09PT096I635Y+W5pWw5o2u5aSx6LSl77yaXCIsIGVycik7XG4gICAgICAgIC8vICAgICBpZiAoZmFpbClcbiAgICAgICAgLy8gICAgICAgICBmYWlsKGVycik7XG4gICAgICAgIC8vIH0pO1xuICAgIH0sXG5cbiAgICBnZXRHYW1lQ29uZmlnQnlBcHBrZXkoX3N1Y2Nlc3MsIF9mYWlsKSB7XG4gICAgICAgIC8vIGRhdGFTdGF0aXN0aWNzLmdldEdhbWVDb25maWdCeUFwcGtleShfc3VjY2VzcywgX2ZhaWwpO1xuICAgIH0sXG59Il19
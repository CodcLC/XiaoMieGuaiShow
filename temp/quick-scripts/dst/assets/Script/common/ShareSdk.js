
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/ShareSdk.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7d3cacY8olAOYvE5ne5QRwi', 'ShareSdk');
// Script/common/ShareSdk.js

"use strict";

var _Data = _interopRequireDefault(require("../dataStatistics/Data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isWeChat = cc.sys.platform == cc.sys.WECHAT_GAME;
var ShareSdk = {
  /**
   * desc:    设置设置页面是否显示分享按钮
   * param:   boo- true or false
   *          withShareTicket-是否使用带 shareTicket 的转发
   */
  setShareMenuEnabled: function setShareMenuEnabled(boo, withShareTicket) {
    if (isWeChat) {
      var withShare = withShareTicket ? true : false;

      if (boo) {
        wx.showShareMenu({
          withShareTicket: withShare
        });
      } else {
        wx.hideShareMenu({});
      }
    } else {// console.log("it's not wechat platform. setShareMenuEnabled faied!");
    }
  },

  /**
   * desc:    开启监听设置页面分享按钮
   * param:   
      * ShareOption-分享监听参数对象
      *  title		转发标题，不传则默认使用当前小游戏的昵称。	
      *   imageUrl	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。	
      *   query		查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。	
      *   success		转发成功的回调函数	
      *   fail		转发失败的回调函数	
      *   complete	转发完成的回调函数
   */
  onShareAppMessage: function onShareAppMessage(object) {
    if (isWeChat) {
      wx.onShareAppMessage(object);
    } else {// console.log("it's not wechat platform. onShareAppMessage faied!");
    }
  },

  /**
   * desc:    转发分享
   * param:   
      * ShareOption-分享监听参数对象
      *  title		转发标题，不传则默认使用当前小游戏的昵称。	
      *   imageUrl	转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。	
      *   query		查询字符串，必须是 key1=val1&key2=val2 的格式。从这条转发消息进入后，可通过 wx.onLaunch() 或 wx.onShow 获取启动参数中的 query。	
      *   success(res)		转发成功的回调函数	res.shareTickets[0]成功转发参数
      *   fail		转发失败的回调函数	
      *   complete	转发完成的回调函数
   */
  shareAppMessage: function shareAppMessage(object) {
    if (isWeChat) {
      if (typeof object != "object") {
        console.log("param 'object' is not a js object ");
        return;
      }

      if (typeof object.title == "undefined") {
        console.log("param 'object' property title is undefined!");
        return;
      } // wx.showShareMenu({
      //     withShareTicket: true,
      // });


      wx.shareAppMessage(object);
    } else {// console.log("it's not wechat platform. onShareAppMessage faied!");
    }
  },

  /**
   * desc：   接入复活分享界面--需要配置参数config.js window.RELIVE_COST_PIC_PATH
   * param：  prefabs-复活界面预制体 object-回调参数对象{shareObj:{}, onSkipCallBack:function, onCostRelive:function, score: string, cost_num:number}
   *          parentNode-复活分享界面的父节点，空则以场景画布为父节点
   * @param onCostRelive 需要有返回值是否成功复活
   */
  openReliveView: function openReliveView(prefabs, obj, parentNode) {
    var node = cc.instantiate(prefabs);

    if (parentNode != null && cc.isValid(parentNode)) {
      node.parent = parentNode;
    } else {
      parentNode = cc.find("Canvas");
      node.parent = parentNode;
    }

    var compon = node.getComponent("ReliveViewCtrl");
    compon.setCallBackObj(obj);

    if (obj.cost_num) {
      compon.setCostNumLabel(obj.cost_num);
    }

    compon.setScoreLabel(obj.score);
    compon.ShowView(true); // compon.CountDownClick(10);
  },

  /**
   * desc：   分享成绩
   * param：  score-成绩   title-分享的文案   url-分享的图片路径
   * example: shareScoreMessage(10, "haha", "");
   */
  shareScoreMessage: function shareScoreMessage(score, title, url) {
    if (isWeChat) {
      // var shareCanvas = wx.createCanvas();
      // shareCanvas.width = 668;
      // shareCanvas.height = 501;
      // var context = shareCanvas.getContext('2d');
      // context.font = "bold 200px Verdana"; //粗体字
      // context.fillStyle = "Black";
      // context.textAlign = "center";
      // context.clearRect(0, 0, shareCanvas.width, shareCanvas.height);
      var self = this;
      var scoreNum = score + ""; // var shareImg = wx.createImage();
      // shareImg.src = cc.url.raw(url);

      var shareTitle = title ? title : "本局得了" + scoreNum + "分，没有办法，我就是这么强大！"; // shareImg.onload = function () {
      // context.drawImage(shareImg, 0, 0, shareCanvas.width, shareCanvas.height);
      // let timeid = setTimeout(() => {
      // let path = shareCanvas.toTempFilePathSysc();

      wx.shareAppMessage({
        title: shareTitle,
        imageUrl: cc.url.raw(url)
      }); // clearTimeout(timeid);
      // }, 0.2);
      // };
    } else {// console.log("it's not wechat platform. shareScoreMessage faied!");
      }
  },

  /**
   * desc: 添加二维码更多游戏界面
   * param： prefabs-二维码更多游戏界面预制体 parentNode-父节点，默认画布节点 x,y坐标
   */
  addRqCodeView: function addRqCodeView(prefabs, parentNode, x, y) {
    if (true || isWeChat) {
      var posx = x ? x : 0;
      var posy = y ? y : 0;
      var node = cc.instantiate(prefabs);

      if (parentNode != null && cc.isValid(parentNode)) {
        node.parent = parentNode;
      } else {
        parentNode = cc.find("Canvas");
        node.parent = parentNode;
      }

      node.setPosition(posx, posy);
    } else {// console.log("it's not wechat platform. addRqCodeView faied!");
    }

    ;
  },

  /**
   * desc:    显示最近排行榜信息
   * param:   parentNode-父节点  ranktype-排行榜类型, object-回调对象
   *  
   */
  showFriendRankView: function showFriendRankView(parentNode, ranktype, object) {},

  /**
   * 
   * @param parentNode {*父节点}
   * @param ranktype {*群排行榜类型，默认1，暂时只有1}
   * @param object {*回调对象} 
   */
  showGroupRankView: function showGroupRankView(parentNode, ranktype, object) {}
};
module.exports = ShareSdk;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXFNoYXJlU2RrLmpzIl0sIm5hbWVzIjpbImlzV2VDaGF0IiwiY2MiLCJzeXMiLCJwbGF0Zm9ybSIsIldFQ0hBVF9HQU1FIiwiU2hhcmVTZGsiLCJzZXRTaGFyZU1lbnVFbmFibGVkIiwiYm9vIiwid2l0aFNoYXJlVGlja2V0Iiwid2l0aFNoYXJlIiwid3giLCJzaG93U2hhcmVNZW51IiwiaGlkZVNoYXJlTWVudSIsIm9uU2hhcmVBcHBNZXNzYWdlIiwib2JqZWN0Iiwic2hhcmVBcHBNZXNzYWdlIiwiY29uc29sZSIsImxvZyIsInRpdGxlIiwib3BlblJlbGl2ZVZpZXciLCJwcmVmYWJzIiwib2JqIiwicGFyZW50Tm9kZSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsImlzVmFsaWQiLCJwYXJlbnQiLCJmaW5kIiwiY29tcG9uIiwiZ2V0Q29tcG9uZW50Iiwic2V0Q2FsbEJhY2tPYmoiLCJjb3N0X251bSIsInNldENvc3ROdW1MYWJlbCIsInNldFNjb3JlTGFiZWwiLCJzY29yZSIsIlNob3dWaWV3Iiwic2hhcmVTY29yZU1lc3NhZ2UiLCJ1cmwiLCJzZWxmIiwic2NvcmVOdW0iLCJzaGFyZVRpdGxlIiwiaW1hZ2VVcmwiLCJyYXciLCJhZGRScUNvZGVWaWV3IiwieCIsInkiLCJwb3N4IiwicG9zeSIsInNldFBvc2l0aW9uIiwic2hvd0ZyaWVuZFJhbmtWaWV3IiwicmFua3R5cGUiLCJzaG93R3JvdXBSYW5rVmlldyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQSxJQUFJQSxRQUFRLEdBQUlDLEVBQUUsQ0FBQ0MsR0FBSCxDQUFPQyxRQUFQLElBQW1CRixFQUFFLENBQUNDLEdBQUgsQ0FBT0UsV0FBMUM7QUFDQSxJQUFJQyxRQUFRLEdBQUc7QUFFWDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBRUlDLEVBQUFBLG1CQVJXLCtCQVFTQyxHQVJULEVBUWNDLGVBUmQs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QTtBQUNKLEdBcEpVOztBQXNKWDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0lFLEVBQUFBLGtCQTNKVyw4QkEySlEzQixVQTNKUixFQTJKb0I0QixRQTNKcEIsRUEySjhCcEMsTUEzSjlCLEVBMkpzQyxDQUVoRCxDQTdKVTs7QUErSlg7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0lxQyxFQUFBQSxpQkFyS1csNkJBcUtPN0IsVUFyS1AsRUFxS21CNEIsUUFyS25CLEVBcUs2QnBDLE1Bcks3QixFQXFLcUMsQ0FFL0M7QUF2S1UsQ0FBZjtBQTBLQXNDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQmhELFFBQWpCIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF0YSBmcm9tIFwiLi4vZGF0YVN0YXRpc3RpY3MvRGF0YVwiO1xubGV0IGlzV2VDaGF0ID0gKGNjLnN5cy5wbGF0Zm9ybSA9PSBjYy5zeXMuV0VDSEFUX0dBTUUpO1xudmFyIFNoYXJlU2RrID0ge1xuXG4gICAgLyoqXG4gICAgICogZGVzYzogICAg6K6+572u6K6+572u6aG16Z2i5piv5ZCm5pi+56S65YiG5Lqr5oyJ6ZKuXG4gICAgICogcGFyYW06ICAgYm9vLSB0cnVlIG9yIGZhbHNlXG4gICAgICogICAgICAgICAgd2l0aFNoYXJlVGlja2V0LeaYr+WQpuS9v+eUqOW4piBzaGFyZVRpY2tldCDnmoTovazlj5FcbiAgICAgKi9cblxuICAgIHNldFNoYXJlTWVudUVuYWJsZWQoYm9vLCB3aXRoU2hhcmVUaWNrZXQpIHtcbiAgICAgICAgaWYgKGlzV2VDaGF0KSB7XG4gICAgICAgICAgICBsZXQgd2l0aFNoYXJlID0gd2l0aFNoYXJlVGlja2V0ID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGJvbykge1xuICAgICAgICAgICAgICAgIHd4LnNob3dTaGFyZU1lbnUoe1xuICAgICAgICAgICAgICAgICAgICB3aXRoU2hhcmVUaWNrZXQ6IHdpdGhTaGFyZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHd4LmhpZGVTaGFyZU1lbnUoe1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIHNldFNoYXJlTWVudUVuYWJsZWQgZmFpZWQhXCIpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGRlc2M6ICAgIOW8gOWQr+ebkeWQrOiuvue9rumhtemdouWIhuS6q+aMiemSrlxuICAgICAqIHBhcmFtOiAgIFxuICAgICAgICAqIFNoYXJlT3B0aW9uLeWIhuS6q+ebkeWQrOWPguaVsOWvueixoVxuICAgICAgICAqICB0aXRsZVx0XHTovazlj5HmoIfpopjvvIzkuI3kvKDliJnpu5jorqTkvb/nlKjlvZPliY3lsI/muLjmiI/nmoTmmLXnp7DjgIJcdFxuICAgICAgICAqICAgaW1hZ2VVcmxcdOi9rOWPkeaYvuekuuWbvueJh+eahOmTvuaOpe+8jOWPr+S7peaYr+e9kee7nOWbvueJh+i3r+W+hOaIluacrOWcsOWbvueJh+aWh+S7tui3r+W+hOaIluebuOWvueS7o+eggeWMheagueebruW9leeahOWbvueJh+aWh+S7tui3r+W+hOOAglx0XG4gICAgICAgICogICBxdWVyeVx0XHTmn6Xor6LlrZfnrKbkuLLvvIzlv4XpobvmmK8ga2V5MT12YWwxJmtleTI9dmFsMiDnmoTmoLzlvI/jgILku47ov5nmnaHovazlj5Hmtojmga/ov5vlhaXlkI7vvIzlj6/pgJrov4cgd3gub25MYXVuY2goKSDmiJYgd3gub25TaG93IOiOt+WPluWQr+WKqOWPguaVsOS4reeahCBxdWVyeeOAglx0XG4gICAgICAgICogICBzdWNjZXNzXHRcdOi9rOWPkeaIkOWKn+eahOWbnuiwg+WHveaVsFx0XG4gICAgICAgICogICBmYWlsXHRcdOi9rOWPkeWksei0peeahOWbnuiwg+WHveaVsFx0XG4gICAgICAgICogICBjb21wbGV0ZVx06L2s5Y+R5a6M5oiQ55qE5Zue6LCD5Ye95pWwXG4gICAgICovXG5cbiAgICBvblNoYXJlQXBwTWVzc2FnZShvYmplY3QpIHtcbiAgICAgICAgaWYgKGlzV2VDaGF0KSB7XG4gICAgICAgICAgICB3eC5vblNoYXJlQXBwTWVzc2FnZShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIG9uU2hhcmVBcHBNZXNzYWdlIGZhaWVkIVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNjOiAgICDovazlj5HliIbkuqtcbiAgICAgKiBwYXJhbTogICBcbiAgICAgICAgKiBTaGFyZU9wdGlvbi3liIbkuqvnm5HlkKzlj4LmlbDlr7nosaFcbiAgICAgICAgKiAgdGl0bGVcdFx06L2s5Y+R5qCH6aKY77yM5LiN5Lyg5YiZ6buY6K6k5L2/55So5b2T5YmN5bCP5ri45oiP55qE5pi156ew44CCXHRcbiAgICAgICAgKiAgIGltYWdlVXJsXHTovazlj5HmmL7npLrlm77niYfnmoTpk77mjqXvvIzlj6/ku6XmmK/nvZHnu5zlm77niYfot6/lvoTmiJbmnKzlnLDlm77niYfmlofku7bot6/lvoTmiJbnm7jlr7nku6PnoIHljIXmoLnnm67lvZXnmoTlm77niYfmlofku7bot6/lvoTjgIJcdFxuICAgICAgICAqICAgcXVlcnlcdFx05p+l6K+i5a2X56ym5Liy77yM5b+F6aG75pivIGtleTE9dmFsMSZrZXkyPXZhbDIg55qE5qC85byP44CC5LuO6L+Z5p2h6L2s5Y+R5raI5oGv6L+b5YWl5ZCO77yM5Y+v6YCa6L+HIHd4Lm9uTGF1bmNoKCkg5oiWIHd4Lm9uU2hvdyDojrflj5blkK/liqjlj4LmlbDkuK3nmoQgcXVlcnnjgIJcdFxuICAgICAgICAqICAgc3VjY2VzcyhyZXMpXHRcdOi9rOWPkeaIkOWKn+eahOWbnuiwg+WHveaVsFx0cmVzLnNoYXJlVGlja2V0c1swXeaIkOWKn+i9rOWPkeWPguaVsFxuICAgICAgICAqICAgZmFpbFx0XHTovazlj5HlpLHotKXnmoTlm57osIPlh73mlbBcdFxuICAgICAgICAqICAgY29tcGxldGVcdOi9rOWPkeWujOaIkOeahOWbnuiwg+WHveaVsFxuICAgICAqL1xuXG4gICAgc2hhcmVBcHBNZXNzYWdlKG9iamVjdCkge1xuICAgICAgICBpZiAoaXNXZUNoYXQpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG9iamVjdCkgIT0gXCJvYmplY3RcIikgeyBjb25zb2xlLmxvZyhcInBhcmFtICdvYmplY3QnIGlzIG5vdCBhIGpzIG9iamVjdCBcIik7IHJldHVybjsgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiAob2JqZWN0LnRpdGxlKSA9PSBcInVuZGVmaW5lZFwiKSB7IGNvbnNvbGUubG9nKFwicGFyYW0gJ29iamVjdCcgcHJvcGVydHkgdGl0bGUgaXMgdW5kZWZpbmVkIVwiKTsgcmV0dXJuOyB9XG4gICAgICAgICAgICAvLyB3eC5zaG93U2hhcmVNZW51KHtcbiAgICAgICAgICAgIC8vICAgICB3aXRoU2hhcmVUaWNrZXQ6IHRydWUsXG4gICAgICAgICAgICAvLyB9KTtcbiAgICAgICAgICAgIHd4LnNoYXJlQXBwTWVzc2FnZShvYmplY3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIG9uU2hhcmVBcHBNZXNzYWdlIGZhaWVkIVwiKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNj77yaICAg5o6l5YWl5aSN5rS75YiG5Lqr55WM6Z2iLS3pnIDopoHphY3nva7lj4LmlbBjb25maWcuanMgd2luZG93LlJFTElWRV9DT1NUX1BJQ19QQVRIXG4gICAgICogcGFyYW3vvJogIHByZWZhYnMt5aSN5rS755WM6Z2i6aKE5Yi25L2TIG9iamVjdC3lm57osIPlj4LmlbDlr7nosaF7c2hhcmVPYmo6e30sIG9uU2tpcENhbGxCYWNrOmZ1bmN0aW9uLCBvbkNvc3RSZWxpdmU6ZnVuY3Rpb24sIHNjb3JlOiBzdHJpbmcsIGNvc3RfbnVtOm51bWJlcn1cbiAgICAgKiAgICAgICAgICBwYXJlbnROb2RlLeWkjea0u+WIhuS6q+eVjOmdoueahOeItuiKgueCue+8jOepuuWImeS7peWcuuaZr+eUu+W4g+S4uueItuiKgueCuVxuICAgICAqIEBwYXJhbSBvbkNvc3RSZWxpdmUg6ZyA6KaB5pyJ6L+U5Zue5YC85piv5ZCm5oiQ5Yqf5aSN5rS7XG4gICAgICovXG4gICAgb3BlblJlbGl2ZVZpZXcocHJlZmFicywgb2JqLCBwYXJlbnROb2RlKSB7XG4gICAgICAgIHZhciBub2RlID0gY2MuaW5zdGFudGlhdGUocHJlZmFicyk7XG4gICAgICAgIGlmIChwYXJlbnROb2RlICE9IG51bGwgJiYgY2MuaXNWYWxpZChwYXJlbnROb2RlKSkge1xuICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IGNjLmZpbmQoXCJDYW52YXNcIik7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbXBvbiA9IG5vZGUuZ2V0Q29tcG9uZW50KFwiUmVsaXZlVmlld0N0cmxcIik7XG4gICAgICAgIGNvbXBvbi5zZXRDYWxsQmFja09iaihvYmopO1xuICAgICAgICBpZiAob2JqLmNvc3RfbnVtKSB7XG4gICAgICAgICAgICBjb21wb24uc2V0Q29zdE51bUxhYmVsKG9iai5jb3N0X251bSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uLnNldFNjb3JlTGFiZWwob2JqLnNjb3JlKTtcbiAgICAgICAgY29tcG9uLlNob3dWaWV3KHRydWUpO1xuICAgICAgICAvLyBjb21wb24uQ291bnREb3duQ2xpY2soMTApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNj77yaICAg5YiG5Lqr5oiQ57upXG4gICAgICogcGFyYW3vvJogIHNjb3JlLeaIkOe7qSAgIHRpdGxlLeWIhuS6q+eahOaWh+ahiCAgIHVybC3liIbkuqvnmoTlm77niYfot6/lvoRcbiAgICAgKiBleGFtcGxlOiBzaGFyZVNjb3JlTWVzc2FnZSgxMCwgXCJoYWhhXCIsIFwiXCIpO1xuICAgICAqL1xuICAgIHNoYXJlU2NvcmVNZXNzYWdlKHNjb3JlLCB0aXRsZSwgdXJsKSB7XG4gICAgICAgIGlmIChpc1dlQ2hhdCkge1xuICAgICAgICAgICAgLy8gdmFyIHNoYXJlQ2FudmFzID0gd3guY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgICAgICAvLyBzaGFyZUNhbnZhcy53aWR0aCA9IDY2ODtcbiAgICAgICAgICAgIC8vIHNoYXJlQ2FudmFzLmhlaWdodCA9IDUwMTtcbiAgICAgICAgICAgIC8vIHZhciBjb250ZXh0ID0gc2hhcmVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuZm9udCA9IFwiYm9sZCAyMDBweCBWZXJkYW5hXCI7IC8v57KX5L2T5a2XXG4gICAgICAgICAgICAvLyBjb250ZXh0LmZpbGxTdHlsZSA9IFwiQmxhY2tcIjtcbiAgICAgICAgICAgIC8vIGNvbnRleHQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHNoYXJlQ2FudmFzLndpZHRoLCBzaGFyZUNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIHNjb3JlTnVtID0gc2NvcmUgKyBcIlwiO1xuICAgICAgICAgICAgLy8gdmFyIHNoYXJlSW1nID0gd3guY3JlYXRlSW1hZ2UoKTtcbiAgICAgICAgICAgIC8vIHNoYXJlSW1nLnNyYyA9IGNjLnVybC5yYXcodXJsKTtcbiAgICAgICAgICAgIHZhciBzaGFyZVRpdGxlID0gdGl0bGUgPyB0aXRsZSA6IFwi5pys5bGA5b6X5LqGXCIgKyBzY29yZU51bSArIFwi5YiG77yM5rKh5pyJ5Yqe5rOV77yM5oiR5bCx5piv6L+Z5LmI5by65aSn77yBXCI7XG4gICAgICAgICAgICAvLyBzaGFyZUltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LmRyYXdJbWFnZShzaGFyZUltZywgMCwgMCwgc2hhcmVDYW52YXMud2lkdGgsIHNoYXJlQ2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgICAvLyBsZXQgdGltZWlkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBsZXQgcGF0aCA9IHNoYXJlQ2FudmFzLnRvVGVtcEZpbGVQYXRoU3lzYygpO1xuICAgICAgICAgICAgd3guc2hhcmVBcHBNZXNzYWdlKHsgdGl0bGU6IHNoYXJlVGl0bGUsIGltYWdlVXJsOiBjYy51cmwucmF3KHVybCksIH0pO1xuICAgICAgICAgICAgLy8gY2xlYXJUaW1lb3V0KHRpbWVpZCk7XG4gICAgICAgICAgICAvLyB9LCAwLjIpO1xuICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaXQncyBub3Qgd2VjaGF0IHBsYXRmb3JtLiBzaGFyZVNjb3JlTWVzc2FnZSBmYWllZCFcIik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogZGVzYzog5re75Yqg5LqM57u056CB5pu05aSa5ri45oiP55WM6Z2iXG4gICAgICogcGFyYW3vvJogcHJlZmFicy3kuoznu7TnoIHmm7TlpJrmuLjmiI/nlYzpnaLpooTliLbkvZMgcGFyZW50Tm9kZS3niLboioLngrnvvIzpu5jorqTnlLvluIPoioLngrkgeCx55Z2Q5qCHXG4gICAgICovXG5cbiAgICBhZGRScUNvZGVWaWV3KHByZWZhYnMsIHBhcmVudE5vZGUsIHgsIHkpIHtcbiAgICAgICAgaWYgKHRydWUgfHwgaXNXZUNoYXQpIHtcbiAgICAgICAgICAgIGxldCBwb3N4ID0geCA/IHggOiAwO1xuICAgICAgICAgICAgbGV0IHBvc3kgPSB5ID8geSA6IDA7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IGNjLmluc3RhbnRpYXRlKHByZWZhYnMpO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUgIT0gbnVsbCAmJiBjYy5pc1ZhbGlkKHBhcmVudE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnQgPSBwYXJlbnROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gY2MuZmluZChcIkNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBub2RlLnBhcmVudCA9IHBhcmVudE5vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHBvc3gsIHBvc3kpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpdCdzIG5vdCB3ZWNoYXQgcGxhdGZvcm0uIGFkZFJxQ29kZVZpZXcgZmFpZWQhXCIpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBkZXNjOiAgICDmmL7npLrmnIDov5HmjpLooYzmppzkv6Hmga9cbiAgICAgKiBwYXJhbTogICBwYXJlbnROb2RlLeeItuiKgueCuSAgcmFua3R5cGUt5o6S6KGM5qac57G75Z6LLCBvYmplY3Qt5Zue6LCD5a+56LGhXG4gICAgICogIFxuICAgICAqL1xuICAgIHNob3dGcmllbmRSYW5rVmlldyhwYXJlbnROb2RlLCByYW5rdHlwZSwgb2JqZWN0KSB7XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHBhcmVudE5vZGUgeyrniLboioLngrl9XG4gICAgICogQHBhcmFtIHJhbmt0eXBlIHsq576k5o6S6KGM5qac57G75Z6L77yM6buY6K6kMe+8jOaaguaXtuWPquaciTF9XG4gICAgICogQHBhcmFtIG9iamVjdCB7KuWbnuiwg+WvueixoX0gXG4gICAgICovXG4gICAgc2hvd0dyb3VwUmFua1ZpZXcocGFyZW50Tm9kZSwgcmFua3R5cGUsIG9iamVjdCkge1xuXG4gICAgfSxcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmVTZGs7XG4iXX0=
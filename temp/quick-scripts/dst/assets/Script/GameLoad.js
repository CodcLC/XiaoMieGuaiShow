
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/GameLoad.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c64f73DiYxHd7e8a+8ulTfg', 'GameLoad');
// Script/GameLoad.js

"use strict";

require("./common/Wxlife");

var ShareSdk = require("ShareSdk");

var Utils = require("Utils");

cc.Class({
  "extends": cc.Component,
  properties: {
    m_n_logo: cc.Node,
    m_loaded: false,
    m_l_text: cc.Label
  },
  start: function start() {
    Utils.setDesignResolution();
    this.m_n_logo.opacity = 0;
    this.m_loaded = false;
    this.m_loaded2 = false;
    var self = this;
    this._loadnum = 0;

    if (typeof wx != 'undefined') {
      wx.cloud.init({
        env: window.ENV,
        traceUser: true,
        success: function success(res) {// console.log("init-", res);
        }
      });
    }

    this.m_n_logo.runAction(cc.sequence(cc.fadeIn(0.2), cc.callFunc(function () {
      self.loadres();
      self.loadconfig();
    }))); // cc.view.enableRetina(true);

    var boo = cc.sys.localStorage.getItem('music');
    var guideboo = cc.sys.localStorage.getItem('guideinfo');
    var change = cc.sys.localStorage.getItem('change');
    console.log('guideboo', guideboo);

    if (boo && boo != 'null') {
      window.MUSIC_SHOW_OFF = parseInt(boo);
    } else {
      window.MUSIC_SHOW_OFF = 1; //默认开启

      cc.sys.localStorage.setItem('music', '' + window.MUSIC_SHOW_OFF);
    }

    if (guideboo && guideboo != 'null') {
      window.GUIDE_LEVEL = 1;
    } else {
      window.GUIDE_LEVEL = 0; // cc.sys.localStorage.setItem('guideinfo', '1');
    }

    if (change && change != 'null') {
      window.CHANGE_BLOCK = 1;
    } else {
      window.CHANGE_BLOCK = 0;
    }

    ShareSdk.setShareMenuEnabled(true, true);
  },
  loadconfig: function loadconfig() {
    var this$1 = this;
    this$1._loadnum++;
    this$1.enterGame(); // let remoteUrl = 'https://gifen-1253495541.cosgz.myqcloud.com/KillMonster/share_config.json';
    // cc.loader.load(remoteUrl, function (err, netobj) {
    //     if (err) {
    //         console.error(err);
    //         this$1._loadnum++;
    //         this$1.enterGame();
    //     } else {
    //         window.BOX_SHARE = netobj.box_share;
    //         window.SKIN_SHARE = netobj.skin_share;
    //         window.MOVEGAME = netobj.moregame;
    //         window.NEWYEAR = netobj.newyear;
    //         console.warn(netobj);
    //     }
    // });
  },
  loadres: function loadres() {
    console.log("load res");
    var self = this;
    window.tempFileURL = [];

    for (var i = 1; i < 4; i++) {
      window.tempFileURL.push("");
    }

    if (typeof wx != 'undefined') {
      // wx.showLoading({
      //     title: "登录中..."
      // });
      // wx.cloud.getTempFileURL({
      //     fileList: ['cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/game_config/level_config2.json',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share1.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_normal.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_result.jpg',
      //         'cloud://killmonster-test-df9a23.603e-killmonster-test-df9a23/share_templates/share_box.jpg'],
      //     success: (res) => {
      //         // console.log(res.fileList[0]);
      //         window.tempFileURL = [];
      //         let data = res.fileList[0];
      //         for (let i = 1; i < res.fileList.length; i++) {
      //             window.tempFileURL.push(res.fileList[i].tempFileURL);
      //         }
      //         if (data.status == 0) {
      //             cc.loader.load(data.tempFileURL, function (err, netobj) {
      //                 if (err) {
      //                     cc.loader.loadRes('level_config2', function (err, obj) {
      //                         if (err) {
      //                             cc.error(err.message || err);
      //                             return;
      //                         }
      //                         window.MAP_CONFIG = obj;
      //                         window.dailypointdata = obj.daily_step;
      //                         self._loadnum++;
      //                         self.enterGame();
      //                     });
      //                 } else {
      //                     window.MAP_CONFIG = netobj
      //                     self._loadnum++;
      //                     self.enterGame();
      //                 }
      //             });
      //         } else {
      //             cc.loader.loadRes('level_config2', function (err, obj) {
      //                 if (err) {
      //                     cc.error(err.message || err);
      //                     return;
      //                 }
      //                 window.MAP_CONFIG = obj;
      //                 self._loadnum++;
      //                 self.enterGame();
      //             });
      //         }
      //     },
      //     fail: () => {
      //         cc.loader.loadRes('level_config2', function (err, obj) {
      //             if (err) {
      //                 cc.error(err.message || err);
      //                 return;
      //             }
      //             window.MAP_CONFIG = obj;
      //             self._loadnum++;
      //             self.enterGame();
      //         });
      //     }
      // })
      cc.loader.loadRes('level_config2', function (err, obj) {
        if (err) {
          cc.error(err.message || err);
          return;
        }

        window.MAP_CONFIG = obj.json;
        self._loadnum++;
        self.enterGame();
      }); //登录
      // wx.cloud.callFunction({
      //     // 云函数名称
      //     name: 'login',
      //     // 传给云函数的参数
      //     success: function (res) {
      //         console.log(res.result.event.userInfo);
      //         window.userInfo = res.result.event.userInfo;
      //         Utils.getSaveData(res => {
      //             window.getdata = true;
      //             self._loadnum++;
      //             self.enterGame();
      //         })
      //     },
      //     fail: (err) => {
      //         console.error(err);
      //         wx.showModal({
      //             title: "提示",
      //             content: "登录异常，请稍后重试:" + err.Msg,
      //             showCancel: false,
      //             success: () => {
      //                 wx.exitMiniProgram();
      //             }
      //         })
      //     }
      // })
    } else {
      self._loadnum = 1;
      cc.loader.loadRes('level_config2', function (err, obj) {
        if (err) {
          cc.error(err.message || err);
          return;
        }

        window.MAP_CONFIG = obj.json;
        self._loadnum++;
        self.enterGame();
      });
    }

    this.MyPreloadScene(window.MENU_SCENE_NAME, function (completedCount, totalCount, item) {
      self.m_l_text.string = "游戏加载中..." + Math.floor(completedCount / totalCount * 100) + "%";
    }, function () {
      console.log("preloadScene finish");
      self._loadnum++;
      self.enterGame();
    });
  },
  MyPreloadScene: function MyPreloadScene(sceneName, onProgress, onLoaded) {
    if (onLoaded === undefined) {
      onLoaded = onProgress;
      onProgress = null;
    } // cc.director.loadScene(window.MENU_SCENE_NAME);
    // var info = cc.director._getSceneUuid(sceneName);
    // if (info) {


    cc.director.emit(cc.Director.EVENT_BEFORE_SCENE_LOADING, sceneName);
    cc.director.loadScene(window.MENU_SCENE_NAME); // }
    // else {
    //     var error = 'Can not preload the scene "' + sceneName + '" because it is not in the build settings.';
    //     onLoaded(new Error(error));
    //     cc.error('preloadScene: ' + error);
    // }
  },
  enterGame: function enterGame() {
    if (this._loadnum >= 4) {
      if (typeof wx != 'undefined') wx.hideLoading();
      cc.director.loadScene(window.MENU_SCENE_NAME);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxHYW1lTG9hZC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiU2hhcmVTZGsiLCJVdGlscyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9uX2xvZ28iLCJOb2RlIiwibV9sb2FkZWQiLCJtX2xfdGV4dCIsIkxhYmVsIiwic3RhcnQiLCJzZXREZXNpZ25SZXNvbHV0aW9uIiwib3BhY2l0eSIsIm1fbG9hZGVkMiIsInNlbGYiLCJfbG9hZG51bSIsInd4IiwiY2xvdWQiLCJpbml0IiwiZW52Iiwid2luZG93IiwiRU5WIiwidHJhY2VVc2VyIiwic3VjY2VzcyIsInJlcyIsInJ1bkFjdGlvbiIsInNlcXVlbmNlIiwiZmFkZUluIiwiY2FsbEZ1bmMiLCJsb2FkcmVzIiwibG9hZGNvbmZpZyIsImJvbyIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJndWlkZWJvbyIsImNoYW5nZSIsImNvbnNvbGUiLCJsb2ciLCJNVVNJQ19TSE9XX09GRiIsInBhcnNlSW50Iiwic2V0SXRlbSIsIkdVSURFX0xFVkVMIiwiQ0hBTkdFX0JMT0NLIiwic2V0U2hhcmVNZW51RW5hYmxlZCIsInRoaXMkMSIsImVudGVyR2FtZSIsInRlbXBGaWxlVVJMIiwiaSIsInB1c2giLCJsb2FkZXIiLCJsb2FkUmVzIiwiZXJyIiwib2JqIiwiZXJyb3IiLCJtZXNzYWdlIiwiTUFQX0NPTkZJRyIsImpzb24iLCJNeVByZWxvYWRTY2VuZSIsIk1FTlVfU0NFTkVfTkFNRSIsImNvbXBsZXRlZENvdW50IiwidG90YWxDb3VudCIsIml0ZW0iLCJzdHJpbmciLCJNYXRoIiwiZmxvb3IiLCJzY2VuZU5hbWUiLCJvblByb2dyZXNzIiwib25Mb2FkZWQiLCJ1bmRlZmluZWQiLCJkaXJlY3RvciIsImVtaXQiLCJEaXJlY3RvciIsIkVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HIiwibG9hZFNjZW5lIiwiaGlkZUxvYWRpbmciXSwibWFwcGluZ3Mi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LyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCIuL2NvbW1vbi9XeGxpZmVcIik7XG52YXIgU2hhcmVTZGsgPSByZXF1aXJlKFwiU2hhcmVTZGtcIik7XG52YXIgVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIilcbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG1fbl9sb2dvOiBjYy5Ob2RlLFxuICAgICAgICBtX2xvYWRlZDogZmFsc2UsXG4gICAgICAgIG1fbF90ZXh0OiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIFV0aWxzLnNldERlc2lnblJlc29sdXRpb24oKVxuICAgICAgICB0aGlzLm1fbl9sb2dvLm9wYWNpdHkgPSAwO1xuICAgICAgICB0aGlzLm1fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubV9sb2FkZWQyID0gZmFsc2U7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fbG9hZG51bSA9IDA7XG4gICAgICAgIGlmICh0eXBlb2YgKHd4KSAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgd3guY2xvdWQuaW5pdCh7XG4gICAgICAgICAgICAgICAgZW52OiB3aW5kb3cuRU5WLFxuICAgICAgICAgICAgICAgIHRyYWNlVXNlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiaW5pdC1cIiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1fbl9sb2dvLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5mYWRlSW4oMC4yKSwgY2MuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgc2VsZi5sb2FkcmVzKCk7XG4gICAgICAgICAgICBzZWxmLmxvYWRjb25maWcoKTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgLy8gY2Mudmlldy5lbmFibGVSZXRpbmEodHJ1ZSk7XG4gICAgICAgIGxldCBib28gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ211c2ljJyk7XG4gICAgICAgIGxldCBndWlkZWJvbyA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZ3VpZGVpbmZvJyk7XG4gICAgICAgIGxldCBjaGFuZ2UgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NoYW5nZScpO1xuICAgICAgICBjb25zb2xlLmxvZygnZ3VpZGVib28nLCBndWlkZWJvbyk7XG4gICAgICAgIGlmIChib28gJiYgYm9vICE9ICdudWxsJykge1xuICAgICAgICAgICAgd2luZG93Lk1VU0lDX1NIT1dfT0ZGID0gcGFyc2VJbnQoYm9vKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvdy5NVVNJQ19TSE9XX09GRiA9IDE7Ly/pu5jorqTlvIDlkK9cbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbXVzaWMnLCAnJyArIHdpbmRvdy5NVVNJQ19TSE9XX09GRik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZ3VpZGVib28gJiYgZ3VpZGVib28gIT0gJ251bGwnKSB7XG4gICAgICAgICAgICB3aW5kb3cuR1VJREVfTEVWRUwgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LkdVSURFX0xFVkVMID0gMDtcbiAgICAgICAgICAgIC8vIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZ3VpZGVpbmZvJywgJzEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhbmdlICYmIGNoYW5nZSAhPSAnbnVsbCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5DSEFOR0VfQkxPQ0sgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LkNIQU5HRV9CTE9DSyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgU2hhcmVTZGsuc2V0U2hhcmVNZW51RW5hYmxlZCh0cnVlLCB0cnVlKTtcblxuICAgIH0sXG5cbiAgICBsb2FkY29uZmlnKCkge1xuICAgICAgICBsZXQgdGhpcyQxID0gdGhpcztcbiAgICAgICAgdGhpcyQxLl9sb2FkbnVtKys7XG4gICAgICAgIHRoaXMkMS5lbnRlckdhbWUoKTtcbiAgICAgICAgLy8gbGV0IHJlbW90ZVVybCA9ICdodHRwczovL2dpZmVuLTEyNTM0OTU1NDEuY29zZ3oubXlxY2xvdWQuY29tL0tpbGxNb25zdGVyL3NoYXJlX2NvbmZpZy5qc29uJztcbiAgICAgICAgLy8gY2MubG9hZGVyLmxvYWQocmVtb3RlVXJsLCBmdW5jdGlvbiAoZXJyLCBuZXRvYmopIHtcbiAgICAgICAgLy8gICAgIGlmIChlcnIpIHtcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgIC8vICAgICAgICAgdGhpcyQxLl9sb2FkbnVtKys7XG4gICAgICAgIC8vICAgICAgICAgdGhpcyQxLmVudGVyR2FtZSgpO1xuICAgICAgICAvLyAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgICB3aW5kb3cuQk9YX1NIQVJFID0gbmV0b2JqLmJveF9zaGFyZTtcbiAgICAgICAgLy8gICAgICAgICB3aW5kb3cuU0tJTl9TSEFSRSA9IG5ldG9iai5za2luX3NoYXJlO1xuICAgICAgICAvLyAgICAgICAgIHdpbmRvdy5NT1ZFR0FNRSA9IG5ldG9iai5tb3JlZ2FtZTtcbiAgICAgICAgLy8gICAgICAgICB3aW5kb3cuTkVXWUVBUiA9IG5ldG9iai5uZXd5ZWFyO1xuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUud2FybihuZXRvYmopO1xuXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pO1xuICAgIH0sXG5cbiAgICBsb2FkcmVzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImxvYWQgcmVzXCIpO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHdpbmRvdy50ZW1wRmlsZVVSTCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgd2luZG93LnRlbXBGaWxlVVJMLnB1c2goXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB3eCAhPSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgLy8gICAgIHRpdGxlOiBcIueZu+W9leS4rS4uLlwiXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy8gd3guY2xvdWQuZ2V0VGVtcEZpbGVVUkwoe1xuICAgICAgICAgICAgLy8gICAgIGZpbGVMaXN0OiBbJ2Nsb3VkOi8va2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMuNjAzZS1raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy9nYW1lX2NvbmZpZy9sZXZlbF9jb25maWcyLmpzb24nLFxuICAgICAgICAgICAgLy8gICAgICAgICAnY2xvdWQ6Ly9raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy42MDNlLWtpbGxtb25zdGVyLXRlc3QtZGY5YTIzL3NoYXJlX3RlbXBsYXRlcy9zaGFyZTEuanBnJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgJ2Nsb3VkOi8va2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMuNjAzZS1raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy9zaGFyZV90ZW1wbGF0ZXMvc2hhcmVfbm9ybWFsLmpwZycsXG4gICAgICAgICAgICAvLyAgICAgICAgICdjbG91ZDovL2tpbGxtb25zdGVyLXRlc3QtZGY5YTIzLjYwM2Uta2lsbG1vbnN0ZXItdGVzdC1kZjlhMjMvc2hhcmVfdGVtcGxhdGVzL3NoYXJlX3Jlc3VsdC5qcGcnLFxuICAgICAgICAgICAgLy8gICAgICAgICAnY2xvdWQ6Ly9raWxsbW9uc3Rlci10ZXN0LWRmOWEyMy42MDNlLWtpbGxtb25zdGVyLXRlc3QtZGY5YTIzL3NoYXJlX3RlbXBsYXRlcy9zaGFyZV9ib3guanBnJ10sXG4gICAgICAgICAgICAvLyAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMuZmlsZUxpc3RbMF0pO1xuICAgICAgICAgICAgLy8gICAgICAgICB3aW5kb3cudGVtcEZpbGVVUkwgPSBbXTtcbiAgICAgICAgICAgIC8vICAgICAgICAgbGV0IGRhdGEgPSByZXMuZmlsZUxpc3RbMF07XG4gICAgICAgICAgICAvLyAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcmVzLmZpbGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB3aW5kb3cudGVtcEZpbGVVUkwucHVzaChyZXMuZmlsZUxpc3RbaV0udGVtcEZpbGVVUkwpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09IDApIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkKGRhdGEudGVtcEZpbGVVUkwsIGZ1bmN0aW9uIChlcnIsIG5ldG9iaikge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2xldmVsX2NvbmZpZzInLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIubWVzc2FnZSB8fCBlcnIpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5NQVBfQ09ORklHID0gb2JqO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmRhaWx5cG9pbnRkYXRhID0gb2JqLmRhaWx5X3N0ZXA7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG5ldG9ialxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygnbGV2ZWxfY29uZmlnMicsIGZ1bmN0aW9uIChlcnIsIG9iaikge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG9iajtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBzZWxmLl9sb2FkbnVtKys7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgc2VsZi5lbnRlckdhbWUoKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKCdsZXZlbF9jb25maWcyJywgZnVuY3Rpb24gKGVyciwgb2JqKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG9iajtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuX2xvYWRudW0rKztcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICBjYy5sb2FkZXIubG9hZFJlcygnbGV2ZWxfY29uZmlnMicsIGZ1bmN0aW9uIChlcnIsIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY2MuZXJyb3IoZXJyLm1lc3NhZ2UgfHwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHdpbmRvdy5NQVBfQ09ORklHID0gb2JqLmpzb247XG4gICAgICAgICAgICAgICAgc2VsZi5fbG9hZG51bSsrO1xuICAgICAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8v55m75b2VXG4gICAgICAgICAgICAvLyB3eC5jbG91ZC5jYWxsRnVuY3Rpb24oe1xuICAgICAgICAgICAgLy8gICAgIC8vIOS6keWHveaVsOWQjeensFxuICAgICAgICAgICAgLy8gICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgICAvLyAgICAgLy8g5Lyg57uZ5LqR5Ye95pWw55qE5Y+C5pWwXG4gICAgICAgICAgICAvLyAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhyZXMucmVzdWx0LmV2ZW50LnVzZXJJbmZvKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgd2luZG93LnVzZXJJbmZvID0gcmVzLnJlc3VsdC5ldmVudC51c2VySW5mbztcbiAgICAgICAgICAgIC8vICAgICAgICAgVXRpbHMuZ2V0U2F2ZURhdGEocmVzID0+IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHdpbmRvdy5nZXRkYXRhID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuX2xvYWRudW0rKztcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHNlbGYuZW50ZXJHYW1lKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgICAgIC8vICAgICBmYWlsOiAoZXJyKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHRpdGxlOiBcIuaPkOekulwiLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgY29udGVudDogXCLnmbvlvZXlvILluLjvvIzor7fnqI3lkI7ph43or5U6XCIgKyBlcnIuTXNnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgd3guZXhpdE1pbmlQcm9ncmFtKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuX2xvYWRudW0gPSAxO1xuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoJ2xldmVsX2NvbmZpZzInLCBmdW5jdGlvbiAoZXJyLCBvYmopIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmVycm9yKGVyci5tZXNzYWdlIHx8IGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cuTUFQX0NPTkZJRyA9IG9iai5qc29uO1xuICAgICAgICAgICAgICAgIHNlbGYuX2xvYWRudW0rKztcbiAgICAgICAgICAgICAgICBzZWxmLmVudGVyR2FtZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLk15UHJlbG9hZFNjZW5lKHdpbmRvdy5NRU5VX1NDRU5FX05BTUUsIChjb21wbGV0ZWRDb3VudCwgdG90YWxDb3VudCwgaXRlbSkgPT4ge1xuICAgICAgICAgICAgc2VsZi5tX2xfdGV4dC5zdHJpbmcgPSBcIua4uOaIj+WKoOi9veS4rS4uLlwiICsgTWF0aC5mbG9vcigoY29tcGxldGVkQ291bnQgLyB0b3RhbENvdW50KSAqIDEwMCkgKyBcIiVcIjtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwcmVsb2FkU2NlbmUgZmluaXNoXCIpO1xuICAgICAgICAgICAgc2VsZi5fbG9hZG51bSsrO1xuICAgICAgICAgICAgc2VsZi5lbnRlckdhbWUoKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIE15UHJlbG9hZFNjZW5lKHNjZW5lTmFtZSwgb25Qcm9ncmVzcywgb25Mb2FkZWQpIHtcbiAgICAgICAgaWYgKG9uTG9hZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9uTG9hZGVkID0gb25Qcm9ncmVzcztcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FKTtcbiAgICAgICAgLy8gdmFyIGluZm8gPSBjYy5kaXJlY3Rvci5fZ2V0U2NlbmVVdWlkKHNjZW5lTmFtZSk7XG4gICAgICAgIC8vIGlmIChpbmZvKSB7XG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5lbWl0KGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9TQ0VORV9MT0FESU5HLCBzY2VuZU5hbWUpO1xuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHdpbmRvdy5NRU5VX1NDRU5FX05BTUUpXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZSB7XG4gICAgICAgIC8vICAgICB2YXIgZXJyb3IgPSAnQ2FuIG5vdCBwcmVsb2FkIHRoZSBzY2VuZSBcIicgKyBzY2VuZU5hbWUgKyAnXCIgYmVjYXVzZSBpdCBpcyBub3QgaW4gdGhlIGJ1aWxkIHNldHRpbmdzLic7XG4gICAgICAgIC8vICAgICBvbkxvYWRlZChuZXcgRXJyb3IoZXJyb3IpKTtcbiAgICAgICAgLy8gICAgIGNjLmVycm9yKCdwcmVsb2FkU2NlbmU6ICcgKyBlcnJvcik7XG4gICAgICAgIC8vIH1cbiAgICB9LFxuICAgIGVudGVyR2FtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fbG9hZG51bSA+PSA0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mICh3eCkgIT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSh3aW5kb3cuTUVOVV9TQ0VORV9OQU1FKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl19

(function () {
var scripts = [{"deps":{"./assets/Script/GameMain":36,"./assets/Script/GameStep":23,"./assets/Script/GameLoad":11,"./assets/Script/GameResult":4,"./assets/Script/common/Common_CommonUtil":25,"./assets/Script/common/PlatformCom":5,"./assets/Script/common/ReliveViewCtrl":15,"./assets/Script/common/GameEndRank":8,"./assets/Script/common/RankList":10,"./assets/Script/common/GuideManager":12,"./assets/Script/common/ShareSdk":21,"./assets/Script/common/SubdomineDisplay":14,"./assets/Script/common/Utils":1,"./assets/Script/common/event_listener":22,"./assets/Script/common/Wxlife":13,"./assets/Script/common/launch":33,"./assets/Script/common/BgSetting":16,"./assets/Script/common/shader/ccShader_Wave_VH_Frag":26,"./assets/Script/common/shader/EffectCommon":34,"./assets/Script/common/shader/ccShader_Default_Vert":19,"./assets/Script/common/shader/ccShader_Default_Vert_noMVP":29,"./assets/Script/common/shader/ccShader_wave":42,"./assets/Script/common/shader/Wave_VH":18,"./assets/Script/item/BigStepItem":17,"./assets/Script/item/BlockBGItem":20,"./assets/Script/item/GetBoxGiftItem":28,"./assets/Script/item/MonsterItem":30,"./assets/Script/item/BombEffectItem":27,"./assets/Script/item/BlockItem":24,"./assets/Script/item/ShapeItem":2,"./assets/Script/item/SkinItem":39,"./assets/Script/item/ShareTipsItem":37,"./assets/Script/item/SkinPanel":40,"./assets/Script/item/UseToolItem":35,"./assets/Script/item/RockItem":32,"./assets/Script/item/StepViewItem":38,"./assets/Script/item/BgItem":41,"./assets/Script/dataStatistics/Data":7,"./assets/migration/use_reversed_rotateBy":31,"./assets/migration/use_v2.0.x_cc.Toggle_event":6,"./assets/Script/newBie/NewBieGift":9,"./assets/Script/GameMenu":3,"./assets/Script/frame/puremvc/PureMVC":43},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../dataStatistics/Data":7},"path":"preview-scripts/assets/Script/common/Utils.js"},{"deps":{"Utils":1,"GameMain":36},"path":"preview-scripts/assets/Script/item/ShapeItem.js"},{"deps":{"Utils":1,"RankList":10,"ShareSdk":21},"path":"preview-scripts/assets/Script/GameMenu.js"},{"deps":{"RankList":10,"Utils":1,"ShareSdk":21},"path":"preview-scripts/assets/Script/GameResult.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/PlatformCom.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.0.x_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/Script/dataStatistics/Data.js"},{"deps":{"RankList":10},"path":"preview-scripts/assets/Script/common/GameEndRank.js"},{"deps":{"Utils":1,"ShareSdk":21},"path":"preview-scripts/assets/Script/newBie/NewBieGift.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/RankList.js"},{"deps":{"Utils":1,"ShareSdk":21,"./common/Wxlife":13},"path":"preview-scripts/assets/Script/GameLoad.js"},{"deps":{"Utils":1},"path":"preview-scripts/assets/Script/common/GuideManager.js"},{"deps":{"Utils":1,"./event_listener":22},"path":"preview-scripts/assets/Script/common/Wxlife.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/SubdomineDisplay.js"},{"deps":{"../dataStatistics/Data":7},"path":"preview-scripts/assets/Script/common/ReliveViewCtrl.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/BgSetting.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/BigStepItem.js"},{"deps":{"./ccShader_Default_Vert_noMVP.js":29,"./ccShader_Default_Vert.js":19,"./ccShader_Wave_VH_Frag.js":26},"path":"preview-scripts/assets/Script/common/shader/Wave_VH.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/shader/ccShader_Default_Vert.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/BlockBGItem.js"},{"deps":{"../dataStatistics/Data":7},"path":"preview-scripts/assets/Script/common/ShareSdk.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/event_listener.js"},{"deps":{"./common/Utils":1},"path":"preview-scripts/assets/Script/GameStep.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/BlockItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/Common_CommonUtil.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/shader/ccShader_Wave_VH_Frag.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/BombEffectItem.js"},{"deps":{"../common/Utils":1,"../common/ShareSdk":21,"../common/Common_CommonUtil":25},"path":"preview-scripts/assets/Script/item/GetBoxGiftItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/shader/ccShader_Default_Vert_noMVP.js"},{"deps":{"Utils":1},"path":"preview-scripts/assets/Script/item/MonsterItem.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_reversed_rotateBy.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/RockItem.js"},{"deps":{"ShareSdk":21,"Utils":1,"RankList":10},"path":"preview-scripts/assets/Script/common/launch.js"},{"deps":{"Utils":1,"ccShader_Default_Vert":19,"ccShader_Default_Vert_noMVP":29,"ccShader_wave":42},"path":"preview-scripts/assets/Script/common/shader/EffectCommon.js"},{"deps":{"Utils":1,"ShareSdk":21,"../common/Common_CommonUtil":25},"path":"preview-scripts/assets/Script/item/UseToolItem.js"},{"deps":{"Utils":1,"ShareSdk":21,"RankList":10},"path":"preview-scripts/assets/Script/GameMain.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/ShareTipsItem.js"},{"deps":{"../common/ShareSdk":21,"../common/Utils":1,"../common/Common_CommonUtil":25},"path":"preview-scripts/assets/Script/item/StepViewItem.js"},{"deps":{"../common/ShareSdk":21,"../common/Common_CommonUtil":25},"path":"preview-scripts/assets/Script/item/SkinItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/SkinPanel.js"},{"deps":{},"path":"preview-scripts/assets/Script/item/BgItem.js"},{"deps":{},"path":"preview-scripts/assets/Script/common/shader/ccShader_wave.js"},{"deps":{},"path":"preview-scripts/assets/Script/frame/puremvc/PureMVC.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Wave_VH_Frag.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c1487nMlJ5MI52WhD6w5kod', 'ccShader_Wave_VH_Frag');
// Script/common/shader/ccShader_Wave_VH_Frag.js

"use strict";

/* 全局波浪 */
module.exports = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\nvarying vec2 v_texCoord;\nuniform float motion;\nuniform float angle;\nvoid main()\n{\n    vec2 tmp = v_texCoord;\n    tmp.x = tmp.x + 0.01 * sin(motion +  tmp.x * angle);\n    // tmp.y = tmp.y + 0.01 * sin(motion +  tmp.y * angle);\n    gl_FragColor = texture2D(CC_Texture0, tmp);\n    \n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNoYWRlclxcY2NTaGFkZXJfV2F2ZV9WSF9GcmFnLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQUEsTUFBTSxDQUFDQyxPQUFQIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKiDlhajlsYDms6LmtaogKi9cblxubW9kdWxlLmV4cG9ydHMgPVxuICAgIGBcbiNpZmRlZiBHTF9FU1xucHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XG4jZW5kaWZcbnZhcnlpbmcgdmVjMiB2X3RleENvb3JkO1xudW5pZm9ybSBmbG9hdCBtb3Rpb247XG51bmlmb3JtIGZsb2F0IGFuZ2xlO1xudm9pZCBtYWluKClcbntcbiAgICB2ZWMyIHRtcCA9IHZfdGV4Q29vcmQ7XG4gICAgdG1wLnggPSB0bXAueCArIDAuMDEgKiBzaW4obW90aW9uICsgIHRtcC54ICogYW5nbGUpO1xuICAgIC8vIHRtcC55ID0gdG1wLnkgKyAwLjAxICogc2luKG1vdGlvbiArICB0bXAueSAqIGFuZ2xlKTtcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQoQ0NfVGV4dHVyZTAsIHRtcCk7XG4gICAgXG59XG5gIl19
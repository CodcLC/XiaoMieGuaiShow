
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Default_Vert_noMVP.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0644fQ5ZXFCqq9x2DCKfyIi', 'ccShader_Default_Vert_noMVP');
// Script/common/shader/ccShader_Default_Vert_noMVP.js

"use strict";

module.exports = "\nattribute vec4 a_position;\n attribute vec2 a_texCoord;\n attribute vec4 a_color;\n varying vec2 v_texCoord;\n varying vec4 v_fragmentColor;\n void main()\n {\n     gl_Position = CC_PMatrix  * a_position;\n     v_fragmentColor = a_color;\n     v_texCoord = a_texCoord;\n }\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNoYWRlclxcY2NTaGFkZXJfRGVmYXVsdF9WZXJ0X25vTVZQLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuYFxuYXR0cmlidXRlIHZlYzQgYV9wb3NpdGlvbjtcbiBhdHRyaWJ1dGUgdmVjMiBhX3RleENvb3JkO1xuIGF0dHJpYnV0ZSB2ZWM0IGFfY29sb3I7XG4gdmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XG4gdmFyeWluZyB2ZWM0IHZfZnJhZ21lbnRDb2xvcjtcbiB2b2lkIG1haW4oKVxuIHtcbiAgICAgZ2xfUG9zaXRpb24gPSBDQ19QTWF0cml4ICAqIGFfcG9zaXRpb247XG4gICAgIHZfZnJhZ21lbnRDb2xvciA9IGFfY29sb3I7XG4gICAgIHZfdGV4Q29vcmQgPSBhX3RleENvb3JkO1xuIH1cbmBcblxuIl19
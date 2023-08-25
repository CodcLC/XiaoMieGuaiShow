
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_Default_Vert.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '82ac0wtVkVK/K0KFo+pzlyg', 'ccShader_Default_Vert');
// Script/common/shader/ccShader_Default_Vert.js

"use strict";

module.exports = " \nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvoid main()\n{\n    gl_Position = CC_PMatrix * a_position;\n    v_texCoord = a_texCoord;\n    v_color = a_color;\n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNoYWRlclxcY2NTaGFkZXJfRGVmYXVsdF9WZXJ0LmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLE1BQU0sQ0FBQ0MsT0FBUCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPVxuYCBcbmF0dHJpYnV0ZSB2ZWM0IGFfcG9zaXRpb247XG5hdHRyaWJ1dGUgdmVjMiBhX3RleENvb3JkO1xuYXR0cmlidXRlIHZlYzQgYV9jb2xvcjtcbnZhcnlpbmcgdmVjNCB2X2NvbG9yO1xudmFyeWluZyB2ZWMyIHZfdGV4Q29vcmQ7XG52b2lkIG1haW4oKVxue1xuICAgIGdsX1Bvc2l0aW9uID0gQ0NfUE1hdHJpeCAqIGFfcG9zaXRpb247XG4gICAgdl90ZXhDb29yZCA9IGFfdGV4Q29vcmQ7XG4gICAgdl9jb2xvciA9IGFfY29sb3I7XG59XG5gIFxuXG4iXX0=
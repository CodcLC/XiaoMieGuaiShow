
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/ccShader_wave.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'ba386OeeWFMXZpyuzJR95fV', 'ccShader_wave');
// Script/common/shader/ccShader_wave.js

"use strict";

module.exports = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texCoord;\nuniform float time;\nuniform vec2 mouse;\nfloat PI = 3.1415926;\n\nfloat _distanceFactor = 100.0;  \nfloat _timeFactor = -30.0;  \nfloat _totalFactor = 1.0;  \nfloat _waveWidth = 0.1;  \nfloat waveSpeed = 0.3;\nvoid main() {\n\tfloat _curWaveDis = time*waveSpeed;\n\t//\u8BA1\u7B97uv\u5230\u9F20\u6807\u70B9\u51FB\u70B9\u7684\u5411\u91CF(\u5411\u5916\u6269\uFF0C\u53CD\u8FC7\u6765\u5C31\u662F\u5411\u91CC\u7F29) \n\tvec2 dv = mouse.xy - v_texCoord.xy;\n\t//\u6309\u7167\u5C4F\u5E55\u957F\u5BBD\u6BD4\u8FDB\u884C\u7F29\u653E\n\tdv = dv*vec2(0.5625,1.0);\n\tfloat dis = sqrt(dv.x * dv.x + dv.y * dv.y);  \n\tfloat sinFactor = sin(dis * _distanceFactor + time * _timeFactor) * _totalFactor * 0.005;  \n\tfloat discardFactor = clamp(_waveWidth - abs(_curWaveDis - dis), 0.0, 1.0) / _waveWidth;\n\tvec2 dv1 = normalize(dv);  \n\t//\u8BA1\u7B97\u6BCF\u4E2A\u50CF\u7D20uv\u7684\u504F\u79FB\u503C  \n\tvec2 offset = dv1  * sinFactor * discardFactor;\n\tvec2 uv = offset+v_texCoord.xy;\n\tgl_FragColor = texture2D(CC_Texture0, uv);\n}\n";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNoYWRlclxcY2NTaGFkZXJfd2F2ZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLE9BQVAiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID1cblx0YFxuI2lmZGVmIEdMX0VTXG5wcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcbiNlbmRpZlxuXG52YXJ5aW5nIHZlYzIgdl90ZXhDb29yZDtcbnVuaWZvcm0gZmxvYXQgdGltZTtcbnVuaWZvcm0gdmVjMiBtb3VzZTtcbmZsb2F0IFBJID0gMy4xNDE1OTI2O1xuXG5mbG9hdCBfZGlzdGFuY2VGYWN0b3IgPSAxMDAuMDsgIFxuZmxvYXQgX3RpbWVGYWN0b3IgPSAtMzAuMDsgIFxuZmxvYXQgX3RvdGFsRmFjdG9yID0gMS4wOyAgXG5mbG9hdCBfd2F2ZVdpZHRoID0gMC4xOyAgXG5mbG9hdCB3YXZlU3BlZWQgPSAwLjM7XG52b2lkIG1haW4oKSB7XG5cdGZsb2F0IF9jdXJXYXZlRGlzID0gdGltZSp3YXZlU3BlZWQ7XG5cdC8v6K6h566XdXbliLDpvKDmoIfngrnlh7vngrnnmoTlkJHph48o5ZCR5aSW5omp77yM5Y+N6L+H5p2l5bCx5piv5ZCR6YeM57ypKSBcblx0dmVjMiBkdiA9IG1vdXNlLnh5IC0gdl90ZXhDb29yZC54eTtcblx0Ly/mjInnhaflsY/luZXplb/lrr3mr5Tov5vooYznvKnmlL5cblx0ZHYgPSBkdip2ZWMyKDAuNTYyNSwxLjApO1xuXHRmbG9hdCBkaXMgPSBzcXJ0KGR2LnggKiBkdi54ICsgZHYueSAqIGR2LnkpOyAgXG5cdGZsb2F0IHNpbkZhY3RvciA9IHNpbihkaXMgKiBfZGlzdGFuY2VGYWN0b3IgKyB0aW1lICogX3RpbWVGYWN0b3IpICogX3RvdGFsRmFjdG9yICogMC4wMDU7ICBcblx0ZmxvYXQgZGlzY2FyZEZhY3RvciA9IGNsYW1wKF93YXZlV2lkdGggLSBhYnMoX2N1cldhdmVEaXMgLSBkaXMpLCAwLjAsIDEuMCkgLyBfd2F2ZVdpZHRoO1xuXHR2ZWMyIGR2MSA9IG5vcm1hbGl6ZShkdik7ICBcblx0Ly/orqHnrpfmr4/kuKrlg4/ntKB1dueahOWBj+enu+WAvCAgXG5cdHZlYzIgb2Zmc2V0ID0gZHYxICAqIHNpbkZhY3RvciAqIGRpc2NhcmRGYWN0b3I7XG5cdHZlYzIgdXYgPSBvZmZzZXQrdl90ZXhDb29yZC54eTtcblx0Z2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKENDX1RleHR1cmUwLCB1dik7XG59XG5gIl19
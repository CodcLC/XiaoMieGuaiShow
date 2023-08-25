"use strict";
cc._RF.push(module, 'ba386OeeWFMXZpyuzJR95fV', 'ccShader_wave');
// Script/common/shader/ccShader_wave.js

"use strict";

module.exports = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 v_texCoord;\nuniform float time;\nuniform vec2 mouse;\nfloat PI = 3.1415926;\n\nfloat _distanceFactor = 100.0;  \nfloat _timeFactor = -30.0;  \nfloat _totalFactor = 1.0;  \nfloat _waveWidth = 0.1;  \nfloat waveSpeed = 0.3;\nvoid main() {\n\tfloat _curWaveDis = time*waveSpeed;\n\t//\u8BA1\u7B97uv\u5230\u9F20\u6807\u70B9\u51FB\u70B9\u7684\u5411\u91CF(\u5411\u5916\u6269\uFF0C\u53CD\u8FC7\u6765\u5C31\u662F\u5411\u91CC\u7F29) \n\tvec2 dv = mouse.xy - v_texCoord.xy;\n\t//\u6309\u7167\u5C4F\u5E55\u957F\u5BBD\u6BD4\u8FDB\u884C\u7F29\u653E\n\tdv = dv*vec2(0.5625,1.0);\n\tfloat dis = sqrt(dv.x * dv.x + dv.y * dv.y);  \n\tfloat sinFactor = sin(dis * _distanceFactor + time * _timeFactor) * _totalFactor * 0.005;  \n\tfloat discardFactor = clamp(_waveWidth - abs(_curWaveDis - dis), 0.0, 1.0) / _waveWidth;\n\tvec2 dv1 = normalize(dv);  \n\t//\u8BA1\u7B97\u6BCF\u4E2A\u50CF\u7D20uv\u7684\u504F\u79FB\u503C  \n\tvec2 offset = dv1  * sinFactor * discardFactor;\n\tvec2 uv = offset+v_texCoord.xy;\n\tgl_FragColor = texture2D(CC_Texture0, uv);\n}\n";

cc._RF.pop();
"use strict";
cc._RF.push(module, '82ac0wtVkVK/K0KFo+pzlyg', 'ccShader_Default_Vert');
// Script/common/shader/ccShader_Default_Vert.js

"use strict";

module.exports = " \nattribute vec4 a_position;\nattribute vec2 a_texCoord;\nattribute vec4 a_color;\nvarying vec4 v_color;\nvarying vec2 v_texCoord;\nvoid main()\n{\n    gl_Position = CC_PMatrix * a_position;\n    v_texCoord = a_texCoord;\n    v_color = a_color;\n}\n";

cc._RF.pop();
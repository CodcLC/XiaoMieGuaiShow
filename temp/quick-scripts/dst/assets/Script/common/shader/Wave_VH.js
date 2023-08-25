
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/common/shader/Wave_VH.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '47130Ahq4RMiql9ilrh/oye', 'Wave_VH');
// Script/common/shader/Wave_VH.js

"use strict";

var _default_vert = require("./ccShader_Default_Vert.js");

var _default_vert_no_mvp = require("./ccShader_Default_Vert_noMVP.js");

var _wave_vh_frag = require("./ccShader_Wave_VH_Frag.js");

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    this._angle = 15;
    this._motion = 0;

    this._use();
  },
  _use: function _use() {
    this._program = new cc.GLProgram();

    if (cc.sys.isNative) {
      cc.log("use native GLProgram");

      this._program.initWithString(_default_vert_no_mvp, _wave_vh_frag);

      this._program.link();

      this._program.updateUniforms();
    } else {
      this._program.initWithVertexShaderByteArray(_default_vert, _wave_vh_frag);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_POSITION, cc.macro.VERTEX_ATTRIB_POSITION);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_COLOR, cc.macro.VERTEX_ATTRIB_COLOR);

      this._program.addAttribute(cc.macro.ATTRIBUTE_NAME_TEX_COORD, cc.macro.VERTEX_ATTRIB_TEX_COORDS);

      this._program.link();

      this._program.updateUniforms();
    }

    this._uniMotion = this._program.getUniformLocationForName("motion");
    this._uniAngle = this._program.getUniformLocationForName("angle");
    this._mouse = this._program.getUniformLocationForName("mouse");

    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
      glProgram_state.setUniformFloat(this._uniAngle, this._angle);
    } else {
      this._program.setUniformLocationWith1f(this._uniAngle, this._angle); // this._program.setUniformLocationWith2f(this._mouse, this._mousepos.x, this._mousepos.y )

    }

    this.setProgram(this.node._sgNode, this._program);
  },
  setProgram: function setProgram(node, program) {
    if (cc.sys.isNative) {
      var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(program);
      node.setGLProgramState(glProgram_state);
    } else {
      node.setShaderProgram(program);
    }

    var children = node.children;
    if (!children) return;

    for (var i = 0; i < children.length; i++) {
      this.setProgram(children[i], program);
    }
  },
  update: function update(dt) {
    if (this._program) {
      this._program.use();

      if (cc.sys.isNative) {
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this._program);
        glProgram_state.setUniformFloat(this._uniMotion, this._motion += 0.02);
      } else {
        this._program.setUniformLocationWith1f(this._uniMotion, this._motion += 0.02);

        this._program.updateUniforms();
      }

      if (1.0e20 < this._motion) {
        this._motion = 0;
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxjb21tb25cXHNoYWRlclxcV2F2ZV9WSC5qcyJdLCJuYW1lcyI6WyJfZGVmYXVsdF92ZXJ0IiwicmVxdWlyZSIsIl9kZWZhdWx0X3ZlcnRfbm9fbXZwIiwiX3dhdmVfdmhfZnJhZyIsImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwiX2FuZ2xlIiwiX21vdGlvbiIsIl91c2UiLCJfcHJvZ3JhbSIsIkdMUHJvZ3JhbSIsInN5cyIsImlzTmF0aXZlIiwibG9nIiwiaW5pdFdpdGhTdHJpbmciLCJsaW5rIiwidXBkYXRlVW5pZm9ybXMiLCJpbml0V2l0aFZlcnRleFNoYWRlckJ5dGVBcnJheSIsImFkZEF0dHJpYnV0ZSIsIm1hY3JvIiwiQVRUUklCVVRFX05BTUVfUE9TSVRJT04iLCJWRVJURVhfQVRUUklCX1BPU0lUSU9OIiwiQVRUUklCVVRFX05BTUVfQ09MT1IiLCJWRVJURVhfQVRUUklCX0NPTE9SIiwiQVRUUklCVVRFX05BTUVfVEVYX0NPT1JEIiwiVkVSVEVYX0FUVFJJQl9URVhfQ09PUkRTIiwiX3VuaU1vdGlvbiIsImdldFVuaWZvcm1Mb2NhdGlvbkZvck5hbWUiLCJfdW5pQW5nbGUiLCJfbW91c2UiLCJnbFByb2dyYW1fc3RhdGUiLCJHTFByb2dyYW1TdGF0ZSIsImdldE9yQ3JlYXRlV2l0aEdMUHJvZ3JhbSIsInNldFVuaWZvcm1GbG9hdCIsInNldFVuaWZvcm1Mb2NhdGlvbldpdGgxZiIsInNldFByb2dyYW0iLCJub2RlIiwiX3NnTm9kZSIsInByb2dyYW0iLCJzZXRHTFByb2dyYW1TdGF0ZSIsInNldFNoYWRlclByb2dyYW0iLCJjaGlsZHJlbiIsImkiLCJsZW5ndGgiLCJ1cGRhdGUiLCJkdCIsInVzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJQSxhQUFhLEdBQUdDLE9BQU8sQ0FBQyw0QkFBRCxDQUEzQjs7QUFDQSxJQUFJQyxvQkFBb0IsR0FBR0Qs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QUFzQkYsT0FBdEI7QUFDSDs7QUFHRCxRQUFJRyxRQUFRLEdBQUdMLElBQUksQ0FBQ0ssUUFBcEI7QUFDQSxRQUFJLENBQUNBLFFBQUwsRUFDSTs7QUFFSixTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdELFFBQVEsQ0FBQ0UsTUFBN0IsRUFBcUNELENBQUMsRUFBdEM7QUFDSSxXQUFLUCxVQUFMLENBQWdCTSxRQUFRLENBQUNDLENBQUQsQ0FBeEIsRUFBNkJKLE9BQTdCO0FBREo7QUFFSCxHQTdESTtBQWdFTE0sRUFBQUEsTUFBTSxFQUFFLGdCQUFVQyxFQUFWLEVBQWM7QUFDbEIsUUFBSSxLQUFLcEMsUUFBVCxFQUFtQjtBQUVmLFdBQUtBLFFBQUwsQ0FBY3FDLEdBQWQ7O0FBQ0EsVUFBSTdDLEVBQUUsQ0FBQ1UsR0FBSCxDQUFPQyxRQUFYLEVBQXFCO0FBQ2pCLFlBQUlrQixlQUFlLEdBQUc3QixFQUFFLENBQUM4QixjQUFILENBQWtCQyx3QkFBbEIsQ0FBMkMsS0FBS3ZCLFFBQWhELENBQXRCO0FBQ0FxQixRQUFBQSxlQUFlLENBQUNHLGVBQWhCLENBQWdDLEtBQUtQLFVBQXJDLEVBQWtELEtBQUtuQixPQUFMLElBQWdCLElBQWxFO0FBQ0gsT0FIRCxNQUdPO0FBQ0gsYUFBS0UsUUFBTCxDQUFjeUIsd0JBQWQsQ0FBdUMsS0FBS1IsVUFBNUMsRUFBeUQsS0FBS25CLE9BQUwsSUFBZ0IsSUFBekU7O0FBQ0EsYUFBS0UsUUFBTCxDQUFjTyxjQUFkO0FBQ0g7O0FBQ0QsVUFBSSxTQUFTLEtBQUtULE9BQWxCLEVBQTJCO0FBQUUsYUFBS0EsT0FBTCxHQUFlLENBQWY7QUFBbUI7QUFDbkQ7QUFDSjtBQTdFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2RlZmF1bHRfdmVydCA9IHJlcXVpcmUoXCIuL2NjU2hhZGVyX0RlZmF1bHRfVmVydC5qc1wiKTtcbnZhciBfZGVmYXVsdF92ZXJ0X25vX212cCA9IHJlcXVpcmUoXCIuL2NjU2hhZGVyX0RlZmF1bHRfVmVydF9ub01WUC5qc1wiKTtcbnZhciBfd2F2ZV92aF9mcmFnID0gcmVxdWlyZShcIi4vY2NTaGFkZXJfV2F2ZV9WSF9GcmFnLmpzXCIpO1xuXG5jYy5DbGFzcyh7XG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9hbmdsZSA9IDE1O1xuICAgICAgICB0aGlzLl9tb3Rpb24gPSAwO1xuICAgICAgICB0aGlzLl91c2UoKTtcbiAgICB9LFxuXG4gICAgX3VzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9wcm9ncmFtID0gbmV3IGNjLkdMUHJvZ3JhbSgpO1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICBjYy5sb2coXCJ1c2UgbmF0aXZlIEdMUHJvZ3JhbVwiKVxuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS5pbml0V2l0aFN0cmluZyhfZGVmYXVsdF92ZXJ0X25vX212cCwgX3dhdmVfdmhfZnJhZyk7XG4gICAgICAgICAgICB0aGlzLl9wcm9ncmFtLmxpbmsoKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0udXBkYXRlVW5pZm9ybXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uaW5pdFdpdGhWZXJ0ZXhTaGFkZXJCeXRlQXJyYXkoX2RlZmF1bHRfdmVydCwgX3dhdmVfdmhfZnJhZyk7XG5cbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX1BPU0lUSU9OLCBjYy5tYWNyby5WRVJURVhfQVRUUklCX1BPU0lUSU9OKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX0NPTE9SLCBjYy5tYWNyby5WRVJURVhfQVRUUklCX0NPTE9SKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uYWRkQXR0cmlidXRlKGNjLm1hY3JvLkFUVFJJQlVURV9OQU1FX1RFWF9DT09SRCwgY2MubWFjcm8uVkVSVEVYX0FUVFJJQl9URVhfQ09PUkRTKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0ubGluaygpO1xuICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51cGRhdGVVbmlmb3JtcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdW5pTW90aW9uID0gdGhpcy5fcHJvZ3JhbS5nZXRVbmlmb3JtTG9jYXRpb25Gb3JOYW1lKFwibW90aW9uXCIpO1xuICAgICAgICB0aGlzLl91bmlBbmdsZSA9IHRoaXMuX3Byb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uRm9yTmFtZShcImFuZ2xlXCIpO1xuICAgICAgICB0aGlzLl9tb3VzZSA9IHRoaXMuX3Byb2dyYW0uZ2V0VW5pZm9ybUxvY2F0aW9uRm9yTmFtZShcIm1vdXNlXCIpO1xuXG5cbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICAgICAgdmFyIGdsUHJvZ3JhbV9zdGF0ZSA9IGNjLkdMUHJvZ3JhbVN0YXRlLmdldE9yQ3JlYXRlV2l0aEdMUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgICAgICAgICAgIGdsUHJvZ3JhbV9zdGF0ZS5zZXRVbmlmb3JtRmxvYXQodGhpcy5fdW5pQW5nbGUsIHRoaXMuX2FuZ2xlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uc2V0VW5pZm9ybUxvY2F0aW9uV2l0aDFmKHRoaXMuX3VuaUFuZ2xlLCB0aGlzLl9hbmdsZSk7XG4gICAgICAgICAgICAvLyB0aGlzLl9wcm9ncmFtLnNldFVuaWZvcm1Mb2NhdGlvbldpdGgyZih0aGlzLl9tb3VzZSwgdGhpcy5fbW91c2Vwb3MueCwgdGhpcy5fbW91c2Vwb3MueSApXG4gICAgICAgIH1cblxuXG4gICAgICAgIHRoaXMuc2V0UHJvZ3JhbSh0aGlzLm5vZGUuX3NnTm9kZSwgdGhpcy5fcHJvZ3JhbSk7XG4gICAgfSxcbiAgICBzZXRQcm9ncmFtOiBmdW5jdGlvbiAobm9kZSwgcHJvZ3JhbSkge1xuICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICB2YXIgZ2xQcm9ncmFtX3N0YXRlID0gY2MuR0xQcm9ncmFtU3RhdGUuZ2V0T3JDcmVhdGVXaXRoR0xQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICAgICAgbm9kZS5zZXRHTFByb2dyYW1TdGF0ZShnbFByb2dyYW1fc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5zZXRTaGFkZXJQcm9ncmFtKHByb2dyYW0pO1xuICAgICAgICB9XG5cblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgICAgICBpZiAoIWNoaWxkcmVuKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG4gICAgICAgICAgICB0aGlzLnNldFByb2dyYW0oY2hpbGRyZW5baV0sIHByb2dyYW0pO1xuICAgIH0sXG5cblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLl9wcm9ncmFtKSB7XG5cbiAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0udXNlKCk7XG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdsUHJvZ3JhbV9zdGF0ZSA9IGNjLkdMUHJvZ3JhbVN0YXRlLmdldE9yQ3JlYXRlV2l0aEdMUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgICAgICAgICAgICAgICBnbFByb2dyYW1fc3RhdGUuc2V0VW5pZm9ybUZsb2F0KHRoaXMuX3VuaU1vdGlvbiwgKHRoaXMuX21vdGlvbiArPSAwLjAyKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Byb2dyYW0uc2V0VW5pZm9ybUxvY2F0aW9uV2l0aDFmKHRoaXMuX3VuaU1vdGlvbiwgKHRoaXMuX21vdGlvbiArPSAwLjAyKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3JhbS51cGRhdGVVbmlmb3JtcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoIDEuMGUyMCA8IHRoaXMuX21vdGlvbiApeyB0aGlzLl9tb3Rpb24gPSAwOyB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdfQ==

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/Script/GameLoad');
require('./assets/Script/GameMain');
require('./assets/Script/GameMenu');
require('./assets/Script/GameResult');
require('./assets/Script/GameStep');
require('./assets/Script/common/BgSetting');
require('./assets/Script/common/Common_CommonUtil');
require('./assets/Script/common/GameEndRank');
require('./assets/Script/common/GuideManager');
require('./assets/Script/common/PlatformCom');
require('./assets/Script/common/RankList');
require('./assets/Script/common/ReliveViewCtrl');
require('./assets/Script/common/ShareSdk');
require('./assets/Script/common/SubdomineDisplay');
require('./assets/Script/common/Utils');
require('./assets/Script/common/Wxlife');
require('./assets/Script/common/event_listener');
require('./assets/Script/common/launch');
require('./assets/Script/common/shader/EffectCommon');
require('./assets/Script/common/shader/Wave_VH');
require('./assets/Script/common/shader/ccShader_Default_Vert');
require('./assets/Script/common/shader/ccShader_Default_Vert_noMVP');
require('./assets/Script/common/shader/ccShader_Wave_VH_Frag');
require('./assets/Script/common/shader/ccShader_wave');
require('./assets/Script/dataStatistics/Data');
require('./assets/Script/frame/puremvc/PureMVC');
require('./assets/Script/item/BgItem');
require('./assets/Script/item/BigStepItem');
require('./assets/Script/item/BlockBGItem');
require('./assets/Script/item/BlockItem');
require('./assets/Script/item/BombEffectItem');
require('./assets/Script/item/GetBoxGiftItem');
require('./assets/Script/item/MonsterItem');
require('./assets/Script/item/RockItem');
require('./assets/Script/item/ShapeItem');
require('./assets/Script/item/ShareTipsItem');
require('./assets/Script/item/SkinItem');
require('./assets/Script/item/SkinPanel');
require('./assets/Script/item/StepViewItem');
require('./assets/Script/item/UseToolItem');
require('./assets/Script/newBie/NewBieGift');
require('./assets/migration/use_reversed_rotateBy');
require('./assets/migration/use_v2.0.x_cc.Toggle_event');

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
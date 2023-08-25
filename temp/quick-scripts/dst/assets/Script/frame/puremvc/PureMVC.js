
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/frame/puremvc/PureMVC.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '01faa7O74JKEa1IQ/losA0i', 'PureMVC');
// Script/frame/puremvc/PureMVC.ts

/**
 * PureMVC Standard Framework for TypeScript - Copyright © 2012 Frederic Saunier
 * PureMVC Framework - Copyright © 2006-2012 Futurescale, Inc.
 * All rights reserved.
 * modify by jianfen wu
 */
var PureMVC;
(function (PureMVC) {
    "use strict";
    var Observer = /** @class */ (function () {
        function Observer() {
        }
        return Observer;
    }());
    PureMVC.Observer = Observer;
    var Notifier = /** @class */ (function () {
        function Notifier() {
            this.facade = Facade.getInstance();
        }
        Notifier.prototype.sendNotification = function (name, args) {
            this.facade.sendNotification(name, args);
        };
        return Notifier;
    }());
    PureMVC.Notifier = Notifier;
    var Proxy = /** @class */ (function (_super) {
        __extends(Proxy, _super);
        function Proxy(name, data) {
            var _this = _super.call(this) || this;
            if (name === void 0) {
                throw Error("Invalid Proxy Name");
            }
            _this.proxyName = name;
            if (data !== void 0) {
                _this.data = data;
            }
            return _this;
        }
        Proxy.prototype.getProxyName = function () {
            return this.proxyName || null;
        };
        Proxy.prototype.onRegister = function () {
        };
        Proxy.prototype.onRemove = function () {
        };
        Proxy.prototype.setData = function (data) {
            this.data = data;
        };
        Proxy.prototype.getData = function () {
            return this.data;
        };
        return Proxy;
    }(Notifier));
    PureMVC.Proxy = Proxy;
    var Controller = /** @class */ (function () {
        function Controller() {
            this.commands = {};
            if (Controller.inst !== null) {
                throw Error(Controller.SINGLETON_MSG);
            }
            Controller.inst = this;
        }
        Controller.prototype.executeCommand = function (name, args) {
            var cls = this.commands[name];
            var command = new cls();
            if (args === void 0) {
                command.execute.call(command);
            }
            else if (args instanceof Array) {
                command.execute.apply(command, args);
            }
            else {
                command.execute.call(command, args);
            }
        };
        Controller.prototype.registerCommand = function (name, cls) {
            if (this.hasCommand(name) === true) {
                throw Error("Register Duplicate Command " + name);
            }
            this.commands[name] = cls;
            View.inst.registerObserver(name, this.executeCommand, this);
        };
        Controller.prototype.removeCommand = function (name) {
            if (this.hasCommand(name) === false) {
                throw Error("Remove Non-Existent Command " + name);
            }
            delete this.commands[name];
            View.inst.removeObserver(name, this.executeCommand, this);
        };
        Controller.prototype.retrieveCommand = function (name) {
            return this.commands[name] || null;
        };
        Controller.prototype.hasCommand = function (name) {
            return this.retrieveCommand(name) != null;
        };
        Controller.SINGLETON_MSG = "Controller singleton already constructed!";
        Controller.inst = null;
        return Controller;
    }());
    PureMVC.Controller = Controller;
    var Model = /** @class */ (function () {
        function Model() {
            this.proxies = {};
            if (Model.inst !== null) {
                throw Error(Model.SINGLETON_MSG);
            }
            Model.inst = this;
        }
        Model.prototype.registerProxy = function (proxy) {
            var name = proxy.getProxyName();
            if (name === null) {
                throw Error("Register Invalid Proxy");
            }
            if (this.hasProxy(name) === true) {
                throw Error("Register Duplicate Proxy " + name);
            }
            this.proxies[name] = proxy;
            proxy.onRegister();
        };
        Model.prototype.removeProxy = function (name) {
            if (name === void 0) {
                throw Error("Remove Invalid Proxy");
            }
            var proxy = this.retrieveProxy(name);
            if (proxy === null) {
                throw Error("Remove Non-Existent Proxy " + name);
            }
            delete this.proxies[name];
            proxy.onRemove();
        };
        Model.prototype.retrieveProxy = function (name) {
            return this.proxies[name] || null;
        };
        Model.prototype.hasProxy = function (name) {
            return this.retrieveProxy(name) != null;
        };
        Model.SINGLETON_MSG = "Model singleton already constructed!";
        Model.inst = null;
        return Model;
    }());
    PureMVC.Model = Model;
    var View = /** @class */ (function () {
        function View() {
            this.mediators = {};
            this.observers = {};
            this.isCanceled = false;
            this.onceObservers = [];
            if (View.inst !== null) {
                throw Error(View.SINGLETON_MSG);
            }
            View.inst = this;
        }
        /**
         * @receiveOnce: 是否只响应一次，默认为false
         * @priority: 优先级，优先响应级别高的消息，值越大，级别越高，默认为1
         */
        View.prototype.registerObserver = function (name, method, caller, priority) {
            if (priority === void 0) { priority = 1; }
            if (name === void 0) {
                throw Error("Register Invalid Observer");
            }
            if (method === void 0) {
                throw Error("Register Invalid Observer Method");
            }
            var observers = this.observers[name];
            // 若列表不存在，则新建
            if (observers === void 0) {
                observers = this.observers[name] = [false];
            }
            // 若当前禁止直接更新，则复制列表
            else if (observers[0] === true) {
                observers = this.observers[name] = observers.concat();
                // 新生成的列表允许被更新
                observers[0] = false;
            }
            var index = -1;
            for (var i = 1; i < observers.length; i++) {
                var observer_1 = observers[i];
                if (observer_1.method === method && observer_1.caller === caller) {
                    return null;
                }
                // 优先级高的命令先执行
                if (index === -1 && observer_1.priority < priority) {
                    index = i;
                }
            }
            var observer = new Observer();
            observer.name = name;
            observer.caller = caller;
            observer.method = method;
            observer.priority = priority;
            if (index < 0) {
                observers.push(observer);
            }
            else {
                observers.splice(index, 0, observer);
            }
            return observer;
        };
        View.prototype.removeObserver = function (name, method, caller) {
            if (name === void 0) {
                throw Error("Remove Invalid Observer");
            }
            if (method === void 0) {
                throw Error("Remove Invalid Observer Method");
            }
            var observers = this.observers[name];
            // 无此类事件
            if (observers === void 0) {
                return;
            }
            // 若当前禁止直接更新，则复制列表
            if (observers[0] === true) {
                observers = this.observers[name] = observers.concat();
                // 新生成的列表允许被更新
                observers[0] = false;
            }
            for (var i = 1; i < observers.length; i++) {
                var observer = observers[i];
                if (observer.method === method && observer.caller === caller) {
                    observers.splice(i, 1);
                    break;
                }
            }
            // 移除空列表
            if (observers.length === 1) {
                delete this.observers[name];
            }
        };
        View.prototype.notifyCancel = function () {
            this.isCanceled = true;
        };
        View.prototype.notifyObservers = function (name, args) {
            if (name === void 0) {
                throw Error("Notify Invalid Command");
            }
            var observers = this.observers[name];
            // 无此类事件
            if (observers === void 0) {
                return;
            }
            // 标记禁止更新
            observers[0] = true;
            for (var i = 1; i < observers.length; i++) {
                var observer = observers[i];
                if (observer.caller === Controller.inst) {
                    observer.method.call(observer.caller, name, args);
                }
                else if (args === void 0) {
                    observer.method.call(observer.caller);
                }
                else if (args instanceof Array) {
                    observer.method.apply(observer.caller, args);
                }
                else {
                    observer.method.call(observer.caller, args);
                }
            }
            // 标记允许直接更新
            observers[0] = false;
        };
        View.prototype.registerMediator = function (mediator) {
            var name = mediator.getMediatorName();
            if (name === null) {
                throw Error("Register Invalid Mediator");
            }
            if (this.hasMediator(name) === true) {
                throw Error("Register Duplicate Mediator " + name);
            }
            this.mediators[name] = mediator;
            mediator.listNotificationInterests();
            mediator.onRegister();
        };
        View.prototype.removeMediator = function (name) {
            if (name === void 0) {
                throw Error("Remove Invalid Mediator");
            }
            var mediator = this.retrieveMediator(name);
            if (mediator === null) {
                throw Error("Remove Non-Existent Mediator " + name);
            }
            delete this.mediators[name];
            mediator.removeNotificationInterests();
            mediator.onRemove();
        };
        View.prototype.retrieveMediator = function (name) {
            return this.mediators[name] || null;
        };
        View.prototype.hasMediator = function (name) {
            return this.retrieveMediator(name) != null;
        };
        View.SINGLETON_MSG = "View singleton already constructed!";
        View.inst = null;
        return View;
    }());
    PureMVC.View = View;
    var Mediator = /** @class */ (function (_super) {
        __extends(Mediator, _super);
        function Mediator(name, viewComponent) {
            var _this = _super.call(this) || this;
            _this.notificationInterests = [];
            if (name === void 0) {
                throw Error("Invalid Mediator Name");
            }
            if (viewComponent === void 0) {
                throw Error("Invalid View Component");
            }
            _this.mediatorName = name;
            if (viewComponent !== void 0) {
                _this.viewComponent = viewComponent;
            }
            return _this;
        }
        Mediator.prototype.getMediatorName = function () {
            return this.mediatorName || null;
        };
        Mediator.prototype.getViewComponent = function () {
            return this.viewComponent;
        };
        Mediator.prototype.listNotificationInterests = function () {
        };
        Mediator.prototype.removeNotificationInterests = function () {
            for (var i = 0; i < this.notificationInterests.length; i++) {
                var observer = this.notificationInterests[i];
                View.inst.removeObserver(observer.name, observer.method, observer.caller);
            }
        };
        Mediator.prototype.handleNotification = function (name, method) {
            var observer = View.inst.registerObserver(name, method, this);
            observer && this.notificationInterests.push(observer);
        };
        Mediator.prototype.onRegister = function () {
        };
        Mediator.prototype.onRemove = function () {
        };
        return Mediator;
    }(Notifier));
    PureMVC.Mediator = Mediator;
    var Facade = /** @class */ (function () {
        function Facade() {
            this.view = new View();
            this.model = new Model();
            this.controller = new Controller();
            if (Facade.inst !== null) {
                throw Error(Facade.SINGLETON_MSG);
            }
            Facade.inst = this;
            this.initializeFacade();
        }
        Facade.getInstance = function () {
            if (Facade.inst === null) {
                Facade.inst = new Facade();
            }
            return Facade.inst;
        };
        Facade.prototype.initializeFacade = function () {
            this.initializeModel();
            this.initializeView();
            this.initializeController();
        };
        Facade.prototype.initializeModel = function () {
        };
        Facade.prototype.initializeView = function () {
        };
        Facade.prototype.initializeController = function () {
        };
        Facade.prototype.registerObserver = function (name, method, caller, priority) {
            this.view.registerObserver(name, method, caller, priority);
        };
        Facade.prototype.removeObserver = function (name, method, caller) {
            this.view.removeObserver(name, method, caller);
        };
        Facade.prototype.registerCommand = function (name, cls) {
            this.controller.registerCommand(name, cls);
        };
        Facade.prototype.removeCommand = function (name) {
            this.controller.removeCommand(name);
        };
        Facade.prototype.hasCommand = function (name) {
            return this.controller.hasCommand(name);
        };
        Facade.prototype.registerProxy = function (proxy) {
            this.model.registerProxy(proxy);
        };
        Facade.prototype.removeProxy = function (name) {
            this.model.removeProxy(name);
        };
        Facade.prototype.retrieveProxy = function (name) {
            return this.model.retrieveProxy(name);
        };
        Facade.prototype.hasProxy = function (name) {
            return this.model.hasProxy(name);
        };
        Facade.prototype.registerMediator = function (mediator) {
            this.view.registerMediator(mediator);
        };
        Facade.prototype.removeMediator = function (name) {
            this.view.removeMediator(name);
        };
        Facade.prototype.retrieveMediator = function (name) {
            return this.view.retrieveMediator(name);
        };
        Facade.prototype.hasMediator = function (name) {
            return this.view.hasMediator(name);
        };
        Facade.prototype.sendNotification = function (name, args) {
            this.view.notifyObservers(name, args);
        };
        Facade.prototype.notifyCancel = function () {
            this.view.notifyCancel();
        };
        Facade.SINGLETON_MSG = "Facade singleton already constructed!";
        Facade.inst = null;
        return Facade;
    }());
    PureMVC.Facade = Facade;
    var MacroCommand = /** @class */ (function (_super) {
        __extends(MacroCommand, _super);
        function MacroCommand() {
            var _this = _super.call(this) || this;
            _this.commands = [];
            _this.initializeMacroCommand();
            return _this;
        }
        MacroCommand.prototype.addSubCommand = function (cls) {
            this.commands.push(cls);
        };
        MacroCommand.prototype.execute = function () {
            for (var i = 0; i < this.commands.length; i++) {
                var cls = this.commands[i];
                var command = new cls();
                command.execute.apply(command, arguments);
            }
        };
        return MacroCommand;
    }(Notifier));
    PureMVC.MacroCommand = MacroCommand;
    var SimpleCommand = /** @class */ (function (_super) {
        __extends(SimpleCommand, _super);
        function SimpleCommand() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SimpleCommand;
    }(Notifier));
    PureMVC.SimpleCommand = SimpleCommand;
})(PureMVC || (PureMVC = {}));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcU2NyaXB0XFxmcmFtZVxccHVyZW12Y1xcUHVyZU1WQy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7R0FLRztBQUNILElBQU8sT0FBTyxDQWtrQmI7QUFsa0JELFdBQU8sT0FBTztJQUNWLFlBQVksQ0FBQztJQThFYjtRQUFBO1FBTUEsQ0FBQztRQUFELGVBQUM7SUFBRCxDQU5BLEFBTUMsSUFBQTtJQU5ZLGdCQUFRLFdBTXBCLENBQUE7SUFFRDtRQUdJO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkMsQ0FBQztRQUVELG1DQUFnQixHQUFoQixVQUFpQixJQUFZLEVBQUUsSUFBVTtZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQ0wsZUFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBVlksZ0JBQVEsV0FVcEIsQ0FBQTtJQUVEO1FBQTJCLHlCQUFRO1FBSy9CLGVBQVksSUFBWSxFQUFFLElBQVU7WUFBcEMsWUFDSSxpQkFBTyxTQVFWO1lBUEcsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLE1BQU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7YUFDckM7WUFDRCxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDakIsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7YUFDcEI7O1FBQ0wsQ0FBQztRQUVELDRCQUFZLEdBQVo7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDO1FBQ2xDLENBQUM7UUFFRCwwQkFBVSxHQUFWO1FBQ0EsQ0FBQztRQUVELHdCQUFRLEdBQVI7UUFDQSxDQUFDO1FBRUQsdUJBQU8sR0FBUCxVQUFRLElBQVM7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QixFQUFFLENBQUM7WUFJN0MsS0FBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7O1FBQ2xDLENBQUM7UUFJRCxvQ0FBYSxHQUFiLFVBQWMsR0FBdUI7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVELDhCQUFPLEdBQVA7WUFDSSxLQUFLLElBQUksQ0FBQyxHQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25ELElBQU0sR0FBRyxHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxJQUFNLE9BQU8sR0FBYSxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDO1FBQ0wsbUJBQUM7SUFBRCxDQXJCQSxBQXFCQyxDQXJCMEMsUUFBUSxHQXFCbEQ7SUFyQnFCLG9CQUFZLGVBcUJqQyxDQUFBO0lBRUQ7UUFBNEMsaUNBQVE7UUFBcEQ7O1FBR0EsQ0FBQztRQUFELG9CQUFDO0lBQUQsQ0FIQSxBQUdDLENBSDJDLFFBQVEsR0FHbkQ7SUFIcUIscUJBQWEsZ0JBR2xDLENBQUE7QUFDTCxDQUFDLEVBbGtCTSxPQUFPLEtBQVAsT0FBTyxRQWtrQmIiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFB1cmVNVkMgU3RhbmRhcmQgRnJhbWV3b3JrIGZvciBUeXBlU2NyaXB0IC0gQ29weXJpZ2h0IMKpIDIwMTIgRnJlZGVyaWMgU2F1bmllclxuICogUHVyZU1WQyBGcmFtZXdvcmsgLSBDb3B5cmlnaHQgwqkgMjAwNi0yMDEyIEZ1dHVyZXNjYWxlLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogbW9kaWZ5IGJ5IGppYW5mZW4gd3VcbiAqL1xubW9kdWxlIFB1cmVNVkMge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU5vdGlmaWVyIHtcbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiB2b2lkO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU9ic2VydmVyIHtcbiAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICBjYWxsZXI6IE9iamVjdDtcbiAgICAgICAgbWV0aG9kOiBGdW5jdGlvbjtcbiAgICAgICAgcHJpb3JpdHk6IG51bWJlcjtcbiAgICAgICAgcmVjZWl2ZU9uY2U6IGJvb2xlYW47XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29tbWFuZCBleHRlbmRzIElOb3RpZmllciB7XG4gICAgICAgIGV4ZWN1dGUoLi4uYXJnczogQXJyYXk8YW55Pik6IHZvaWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJUHJveHkgZXh0ZW5kcyBJTm90aWZpZXIge1xuICAgICAgICBnZXRQcm94eU5hbWUoKTogc3RyaW5nO1xuICAgICAgICBvblJlZ2lzdGVyKCk6IHZvaWQ7XG4gICAgICAgIG9uUmVtb3ZlKCk6IHZvaWQ7XG4gICAgICAgIHNldERhdGEoZGF0YTogYW55KTogdm9pZDtcbiAgICAgICAgZ2V0RGF0YSgpOiBhbnk7XG4gICAgfVxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSU1lZGlhdG9yIGV4dGVuZHMgSU5vdGlmaWVyIHtcbiAgICAgICAgZ2V0TWVkaWF0b3JOYW1lKCk6IHN0cmluZztcbiAgICAgICAgZ2V0Vmlld0NvbXBvbmVudCgpOiBhbnk7XG4gICAgICAgIGxpc3ROb3RpZmljYXRpb25JbnRlcmVzdHMoKTogdm9pZDtcbiAgICAgICAgcmVtb3ZlTm90aWZpY2F0aW9uSW50ZXJlc3RzKCk6IHZvaWQ7XG4gICAgICAgIGhhbmRsZU5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIG1ldGhvZDogRnVuY3Rpb24pOiB2b2lkO1xuICAgICAgICBvblJlZ2lzdGVyKCk6IHZvaWQ7XG4gICAgICAgIG9uUmVtb3ZlKCk6IHZvaWQ7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJQ29udHJvbGxlciB7XG4gICAgICAgIGV4ZWN1dGVDb21tYW5kKG5hbWU6IHN0cmluZywgYXJnczogYW55KTogdm9pZDtcbiAgICAgICAgcmVnaXN0ZXJDb21tYW5kKG5hbWU6IHN0cmluZywgY2xzOiBuZXcgKCkgPT4gSUNvbW1hbmQpOiB2b2lkO1xuICAgICAgICByZW1vdmVDb21tYW5kKG5hbWU6IHN0cmluZyk6IHZvaWQ7XG4gICAgICAgIHJldHJpZXZlQ29tbWFuZChuYW1lOiBzdHJpbmcpOiBuZXcgKCkgPT4gSUNvbW1hbmQ7XG4gICAgICAgIGhhc0NvbW1hbmQobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElNb2RlbCB7XG4gICAgICAgIHJlZ2lzdGVyUHJveHkocHJveHk6IElQcm94eSk6IHZvaWQ7XG4gICAgICAgIHJlbW92ZVByb3h5KG5hbWU6IHN0cmluZyk6IHZvaWQ7XG4gICAgICAgIHJldHJpZXZlUHJveHkobmFtZTogc3RyaW5nKTogSVByb3h5O1xuICAgICAgICBoYXNQcm94eShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xuICAgICAgICByZWdpc3Rlck9ic2VydmVyKG5hbWU6IHN0cmluZywgbWV0aG9kOiBGdW5jdGlvbiwgY2FsbGVyOiBPYmplY3QsIHByaW9yaXR5PzogbnVtYmVyKTogSU9ic2VydmVyO1xuICAgICAgICByZW1vdmVPYnNlcnZlcihuYW1lOiBzdHJpbmcsIG1ldGhvZDogRnVuY3Rpb24sIGNhbGxlcjogT2JqZWN0KTogdm9pZDtcbiAgICAgICAgbm90aWZ5Q2FuY2VsKCk6IHZvaWQ7XG4gICAgICAgIG5vdGlmeU9ic2VydmVycyhuYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiB2b2lkO1xuICAgICAgICByZWdpc3Rlck1lZGlhdG9yKG1lZGlhdG9yOiBJTWVkaWF0b3IpOiB2b2lkO1xuICAgICAgICByZW1vdmVNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICAgICAgICByZXRyaWV2ZU1lZGlhdG9yKG5hbWU6IHN0cmluZyk6IElNZWRpYXRvcjtcbiAgICAgICAgaGFzTWVkaWF0b3IobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElGYWNhZGUge1xuICAgICAgICByZWdpc3Rlck9ic2VydmVyKG5hbWU6IHN0cmluZywgbWV0aG9kOiBGdW5jdGlvbiwgY2FsbGVyOiBPYmplY3QsIHByaW9yaXR5PzogbnVtYmVyKTogdm9pZDtcbiAgICAgICAgcmVtb3ZlT2JzZXJ2ZXIobmFtZTogc3RyaW5nLCBtZXRob2Q6IEZ1bmN0aW9uLCBjYWxsZXI6IE9iamVjdCk6IHZvaWQ7XG4gICAgICAgIHJlZ2lzdGVyQ29tbWFuZChuYW1lOiBzdHJpbmcsIGNsczogbmV3ICgpID0+IElDb21tYW5kKTogdm9pZDtcbiAgICAgICAgcmVtb3ZlQ29tbWFuZChuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICAgICAgICBoYXNDb21tYW5kKG5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gICAgICAgIHJlZ2lzdGVyUHJveHkocHJveHk6IElQcm94eSk6IHZvaWQ7XG4gICAgICAgIHJlbW92ZVByb3h5KG5hbWU6IHN0cmluZyk6IHZvaWQ7XG4gICAgICAgIHJldHJpZXZlUHJveHkobmFtZTogc3RyaW5nKTogSVByb3h5O1xuICAgICAgICBoYXNQcm94eShuYW1lOiBzdHJpbmcpOiBib29sZWFuO1xuICAgICAgICByZWdpc3Rlck1lZGlhdG9yKG1lZGlhdG9yOiBJTWVkaWF0b3IpOiB2b2lkO1xuICAgICAgICByZW1vdmVNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiB2b2lkO1xuICAgICAgICByZXRyaWV2ZU1lZGlhdG9yKG5hbWU6IHN0cmluZyk6IElNZWRpYXRvcjtcbiAgICAgICAgaGFzTWVkaWF0b3IobmFtZTogc3RyaW5nKTogYm9vbGVhbjtcbiAgICAgICAgc2VuZE5vdGlmaWNhdGlvbihuYW1lOiBzdHJpbmcsIGFyZ3M/OiBhbnkpOiB2b2lkO1xuICAgICAgICBub3RpZnlDYW5jZWwoKTogdm9pZDtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgT2JzZXJ2ZXIgaW1wbGVtZW50cyBJT2JzZXJ2ZXIge1xuICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIGNhbGxlcjogT2JqZWN0O1xuICAgICAgICBtZXRob2Q6IEZ1bmN0aW9uO1xuICAgICAgICBwcmlvcml0eTogbnVtYmVyO1xuICAgICAgICByZWNlaXZlT25jZTogYm9vbGVhbjtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTm90aWZpZXIge1xuICAgICAgICBwcm90ZWN0ZWQgZmFjYWRlOiBJRmFjYWRlO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgdGhpcy5mYWNhZGUgPSBGYWNhZGUuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbmROb3RpZmljYXRpb24obmFtZTogc3RyaW5nLCBhcmdzPzogYW55KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmZhY2FkZS5zZW5kTm90aWZpY2F0aW9uKG5hbWUsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIFByb3h5IGV4dGVuZHMgTm90aWZpZXIgaW1wbGVtZW50cyBJUHJveHkge1xuICAgICAgICBwcml2YXRlIHByb3h5TmFtZTogc3RyaW5nO1xuXG4gICAgICAgIHByb3RlY3RlZCBkYXRhOiBhbnk7XG5cbiAgICAgICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBkYXRhPzogYW55KSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuICAgICAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBQcm94eSBOYW1lXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm94eU5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgaWYgKGRhdGEgIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBnZXRQcm94eU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3h5TmFtZSB8fCBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgb25SZWdpc3RlcigpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uUmVtb3ZlKCk6IHZvaWQge1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RGF0YShkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBnZXREYXRhKCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgaW1wbGVtZW50cyBJQ29udHJvbGxlciB7XG4gICAgICAgIHN0YXRpYyByZWFkb25seSBTSU5HTEVUT05fTVNHOiBzdHJpbmcgPSBcIkNvbnRyb2xsZXIgc2luZ2xldG9uIGFscmVhZHkgY29uc3RydWN0ZWQhXCI7XG4gICAgICAgIHN0YXRpYyBpbnN0OiBJQ29udHJvbGxlciA9IG51bGw7XG5cbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogeyBbbmFtZTogc3RyaW5nXTogbmV3ICgpID0+IElDb21tYW5kIH0gPSB7fTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGlmIChDb250cm9sbGVyLmluc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihDb250cm9sbGVyLlNJTkdMRVRPTl9NU0cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgQ29udHJvbGxlci5pbnN0ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGV4ZWN1dGVDb21tYW5kKG5hbWU6IHN0cmluZywgYXJnczogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBjbHM6IG5ldyAoKSA9PiBJQ29tbWFuZCA9IHRoaXMuY29tbWFuZHNbbmFtZV07XG4gICAgICAgICAgICBjb25zdCBjb21tYW5kOiBJQ29tbWFuZCA9IG5ldyBjbHMoKTtcbiAgICAgICAgICAgIGlmIChhcmdzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUuY2FsbChjb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZS5hcHBseShjb21tYW5kLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZS5jYWxsKGNvbW1hbmQsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJDb21tYW5kKG5hbWU6IHN0cmluZywgY2xzOiBuZXcgKCkgPT4gSUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0NvbW1hbmQobmFtZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlZ2lzdGVyIER1cGxpY2F0ZSBDb21tYW5kIFwiICsgbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRzW25hbWVdID0gY2xzO1xuICAgICAgICAgICAgVmlldy5pbnN0LnJlZ2lzdGVyT2JzZXJ2ZXIobmFtZSwgdGhpcy5leGVjdXRlQ29tbWFuZCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDb21tYW5kKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzQ29tbWFuZChuYW1lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlbW92ZSBOb24tRXhpc3RlbnQgQ29tbWFuZCBcIiArIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29tbWFuZHNbbmFtZV07XG4gICAgICAgICAgICBWaWV3Lmluc3QucmVtb3ZlT2JzZXJ2ZXIobmFtZSwgdGhpcy5leGVjdXRlQ29tbWFuZCwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXRyaWV2ZUNvbW1hbmQobmFtZTogc3RyaW5nKTogbmV3ICgpID0+IElDb21tYW5kIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbW1hbmRzW25hbWVdIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNDb21tYW5kKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmV0cmlldmVDb21tYW5kKG5hbWUpICE9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgTW9kZWwgaW1wbGVtZW50cyBJTW9kZWwge1xuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgU0lOR0xFVE9OX01TRzogc3RyaW5nID0gXCJNb2RlbCBzaW5nbGV0b24gYWxyZWFkeSBjb25zdHJ1Y3RlZCFcIjtcbiAgICAgICAgc3RhdGljIGluc3Q6IElNb2RlbCA9IG51bGw7XG5cbiAgICAgICAgcHJpdmF0ZSBwcm94aWVzOiB7IFtuYW1lOiBzdHJpbmddOiBJUHJveHkgfSA9IHt9O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgaWYgKE1vZGVsLmluc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihNb2RlbC5TSU5HTEVUT05fTVNHKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIE1vZGVsLmluc3QgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJQcm94eShwcm94eTogSVByb3h5KTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBuYW1lOiBzdHJpbmcgPSBwcm94eS5nZXRQcm94eU5hbWUoKTtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZWdpc3RlciBJbnZhbGlkIFByb3h5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzUHJveHkobmFtZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlZ2lzdGVyIER1cGxpY2F0ZSBQcm94eSBcIiArIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wcm94aWVzW25hbWVdID0gcHJveHk7XG4gICAgICAgICAgICBwcm94eS5vblJlZ2lzdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm94eShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlbW92ZSBJbnZhbGlkIFByb3h5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgcHJveHk6IElQcm94eSA9IHRoaXMucmV0cmlldmVQcm94eShuYW1lKTtcbiAgICAgICAgICAgIGlmIChwcm94eSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiUmVtb3ZlIE5vbi1FeGlzdGVudCBQcm94eSBcIiArIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMucHJveGllc1tuYW1lXTtcbiAgICAgICAgICAgIHByb3h5Lm9uUmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXRyaWV2ZVByb3h5KG5hbWU6IHN0cmluZyk6IElQcm94eSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm94aWVzW25hbWVdIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNQcm94eShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlUHJveHkobmFtZSkgIT0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBWaWV3IGltcGxlbWVudHMgSVZpZXcge1xuICAgICAgICBzdGF0aWMgcmVhZG9ubHkgU0lOR0xFVE9OX01TRzogc3RyaW5nID0gXCJWaWV3IHNpbmdsZXRvbiBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xuICAgICAgICBzdGF0aWMgaW5zdDogSVZpZXcgPSBudWxsO1xuXG4gICAgICAgIHByaXZhdGUgbWVkaWF0b3JzOiB7IFtuYW1lOiBzdHJpbmddOiBJTWVkaWF0b3IgfSA9IHt9O1xuICAgICAgICBwcml2YXRlIG9ic2VydmVyczogeyBbbmFtZTogc3RyaW5nXTogQXJyYXk8Ym9vbGVhbiB8IElPYnNlcnZlcj4gfSA9IHt9O1xuXG4gICAgICAgIHByaXZhdGUgaXNDYW5jZWxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwcml2YXRlIG9uY2VPYnNlcnZlcnM6IEFycmF5PElPYnNlcnZlcj4gPSBbXTtcblxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIGlmIChWaWV3Lmluc3QgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihWaWV3LlNJTkdMRVRPTl9NU0cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgVmlldy5pbnN0ID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcmVjZWl2ZU9uY2U6IOaYr+WQpuWPquWTjeW6lOS4gOasoe+8jOm7mOiupOS4umZhbHNlXG4gICAgICAgICAqIEBwcmlvcml0eTog5LyY5YWI57qn77yM5LyY5YWI5ZON5bqU57qn5Yir6auY55qE5raI5oGv77yM5YC86LaK5aSn77yM57qn5Yir6LaK6auY77yM6buY6K6k5Li6MVxuICAgICAgICAgKi9cbiAgICAgICAgcmVnaXN0ZXJPYnNlcnZlcihuYW1lOiBzdHJpbmcsIG1ldGhvZDogRnVuY3Rpb24sIGNhbGxlcjogT2JqZWN0LCBwcmlvcml0eTogbnVtYmVyID0gMSk6IElPYnNlcnZlciB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZWdpc3RlciBJbnZhbGlkIE9ic2VydmVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZWdpc3RlciBJbnZhbGlkIE9ic2VydmVyIE1ldGhvZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBvYnNlcnZlcnM6IEFycmF5PGJvb2xlYW4gfCBJT2JzZXJ2ZXI+ID0gdGhpcy5vYnNlcnZlcnNbbmFtZV07XG4gICAgICAgICAgICAvLyDoi6XliJfooajkuI3lrZjlnKjvvIzliJnmlrDlu7pcbiAgICAgICAgICAgIGlmIChvYnNlcnZlcnMgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVycyA9IHRoaXMub2JzZXJ2ZXJzW25hbWVdID0gW2ZhbHNlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOiLpeW9k+WJjeemgeatouebtOaOpeabtOaWsO+8jOWImeWkjeWItuWIl+ihqFxuICAgICAgICAgICAgZWxzZSBpZiAob2JzZXJ2ZXJzWzBdID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzID0gdGhpcy5vYnNlcnZlcnNbbmFtZV0gPSBvYnNlcnZlcnMuY29uY2F0KCk7XG4gICAgICAgICAgICAgICAgLy8g5paw55Sf5oiQ55qE5YiX6KGo5YWB6K646KKr5pu05pawXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXJzWzBdID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBpbmRleDogbnVtYmVyID0gLTE7XG4gICAgICAgICAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDwgb2JzZXJ2ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXI6IElPYnNlcnZlciA9IG9ic2VydmVyc1tpXSBhcyBJT2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmVyLm1ldGhvZCA9PT0gbWV0aG9kICYmIG9ic2VydmVyLmNhbGxlciA9PT0gY2FsbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDkvJjlhYjnuqfpq5jnmoTlkb3ku6TlhYjmiafooYxcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IC0xICYmIG9ic2VydmVyLnByaW9yaXR5IDwgcHJpb3JpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXI6IElPYnNlcnZlciA9IG5ldyBPYnNlcnZlcigpO1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICBvYnNlcnZlci5jYWxsZXIgPSBjYWxsZXI7XG4gICAgICAgICAgICBvYnNlcnZlci5tZXRob2QgPSBtZXRob2Q7XG4gICAgICAgICAgICBvYnNlcnZlci5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ic2VydmVycy5zcGxpY2UoaW5kZXgsIDAsIG9ic2VydmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZU9ic2VydmVyKG5hbWU6IHN0cmluZywgbWV0aG9kOiBGdW5jdGlvbiwgY2FsbGVyOiBPYmplY3QpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlbW92ZSBJbnZhbGlkIE9ic2VydmVyXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZW1vdmUgSW52YWxpZCBPYnNlcnZlciBNZXRob2RcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXJzOiBBcnJheTxib29sZWFuIHwgSU9ic2VydmVyPiA9IHRoaXMub2JzZXJ2ZXJzW25hbWVdO1xuICAgICAgICAgICAgLy8g5peg5q2k57G75LqL5Lu2XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDoi6XlvZPliY3npoHmraLnm7TmjqXmm7TmlrDvvIzliJnlpI3liLbliJfooahcbiAgICAgICAgICAgIGlmIChvYnNlcnZlcnNbMF0gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnMgPSB0aGlzLm9ic2VydmVyc1tuYW1lXSA9IG9ic2VydmVycy5jb25jYXQoKTtcbiAgICAgICAgICAgICAgICAvLyDmlrDnlJ/miJDnmoTliJfooajlhYHorrjooqvmm7TmlrBcbiAgICAgICAgICAgICAgICBvYnNlcnZlcnNbMF0gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlcjogSU9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldIGFzIElPYnNlcnZlcjtcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIubWV0aG9kID09PSBtZXRob2QgJiYgb2JzZXJ2ZXIuY2FsbGVyID09PSBjYWxsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g56e76Zmk56m65YiX6KGoXG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9ic2VydmVyc1tuYW1lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5vdGlmeUNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuaXNDYW5jZWxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBub3RpZnlPYnNlcnZlcnMobmFtZTogc3RyaW5nLCBhcmdzPzogYW55KTogdm9pZCB7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJOb3RpZnkgSW52YWxpZCBDb21tYW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzOiBBcnJheTxib29sZWFuIHwgSU9ic2VydmVyPiA9IHRoaXMub2JzZXJ2ZXJzW25hbWVdO1xuICAgICAgICAgICAgLy8g5peg5q2k57G75LqL5Lu2XG4gICAgICAgICAgICBpZiAob2JzZXJ2ZXJzID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDmoIforrDnpoHmraLmm7TmlrBcbiAgICAgICAgICAgIG9ic2VydmVyc1swXSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBvYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBvYnNlcnZlcjogSU9ic2VydmVyID0gb2JzZXJ2ZXJzW2ldIGFzIElPYnNlcnZlcjtcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2ZXIuY2FsbGVyID09PSBDb250cm9sbGVyLmluc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubWV0aG9kLmNhbGwob2JzZXJ2ZXIuY2FsbGVyLCBuYW1lLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoYXJncyA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm1ldGhvZC5jYWxsKG9ic2VydmVyLmNhbGxlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5tZXRob2QuYXBwbHkob2JzZXJ2ZXIuY2FsbGVyLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm1ldGhvZC5jYWxsKG9ic2VydmVyLmNhbGxlciwgYXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8g5qCH6K6w5YWB6K6455u05o6l5pu05pawXG4gICAgICAgICAgICBvYnNlcnZlcnNbMF0gPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyTWVkaWF0b3IobWVkaWF0b3I6IElNZWRpYXRvcik6IHZvaWQge1xuICAgICAgICAgICAgY29uc3QgbmFtZTogc3RyaW5nID0gbWVkaWF0b3IuZ2V0TWVkaWF0b3JOYW1lKCk7XG4gICAgICAgICAgICBpZiAobmFtZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiUmVnaXN0ZXIgSW52YWxpZCBNZWRpYXRvclwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhhc01lZGlhdG9yKG5hbWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJSZWdpc3RlciBEdXBsaWNhdGUgTWVkaWF0b3IgXCIgKyBuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubWVkaWF0b3JzW25hbWVdID0gbWVkaWF0b3I7XG4gICAgICAgICAgICBtZWRpYXRvci5saXN0Tm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XG4gICAgICAgICAgICBtZWRpYXRvci5vblJlZ2lzdGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIlJlbW92ZSBJbnZhbGlkIE1lZGlhdG9yXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgbWVkaWF0b3I6IElNZWRpYXRvciA9IHRoaXMucmV0cmlldmVNZWRpYXRvcihuYW1lKTtcbiAgICAgICAgICAgIGlmIChtZWRpYXRvciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwiUmVtb3ZlIE5vbi1FeGlzdGVudCBNZWRpYXRvciBcIiArIG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWVkaWF0b3JzW25hbWVdO1xuICAgICAgICAgICAgbWVkaWF0b3IucmVtb3ZlTm90aWZpY2F0aW9uSW50ZXJlc3RzKCk7XG4gICAgICAgICAgICBtZWRpYXRvci5vblJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0cmlldmVNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiBJTWVkaWF0b3Ige1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVkaWF0b3JzW25hbWVdIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJldHJpZXZlTWVkaWF0b3IobmFtZSkgIT0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBNZWRpYXRvciBleHRlbmRzIE5vdGlmaWVyIGltcGxlbWVudHMgSU1lZGlhdG9yIHtcbiAgICAgICAgcHJpdmF0ZSBtZWRpYXRvck5hbWU6IHN0cmluZztcbiAgICAgICAgcHJpdmF0ZSBub3RpZmljYXRpb25JbnRlcmVzdHM6IEFycmF5PElPYnNlcnZlcj4gPSBbXTtcblxuICAgICAgICBwcm90ZWN0ZWQgdmlld0NvbXBvbmVudDogYW55O1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgdmlld0NvbXBvbmVudD86IGFueSkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgTWVkaWF0b3IgTmFtZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2aWV3Q29tcG9uZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgVmlldyBDb21wb25lbnRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1lZGlhdG9yTmFtZSA9IG5hbWU7XG4gICAgICAgICAgICBpZiAodmlld0NvbXBvbmVudCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q29tcG9uZW50ID0gdmlld0NvbXBvbmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdldE1lZGlhdG9yTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWVkaWF0b3JOYW1lIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRWaWV3Q29tcG9uZW50KCk6IGFueSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3Q29tcG9uZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdE5vdGlmaWNhdGlvbkludGVyZXN0cygpOiB2b2lkIHtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZU5vdGlmaWNhdGlvbkludGVyZXN0cygpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLm5vdGlmaWNhdGlvbkludGVyZXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyOiBJT2JzZXJ2ZXIgPSB0aGlzLm5vdGlmaWNhdGlvbkludGVyZXN0c1tpXTtcbiAgICAgICAgICAgICAgICBWaWV3Lmluc3QucmVtb3ZlT2JzZXJ2ZXIob2JzZXJ2ZXIubmFtZSwgb2JzZXJ2ZXIubWV0aG9kLCBvYnNlcnZlci5jYWxsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlTm90aWZpY2F0aW9uKG5hbWU6IHN0cmluZywgbWV0aG9kOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXI6IElPYnNlcnZlciA9IFZpZXcuaW5zdC5yZWdpc3Rlck9ic2VydmVyKG5hbWUsIG1ldGhvZCwgdGhpcyk7XG4gICAgICAgICAgICBvYnNlcnZlciAmJiB0aGlzLm5vdGlmaWNhdGlvbkludGVyZXN0cy5wdXNoKG9ic2VydmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uUmVnaXN0ZXIoKTogdm9pZCB7XG4gICAgICAgIH1cblxuICAgICAgICBvblJlbW92ZSgpOiB2b2lkIHtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBGYWNhZGUgaW1wbGVtZW50cyBJRmFjYWRlIHtcbiAgICAgICAgc3RhdGljIHJlYWRvbmx5IFNJTkdMRVRPTl9NU0c6IHN0cmluZyA9IFwiRmFjYWRlIHNpbmdsZXRvbiBhbHJlYWR5IGNvbnN0cnVjdGVkIVwiO1xuICAgICAgICBzdGF0aWMgaW5zdDogSUZhY2FkZSA9IG51bGw7XG5cbiAgICAgICAgc3RhdGljIGdldEluc3RhbmNlKCk6IElGYWNhZGUge1xuICAgICAgICAgICAgaWYgKEZhY2FkZS5pbnN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgRmFjYWRlLmluc3QgPSBuZXcgRmFjYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRmFjYWRlLmluc3Q7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZpZXc6IElWaWV3ID0gbmV3IFZpZXcoKTtcbiAgICAgICAgcHJpdmF0ZSBtb2RlbDogSU1vZGVsID0gbmV3IE1vZGVsKCk7XG4gICAgICAgIHByaXZhdGUgY29udHJvbGxlcjogSUNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgaWYgKEZhY2FkZS5pbnN0ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoRmFjYWRlLlNJTkdMRVRPTl9NU0cpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRmFjYWRlLmluc3QgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplRmFjYWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIGluaXRpYWxpemVGYWNhZGUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVNb2RlbCgpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlldygpO1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplQ29udHJvbGxlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGluaXRpYWxpemVNb2RlbCgpOiB2b2lkIHtcblxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGluaXRpYWxpemVWaWV3KCk6IHZvaWQge1xuXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgaW5pdGlhbGl6ZUNvbnRyb2xsZXIoKTogdm9pZCB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyT2JzZXJ2ZXIobmFtZTogc3RyaW5nLCBtZXRob2Q6IEZ1bmN0aW9uLCBjYWxsZXI6IE9iamVjdCwgcHJpb3JpdHk/OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5yZWdpc3Rlck9ic2VydmVyKG5hbWUsIG1ldGhvZCwgY2FsbGVyLCBwcmlvcml0eSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVPYnNlcnZlcihuYW1lOiBzdHJpbmcsIG1ldGhvZDogRnVuY3Rpb24sIGNhbGxlcjogT2JqZWN0KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVtb3ZlT2JzZXJ2ZXIobmFtZSwgbWV0aG9kLCBjYWxsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJDb21tYW5kKG5hbWU6IHN0cmluZywgY2xzOiBuZXcgKCkgPT4gSUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlci5yZWdpc3RlckNvbW1hbmQobmFtZSwgY2xzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZUNvbW1hbmQobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIucmVtb3ZlQ29tbWFuZChuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhhc0NvbW1hbmQobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb250cm9sbGVyLmhhc0NvbW1hbmQobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlclByb3h5KHByb3h5OiBJUHJveHkpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVnaXN0ZXJQcm94eShwcm94eSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVQcm94eShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwucmVtb3ZlUHJveHkobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXRyaWV2ZVByb3h5KG5hbWU6IHN0cmluZyk6IElQcm94eSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5yZXRyaWV2ZVByb3h5KG5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFzUHJveHkobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC5oYXNQcm94eShuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVyTWVkaWF0b3IobWVkaWF0b3I6IElNZWRpYXRvcik6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy52aWV3LnJlZ2lzdGVyTWVkaWF0b3IobWVkaWF0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlTWVkaWF0b3IobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpZXcucmVtb3ZlTWVkaWF0b3IobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXRyaWV2ZU1lZGlhdG9yKG5hbWU6IHN0cmluZyk6IElNZWRpYXRvciB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3LnJldHJpZXZlTWVkaWF0b3IobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNNZWRpYXRvcihuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXcuaGFzTWVkaWF0b3IobmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kTm90aWZpY2F0aW9uKG5hbWU6IHN0cmluZywgYXJncz86IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy52aWV3Lm5vdGlmeU9ic2VydmVycyhuYW1lLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vdGlmeUNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMudmlldy5ub3RpZnlDYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBhYnN0cmFjdCBjbGFzcyBNYWNyb0NvbW1hbmQgZXh0ZW5kcyBOb3RpZmllciBpbXBsZW1lbnRzIElDb21tYW5kIHtcbiAgICAgICAgcHJpdmF0ZSBjb21tYW5kczogQXJyYXk8bmV3ICgpID0+IElDb21tYW5kPiA9IFtdO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWJzdHJhY3QgaW5pdGlhbGl6ZU1hY3JvQ29tbWFuZCgpOiB2b2lkO1xuXG4gICAgICAgIGFkZFN1YkNvbW1hbmQoY2xzOiBuZXcgKCkgPT4gSUNvbW1hbmQpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucHVzaChjbHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZXhlY3V0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLmNvbW1hbmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2xzOiBuZXcgKCkgPT4gSUNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW2ldO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQ6IElDb21tYW5kID0gbmV3IGNscygpO1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlY3V0ZS5hcHBseShjb21tYW5kLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZXhwb3J0IGFic3RyYWN0IGNsYXNzIFNpbXBsZUNvbW1hbmQgZXh0ZW5kcyBOb3RpZmllciBpbXBsZW1lbnRzIElDb21tYW5kIHtcblxuICAgICAgICBhYnN0cmFjdCBleGVjdXRlKC4uLmFyZ3M6IEFycmF5PGFueT4pOiB2b2lkO1xuICAgIH1cbn1cbiJdfQ==
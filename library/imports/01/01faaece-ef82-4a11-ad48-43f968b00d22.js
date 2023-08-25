"use strict";
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
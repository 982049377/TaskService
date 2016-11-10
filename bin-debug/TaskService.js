var TaskService = (function () {
    function TaskService() {
        //private _tasklist:Task[]=[];
        this._observerlist = [];
        this._tasklist = {};
        TaskService.count++;
        if (TaskService.count > 1)
            throw 'singleton!!';
    }
    var d = __define,c=TaskService,p=c.prototype;
    TaskService.getIntance = function () {
        if (TaskService.instance == null) {
            TaskService.instance = new TaskService();
        }
        return TaskService.instance;
    };
    p.addTask = function (task) {
        this._tasklist[task.getid()] = task;
    };
    p.addObserver = function (observer) {
        this._observerlist.push(observer);
    };
    p.finish = function (id) {
        this._tasklist[id].finish();
        this.notify(id);
    };
    p.accept = function (id) {
        this._tasklist[id].accept();
        this.notify(id);
    };
    p.during = function (id) {
        this._tasklist[id].during();
        this.notify(id);
    };
    p.notify = function (id) {
        for (var _i = 0, _a = this._observerlist; _i < _a.length; _i++) {
            var s = _a[_i];
            s.onchange(this._tasklist[id]);
        }
    };
    TaskService.count = 0;
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map
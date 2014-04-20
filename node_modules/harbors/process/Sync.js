var harbors = require('../index');

harbors.Sync = harbors.Class.extend({

    //save task list
    _task: null,

    //sync type
    _type: null,

    //init
    ctor: function(type){

        this.ctor = type;
        this.task = [];
    },

    //add task
    setTask: function(fun){
        if(typeof fun === 'function'){
            this._task.push(fun);
        }else{
            harbors.log('setTask is error.');
        }
    },

    _runTask: function(fun){
        var self = this;
        var counter = 0;
        var end = function(){
            ++counter == self.taskList.length && fun();
        };
        var cycle = function(){
            for(var i=0;i<self.taskList.length;i++){
                self.taskList[i](cycle);
            }
        };
        var con = function(){
            if(counter == self.taskList.length){
                fun();
            }else{
                var _fun = self.taskList[counter++];
                _fun.call(_fun, con, arguments);
            }

        };

        switch(self.type){
            case 'enhance':
                con();
                break;
            default:
                cycle();
        }
    },

    //run task list
    runTask: function(fun){
        if(typeof fun === 'function'){
            this._runTask(fun);
        }else{
            harbors.log('runTask is error.');
        }
    }
});

//create sync object
harbors.Sync.create = function(type){

    if(typeof type !== 'string') type = 'enhance';
    return new harbors.Sync(type);
};
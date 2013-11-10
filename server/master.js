var cluster = require('cluster');
var http = require('http');

var app = {
    clearSession:function(){//自动清理session
        setTimeout(function(){
            for(var p in harbors.session){
                if((harbors.session[p].update-0)-(new Date()-0)<0){
                    delete harbors.session[p];
                }
            }
            app.clearSession();
        },harbors.config.clearSession);
    },
    createWorker:function(){//创建工作进程
        var cp = cluster.fork();
        cp.on('exit', function(code, signal) {
            harbors.config.deBug&&console.log("子进程错误,错误代码:"+code+";开始创建新子进程.");
            //重启worker（此时进程id会增加1，以示和原错误关闭进程区别）
            app.createWorker();
        });
    },
    start:function(){
        if (cluster.isMaster) {
            console.log('harbors服务器启动,监听端口:'+harbors.config.listenPort+'.开启子进程数量:'+harbors.config.clusterNum);
            for(var i=0;i<harbors.config.clusterNum;i++){
                app.createWorker();
            }
        } else if (cluster.isWorker) {
            http.createServer(function(req,res){
                harbors.config.deBug&&console.log('子进程接收数据请求 ID:' + cluster.worker.id);
                require('./server').init(req,res);
            }).listen(harbors.config.listenPort);
        }
        //自动清理session
        app.clearSession();
    }
};

module.exports = app;

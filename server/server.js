var _req,_res;
var app = {
    init:function(req,res){
        _req = req;
        _res = res;

        app.param();

        harbors.config.deBug&&console.log("递交控制器"+harbors.config.baseDir+'/'+harbors.vhost[req.vhost]['baseDir']+"/filter");
        //递交控制权限给vhost下的filter控制器
        try{
            require(harbors.config.baseDir+'/'+harbors.vhost[req.vhost]['baseDir']+"/filter")(_req,_res);
        }catch(err){
            console.log(err);
            harbors.config.deBug&&console.log("虚拟主机文件夹下的filter.js不存在或者语法出现错误");
            _res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
            _res.end("vhost is lost");
        }
    },
    param:function(){

        var param = require('./../lib/param').init(_req,_res);
        //封装访问路径以及访问文件
        _req.route = param.route(_req);
        //封装GET参数
        _req.Get = param.Get(_req);

        var cookie = require('./../lib/cookie').init(_req,_res);
        //封装cookie对象
        _req.Cookie = cookie.Cookie(_req);
        _res.setCookie = cookie.setCookie;
        _res.delCookie = cookie.delCookie;

        var session = require('./../lib/session').init(_req,_res);
        //封装session对象
        _req.Session = session.Session(_req);
        _res.setSession = session.setSession;
        _res.delSession = session.delSession;

        //封装vhost虚拟主机名
        _req.vhost = _req.headers.host.split(":")[0];
    }
};

module.exports = app;
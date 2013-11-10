var _req,_res;
var app = {
    init:function(req,res){
        _req = req;
        _res = res;

        app.param();

        //递交控制权限
        try{

            harbors.config.vhost ? (function(){//虚拟主机功能打开

                //判断服务器类型
                switch(harbors.vhost[req.vhost]['type']){
                    case 'dynamic':
                        require(harbors.config.baseDir+'/controller/'+harbors.vhost[req.vhost]['baseDir']+"/filter")(_req,_res);
                        break;
                    default:
                        //静态服务器
                        _res.display(_req.url);
                }

            })() : (function(){//虚拟主机功能关闭

                //判断服务器类型
                switch(harbors.config.serverType){
                    case 'dynamic':
                        console.log(harbors.config.baseDir+'/controller/filter')
                        require(harbors.config.baseDir+'/controller/filter')(_req,_res);
                        break;
                    default:
                        //静态服务器
                        _res.display(_req.url);
                }

            })();

        }catch(err){
            console.log(err);
            harbors.config.deBug&&console.log("解析路由路径出错。");
            _res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
            _res.end("host is lost");
        }
    },
    param:function(){

        var param = require('./../lib/param').init(_req,_res);
        //封装访问路径以及访问文件
        _req.route = param.route(_req);
        //封装GET参数
        _req.Get = param.Get(_req);

        //封装cookie对象
        var cookie = require('./../lib/cookie').init(_req,_res);
        _req.Cookie = cookie.Cookie(_req);
        _res.setCookie = cookie.setCookie;
        _res.delCookie = cookie.delCookie;

        //封装session对象
        harbors.config.session&&(function(){
            var session = require('./../lib/session').init(_req,_res);
            _req.Session = session.Session(_req);
            _res.setSession = session.setSession;
            _res.delSession = session.delSession;
        })();

        //封装vhost虚拟主机名
        _req.vhost = harbors.config.vhost ? _req.headers.host.split(":")[0] : '';

        //封装display方法
        _res.display = require('../lib/display').init(_req,_res).render;
    }
};

module.exports = app;
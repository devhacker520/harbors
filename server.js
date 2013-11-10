var _req,_res;
var app = {
    init:function(req,res){
        _req = req;
        _res = res;

        //封装vhost虚拟主机名
        _req.vhost = _req.headers.host.split(":")[0];

        //封装访问路径以及访问文件
        _req.route = methon.route(_req);
        //封装GET参数
        _req.Get = methon.Get(_req);
        //封装cookie对象
        _req.Cookie = methon.Cookie(_req);
        //封装session对象
        _req.Session = methon.Session();

        //封装res功能、方法
        _res.setCookie = methon.setCookie;
        _res.delCookie = methon.delCookie;
        _res.setSession = methon.setSession;
        _res.delSession = methon.delSession;


        harbors.config.deBug&&console.log("递交控制器"+harbors.config.baseDir+'/'+harbors.vhost[req.vhost]['baseDir']+"/filter");
        //递交控制权限给vhost下的filter控制器
        try{
            require(harbors.config.baseDir+'/'+harbors.vhost[req.vhost]['baseDir']+"/filter")(_req,_res);
        }catch(err){
            console.log(err)
            harbors.config.deBug&&console.log("虚拟主机文件夹下的filter.js不存在或者语法出现错误");
            _res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
            _res.end("vhost is lost");
        }
    }
};

var methon = {
    route:function(req){
        var temp = req.url.split("?");
        return temp[0].split("/").splice(1);//[ 'news', 'index' ]
    },
    Get:function(req){
        var temp = req.url.split("?");
        if(temp[1]){
            var Get = {};
            var temp = temp[1].split("&");
            for(var i=0;i<temp.length;i++){
                var temp_2 = temp[i].split("=");
                Get[temp_2[0]] = temp_2[1];
            }
            return Get;
        }else{return {}}//{ asdfwe: 'asdf' }
    },
    Cookie:function(req){
        if(!req.headers.cookie){
            return {};
        }
        var temp = req.headers.cookie.split(";");
        var cookie = {};
        for(var i=0;i<temp.length;i++){
            var temp_2 = temp[i].split("=");
            temp_2[0] = temp_2[0].replace(/^\s*/,'');
            cookie[temp_2[0]] = temp_2[1];
        }
        return cookie;
    },
    Session:function(){
        if(_req.Cookie[harbors.config.sessionId]&&harbors.session[_req.Cookie[harbors.config.sessionId]]){
            //检查session过期时间，如果未过期则更新过期时间
            harbors.session[_req.Cookie[harbors.config.sessionId]].update = (new Date()-0)+harbors.config.SessionSurvavil;
            console.log((harbors.session[_req.Cookie[harbors.config.sessionId]].update-0))
            return harbors.session[_req.Cookie[harbors.config.sessionId]];
        }else{
            return {};
        }
    },
    setCookie:function(cookie){
        var result = [];
        for(var p in cookie){
            result.push(p+"="+cookie[p]);
        }
        _res.setHeader("Set-Cookie", result);
    },
    delCookie:function(cookie){
        var result = [];
        for(var p in cookie){
            result.push(p+"="+cookie[p]+";expires="+new Date()+";");
        }
        _res.setHeader("Set-Cookie", result);
    },
    setSession:function(session){
        function randomChar(l) {//随机字符串
            var x="123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
            var tmp="";
            for(var i=0;i< l;i++) {
                tmp += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
            }
            return tmp;
        }
        //判断harborsid cookie是否存在
        var SessionId = '';
        if(_req.Cookie[harbors.config.sessionId]){
            SessionId = _req.Cookie[harbors.config.sessionId];
        }else{
            SessionId = randomChar(20);
            var cookie_t = {};
            cookie_t[harbors.config.sessionId] = SessionId;
            methon.setCookie(cookie_t);
        }
        //如果session记录不存在
        if(!harbors.session[SessionId]){
            harbors.session[SessionId] = {};
        }
        harbors.session[SessionId].update = (new Date()-0)+harbors.config.SessionSurvavil;

        for(var p in session){
            harbors.session[SessionId][p] = session[p];
        }
        _req.Session = harbors.session[SessionId];
    },
    delSession:function(session){
        //判断cookie存在，session存在
        if(_req.Cookie[harbors.config.sessionId]&&harbors.session[_req.Cookie[harbors.config.sessionId]]){
            for(var p in session){
                delete harbors.session[_req.Cookie[harbors.config.sessionId]][p];
            }
        }
    }
};



module.exports = app;
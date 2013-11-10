var _req,_res;
module.exports = {
    init:function(req,res){
        _req=req;_res=res;
        return this;
    },
    Cookie:function(){
        if(!_req.headers.cookie){
            return {};
        }
        var temp = _req.headers.cookie.split(";");
        var cookie = {};
        for(var i=0;i<temp.length;i++){
            var temp_2 = temp[i].split("=");
            temp_2[0] = temp_2[0].replace(/^\s*/,'');
            cookie[temp_2[0]] = temp_2[1];
        }
        return cookie;
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
    }
};
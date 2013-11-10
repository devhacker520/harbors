var _req,_res;
module.exports = {
    init:function(req,res){
        _req=req;_res=res;
        return this;
    },
    route:function(){
        var temp = _req.url.split("?");
        return temp[0].split("/").splice(1);//[ 'news', 'index' ]
    },
    Get:function(){
        var temp = _req.url.split("?");
        if(temp[1]){
            var Get = {};
            var temp = temp[1].split("&");
            for(var i=0;i<temp.length;i++){
                var temp_2 = temp[i].split("=");
                Get[temp_2[0]] = temp_2[1];
            }
            return Get;
        }else{return {}}//{ asdfwe: 'asdf' }
    }
};
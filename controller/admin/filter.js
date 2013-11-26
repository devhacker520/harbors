module.exports = function(req,res){

    var route = require(harbors.config.baseDir+'/config/route');

    //增加session信息
    //res.setSession({type:'123',language:'china'});

    //打印session信息
    console.log(req.session);


    //中转路由（传递给其他控制器，记得做容错）
    //require('./'+req.route[0])(req,res);

//    harbors.mysql('select * from g',function(err,data){
//        console.log(data);
//    });
//    console.log(req.session);
    res.setSession({abc:123},10);
//    res.mysql('use itharbors');
//    res.mysql('select * from users',function(err,res){
//        console.log(res);
//    });
//    res.end('333');
    //显示动态模板
    res.render('/login.jade',{route:route});
};
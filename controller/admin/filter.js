module.exports = function(req,res){

    harbors.route = require(harbors.config.baseDir+'/config/route');

    //增加session信息
    //res.setSession({type:'123',language:'china'});

    //打印session信息
    //console.log(req.Session);

    //删除session信息
    //res.delSession({type:null});

    //中转路由（传递给其他控制器，记得做容错）
    //require('./'+req.route[0])(req,res);


    console.log(req.session);
    res.setSession({abc:123});
    //显示动态模板
    res.mysql('use itharbors');
    res.mysql('select * from users',function(err,res){
        console.log(res);
    });
    res.render('/admin/login.jade',{route:harbors.route});
};
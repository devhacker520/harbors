module.exports = function(req,res){

    //增加session信息
    //res.setSession({type:'123',language:'china'});

    //打印session信息
    //console.log(req.Session);

    //删除session信息
    //res.delSession({type:null});

    //中转路由（传递给其他控制器，记得做容错）
    //require('./'+req.route[0])(req,res);

    //显示动态模板
    //res.render('index.jade',{data:123});

    //显示静态文件
    res.display('index.html');
};
var path = require('path');
module.exports = function(req,res){


    if(req.post.name&&req.post.password){//传入post值说明执行了登陆

        //harbors.mysql('select password from users where `name`="'+req.post.name+'"',function(err,data){

            //err&&harbors.err(err);
            //if(data&&data[0]&&req.post.password==data[0]['password']){//账号密码验证通过
            if(req.post.password=='admin'&&req.post.name=='admin'){//账号密码验证通过

                res.setSession({user:req.post.name});
                res.redirect('/survey');

            }else{//账号密码错误

                login(req,res,true);

            }

        //})

    }else{//未传入post进入登陆判断

        if(!req.session.user){//未登录

            login(req,res);

        }else{//已经登陆

            route(req,res);

        }

    }

};

function route(req,res){
    try{
        if(req.path[0]==''){
            res.redirect('/survey');
            return false;
        }else{
            if(req.path[1]==''||req.path[1]==undefined){
                require('./'+req.path[0]+'/'+'index')(req,res);
            }else{
                require('./'+req.path[0]+'/'+req.path[1])(req,res);
            }
        }
    }catch(err){
        harbors.err(err);
        harbors.h404(res);
    }
}

function login(req,res,err){
    res.render('/login.jade',{
        url:require('./url'),
        err:err||undefined
    });
}
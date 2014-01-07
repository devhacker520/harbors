var path = require('path');
var harbors = require('harbors');

//harbors.config('./config/server.ini');
//harbors.config('./config/vhost.ini');

//harbors.module('mysql',require('./module/mysql'));//自定义外部模块

//harbors.rewrite('index',function(req){//自定义一个名为index的重写模块（可在配置中引用）
//harbors.rewrite('develop',function(url){
//    if(!/(static)\//.test(url))
//        return '/index';
//    else
//        return url;
//});

harbors.start();
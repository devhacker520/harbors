//初始化框架参数
global.harbors = {
    config:require("../../config/config"),
    vhost:require("../../config/vhost"),
    session:{
        //格式
        //cookie:{updatetime:12345677,name:value}
    }
};


//主进程
require("./master");
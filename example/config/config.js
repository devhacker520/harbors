var path = require('path');
module.exports = {
    //服务器设置
    listenPort:3000,//监听端口
    baseDir: path.join(__dirname, '/..'),//服务目录地址
    clusterNum:3, //开启子的进程数
    autoResponse:true,//自动响应资源文件开关，为false的话则会去对应的控制器寻找方法
    resourceFile:['.ico','.jpg','.css','js'],//自动响应的资源文件类型
    sessionId:'harborsId',//session存储的cookie名字
    SessionSurvavil:1000*60*60,//session信息默认客户端误操作后保留的有效时间（默认1小时）
    clearSession:1000*60*30,//session清理时间（默认值1小时）
    //开发设置
    deBug:true//调试模式，自动打印出运行状态流程等信息
};
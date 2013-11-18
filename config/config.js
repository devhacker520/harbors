var path = require('path');
module.exports = {
    //服务器设置
    listenPort:3000,//监听端口
    baseDir: path.join(__dirname, '/..'),//服务目录地址
    clusterNum:2, //开启子的进程数
    staticTime:1000*60*60*24,//静态文件客户端缓存时间（默认一天）
    sraticFile:'index.html',//静态文件服务器访问文件夹地址默认寻找目录下的这个文件
    //session
    session:true,//是否开启服务器session(会轻微影响性能，自动多进程共享数据)
    sessionId:'harborsId',//session存储的cookie名字
    SessionSurvavil:1000*60*60,//session信息默认客户端操作后保留的有效时间（默认1小时）
    //虚拟主机设置
    vhost:true,//是否开启虚拟主机服务，开启的话默认会寻找controller目录下的虚拟主机目录
    serverType:'dynamic',//主机类型，动态:'dynamic'，静态响应式服务器:'static'.只有在关闭vhost的时候生效
    //jade设置
    jade:true,//是否开启jade模板
    jadeTime:1000*60*10,//jade模板缓存时间（默认10分钟）
    //gzip设置
    gzip:false,//是否开启gzip
    gzipFile:/css|js|html|htm/ig,//执行压缩的文件类型
    //开发设置
    deBug:false//调试模式，自动打印出运行状态流程等信息
};
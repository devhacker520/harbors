var path = require('path');
module.exports = {
    //服务器设置
    listenPort:3000,//监听端口
    baseDir: path.join(__dirname, '/..'),//服务目录地址
    clusterNum:1, //开启子的进程数
    //虚拟主机设置
    vhost:true,//是否开启虚拟主机服务，开启的话默认会寻找controller目录下的虚拟主机目录
    serverType:'static',//主机类型，动态:'dynamic'，静态响应式服务器:'static'.只有在关闭vhost的时候生效
    serverDir:'default',//默认工作目录
    //静态服务器配置
    staticTime:1000*60*60*24,//静态文件客户端缓存时间（默认一天）
    sraticFile:'index.html',//静态文件服务器访问文件夹地址默认寻找目录下的这个文件
    //动态服务器配置
    dynamicTime:1000*10,//动态控制器缓存时间（默认1分钟，内存型缓存不建议缓存太长时间）
    cacheLevel:3,//0、不开启缓存，1、响应304状态，2、内存缓存（缓存量大的话需要大量的内存空间，并且反馈请求的时候需要占用部分时间来检查）3、304和内存混合缓存
    session:true,//是否开启服务器session(会影响性能，需要在数据库设置中开启redis)
    sessionId:'harborsId',//session存储的cookie名字
    SessionSurvavil:1000*60*60,//session信息默认客户端误操作后保留的有效时间（默认1小时）
    jade:true,//是否开启jade模板
    //gzip设置
    gzip:false,//是否开启gzip
    gzipFile:/css|js|html|htm/ig,//执行压缩的文件类型
    //数据库设置
    redis:{
        Use:true,
        Host:'127.0.0.1'
    },
    mysql:{
        Use:true,
        Host:'127.0.0.1',//数据库地址
        User:'root',//数据库用户名
        Password:'',//数据库密码
        Database:'mysql'//链接默认数据库，以后可以使用changeDatabase方法更改
    },
    //调试模式
    debug:true
};
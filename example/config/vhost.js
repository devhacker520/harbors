module.exports = {
    'www.itharbors.com':{
        baseDir:'controller/common',
        type:'dynamic'//动态服务器（自动寻找控制器）
    },
    'resource.itharbors.com':{
        baseDir:'resource',
        type:'static'//静态服务器（自动响应文件）
    },
    'admin.itharbors.com':{
        baseDir:'controller/common',
        type:'dynamic'
    },
    //测试用虚拟主机
    '127.0.0.1':{
        baseDir:'controller/administrator',
        type:'dynamic'
    }
};
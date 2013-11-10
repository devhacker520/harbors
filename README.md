harbors
=======

一款轻量级的web服务器框架
（暂时处于beta版）

安装方法：
    npm install harbors
目录结构以及一些配置信息在node_modules/harbors/example示例目录下。
node start.js会自动调用node_modules/harbors/startup.js


运行模式
=======
harbors支持两种模式的服务器状态：
1、'dynamic'：动态解析模式。
2、'static'：静态文件服务器模式。

'dynamic'模式下harbors处理完数据会在controller目录下寻找filter.js过滤器。并传递给req，res两个参数。语法和原生nodejs一致。（api见下）
'static'是处理静态文件请求服务的模式。收到浏览器请求后，会在view文件夹下自动寻找请求的文件，存在则返回给浏览器。


vhost虚拟主机
=======
harbors支持apache的vhost类似功能。具体配置在config/config.js中开启。vhost设置在config/vhost.js文件中。
支持单独配置每个虚拟主机的运行模式。
需要注意的是，如果在config.js中开启了vhost，则不管是'dynamic'还是'static'模式都会在目录下寻找自己的主机目录。
如原目录：controller/filter.js
开启vhost后：controller/vhost.baseDir/filter.js


API
=======
正在跟进。。。
在稍后的0.0.5公开测试版的时候会提供相应的API文档。
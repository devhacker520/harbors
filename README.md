#harbors [![build status](https://secure.travis-ci.org/coreyti/showdown.png)]
=======

一款轻量级的web服务器框架

（暂时处于beta版，bug请联系QQ：254048436）

安装方法：

    npm install harbors

目录结构以及一些配置信息在node_modules/harbors/example示例目录下。

node start.js会自动调用node_modules/harbors/inexjs



##运行模式

harbors支持两种模式的服务器状态：

1、'dynamic'：动态解析模式。

2、'static'：静态文件服务器模式。


'dynamic'模式下harbors处理完数据会在controller目录下寻找filter.js过滤器。并传递给req，res两个参数。语法和原生nodejs一致。（api见下）

    >

'static'是处理静态文件请求服务的模式。收到浏览器请求后，会在view文件夹下自动寻找请求的文件，存在则返回给浏览器。

    >0.0.4增加支持客户端缓存以及304状态两种缓存机制。


##vhost虚拟主机

harbors支持apache的vhost类似功能。具体配置在config/config.js中开启。vhost设置在config/vhost.js文件中。

支持单独配置每个虚拟主机的运行模式。

需要注意的是，如果在config.js中开启了vhost，则不管是'dynamic'还是'static'模式都会在目录下寻找自己的主机目录。

如原目录：controller/filter.js

开启vhost后：controller/vhost.baseDir/filter.js



##API

正在跟进。。。

在稍后的0.0.5公开测试版的时候会完善相应的API文档。

##request

  *request.Cookie
  >cookie对象封装，格式{cookieName:cookieValue}
  *request.Session
  >session对象封装（需要在config.js开启session功能，会轻微影响服务器性能）格式同cookie。
  >开启session的同时会生成一个cookie，名字可以在config.js设置。session下的update一般情况请勿操作。服务器会自行判断更新该值。
  *request.route
  >路由路径封装。浏览器地址http://xxx.com/admin/index/index.html 返回 ['admin','index','index.html']
  *request.vhost
  >当前浏览器访问的虚拟主机。

#response

  *response.setCookie(obj);
  >设置cookie函数，传入参数{cookieName:cookieValue}
  *response.delCookie(obj);
  >删除cookie函数，传入参数{cookieName:cookieValue}（必须要完全对应）
  *response.setSession(obj);
  >设置session函数，传入参数{sessionName:sessionValue}
  *response.delSession(obj);
  >删除ession函数，传入参数{sessionName:sessionValue}
  *response.display(file)
  >传入file地址。未开启vhost的情况在view目录下寻找，如显示view/index.html => response.display('index.html');
  >如果开启了vhost，则会在view目录后面自动跟上vhost目录。如：view/admin/index.html
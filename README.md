harbors ![build status](https://secure.travis-ci.org/coreyti/showdown.png)
=======

一款轻量级的web服务器框架 v0.2.5

  欢迎提交各种bug、建议到邮箱：devhacker520@gmail.com

  大家的意见以及大家的鼓励，将成为开发的动力。


安装方法：

    npm install harbors

开启session功能需要redis支持

    cd /tmp

    wget http://redis.googlecode.com/files/redis-2.2.13.tar.gz

    tar -zxf redis-2.2.13.tar.gz

    cd redis-2.2.13

    make

    sudo make install

node start.js会自动调用harbors，服务器会自动处理路由关系，后续版本将增加手动路由表功能。



##运行模式

harbors支持两种模式的服务器状态：

1、'dynamic'：动态解析模式。

2、'static'：静态文件服务器模式。


'dynamic'模式下harbors处理完数据会在controller目录下寻找filter.js过滤器。并传递给req，res两个参数。语法和原生nodejs一致。（api见下）

'static'是处理静态文件请求服务的模式。收到浏览器请求后，会在view文件夹下自动寻找请求的文件，存在则返回给浏览器。

##vhost虚拟主机

harbors支持apache的vhost类似功能。具体配置在config/config.js中开启。vhost设置在config/vhost.js文件中。

支持单独配置每个虚拟主机的运行模式、以及服务器缓存等等。

需要注意的是，如果在config.js中开启了vhost，则不管是'dynamic'还是'static'模式都会在目录下寻找自己的主机目录。

  host/vhost.baseDir/controller/filter.js

display方法则是寻找虚拟主机工作目录下的view文件夹

  host/vhost.baseDir/view/index.html

虚拟主机支持单独配置以下属性，不配置的话取默认config中的值：

serverType、serverDir、staticTime、sraticFile、session、sessionId、SessionSurvavil、jade、jadeTime、gzip、gzipFile、debug

##debug

支持在每个虚拟主机中配置debug选项，开启debug的虚拟主机，将会动态加载工作目录下的控制器，和php一方方便开发，不必每次都重启进程了。

 debug下还会打印出部分运行流程，方便调试错误以及发现bug等。


##API

###request

  >**request.get**
  >
  >用户get参数，格式{Name:Value}
  >
  >**request.post**
  >
  >用户post参数，格式{Name:Value}
  >
  >**request.cookie**
  >
  >cookie对象封装，格式{cookieName:cookieValue}
  >
  >**request.session**
  >
  >session对象封装（需要在config.js开启session功能，会轻微影响服务器性能）格式同cookie。
  >
  >开启session的同时会生成一个cookie，名字可以在config.js设置。session下的update一般情况请勿操作。服务器会自行判断更新该值。
  >
  >**request.path**
  >
  >路由路径封装。浏览器地址http://xxx.com/admin/index/index.html 返回 ['admin','index','index.html']


###response

  >**response.setCookie(obj,expires,path)**
  >
  >obj=>传入的cookie，expires=>过期时间,等于0时删除填入的cookie，path=>cookie存储path，不填则默认取配置文件中的时间
  >
  >设置cookie函数，传入参数{cookieName:cookieValue}
  >
  >删除cookie函数，传入参数{cookieName:cookieValue}（必须要完全对应）
  >
  >**response.setSession(obj,expires)**
  >
  >obj=>传入的session，expires=>过期时间,等于0时删除填入的session，不填则默认取配置文件中的时间
  >
  >设置、删除session函数，传入参数{sessionName:sessionValue}
  >
  >**response.display(file)**
  >
  >返回静态文件。传入file地址。未开启vhost的情况在view/default目录下寻找，如显示view/default/index.html => response.display('index.html');
  >
  >如果开启了vhost，则会在view目录后面自动跟上vhost目录。如：view/admin/index.html
  >
  >**response.render(file,param)**
  >
  >传入file地址。和file方法一样，不过render渲染的是jade模板，传入jade模板文件，第二个参数为传入参数。
  >
  >**response.redirect(path)**
  >
  >跳转页面，path为将要跳转的地址
  >
  >**response.send(String)**
  >
  >向客户端发送文本信息，和自带的end区别是会自动加上响应头部以及缓存等设置。

##Database

###mysql

在config开启mysql后，可以在任何地方使用harbors.mysql调用。

  >**harbors.mysql(sql,callback)**

###redis

在config开启redis后，可以在任何地方使用harbors.redis调用。

  >**harbors.redis.xxx**
  >

没有想好要怎么封装数据库方法。有想法弄成像淘宝那样统一查询接口，也想省下cpu计算的开销。
暂时还没有动工

文档完善中。。。


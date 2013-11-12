harbors ![build status](https://secure.travis-ci.org/coreyti/showdown.png)
=======

一款轻量级的web服务器框架 v0.1.0

  0.1.0版本后终于脱去了beta的外套了。接下去的版本将陆续增加更多的扩展插件。

  欢迎提交各种bug、建议到邮箱：devhacker520@gmail.com

  大家的意见以及大家的鼓励，将成为开发的动力。

  >**0.0.2**
  >
  >增加vhost虚拟主机配置以及主机服务类型配置
  >
  >**0.0.3**
  >
  >增加每台虚拟主机都能选择各自服务器类型配置
  >增加静态文件客户端缓存、304状态
  >
  >**0.0.4**
  >
  >修复vhost开启后，部分配置冲突的问题
  >
  >增加对jade模板引擎的支持
  >
  >**0.0.5**
  >
  >增加jade模板缓存
  >
  >增加静态文件的gzip压缩功能
  >
  >**0.1.0**
  >
  >功能测试、删除测试代码，稳定版发布
  >
  >**0.1.1**
  >
  >增加mysql支持

安装方法：

    npm install harbors

node start.js会自动调用harbors，服务器会自动处理路由关系，后续版本将增加手动路由表功能。



##运行模式

harbors支持两种模式的服务器状态：

1、'dynamic'：动态解析模式。

2、'static'：静态文件服务器模式。


'dynamic'模式下harbors处理完数据会在controller目录下寻找filter.js过滤器。并传递给req，res两个参数。语法和原生nodejs一致。（api见下）

'static'是处理静态文件请求服务的模式。收到浏览器请求后，会在view文件夹下自动寻找请求的文件，存在则返回给浏览器。

##vhost虚拟主机

harbors支持apache的vhost类似功能。具体配置在config/config.js中开启。vhost设置在config/vhost.js文件中。

支持单独配置每个虚拟主机的运行模式。

需要注意的是，如果在config.js中开启了vhost，则不管是'dynamic'还是'static'模式都会在目录下寻找自己的主机目录。

如原目录：controller/filter.js

开启vhost后：controller/vhost.baseDir/filter.js



##API

###request

  >**request.Cookie**
  >
  >cookie对象封装，格式{cookieName:cookieValue}
  >
  >**request.Session**
  >
  >session对象封装（需要在config.js开启session功能，会轻微影响服务器性能）格式同cookie。
  >
  >开启session的同时会生成一个cookie，名字可以在config.js设置。session下的update一般情况请勿操作。服务器会自行判断更新该值。
  >
  >**request.route**
  >
  >路由路径封装。浏览器地址http://xxx.com/admin/index/index.html 返回 ['admin','index','index.html']
  >
  >**request.vhost**
  >
  >当前浏览器访问的虚拟主机。

###response

  >**response.setCookie(obj)**
  >
  >设置cookie函数，传入参数{cookieName:cookieValue}
  >
  >**response.delCookie(obj)**
  >
  >删除cookie函数，传入参数{cookieName:cookieValue}（必须要完全对应）
  >
  >**response.setSession(obj)**
  >
  >设置session函数，传入参数{sessionName:sessionValue}
  >
  >**response.delSession(obj)**
  >
  >删除ession函数，传入参数{sessionName:sessionValue}
  >
  >**response.display(file)**
  >
  >返回静态文件。传入file地址。未开启vhost的情况在view目录下寻找，如显示view/index.html => response.display('index.html');
  >
  >如果开启了vhost，则会在view目录后面自动跟上vhost目录。如：view/admin/index.html
  >
  >**response.render(file,param)**
  >
  >传入file地址。和file方法一样，不过render渲染的是jade模板，传入jade模板文件，第二个参数为传入参数。

##Database

###mysql

暂时只支持mysql，而且方法也有限，有好的建议、意见请发送到邮箱devhacker520@gamil.com

在config开启mysql后，可以在任何地方使用harbors.mysql调用。

  >**harbors.mysql.changeDatabase(databasename)**
  >
  >传入数据库名字databasename，用于更改config中设置的调用数据库，更改后，整个项目中所有mysql调用的数据库都会更改。
  >
  >**harbors.mysql.findData(table,condition,callback)**
  >
  >传入table表的名字，condition查询条件{name:'admin'}，callback为回调函数，传入查询结果：
  >
  >    harbors.mysql.findData('users',{name:'admin'},function(data){
  >        console.log(data)
  >    })
  >
  >**harbors.mysql.insterData(table,condition,callback)**
  >
  >传入参数和findData一样，用于插入数据。
  >
  >**harbors.mysql.deleteData**
  >
  >传入参数和上面相同，用与删除符合条件的数据。
  >
  >**harbors.mysql.count(table,condition,callback)**
  >
  >传入参数和上面相同，返回符合条件的数据总数量。
  >
  >**harbors.mysql.query(query,callback)**
  >
  >传入参数query为sql语句，callback为回调函数，返回值根据sql语句不同会有所不同。
  >
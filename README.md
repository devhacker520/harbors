harbors ![build status](https://secure.travis-ci.org/coreyti/showdown.png)
=======

一款轻量级的web服务器框架 v0.3.0

这一版本有比较大的改动，还未推送npm，虽然bug还是挺多，而且功能也可能没有其他框架多，但我相信，在大家的努力下，harbors将会越来越好。


安装方法：

    npm install harbors

session不再依赖redis，改为文件形式，也许有设计不好的地方，以后有时间也许会参考php的处理方式，也欢迎大家提出自己的意见。

#调用方法

  var harbors = require('harbors');

###harbors.config(file);

  @file {String} 配置文件的路径，相对安装目录或者绝对路径。

  读取配置文件，配置文件格式在config文件里面有详细的说明

###harbors.module(name,module);

  @name {String} 模块名（随便取，不能重复，后面的会覆盖之前的模块）

  @module {Function} 自定义模块函数

  用于写入自定义的模块组件，传入的函数能够在控制直接引用。模块需要使用原生的req、res函数的话，使用this.req、this.res可以使用。详细说明在module文件夹里有说明。

###harbors.rewrite(name,rewrite);

  @name {String} 这个重写模块的名字。
  
  @rewrite {Function} 重写模块的处理函数
  
  用于定义服务器的重写规则，重新处理传入url等规则。

###harbors.start();

  启动服务器（在配置完全部参数后执行这个函数）



##API

###app

  >**get(name)**
  >
  >  @param name {String} get参数的名字
  >
  >  @return {String|Object} 单个get参数字符串或整个get参数对象
  >
  >  输出GET参数
  >
  >  name存在则输出对应name的get参数{String}，不存在则输出全部get参数{Object}
  >
  >**post(name)**
  >
  >  @param name {String} post参数的名字
  >
  >  @return {String|Object} 单个post参数字符串或整个post参数对象
  >
  >  同app.get方法一致
  >
  >**cookie(name,value,setting)**
  >
  >  @param name {String}
  >
  >  @param value {String}
  >
  >  @param setting {Object}
  >
  >  app.cookie() => 输出所有cookie{Object}
  >
  >  app.cookie('name') => 输出key为name的cookie
  >
  >  app.cookie('name','value',setting) => 存入名为name的cookie,value为cookie的值允许传入第三个参数setting
  >
  >  setting = {
  >
  >      expires:{Number},
  >
  >      path:{String},
  >
  >      httpOnly:{Boolean}
  >
  >  }
  >
  >**session(name,value,setting)**
  >
  >  @param name {String}
  >
  >  @param value {String}
  >
  >  @param setting {Object}
  >
  >  同cookie
  >
  >**route(num)**
  >
  >  @param num {Number}
  >
  >  @return {String|Array}
  >
  >  输入num传出指定节点的路由名称，不传入则传出所有路由。
  >
  >  ('/home/index.html') app.route() => ['home','index.html']
  >
  >  ('/home/index.html') app.route(0) => 'home'
  >
  >**display(path)**
  >
  >  @param path {String} 静态文件地址，可以为相对地址（相对服务根目录）
  >
  >  返回指定文件静态文件给客户端。
  >
  >**send(s)**
  >
  >  @param s {String|Object}
  >
  >  发送一段字符串或二进制流给客户端，当传入为Object时需要有pipe这个方法。
  >
  >**redirect(href)**
  >
  >  @param href {String} 传入需要跳转的地址
  >
  >  用于客户端跳转指定页面
  >
  >**app.notFound()**
  >
  >  返回一个404错误给客户端
  >
  >**app.error()**
  >
  >  返回一个500错误给客户端

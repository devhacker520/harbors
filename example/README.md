harbors
=======

框架目录结构

    config  --框架设置存放目录
        |-config.js --主要的设置文件
        |-vhost.js  --虚拟主机配置文件
    controller  --控制器存放目录，如果在虚拟主机设置中设置为动态服务，则会到这个目录下寻找对应的主机目录下的filter.js控制器
        |-common    --vhost.js中设置的虚拟主机目录
            |-filter.js --主机下的过滤器
    modules --存放自定义模块的目录
    view    --视图文件目录
        |-common    --vhost设置的虚拟主机目录

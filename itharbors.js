var harbors = require('harbors');

harbors.config(require('./config/itharbors'));

harbors.rewrite('normal',function(url){
    //url中不包含以下关键词的重定向到index.php
    if(!/(css|js|img|images)/.test(url))
        return 'index.php'
});

harbors.start();
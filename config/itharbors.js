var path = require('path');
module.exports = {
    server:{
    /*
        dir             :   "D:\\www\\webroot",
        default_file    :   ['index.html', 'index_.js','index.php'],
        process         :   1,
        access_log_dir  :   "D:\\www\\webroot\\log\\access",
        error_log_dir   :   "D:\\www\\webroot\\log\\error",
        log_size        :   256,
        tmp_dir         :   "D:\\www\\webroot\\log\\tmp",
        listen          :   [3000,3001],
        vhost       :   {
            on : false
        },
        cache       :   {
            on : false,
            expires : 86400000,
            cache_time : 1800000
        },
        zip         :   {
            on : true,
            zip_file : ['html', 'css', 'js']
        },
        rewrite     :   {
            on : false,
            name : ''
        },
        nodejs      :   {
            on : false,
            extname : '_.js',
            session : false,
            session_id : 'HsessID',
            session_survavil : 3600000,
            autoReload:false,
            post : false
        },
        php         :   {
            on : false,
            extname : '.php',
            fastcgi_host    :   '127.0.0.1',
            fastcgi_port    :   9000
        }
     */
    },
    vhost:[
    /*
    {
        dir:"D:\\webroot",
        ip:"127.0.0.1",
        domain:"dev.code.itharbors.com",
        listen:[80]
    }
    */]
};

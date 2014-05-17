module.exports = {
    server:{
         dir             :   "/harbors",
         default_file    :   ['index.html', 'index_.js','index.php'],
         process         :   5,
         tmp_dir         :   "/home",
         listen          :   [3000,3001]
    },
    vhost:[
        {
            server_name: 'test',
            dir:"/harbors/node_modules/harbors/web",
            ip:"127.0.0.1",
            domain:"a.test.com",
            listen: 8888
        },
        {
            server_name: 'test',
            rewrite:function(){return '/config.js'},
            listen: 3000
        }
    ]
};
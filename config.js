module.exports = {
    server:{
         dir             :   "D:\\www\\webroot",
         default_file    :   ['index.html', 'index_.js','index.php'],
         process         :   1,
         tmp_dir         :   "D:\\www\\webroot\\log\\tmp",
         listen          :   [3000,3001]
    },
    vhost:[
        {
            server_name: 'test',
            dir:"E:\\project\\harbors\\node_modules\\harbors\\web",
            ip:"127.0.0.1",
            domain:"a.test.com",
            listen: 8888
        },
        {
            server_name: 'test',
            dir:"E:\\project\\harbors",
            ip:"127.0.0.1",
            listen: 8888
        }
    ]
};
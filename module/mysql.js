var mysql = require('mysql');

var db;
function handleError (err) {
    if (err) {
        // 如果是连接断开，自动重新连接
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

// 连接数据库
function connect () {
    db = mysql.createConnection({
        host:'127.0.0.1',
        user:'root',
        password:''
    });
    db.connect();
    db.on('error', handleError);
    db.query('use harbors');
    //db.query('select * from users',function(err,res,fil){
    //    console.log(res)
    //})
}

connect();

module.exports = function(query,callback){
    db.query(query,function(error, results, fields){
        typeof(callback)=='function'&&callback(error, results, fields);
    });
};
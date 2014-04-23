var harbors = require('harbors');

var _p = harbors.Cluster.create();

_p.setTask('createServer', function(){
    var test = harbors.AutoRouter.create({
        '/':function(req, res){
            res.end('/');
        },
        '/test/index': function(req, res){
            res.end('1');
        },
        '/test/2': function(req, res){
            res.end('2');
        }
    });
    test.setNotFound(function(req, res){
        res.end('gogogog');
    });

    var handle = harbors.Handle.create(function(req, res){
        res.end('host is not found!');
    });

    handle.addDomain('*.test.com', test);

    harbors.Server.create('http', '127.0.0.1', 9000, handle);

});

harbors.log(123);

//start child process
_p.fork('createServer');
var harbors = require('harbors');

var _p = harbors.Cluster.create();

_p.setTask('createServer', function(){
    var handle = harbors.Handle.create(function(req, res){
        res.end('host is not found!');
    });

    handle.addDomain('*.test.com', function(req, res){
        res.end('a.test.com');
    });

    handle.addDomain('localhost', function(req, res){
        res.end('localhost');
    });

    handle.addDomain('127.0.0.1', function(req, res){
        res.end('127.0.0.1');
    });

    var _ = harbors.Server.create('http', '127.0.0.1', 9000, function(){});
    _.handle(handle);
});

_p.fork('createServer');

_p.setTask('createServer2', function(){
    var handle = harbors.Handle.create(function(req, res){
        res.end('host is not found!');
    });

    handle.addDomain('*.test.com', function(req, res){
        res.end('a.test.com');
    });

    handle.addDomain('localhost', function(req, res){
        res.end('localhost');
    });

    handle.addDomain('127.0.0.1', function(req, res){
        res.end('127.0.0.1');
    });

    var _ = harbors.Server.create('http', '127.0.0.1', 9001, function(){});
    _.handle(handle);
});

_p.fork('createServer2');
var harbors = require('harbors');

var handle = harbors.Handle.create(function(req, res){
    res.end('host is not found!');
});

handle.addDomain('a.test.com', function(req, res){
    res.end('localhost');
});

handle.addDomain('127.0.0.1', function(req, res){
    res.end('127.0.0.1');
});

var _ = harbors.Server.create('http', '127.0.0.1', 9000, function(){});
_.handle(handle);
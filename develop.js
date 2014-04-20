var harbors = require('harbors');

var _p = harbors.Cluster.create();

_p.setTask('createServer', function(){
    var test = harbors.Router.create({
        '/test/index': function(req, res){
            res.end('1');
        },
        '/test/2': function(req, res){
            res.end('2');
        }
    });

    var handle = harbors.Handle.create(function(req, res){
        res.end('host is not found!');
    });

    handle.addDomain('*.test.com', function(req, res){
//        res.end('a.test.com');
        test.route(req, res);
    });

    var _ = harbors.Server.create('http', '127.0.0.1', 9000, function(){});
    _.setHandle(handle);
});

//start child process
_p.fork('createServer');
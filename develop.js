var harbors = require('harbors');

var _p = harbors.Cluster.create();

_p.setTask('createServer', function(){
    var Router = harbors.AutoRouter.create({
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
    Router.setNotFound(function(req, res){
        res.end('gogogog');
    });

    Router.setWorkDir('/Users/VisualSJ/project/tools');

    var handle = harbors.Handle.create(function(req, res){
        res.end('host is not found!');
    });

    handle.addDomain('*.test.com', Router);

    harbors.Server.create('http', '127.0.0.1', 9000, handle);


    harbors.Session.create();
});

//start child process
_p.fork('createServer');
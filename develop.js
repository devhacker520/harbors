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
//            res.setCookie('test', '123', {
//                httpOnly: true,
//                path: '/',
//                maxAge: 1000
//            });
            console.log(req.getCookie('test'));
//            res.writeHeader(200);
            res.end('2');
        }
    });
    Router.setNotFound(function(req, res){
        res.end('gogogog');
    });

    var vhost = harbors.VHost.create();
    vhost.setAcceptPost(true);

    vhost.addDomain('*.test.com', Router);

    harbors.Server.create('http', '127.0.0.1', 8888, vhost);


});

//harbors.Config.create(require('./config'));

//start child process
_p.fork('createServer');
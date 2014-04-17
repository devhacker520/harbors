var harbors = require('harbors');

var _ = harbors.Server.create('http', '127.0.0.1', 9000, function(){});
_.handle();
_.fork(1);
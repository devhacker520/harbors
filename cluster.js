var harbors = require('harbors');

var _t = harbors.Cluster.create();

_t.setMaster(function(){
    console.log(1);
    _t.setWorker(function(){

        console.log(2);
    });

    _t.createWorker();

    _t.setWorker(function(){

        console.log(3);
    });

    _t.createWorker();
});


_t.run();


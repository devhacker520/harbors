var harbors = require('../index');

harbors.DEBUG_LEVEL = 0;

//simple details
harbors.DEBUG_MODE = 'simple';

harbors.DEBUG_ROUTER = 0;

harbors.DEBUG_AUTOROUTER = 0;

harbors.DEBUG_SERVER = 0;

harbors.DEBUG_HANDLE = 0;

harbors.DEBUG_CLUSTER = 0;

harbors.setDebug = function(num){
    harbors.DEBUG_LEVEL = num || harbors.DEBUG_LEVEL;

    harbors.log =
    harbors.info =
    harbors.wran =
    harbors.error =
        function(){};

    switch(harbors.DEBUG_LEVEL){
        case 4:
            harbors.log =  console.log;
        case 3:
            harbors.info = console.log;
        case 2:
            harbors.wran = console.log;
        case 1:
            harbors.error = console.log;
    }
};

harbors.setDebug();
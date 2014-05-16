var harbors = require('../index');

var fs = require('fs');
var path = require('path');

harbors.Directory = {
    /**
     * Recursive Create dir
     * @param dirname
     * @returns {boolean}
     */
    recursiveCreate: function(dirname){
        var pathCache = [];
        var timeoutCount = 0;
        while(fs.existsSync(dirname) === false || !fs.statSync(dirname).isDirectory()){
            if(timeoutCount++ > 10){
                return false;
            }
            pathCache.push(path.basename(dirname));
            dirname = path.dirname(dirname);
        }
        for(var i=0; i<pathCache.length; i++){
            dirname = path.join(dirname, pathCache[i]);
            if(fs.mkdirSync(dirname)){
                return false;
            }
        }
        return true;
    }
};
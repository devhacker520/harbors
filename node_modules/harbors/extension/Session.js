var harbors = require('../index');

var fs = require('fs');
var path = require('path');

harbors.Session = harbors.Class.extend({

    //save path
    _path: null,
    //save type
    _type: 'file',

    /**
     * Init session object
     */
    ctor: function(){
        //Default dirname path
        this._path = path.join(__dirname, '../tmp');
        //create directory
        harbors.Directory.recursiveCreate(this._path);
    },

    /**
     * Set a path for this session
     * @param string
     */
    setPath: function(string){
        if(typeof string === 'string'){
            this._path = string;
            //create directory
            harbors.Directory.recursiveCreate(this._path);
        }
    },

    /**
     * Create session for client
     */
    generate: function(){

    }
});

harbors.Session.create = function(){

    return new harbors.Session();
};
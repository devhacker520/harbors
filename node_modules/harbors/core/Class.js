var harbors = require('../index');

harbors.Class = function(){};

harbors.Class.extend = function(prop){

    //cache
    var _super = this.prototype;

    //create new _super
    var prototype = Object.create(_super);

    //copy prop to prototype
    for(var p in prop){
        prototype[p] = prop[p];
    }

    function Class() {

        // All construction is actually done in the init method
        if (this.ctor)
            this.ctor.apply(this, arguments);
    }

    //extend prototype
    Class.prototype = prototype;

    Class.extend = harbors.Class.extend;

    return Class;
};
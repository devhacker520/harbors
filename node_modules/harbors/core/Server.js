var harbors = require('../index');

var protocol = {
    http: require('http'),
    https: require('https')
};

harbors.Server = harbors.Class.extend({

    //Listen ip
    _ip: null,
    //Listen port
    _port: null,
    //Listen protocol
    _protocol: null,
    //Acquisition processing program socket after
    _handle: null,

    //Server object
    _server: null,

    /**
     * Initialize the new harbors.Server object
     *
     * @param {String}   protocol
     * @param {String}   ip
     * @param {Number}   port
     * @param {harbors.VHost} vHost
     */
    ctor: function(protocol, ip, port, vHost){

        this._protocol = protocol;
        this._ip = ip;
        this._port = port;
        this.setVHost(vHost);

        this.startServer();
    },

    /**
     * The incoming processing function
     *
     * @param {harbors.VHost} vHost - Must
     */
    setVHost: function(vHost){
        if(vHost instanceof harbors.VHost)
            this._vHost = vHost;
        else
            this._vHost = function(req, res){

                harbors.wran('Not found the handle.');
                res.end('Not found the handle.');
            };

        return this;
    },

    /**
     *
     */
    getVHost: function(){
        return this._vHost;
    },

    getRouter: function(){
        return this._vHost._handle;
    },

    /**
     * According to the preset parameters of open service server
     */
    startServer: function(){
        var self = this;
        if(self._protocol && protocol[self._protocol]){

            self._server = protocol[self._protocol]
                .createServer(function(req, res){

                    if(self._vHost === null){

                        harbors.wran('Not found the processing function.');
                        res.end('Not found the processing function');

                        return;
                    }
                    self._vHost._packaging.call(self._vHost, req, res);
                });

            if(self._port && self._ip){
                self._server.listen(self._port,  self._ip);
            }else{
                self._server.listen(self._port);
            }

        }else{

            harbors.wran('Create a server not found');
        }

        return this;
    },

    /**
     * Close this server
     */
    close: function(){
        harbors.error('This feature is not ready.');
    }

});

/**
 * Initialize the new server object
 *
 * @param {String} protocol - Must
 * @param {String} ip - Optional
 * @param {Number} port - Must
 * @param {harbors.Handle} callback - Optional
 *
 * @returns {harbors.Server}
 */
harbors.server = harbors.Server.create = function(protocol, ip, port, handle){

    for(var p in arguments){
        if(arguments[p] == parseInt(arguments[p])){
            arguments[p] = parseInt(arguments[p]);
        }
    }

    var a, b, c, d;
    a = b = c = d = null;

    for(var p in arguments){
        switch(typeof arguments[p]){
            case 'string':
                a ? b = arguments[p] : a = arguments[p];
                break;
            case 'number':
                c = arguments[p];
                break;
            case 'object':
                if(arguments[p] instanceof harbors.VHost);
                    d = arguments[p];
                break;
        }
    }

    return new harbors.Server(a, b, c, d);

};
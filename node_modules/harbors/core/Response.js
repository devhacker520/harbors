var harbors = require("../index");

harbors.Response = harbors.Class.extend({

    _headers: null,

    ctor: function(res){
        this.self = res;
        this._headers = {
            'Set-Cookie': [],
            'Server': 'HARBORS / 0.4.0 alpha1'
        };
    },

    /**
     * This method signals to the server that all of the response headers and body have been sent
     * That server should consider this message complete.
     * The method, response.end(), MUST be called on each response.
     *
     * @param data
     * @param encoding
     */
    end: function(data, encoding){
        if(this.getSent()){
            this.writeHeader(200);
        }
        this.self.end(data, encoding);
    },

    /**
     *
     * @param chunk
     * @param encoding
     */
    write: function(chunk, encoding){
        this.self.write(chunk, encoding);
    },

    /**
     *
     * @param statusCode
     * @param reasonPhrase
     * @param headers
     */
    writeHead: function(statusCode, reasonPhrase, headers){
        this.self.writeHead(statusCode, reasonPhrase, headers);
    },

    /**
     *
     * @param statusCode
     * @param headers
     */
    writeHeader: function(statusCode, headers){
        if(headers){
            for(var p in headers){
                this._headers[p] = headers[p];
            }
        }
        this.self.writeHeader(statusCode, this._headers);
    },

    /**
     *
     * @param headers
     */
    addTrailers: function(headers){
        this.self.addTrailers(headers);
    },

    /**
     *
     * @param name
     */
    removeHeader: function(name){
        if(this._headers[name]){
            delete this._headers[name];
        }
    },

    /**
     *
     * @param name
     * @returns {*}
     */
    getHeader: function(name){
        return this._headers[name];
    },

    /**
     *
     * @param name
     * @param value
     */
    setHeader: function(name, value){
        if(name === 'Set-Cookie'){
            if(Array.isArray(value)){
                this._headers[name] = this._headers[name].concat(value);
            }else{
                this._headers[name].push(value);
            }
        }else{
            this._headers[name] = value;
        }
    },

    /**
     *
     * @param name
     * @param value
     * @param option
     */
    setCookie: function(name, value, option){
        var cookie = '';
        cookie += name + '=' + value;
        if(option){
            if(option.httpOnly)
                cookie += "; httponly";
            if(option.express)
                cookie += "; expires=" + option.expires;
            if(option.path)
                cookie += "; path=" + option.path;
            if(option.domain)
                cookie += "; domain=" + option.domain;
            if(option.maxAge)
                cookie += "; max-age=" + option.maxAge;
        }
        this.setHeader('Set-Cookie', cookie);
    },

    /**
     *
     * @param msecs
     * @param callback
     */
    setTimeout: function(msecs, callback){
        this.self.getHeader(msecs, callback);
    },

    /**
     *
     * @returns {OutgoingMessage.headersSent|*}
     */
    getSent: function(){
        return this.self.headersSent;
    }
});

harbors.Response.create = function(res){
    return new harbors.Response(res);
};
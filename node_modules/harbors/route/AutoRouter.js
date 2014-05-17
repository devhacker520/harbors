var harbors = require('../index');

var path = require('path');
var fs = require('fs');
var zlib = require('zlib');

harbors.AutoRouter = harbors.Router.extend({

    _workDir: null,

    _defaultFile: null,

    _modifiedCache: null,

    _gzip: null,

    _deflate: null,

    ctor: function(routeTable){

        harbors.Router.prototype.ctor.call(this, routeTable);

        this._defaultFile = ['index.html'];

        this._workDir = path.join(__dirname, '../web');

        this._modifiedCache = true;

        this._gzip = false;

        this._deflate = false;
    },

    /**
     * add defaule file
     *
     * @param file
     */
    addDefaultFile: function(file){

        if(typeof file === 'string'){
            this._defaultFile.push(file);
        }else{
            harbors.warn('setDefaultFile is error');
        }
    },

    /**
     * remove defaule file
     *
     * @param file
     */
    removeDefaultFile: function(file){

        if(typeof file === 'string'){
            for(var i = 0; i < this._defaultFile.length; i++){
                if(this._defaultFile[i] == file){
                    this._defaultFile.slice(i, 1);
                    break;
                }
            }
        }else{
            harbors.warn('removeDefaultFile is error');
        }
    },

    /**
     * Gets the routing handler function
     *
     * @returns {Function}
     * @private
     */
    route: function(req, res){

        var url = req.url.split('?')[0];

        if(this._rewrite){
            url = this._rewrite(url);
        }

        var _file = path.join(this._workDir, url);

        if(/\/$/.test(url)){

            for(var i=0;i<this._defaultFile.length;i++){
                _file = path.join(this._workDir, url, this._defaultFile[i]);
                if(fs.existsSync(_file)){

                    this._showFile(_file, req, res);
                    return;
                }
            }
            //self._notFound(req, res);
            harbors.Router.prototype.route.call(this, req, res);
        }else{

            if(fs.existsSync(_file) && !fs.statSync(_file).isDirectory()){

                this._showFile(_file, req, res);
            }else{
                //self._notFound(req, res);
                harbors.Router.prototype.route.call(this, req, res);
            }
        }
    },

    /**
     * set modified cache
     *
     * @param btn
     */
    setModified: function(btn){

        this._modifiedCache = !!btn;
    },

    /**
     * set gzip switch
     *
     * @param btn
     */
    setGzip: function(btn){

        this._gzip = !!btn;
    },

    /**
     * set deflate switch
     *
     * @param btn
     */
    setDeflate: function(btn){

        this._deflate = !!btn;
    },

    /**
     * show static file
     *
     * @param file
     * @param req
     * @param res
     * @private
     */
    _showFile: function(file, req, res){

        if(this._modifiedCache){

            var fileStat = fs.statSync(file);
            var lastModified = fileStat.mtime.toUTCString();
            var ifModifiedSince = "If-Modified-Since".toLowerCase();

            if(lastModified == req.headers[ifModifiedSince]){

                this._returnData(304, null, null, res, req);
                return;
            }else{

                this._returnData(200, {
                    "Last-Modified": lastModified
                }, fs.readFileSync(file), res, req);
            }


        }else{

            this._returnData(200, null, fs.readFileSync(file), res, req);
        }


    },

    _returnData: function(statCode, headers, buffer, res, req){

        statCode = statCode || 200;
        headers = headers || {};

        var acceptEncoding = req.headers['accept-encoding'];

        if(this._gzip && acceptEncoding && acceptEncoding.indexOf('gzip') > -1){

            headers['Content-Encoding'] = 'gzip';

            res.writeHeader(statCode, headers);

            zlib.gzip(buffer, function(error, buffer){
                if(error) {
                    throw error;
                }

                res.end(buffer);

            });
            return;
        }

        if(this._deflate && acceptEncoding && acceptEncoding.indexOf('deflate') > -1){

            headers['Content-Encoding'] = 'deflate';

            res.writeHeader(statCode, headers);

            zlib.deflate(buffer, function(error, buffer){
                if(error) {
                    throw error;
                }

                res.end(buffer);

            });
            return;
        }

        res.writeHeader(statCode, headers);

        res.end(buffer);

    },

    /**
     * set worker dirname
     *
     * @param path
     */
    setWorkDir: function(path){
        if(typeof path === 'string')
            this._workDir = path;
        else
            harbors.log('setWorkDir is error');
    },

    //Mime list
    _mime: {
        "3gp"   : "video/3gpp",
        "a"     : "application/octet-stream",
        "ai"    : "application/postscript",
        "aif"   : "audio/x-aiff",
        "aiff"  : "audio/x-aiff",
        "asc"   : "application/pgp-signature",
        "asf"   : "video/x-ms-asf",
        "asm"   : "text/x-asm",
        "asx"   : "video/x-ms-asf",
        "atom"  : "application/atom+xml",
        "au"    : "audio/basic",
        "avi"   : "video/x-msvideo",
        "bat"   : "application/x-msdownload",
        "bin"   : "application/octet-stream",
        "bmp"   : "image/bmp",
        "bz2"   : "application/x-bzip2",
        "c"     : "text/x-c",
        "cab"   : "application/vnd.ms-cab-compressed",
        "cc"    : "text/x-c",
        "chm"   : "application/vnd.ms-htmlhelp",
        "class" : "application/octet-stream",
        "com"   : "application/x-msdownload",
        "conf"  : "text/plain",
        "cpp"   : "text/x-c",
        "crt"   : "application/x-x509-ca-cert",
        "css"   : "text/css",
        "csv"   : "text/csv",
        "cxx"   : "text/x-c",
        "deb"   : "application/x-debian-package",
        "der"   : "application/x-x509-ca-cert",
        "diff"  : "text/x-diff",
        "djv"   : "image/vnd.djvu",
        "djvu"  : "image/vnd.djvu",
        "dll"   : "application/x-msdownload",
        "dmg"   : "application/octet-stream",
        "doc"   : "application/msword",
        "dot"   : "application/msword",
        "dtd"   : "application/xml-dtd",
        "dvi"   : "application/x-dvi",
        "ear"   : "application/java-archive",
        "eml"   : "message/rfc822",
        "eps"   : "application/postscript",
        "exe"   : "application/x-msdownload",
        "f"     : "text/x-fortran",
        "f77"   : "text/x-fortran",
        "f90"   : "text/x-fortran",
        "flv"   : "video/x-flv",
        "for"   : "text/x-fortran",
        "gem"   : "application/octet-stream",
        "gemspec": "text/x-script.ruby",
        "gif"   : "image/gif",
        "gz"    : "application/x-gzip",
        "h"     : "text/x-c",
        "hh"    : "text/x-c",
        "htm"   : "text/html",
        "html"  : "text/html",
        "ico"   : "image/vnd.microsoft.icon",
        "ics"   : "text/calendar",
        "ifb"   : "text/calendar",
        "iso"   : "application/octet-stream",
        "jar"   : "application/java-archive",
        "java"  : "text/x-java-source",
        "jnlp"  : "application/x-java-jnlp-file",
        "jpeg"  : "image/jpeg",
        "jpg"   : "image/jpeg",
        "js"    : "application/javascript",
        "json"  : "application/json",
        "log"   : "text/plain",
        "m3u"   : "audio/x-mpegurl",
        "m4v"   : "video/mp4",
        "man"   : "text/troff",
        "mathml": "application/mathml+xml",
        "mbox"  : "application/mbox",
        "mdoc"  : "text/troff",
        "me"    : "text/troff",
        "mid"   : "audio/midi",
        "midi"  : "audio/midi",
        "mime"  : "message/rfc822",
        "mml"   : "application/mathml+xml",
        "mng"   : "video/x-mng",
        "mov"   : "video/quicktime",
        "mp3"   : "audio/mpeg",
        "mp4"   : "video/mp4",
        "mp4v"  : "video/mp4",
        "mpeg"  : "video/mpeg",
        "mpg"   : "video/mpeg",
        "ms"    : "text/troff",
        "msi"   : "application/x-msdownload",
        "odp"   : "application/vnd.oasis.opendocument.presentation",
        "ods"   : "application/vnd.oasis.opendocument.spreadsheet",
        "odt"   : "application/vnd.oasis.opendocument.text",
        "ogg"   : "application/ogg",
        "p"     : "text/x-pascal",
        "pas"   : "text/x-pascal",
        "pbm"   : "image/x-portable-bitmap",
        "pdf"   : "application/pdf",
        "pem"   : "application/x-x509-ca-cert",
        "pgm"   : "image/x-portable-graymap",
        "pgp"   : "application/pgp-encrypted",
        "pkg"   : "application/octet-stream",
        "pl"    : "text/x-script.perl",
        "pm"    : "text/x-script.perl-module",
        "png"   : "image/png",
        "pnm"   : "image/x-portable-anymap",
        "ppm"   : "image/x-portable-pixmap",
        "pps"   : "application/vnd.ms-powerpoint",
        "ppt"   : "application/vnd.ms-powerpoint",
        "ps"    : "application/postscript",
        "psd"   : "image/vnd.adobe.photoshop",
        "py"    : "text/x-script.python",
        "qt"    : "video/quicktime",
        "ra"    : "audio/x-pn-realaudio",
        "rake"  : "text/x-script.ruby",
        "ram"   : "audio/x-pn-realaudio",
        "rar"   : "application/x-rar-compressed",
        "rb"    : "text/x-script.ruby",
        "rdf"   : "application/rdf+xml",
        "roff"  : "text/troff",
        "rpm"   : "application/x-redhat-package-manager",
        "rss"   : "application/rss+xml",
        "rtf"   : "application/rtf",
        "ru"    : "text/x-script.ruby",
        "s"     : "text/x-asm",
        "sgm"   : "text/sgml",
        "sgml"  : "text/sgml",
        "sh"    : "application/x-sh",
        "sig"   : "application/pgp-signature",
        "snd"   : "audio/basic",
        "so"    : "application/octet-stream",
        "svg"   : "image/svg+xml",
        "svgz"  : "image/svg+xml",
        "swf"   : "application/x-shockwave-flash",
        "t"     : "text/troff",
        "tar"   : "application/x-tar",
        "tbz"   : "application/x-bzip-compressed-tar",
        "tcl"   : "application/x-tcl",
        "tex"   : "application/x-tex",
        "texi"  : "application/x-texinfo",
        "texinfo" : "application/x-texinfo",
        "text"  : "text/plain",
        "tif"   : "image/tiff",
        "tiff"  : "image/tiff",
        "torrent" : "application/x-bittorrent",
        "tr"    : "text/troff",
        "txt"   : "text/plain",
        "vcf"   : "text/x-vcard",
        "vcs"   : "text/x-vcalendar",
        "vrml"  : "model/vrml",
        "war"   : "application/java-archive",
        "wav"   : "audio/x-wav",
        "weba"  : "audio/webm",
        "webm"  : "video/webm",
        "wma"   : "audio/x-ms-wma",
        "wmv"   : "video/x-ms-wmv",
        "wmx"   : "video/x-ms-wmx",
        "wrl"   : "model/vrml",
        "wsdl"  : "application/wsdl+xml",
        "xbm"   : "image/x-xbitmap",
        "xhtml" : "application/xhtml+xml",
        "xls"   : "application/vnd.ms-excel",
        "xml"   : "application/xml",
        "xpm"   : "image/x-xpixmap",
        "xsl"   : "application/xml",
        "xslt"  : "application/xslt+xml",
        "yaml"  : "text/yaml",
        "yml"   : "text/yaml",
        "zip"   : "application/zip"
    }

});

harbors.AutoRouter.create = function(routeTable){

    if(typeof routeTable !== 'object') routeTable = undefined;
    return new harbors.AutoRouter(routeTable);
};
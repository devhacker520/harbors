var path = require('path');
var fs = require('fs');

var _req,_res;

//用于返回静态文件
var app = {
    init:function(req,res){
        _req=req;_res=res;
        return this;
    },
    render:function(file){
        var vhostFile = harbors.config.vhost ? harbors.vhost[_req.vhost]['baseDir'] : '';
        var  realPath = path.normalize(harbors.config.baseDir + '/view/'+vhostFile + '/' + file);
        var extname = path.extname(file);
        harbors.config.deBug&&console.log("显示静态文件:"+realPath);
        fs.exists(realPath,function(exists){
            if (!exists) {
                _res.writeHead(404, {'Content-Type': 'text/plain'});
                _res.end("This request URL was not found on this server.");
            } else {
                fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        _res.writeHead(500, {'Content-Type': 'text/plain'});
                        _res.end(err);
                    } else {
                        _res.writeHead(200, {'Content-Type': app.mimeTypes[extname]});
                        _res.write(file, "binary");
                        _res.end();
                    }
                });
            }
        })
    },
    mimeTypes:{
        ".css": "text/css",
        ".gif": "image/gif",
        ".html": "text/html",
        ".ico": "image/x-icon",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".js": "text/javascript",
        ".json": "application/json",
        ".pdf": "application/pdf",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".swf": "application/x-shockwave-flash",
        ".tiff": "image/tiff",
        ".txt": "text/plain",
        ".wav": "audio/x-wav",
        ".wma": "audio/x-ms-wma",
        ".wmv": "video/x-ms-wmv",
        ".xml": "text/xml"
    }
};

module.exports = app;
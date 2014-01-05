var path = require('path');
var jade = require('jade');
/**
 * 动态jade模板渲染函数
 *
 * @param {string} file
 * @param {object} req
 * @param {object} res
 */
module.exports = function(file,obj){
    var self = this;
    var realFile = path.normalize(self.vhost.dir + file);
    //调试流程
    jade.renderFile(realFile, obj||{}, function (err, html) {

        if (err) {
            self.error();
            console.log(err);
        }else{
            self.res.setHeader('Content-Type', "text/html; charset=utf-8");
            self.send(html);
        }

    });
};
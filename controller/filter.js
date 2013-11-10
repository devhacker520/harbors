module.exports = function(req,res){
//    res.setSession({type:'123',language:'china'});
//    console.log(req.Session);
//    res.delSession({type:null});
//    for(var i=0;i<100000000;i++){
//        var r = Math.random();
//    }
    console.log(req.route);
    res.display('administrator/test.html');
//    res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
//    res.end("1234");
};
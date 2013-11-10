module.exports = function(req,res){
    res.setSession({type:'123',language:'china'});
    console.log(req.Session);
    res.delSession({type:null});
    res.writeHead(200, {"Content-Type": "text/plain", "Connection": "close"});
    res.end("1234");
};
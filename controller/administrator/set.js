module.exports = function(req,res){

    res.setSession({type:'123',language:'china'});
    console.log(req.Session);
    res.render('index.jade',{data:123});
}
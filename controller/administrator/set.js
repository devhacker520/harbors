module.exports = function(req,res){

    res.setSession({type:'123',language:'china'});

    res.render('index.jade',{data:123});
};
module.exports = function(req,res){

    console.log(req.Session);
    res.render('index.jade',{data:123});
}
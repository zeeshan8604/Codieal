module.exports.home=function(req,res){
  console.log(req.cookies);
    return res.render('layout',{
      title:"Home"
    }) 
  }
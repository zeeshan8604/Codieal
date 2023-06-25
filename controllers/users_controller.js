const Users=require('../models/user');
module.exports.profile=function(req,res){
    return res.end('<h1> User profile !</h1>');
}
module.exports.singIn=function(req, res){
    return res.render('user_signin',{
        title: "codial | sign in"
    })
}
module.exports.signUp=function(req, res){
    return res.render('uesr_signup',{
        title:"Codial | sing up"
    })
}


module.exports.create= async function (request, response){
    try {
        //checking for pwd and confirm pwd
        if (request.body.password != request.body.confirm_password) {
          return response.redirect("back");
        }
        //if user already exist then redirect else create new user
        let user = await Users.findOne({ email: request.body.email });
    
        if (user) {
          return response.redirect("back");
        } else {
          let user = await Users.create(request.body);
          return response.redirect("sign-in");
        }
      } catch (error) {
        console.log("Error", error);
        return;
      }
};
//  const User = require('../models/user');

const Users=require('../models/user');
const fs=require('fs');
const path = require('path');
module.exports.profile=async function(req,res){
  try{
  let user= await Users.findById(req.params.id);
    return res.render('user_profile',{
      title:'User_profile',
      profile_user:user
    });
  }catch(error){
    console.log('profile page error', error);
    return;
  }
}

// for updating user
module.exports.update= async function(req, res){
try{
  if(req.user.id == req.query.id){

    let user= await Users.findById(req.query.id);

    Users.uploadedAvtar(req, res, function (error) {
      if (error) {
        console.log("error");
        return;
      }
      user.name = req.body.name;
      user.email = req.body.email;

      //if file is present
      if (req.file) {
        //and upload new file (replace old file with new file)
        if (
          user.avtar &&
          fs.existsSync(path.join(__dirname, "..", user.avtar))
        ) {
          fs.unlinkSync(path.join(__dirname, "..", user.avtar));
        }
        user.avtar = Users.avtarPath + "/" + req.file.filename;
        
      }
      user.save();
      // request.flash("successs", "Profile Updated Successfully");
      return res.redirect("back");
    });

    
  }
  else {
    return res.status(401).send('unauthorize');
  }
}catch(error){
  console.log('error in updating profile info', error);
  return ;
}

};

// module.exports.update = function(req, res){
//   if(req.user.id == req.params.id){
//       User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//           return res.redirect('back');
//       });
//   }else{
//       return res.status(401).send('Unauthorized');
//   }
// }



module.exports.singIn=function(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/user/profile');
    }
    return res.render('user_signin',{
        title: "codial | sign in"
    })
}
module.exports.signUp=function(req, res){
  if(req.isAuthenticated()){
    return res.redirect('/user/profile');
  }
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
module.exports.createSession= async function(req, res){
  return res.redirect('/');
}
module.exports.destroySession =  async function (req, res , next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};
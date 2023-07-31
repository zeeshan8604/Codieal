const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
module.exports.createSession= async function(req, res){
    try{
    let user= await User.findOne({email:req.body.email});
    if(!user|| user.password!=req.body.password){
        return res.json(422,{
            message:'invalid username or password'
        });
    }
    return res.json(200, {
        message:"sign in successfully , here is your token please keep it safe",
        data:{
            token:jwt.sign(user.toJSON(), 'zeeshanaahmed', {expiresIn:'100000'}) 
        }
    })
    }catch(err){
        console.log('user Api error', err);
        return res.json(500, {
            message:"Internal server Error"
        });
    }

    // return res.redirect('/');
  } 
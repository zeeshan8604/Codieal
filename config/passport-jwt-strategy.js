const passport=require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');

let opts={
    jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'zeeshanaahmed'
}
passport.use(new JwtStrategy(opts, async function(jwtpayload, done){
    try{
   let user=await User.findById(jwtpayload._id);
   if(user){
    return done(null, user);
   }else{
    return done(null, false);
   }
    }catch(err){
        console.log('Error in finding user from Jwt', err);
        return;
    }

}));
module.exports=passport;
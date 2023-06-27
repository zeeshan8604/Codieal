const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/user');
passport.use(new LocalStrategy({
    usernameField:'email'
},
 async function(email, password, done){
    //find user and establish the identity
    let user= await User.findOne({email:email});
    try{
        if(!user|| user.pasword!=password){
            console.log('invalid username/password');
            return done(null, false);
        }
        return done(null, user);
    }catch (error) {
        console.log("Error", error);
        return;
    }
}
));

passport.serializeUser(function(user, done){
    done(null, user.id)
});

passport.deserializeUser( async function(id ,done){
        let user=await User.findById(id);
        try{
            return done(null, user);
        }
        catch (error) {
            console.log("Error", error);
            return;
        }
});
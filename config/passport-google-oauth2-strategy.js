const passport =require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto= require('crypto');
const User=require('../models/user');
const env=require('./environment');


passport.use(new GoogleStrategy({
    clientID:env.goggle_client_id,
    clientSecret:env.goggle_client_secret,
    callbackURL:env.goggle_callback_url
},
async function(accessToken, refreshToken, profile, done){
   try{
    let user= await User.findOne({email:profile.emails[0].value}).exec();

    if(user){
        return done(null, user);
    }
    else{
       let user= User.create({
            name:profile.displayName,
            email:profile.emails[0].value,
            password:crypto.randomBytes(20).toString('hex')
        });
        return done(null, user);
        
    }
   }catch(err){
    console.log('error in google strategy', err);
    return ;
   }
}

));


passport.serializeUser( async function(id ,done){
    let user=await User.findById(id);
    try{
        return done(null, user);
    }
    catch (error) {
        console.log("Error", error);
        return;
    }
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
 module.exports=passport;
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
// const crypto = require("crypto");
// const Users = require("./../models/user");
// // const env = require("./environment");


// passport.use(new GoogleStrategy({
//     clientID:"841909206147-iopfg66823qvmtcqjlbehp21u3tuc1n8.apps.googleusercontent.com",
//     clientSecret:"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",
//     callbackURL:"http://localhost:8000/user/auth/google/callback"
//   },function(accessToken , refreshToken , profile , done){
//       Users.findOne({email:profile.emails[0].value}).exec(function(error,user){
//           if(error){
//               console.log("Error in finding user");
//               return;
//           }

//           console.log(profile);
//           //if found user set it in request.user
//           if(user){
//               return done(null , user);
//           }else{
//               //if not found in user then create and then set it in request.user
//               Users.create({
//                   name:profile.displayName,
//                   email:profile.emails[0].value,
//                   password:crypto.randomBytes(20).toString("hex")
//               } , function(error , user){
//                   if(error){
//                       console.log("error in creating user");
//                       return;
//                   }else{
//                       return done(null , user);
                      
//                   }
//               })
//           }
//       })
//   })
// )




// module.exports = passport;
// // passport.use(new GoogleStrategy({
// //     clientID:"841909206147-iopfg66823qvmtcqjlbehp21u3tuc1n8.apps.googleusercontent.com",
// //     clientSecret : "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",
// //     callbackURL : "http://localhost:8000/user/auth/google/callback"
// //   },function(accessToken , refreshToken , profile , done){
// //       let user=User.findOne({email:profile.emails[0].value});
// //          user.exec(function(user){
// //             console.log(profile);
// //             //if found user set it in request.user
// //             if(user){
// //                 return done(null , user);
// //             }else{
// //                 //if not found in user then create and then set it in request.user
// //                let user= User.create({
// //                     name:profile.displayName,
// //                     email:profile.emails[0].value,
// //                     password:crypto.randomBytes(20).toString("hex")
// //                 });
// //                 return done(null , user);
// //             }
// //         });
// //     }));
// //   module.exports=passport;
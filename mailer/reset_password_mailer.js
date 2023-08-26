// const nodeMailer=require('../config/nodemailer');


// module.exports.resetPassword=async function(req, res){
//     let htmlstring=nodeMailer.renderTemplate({accessToken:accessToken}, "/reset_password/reset_password.ejs");
    

//     nodeMailer.transporter.sendMail({
//         from:"zeeshanahmed86044352@gmail.com",
//         to:accessToken.user.email,
//         subject:"Codeial:Reset Password",
//         html:htmlstring
//     }, function(err,info){
//         if(err){
//             console.log("error in sending mail to reset password", err);
//         }
//         console.log("Message sent", info);
//         return ;
//     });
// }
const nodeMailer = require("../config/nodemailer");

module.exports.resetPassword = function(accessToken){

    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");

    nodeMailer.transporter.sendMail({
        from: "zeeshanahmed86044352@gmail.com", // sender address
        to: accessToken.user.email, // list of receivers
        subject: "Codeial : Reset Password", // Subject line
        html: htmlString // html body
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}

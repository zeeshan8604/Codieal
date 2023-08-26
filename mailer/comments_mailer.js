const nodeMailer = require("../config/nodemailer");

module.exports.newComment = function(comment){

     let htmlString = nodeMailer.renderTemplate({comment:comment} , "/comments/new_comment.ejs");

    nodeMailer.transporter.sendMail({
        from: 'zeeshanahmed86044352@gmail.com', // sender address
        to: comment.user.email, // list of receivers
        subject: "New Comment Published", // Subject line
        html:htmlString//'<h1>yup, your comment has been published</h1>' // html body
        // service : "gmail",
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false, // true for 465, false for other ports
        // auth: {
        // user: "zeeshanahmed.devp@gmail.com", 
        // pass: "Zeeshan@22" 
        // }
      } , function(error , info){
          if(error){console.log("Error in sending mail",error);return;}
          console.log("Message Sent" , info);
          return;
      });
}
const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');
const env=require('./environment')
// myjztvprbqwiakvx


// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'lelia.nitzsche11@ethereal.email',
//         pass: 'P63ymkCvG1DR5rJCYQ'
//     }
// });
const transporter = nodemailer.createTransport(env.smtp);
 let renderTemplate = function(data , relativePath){

    let mailHtml;
    ejs.renderFile(
        path.join(__dirname , "../views/mailer" , relativePath),
        data,
        function(error , template){
            if(error){console.log("Error in returning template",error);return}

            console.log(__dirname);
            mailHtml = template;
        }
    )
    return mailHtml;
 }

 module.exports = {
     transporter : transporter,
     renderTemplate : renderTemplate
 }
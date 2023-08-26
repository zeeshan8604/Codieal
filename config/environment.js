const fs=require('fs');
const rfs = require("rotating-file-stream");
const path =require('path');

const logDirectry=path.join(__dirname, '../production_logs');
fs.existsSync(logDirectry)||fs.mkdirSync(logDirectry);


const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path:logDirectry
});
const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'zeeshanahmed',
    db:'codial_dev',
    smtp:{
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "zeeshanahmed86044352@gmail.com",
          pass: "myjztvprbqwiakvx",
        },
      },
    goggle_client_id:"841909206147-iopfg66823qvmtcqjlbehp21u3tuc1n8.apps.googleusercontent.com",
    goggle_client_secret:"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",
    goggle_callback_url:"http://localhost:8000/user/auth/google/callback",
    jwt_key:'zeeshanaahmed',
    morgan:{
      mode:'dev',
      options:{stream:accessLogStream}
    }

}
const production = {
  name: process.env.CODIEAL_NAME,
  asset_path: process.env.CODIEAL_ASSET_PATH,
  session_cookie_key: process.env.CODIEAL_SESSION_COOKIE_KEY,
  db: process.env.CODIEAL_DB,
  smtp: {
      service: "gmail",
      host: process.env.CODIEAL_SMTP_HOST,
      port: parseInt(process.env.CODIEAL_SMTP_PORT),
      secure: false,
      auth: {
          user: process.env.CODIEAL_SMTP_USER,
          pass: process.env.CODIEAL_SMTP_PASS,
      },
  },
  goggle_client_id: process.env.CODIEAL_GOOGLE_CLIENT_ID,
  goggle_client_secret: process.env.CODIEAL_GOOGLE_CLIENT_SECRET,
  goggle_callback_url: process.env.CODIEAL_GOOGLE_CALLBACK_URL,
  jwt_key: process.env.CODIEAL_JWT_KEY,
  morgan:{
    mode:'combined',
    options:{stream:accessLogStream}
  }
};






module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);
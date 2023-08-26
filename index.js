const express = require('express');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const env=require('./config/environment');
const logger=require('morgan');
const app=express();
const db = require("./config/mongoos");
const port=8000;

const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
// app.use(session()); // session middleware
//  
//used for session cookies
const nodemailer=require('nodemailer');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJwt=require('./config/passport-jwt-strategy');
const passportgoogle=require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const postcssMiddleware = require('postcss-middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');  

const path=require('path');

//use express router
if(env.name=='development'){
  app.use(sassMiddleware({
    /* Options */
    src:path.join(__dirname, env.asset_path,'/scss')
  , dest: path.join(__dirname, env.asset_path, '/css')
  , outputStyle: 'extended'
  , debug:true
  , prefix:'/css'
  }));
}

// app.use(postcssMiddleware({
// plugins: [
//   /* Plugins */
//   autoprefixer({
//     /* Options */
//   })
// ],
// src: function(req) {
//   return path.join('./assets/css', req.url);
// }
// }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path)) // for getting static

app.use(logger(env.morgan.mode, env.morgan.options))
    

app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(
    session({
      name: "codeial",
      secret:env.session_cookie_key,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 100,
      },
      store: MongoStore.create(
        {
          mongoUrl: 'mongodb://127.0.0.1:27017/codial_dev',
          autoRemove: "disabled",
        },
        function (error) {
          console.log("Unable to store session cookie in database");
        }
      ),
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// make the uploads path avilable to browser
app.use("/uploads", express.static(__dirname + "/uploads"));


app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`error in running port: ${port}`);
    }
    console.log(`server running on port:${port}`);
});
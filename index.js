const express = require('express');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const app=express();
const db = require("./config/mongoos");
const port=8000;

const expressLayout = require('express-ejs-layouts');
app.use(expressLayout);
//used for session cookies
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


//use express router


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets')) // for getting static
app.set('layout extractStyles',true);
app.set('layout extractScripts',true)
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(
    session({
      name: "codeial",
      secret:'zeeshanahmed',
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

app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`error in running port: ${port}`);
    }
    console.log(`server running on port:${port}`);
});
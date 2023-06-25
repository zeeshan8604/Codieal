const express = require('express');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');

const app=express();
const db = require("./config/mongoos");
const port=8000;

//use express router


app.use(express.urlencoded());
app.use(cookieParser());
app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`error in running port: ${port}`);
    }
    console.log(`server running on port:${port}`);
})
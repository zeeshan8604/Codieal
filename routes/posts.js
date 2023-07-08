const express=require('express');
const router=express.Router();
const postcontroller=require('../controllers/posts_controller');
const passport = require('passport');


router.post('/addPost',passport.checkAuthentication, postcontroller.addPost);
 module.exports=router;
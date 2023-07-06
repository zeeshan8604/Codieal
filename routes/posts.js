const express=require('express');
const router=express.Router();
const postcontroller=require('../controllers/posts_controller');

router.post('/addPost', postcontroller.addPost);
 module.exports=router;
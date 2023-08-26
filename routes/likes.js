const express=require('express');
const router=express.Router();

const likecontroller=require('../controllers/likes_controller');
  router.post('/toggle', likecontroller.toggleLike);
  module.exports=router;
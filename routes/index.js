const express=require('express');

const router=express.Router();
const homeController=require('../controllers/users_controller');

router.get('/',homeController.home);

console.log('router loded');

module.exports=router;
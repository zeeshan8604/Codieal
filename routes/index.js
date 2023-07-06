const express=require('express');

const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user', require('./users'));
router.use('/posts', require('./posts'))
console.log('router loded');

module.exports=router;
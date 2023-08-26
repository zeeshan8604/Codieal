const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user', require('./users'));
router.use('/posts', require('./posts'))
router.use('/comments', require('./comment'));
router.use('/likes', require('./likes'));
router.use("/friends" , require("./friends"));
router.use("/auth" , require("./auth"));
// console.log('router loded');

router.use('/api', require('./api'));

module.exports=router;
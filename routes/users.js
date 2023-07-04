const express=require('express');

const router=express.Router();
const userController=require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile',passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.singIn);
router.post('/create',userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
), userController.createSession);
router.get("/sign-out", userController.destroySession);

module.exports=router;
const express=require('express');

const router=express.Router();
const userController=require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication, userController.profile);
router.post(
    "/update",
    passport.checkAuthentication,
    userController.update
  );
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.singIn);
router.post('/create',userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'},
), userController.createSession);
router.get("/sign-out", userController.destroySession);
router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'user/sign-in'}), userController.createSession);

module.exports=router;
 const express=require('express');
 const router=express.Router();
 const trxnController=require('../controllers/trxn_controller');
 router.get('/history', trxnController.history);
 module.exports=router;
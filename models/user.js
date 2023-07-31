const mongoose=require('mongoose');

const multer = require("multer");
const path = require("path");
const AVTAR_PATH = path.join("/uploads/users/avatars");


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true,
    },
    avtar:{
        type:String
    }
},{
    timestamps:true
});

//configuring multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname , ".." , AVTAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
})

userSchema.statics.uploadedAvtar = multer({ storage: storage }).single("avtar");
userSchema.statics.avtarPath = AVTAR_PATH;
  

  

const User =mongoose.model('User', userSchema);
module.exports=User;
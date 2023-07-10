const mongoose=require('mongoose');
const User = require('./user');

const commentSchema= new mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{
    timestamps:true
});

const comment=mongoose.model('comment',commentSchema);
module.exports=comment;

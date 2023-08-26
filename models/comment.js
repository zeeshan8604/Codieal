const mongoose=require('mongoose');
const User = require('./user');
const Likes=require('./likes');

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
    },
    likes : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Likes"
    }]
},{
    timestamps:true
});

const comment=mongoose.model('comment',commentSchema);
module.exports=comment;

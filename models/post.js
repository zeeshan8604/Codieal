const mongoose=require('mongoose');

//post schema
const postSchema= new mongoose.Schema({
    content :{
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    comments:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "comment"
    }],
    likes : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Likes"
    }]
},{
    timestamps:true
});

const Post=mongoose.model('Post', postSchema);
module.exports=Post;
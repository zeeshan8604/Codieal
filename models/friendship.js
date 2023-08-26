// const mongoose=require('mongoose');

// // const friendshipSchema=new mongoose.Schema({
// //     to_user:{
// //         type:mongoose.Schema.Types.ObjectId,
// //         ref:'User'
// //     },
// //     from_user:{
// //         type:mongoose.Schema.Types.ObjectId,
// //         ref:'User'
// //     }
// // },
// // {
// // timeStamps : true
// // })
// const Friendship=mongoose.model('Friendship', friendshipSchema);
// module.exports=Friendship;
const mongoose = require("mongoose");

const friendshipsSchema = new mongoose.Schema({
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    } , 
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users"
    } , 
} , {
    timeStamps : true
})

const Friendships = mongoose.model("Friendships" , friendshipsSchema);
module.exports = Friendships;
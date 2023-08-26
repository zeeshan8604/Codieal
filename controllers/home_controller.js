const Post = require('../models/post');
const User = require('../models/user');
const Likes = require('../models/likes');
module.exports.home= async function(req,res){
  try{
     let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "comments",
        strictPopulate: false,
        populate: {
          path: "likes", // Populate the likes of comments
          strictPopulate: false,
        },
      })
      .populate({
        path: "likes", // Populate the likes of the post
        model: Likes, // Specify the model to use for populating
        strictPopulate: false,
      });


    let user= await User.find({});
      return res.render('home',{
        title:'codiel | home ',
        posts:posts,
        all_users:user
      })
    }catch (error) {
      console.log("Error in displaying post", error);
      return;
    }
  }
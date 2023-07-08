const Post=require('../models/post');

// creating post and  saving it in db
module.exports.addPost= async function(req, res){
    try{
      let post= await Post.create({
        content: req.body.content,
        user: req.user._id,

       });
      //  console.log(req.user._id);
       return res.redirect('back');


    }catch (error) {
        console.log("Error in creating post", error);
        return;
    }
}
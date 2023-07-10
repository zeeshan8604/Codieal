const Comment=require('../models/comment');
const  Post=require('../models/post');


module.exports.addcomment=async function(req, res){
try{
    let post= await Post.findById(req.body.post);
    if(post){
      let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });
        // post.comments.push(comment);
        // post.save();
        
        // comment = await comment.populate("user", "name email").exec();
        post.comments.push(comment);
        post.save();
        res.redirect('/');
    
    }
}catch (error) {
    console.log("Error in adding comments", error);
    return;
  }

}
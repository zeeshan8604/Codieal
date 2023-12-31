const Comment=require('../models/comment');
const  Post=require('../models/post');
const commentsMailer=require('../mailer/comments_mailer');
const Like=require('../models/likes');


module.exports.addcomment=async function(req, res){
try{
    let post= await Post.findById(req.body.post);
    if(post){
      let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        } ); 
        // post.comments.push(comment);
        // post.save();
        post.comments.push(comment);
        post.save();
        // let user= await User.findOne({email:profile.emails[0].value}).exec()
        comment = await comment.populate("user", "name email");
        commentsMailer.newComment(comment);
        if (req.xhr) {
          return res.status(200).json({
            comment: comment,
            message: "Comment Added Successfully",
          });
        }
        res.redirect('/');
    
    }
}catch (error) {
    console.log("Error in adding comments", error);
    return;
  }

}

module.exports.destroy=async function(req, res){
  try{
    let comment= await Comment.findById(req.params.id);
    if(comment.user==req.user.id){
      let postId=comment.post;
      comment.deleteOne();
      let post= Post.findByIdAndUpdate({$pull:{comments:req.params.id}});
      Like.deleteMany({likeable:comment._id, onModel:'Comment'});
    
      if (req.xhr) {
        return res.status(200).json({
          comment_id: req.params.id,
          message: "Comment Delted Successfully",
        });
      }
      return res.redirect('back');
    }else{
      return res.redirect('back');
    }
  }catch(error){
    console.log('error in deleting COMMENTS', error);
    return;
  }
}